import Link from 'next/link';
import Image from 'next/image';
import { Button } from './ui/button';
import BackgroundToggleButton from './BackgroundToggleButton';
import type { BackgroundSource } from '@/config/backgroundImages';

interface NavbarProps {
  onBackgroundChange?: (source: BackgroundSource) => void;
  currentBackground?: BackgroundSource;
}

const Navbar = ({ onBackgroundChange, currentBackground = 'gradient' }: NavbarProps) => {
  return (
    <nav className="bg-zinc-950 text-white py-2 border-b border-gray-700">
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          {/* 可以替换成你的 Logo */}
          YANFD PRODUCTS
        </Link>
        <div className="flex items-center space-x-4">
          {onBackgroundChange && (
            <BackgroundToggleButton
              onBackgroundChange={onBackgroundChange}
              currentSource={currentBackground}
            />
          )}
          <Button variant="link" className='text-white'>CONTACT</Button>
          {/* 可以添加更多导航链接 */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;