from fastapi import APIRouter, HTTPException, Query
from typing import List, Dict, Optional
import os
from datetime import datetime
import json
from hughes_utils import HughesSync

router = APIRouter(
    prefix="/api/hughes",
    tags=["hughes"]
)

# 缓存数据
cached_data = {
    'messages': [],
    'last_sync': None
}

def get_github_token() -> str:
    """获取GitHub Token"""
    token = os.getenv('GITHUB_TOKEN')
    if not token:
        # 可以从配置文件读取或使用默认值
        token = os.getenv('HUGHES_GITHUB_TOKEN', '')
    return token

@router.get("/sync")
async def sync_hughes_data():
    """从GitHub同步最新的日志数据"""
    token = get_github_token()
    
    if not token:
        raise HTTPException(
            status_code=500, 
            detail="GitHub token not configured. Please set GITHUB_TOKEN environment variable."
        )
    
    try:
        sync = HughesSync(token)
        messages = sync.sync_all_entries()
        
        # 更新缓存
        cached_data['messages'] = messages
        cached_data['last_sync'] = datetime.now().isoformat()
        
        # 可选：保存到文件
        save_path = os.path.join('processed', 'hughes_messages.json')
        os.makedirs('processed', exist_ok=True)
        with open(save_path, 'w', encoding='utf-8') as f:
            json.dump(messages, f, ensure_ascii=False, indent=2)
        
        return {
            'status': 'success',
            'message': f'Synced {len(messages)} entries',
            'last_sync': cached_data['last_sync'],
            'count': len(messages)
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/messages")
async def get_all_messages():
    """获取所有日志消息"""
    if not cached_data['messages']:
        # 如果缓存为空，尝试从文件加载
        save_path = os.path.join('processed', 'hughes_messages.json')
        if os.path.exists(save_path):
            with open(save_path, 'r', encoding='utf-8') as f:
                cached_data['messages'] = json.load(f)
        else:
            # 如果文件也不存在，执行一次同步
            await sync_hughes_data()
    
    return {
        'messages': cached_data['messages'],
        'last_sync': cached_data['last_sync'],
        'total': len(cached_data['messages'])
    }

@router.get("/messages/{year}/{month}")
async def get_messages_by_month(
    year: int,
    month: int,
    day: Optional[int] = None
):
    """获取指定年月（或具体某天）的日志"""
    if not cached_data['messages']:
        await get_all_messages()
    
    filtered_messages = []
    
    for msg in cached_data['messages']:
        if msg.get('year') == year and msg.get('month') == month:
            if day is None or msg.get('day') == day:
                filtered_messages.append(msg)
    
    return {
        'messages': filtered_messages,
        'year': year,
        'month': month,
        'day': day,
        'count': len(filtered_messages)
    }

@router.get("/messages/recent")
async def get_recent_messages(limit: int = Query(default=10, ge=1, le=100)):
    """获取最近的N条日志"""
    if not cached_data['messages']:
        await get_all_messages()
    
    recent = cached_data['messages'][:limit]
    
    return {
        'messages': recent,
        'limit': limit,
        'count': len(recent)
    }

@router.get("/messages/grouped")
async def get_messages_grouped():
    """按年月分组返回所有消息"""
    if not cached_data['messages']:
        await get_all_messages()
    
    grouped = {}
    
    for msg in cached_data['messages']:
        year = msg.get('year')
        month = msg.get('month')
        
        if year and month:
            key = f"{year}-{month:02d}"
            if key not in grouped:
                grouped[key] = {
                    'year': year,
                    'month': month,
                    'messages': []
                }
            grouped[key]['messages'].append(msg)
    
    return {
        'groups': grouped,
        'total_groups': len(grouped),
        'total_messages': len(cached_data['messages'])
    }

@router.get("/status")
async def get_sync_status():
    """获取同步状态"""
    return {
        'last_sync': cached_data['last_sync'],
        'message_count': len(cached_data['messages']),
        'has_token': bool(get_github_token())
    }