"use client";

import { Button } from './ui/button';
import { ImageIcon, Palette, CloudIcon } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { BackgroundSource } from '@/config/backgroundImages';

interface BackgroundToggleButtonProps {
  onBackgroundChange: (source: BackgroundSource) => void;
  currentSource: BackgroundSource;
}

const BackgroundToggleButton = ({
  onBackgroundChange,
  currentSource
}: BackgroundToggleButtonProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="link" className="text-white">
          <ImageIcon className="h-4 w-4 mr-2" />
          BACKGROUND
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem
          onClick={() => onBackgroundChange('gradient')}
          className="cursor-pointer"
        >
          <Palette className="h-4 w-4 mr-2" />
          <span>渐变背景</span>
          {currentSource === 'gradient' && <span className="ml-auto">✓</span>}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => onBackgroundChange('unsplash')}
          className="cursor-pointer"
        >
          <ImageIcon className="h-4 w-4 mr-2" />
          <span>Unsplash 随机</span>
          {currentSource === 'unsplash' && <span className="ml-auto">✓</span>}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => onBackgroundChange('r2')}
          className="cursor-pointer"
          disabled={true} // 暂时禁用，等你配置好 R2
        >
          <CloudIcon className="h-4 w-4 mr-2" />
          <span>R2 图床</span>
          {currentSource === 'r2' && <span className="ml-auto">✓</span>}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default BackgroundToggleButton;
