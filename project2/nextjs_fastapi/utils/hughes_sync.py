import re
import requests
from datetime import datetime
from typing import List, Dict, Optional
import os
from base64 import b64decode

class HughesSync:
    def __init__(self, github_token: str):
        self.github_token = github_token
        self.headers = {
            'Authorization': f'token {github_token}',
            'Accept': 'application/vnd.github.v3+json'
        }
        self.base_url = 'https://api.github.com'
        
    def fetch_markdown_files(self, repo: str = 'yanfd/Obsidian-Archive', path: str = 'yan/record') -> List[Dict]:
        """获取指定路径下的所有Markdown文件"""
        url = f'{self.base_url}/repos/{repo}/contents/{path}'
        
        try:
            response = requests.get(url, headers=self.headers)
            response.raise_for_status()
            
            files = response.json()
            markdown_files = []
            
            for file in files:
                if file['name'].endswith('.md') and self._is_valid_date_format(file['name']):
                    markdown_files.append({
                        'name': file['name'],
                        'path': file['path'],
                        'url': file['url']
                    })
                    
            return markdown_files
            
        except requests.exceptions.RequestException as e:
            print(f"Error fetching files: {e}")
            return []
    
    def _is_valid_date_format(self, filename: str) -> bool:
        """检查文件名是否符合 YYYY-M.md 格式"""
        pattern = r'^\d{4}-\d{1,2}\.md$'
        return bool(re.match(pattern, filename))
    
    def fetch_file_content(self, file_url: str) -> Optional[str]:
        """获取单个文件的内容"""
        try:
            response = requests.get(file_url, headers=self.headers)
            response.raise_for_status()
            
            content_data = response.json()
            content = b64decode(content_data['content']).decode('utf-8')
            return content
            
        except requests.exceptions.RequestException as e:
            print(f"Error fetching file content: {e}")
            return None
    
    def parse_markdown_entries(self, content: str, filename: str) -> List[Dict]:
        """解析Markdown内容，按####标题分割日志"""
        entries = []
        
        # 提取年月信息
        year_month_match = re.match(r'(\d{4})-(\d{1,2})\.md', filename)
        if not year_month_match:
            return entries
            
        year = year_month_match.group(1)
        month = year_month_match.group(2).zfill(2)
        
        # 按####分割内容
        sections = re.split(r'^#### ', content, flags=re.MULTILINE)
        
        for section in sections[1:]:  # 跳过第一个空section
            lines = section.strip().split('\n')
            if not lines:
                continue
                
            # 第一行是日期
            date_line = lines[0].strip()
            date_match = re.match(r'(\d{4})-(\d{2})-(\d{2})', date_line)
            
            if date_match:
                full_date = date_match.group(0)
                day = date_match.group(3)
                
                # 获取内容（跳过日期行）
                content_lines = lines[1:] if len(lines) > 1 else []
                content_text = '\n'.join(content_lines).strip()
                
                # 生成标题（从内容中提取或使用默认）
                title = self._generate_title(content_text, full_date)
                
                # 格式化显示日期
                try:
                    date_obj = datetime.strptime(full_date, '%Y-%m-%d')
                    display_date = date_obj.strftime('%d %b.')
                except:
                    display_date = f"{day} {self._month_abbr(month)}."
                
                entry = {
                    'date': display_date,
                    'title': title,
                    'content': content_text,
                    'timestamp': full_date,
                    'year': int(year),
                    'month': int(month),
                    'day': int(day)
                }
                
                entries.append(entry)
                
        return entries
    
    def _generate_title(self, content: str, date: str) -> str:
        """从内容生成标题"""
        if not content:
            return f"日志 - {date}"
            
        # 尝试提取第一行有意义的内容作为标题
        lines = content.split('\n')
        for line in lines:
            line = line.strip()
            # 跳过时间行
            if re.match(r'^\d{1,2}:\d{2}', line):
                continue
            # 跳过空行和特殊标记
            if line and not line.startswith('>') and not line.startswith('~~'):
                # 限制标题长度
                if len(line) > 50:
                    return line[:47] + '...'
                return line
                
        return f"日志 - {date}"
    
    def _month_abbr(self, month: str) -> str:
        """月份缩写"""
        months = {
            '01': 'Jan', '02': 'Feb', '03': 'Mar', '04': 'Apr',
            '05': 'May', '06': 'Jun', '07': 'Jul', '08': 'Aug',
            '09': 'Sep', '10': 'Oct', '11': 'Nov', '12': 'Dec'
        }
        return months.get(month, month)
    
    def sync_all_entries(self) -> List[Dict]:
        """同步所有日志条目"""
        all_entries = []
        
        # 获取所有Markdown文件
        files = self.fetch_markdown_files()
        
        for file in files:
            print(f"Processing {file['name']}...")
            
            # 获取文件内容
            content = self.fetch_file_content(file['url'])
            if content:
                # 解析日志条目
                entries = self.parse_markdown_entries(content, file['name'])
                all_entries.extend(entries)
        
        # 按时间戳排序（最新的在前）
        all_entries.sort(key=lambda x: x['timestamp'], reverse=True)
        
        # 添加ID
        for idx, entry in enumerate(all_entries, 1):
            entry['id'] = idx
            
        return all_entries