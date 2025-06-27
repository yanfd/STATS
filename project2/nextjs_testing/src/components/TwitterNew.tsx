'use client'; // 如果这是客户端组件，需要这行

import React, { useState } from 'react';
// 假设 Input, Button, Search 组件是从这里导入的
// 请根据你的实际项目路径调整导入语句
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react'; // 假设 Search 图标来自 lucide-react，请根据你的实际导入路径调整

const SearchBar = () => {
  // 使用 state 来存储输入框的内容
  const [searchTerm, setSearchTerm] = useState('');

  // 处理输入框内容变化的函数
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value); // 更新 state
  };

  // 执行 Google 搜索的函数
  const performGoogleSearch = (query: string) => {
    // 确保查询内容不为空白
    if (query.trim()) {
      // 构造 Google 搜索的 URL
      // encodeURIComponent 确保查询字符串中的特殊字符被正确编码
      const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
      // 在新标签页打开搜索结果
      window.open(googleSearchUrl, '_blank');
      // 如果想在当前标签页跳转，使用:
      // window.location.href = googleSearchUrl;
    }
  };

  // 处理表单提交事件 (当用户按回车或点击提交按钮时触发)
  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // 阻止表单的默认提交行为 (阻止页面刷新)
    performGoogleSearch(searchTerm); // 执行搜索
  };

  return (
    // 使用 form 标签包裹输入框和按钮，并绑定 onSubmit 事件
    <form onSubmit={handleFormSubmit} className="w-full"> {/* Optional: add w-full to form if you want it to take full width */}
      <div className="flex w-full items-center space-x-2 bg-card p-2 rounded-lg border"> {/* Use Card BG, add border */}
        <Input
          type="search" // type="search" 对语义化和一些浏览器行为有益
          placeholder="YOU WONT GET WHAT YOU WANT"
          // 将 input 的 value 绑定到 state
          value={searchTerm}
          // 将 input 的 onChange 事件绑定到处理函数
          onChange={handleInputChange}
          // Remove default input border/ring when inside the styled div
          className="flex-grow bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0 placeholder-muted-foreground"
        />
        <Button type="submit" size="icon" variant="ghost">
          {/* Search icon */}
          <Search className="h-4 w-4" />
        </Button>
      </div>
    </form>
  );
};

export default SearchBar; // 导出组件以便在页面中使用