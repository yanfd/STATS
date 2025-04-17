import React, { useRef, useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";

const colors = [
  '#000000', '#808080', '#800000', '#808000', '#008000', '#008080', '#000080', '#800080', '#808040', '#004040', '#0080FF', '#004080', '#8000FF', '#804000',
  '#FFFFFF', '#C0C0C0', '#FF0000', '#FFFF00', '#00FF00', '#00FFFF', '#0000FF', '#FF00FF', '#FFFF80', '#00FF80', '#80FFFF', '#8080FF', '#FF0080', '#FF8040'
];

interface PaintCanvasProps {
  initialColor?: string;
  initialTool?: 'brush' | 'eraser';
  width?: number;
  height?: number;
}

const PaintCanvas: React.FC<PaintCanvasProps> = ({
  initialColor = '#000000',
  initialTool = 'brush',
  width = 800, // 设置默认宽度
  height = 500, // 设置默认高度
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState(initialColor);
  const [tool, setTool] = useState(initialTool);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (context && canvas) {
      context.fillStyle = '#FFFFFF';
      context.fillRect(0, 0, canvas.width, canvas.height);
    }
  }, [width, height]); // Re-initialize canvas on width/height change

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (context && canvas) {
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;    // 计算实际像素宽度与视觉宽度的比例
      const scaleY = canvas.height / rect.height;  // 计算实际像素高度与视觉高度的比例
      const x = (e.clientX - rect.left) * scaleX;
      const y = (e.clientY - rect.top) * scaleY;
      context.beginPath();
      context.moveTo(x, y);
      setIsDrawing(true);
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (context && canvas) {
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;    // 计算实际像素宽度与视觉宽度的比例
      const scaleY = canvas.height / rect.height;  // 计算实际像素高度与视觉高度的比例
      const x = (e.clientX - rect.left) * scaleX;
      const y = (e.clientY - rect.top) * scaleY;
      context.lineTo(x, y);
      context.strokeStyle = tool === 'eraser' ? '#FFFFFF' : color;
      context.lineWidth = tool === 'eraser' ? 20 * Math.max(scaleX, scaleY) : 2 * Math.max(scaleX, scaleY); // 考虑缩放调整线宽
      context.lineCap = 'round';
      context.stroke();
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const startDragging = (e: React.MouseEvent<HTMLDivElement>) => {
    setDragging(true);
    setPosition({
      x: e.clientX - (containerRef.current?.offsetLeft || 0),
      y: e.clientY - (containerRef.current?.offsetTop || 0)
    });
  };

  const onDrag = (e: React.MouseEvent<HTMLDivElement>) => {
    if (dragging) {
      const left = e.clientX - position.x;
      const top = e.clientY - position.y;
      if (containerRef.current) {
        containerRef.current.style.left = `${left}px`;
        containerRef.current.style.top = `${top}px`;
      }
    }
  };

  const stopDragging = () => {
    setDragging(false);
  };

  return (
    <div
      ref={containerRef}
      className="bg-gray-200 border-2 border-white shadow-md"
      style={{ width: `${width}px`, height: `${height}px` }} // 设置明确的宽度和高度
    >
      <div
        className="bg-blue-900 text-white px-2 py-1 flex justify-between items-center cursor-move"
        onMouseDown={startDragging}
        onMouseMove={onDrag}
        onMouseUp={stopDragging}
        onMouseLeave={stopDragging}
      >
        <span>untitled - Paint</span>
        <div className="flex gap-1">
          <Button variant="ghost" className="h-5 w-5 p-0 min-w-0 text-white hover:bg-blue-700">_</Button>
          <Button variant="ghost" className="h-5 w-5 p-0 min-w-0 text-white hover:bg-blue-700">□</Button>
          <Button variant="ghost" className="h-5 w-5 p-0 min-w-0 text-white hover:bg-blue-700">×</Button>
        </div>
      </div>
      <div className="bg-gray-300 px-2 py-1 text-sm">
        <span className="mr-4">File</span>
        <span className="mr-4">Edit</span>
        <span className="mr-4">View</span>
        <span className="mr-4">Image</span>
        <span className="mr-4">Options</span>
        <span>Help</span>
      </div>
      <div className="flex">
        <div className="w-8 bg-gray-300 p-0.5 border-r border-gray-400">
          <Button
            variant="ghost"
            className={`w-7 h-7 p-0 min-w-0 mb-0.5 ${tool === 'brush' ? 'bg-gray-300 border border-gray-400 shadow-inner' : ''}`}
            onClick={() => setTool('brush')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <path d="M18 12l-8-8-6 6c-2 2-2 5 0 7s5 2 7 0l7-7" />
              <path d="M17 7l3 3" />
            </svg>
          </Button>
          <Button
            variant="ghost"
            className={`w-7 h-7 p-0 min-w-0 mb-0.5 ${tool === 'eraser' ? 'bg-gray-300 border border-gray-400 shadow-inner' : ''}`}
            onClick={() => setTool('eraser')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <path d="M20 20H7L3 16C2 15 2 13 3 12L13 2L22 11L20 20Z" />
              <path d="M17 17L7 7" />
            </svg>
          </Button>
        </div>
        <div className="flex-grow overflow-auto border border-gray-400" style={{ width: 'calc(100% - 32px)', height: 'calc(100% - 60px - 30px - 30px)' }}>
          <canvas
            ref={canvasRef}
            width={width * 2.5} // 保持内部比例，可以根据需要调整
            height={height * 2.5} // 保持内部比例，可以根据需要调整
            style={{ width: '100%', height: '100%' }} // 让 canvas 填充父容器
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseOut={stopDrawing}
          />
        </div>
      </div>
      <div className="flex bg-gray-300 p-1 border-t border-gray-400">
        <div className="flex flex-wrap gap-1">
          {colors.map((c) => (
            <Button
              key={c}
              variant="ghost"
              className={`w-6 h-6 p-0 min-w-0 ${color === c ? 'ring-1 ring-gray-600' : ''}`}
              style={{ backgroundColor: c }}
              onClick={() => setColor(c)}
            />
          ))}
        </div>
      </div>
      <div className="bg-gray-300 px-2 py-1 text-sm border-t border-gray-400">
        For Help, click Help Topics on the Help Menu.
      </div>
    </div>
  );
};

export default PaintCanvas;