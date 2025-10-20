'use client';

export default function ImageStitcherPage() {
  return (
    <div className="w-full h-screen">
      <iframe
        src="/pinch.html"
        className="w-full h-full border-0"
        title="图片拼接工具"
      />
    </div>
  );
}