
const AnotherPage = () => {
  return (
    <div
      className="
        flex 
        min-h-screen 
        items-center 
        justify-center 
        // --- 使用更明确的直接 CSS 渐变语法 ---
        bg-[radial-gradient(ellipse_farthest-corner_at_50%_130%,_rgba(51,65,85,0.5)_0%,_rgba(17,24,39,0.9)_50%,_rgba(0,0,0,1)_80%)]
        // 解释:
        // ellipse_farthest-corner: 椭圆形状，延伸到最远角
        // at_50%_40%: 中心点在水平中点，垂直方向距离顶部 40%
        // rgba(51,65,85,0.5): 起始颜色 (Slate-800 带 50% 透明) 在 0% 位置
        // rgba(17,24,39,0.9): 中间过渡色 (Gray-900 带 90% 透明) 在 60% 位置
        // rgba(0,0,0,1): 结束颜色 (纯黑) 在 100% 位置
        // -----------------------------------
      "
    >
      {/* 卡片内容 */}
      <div className="text-white p-8 bg-gray-900/50 rounded-lg shadow-xl">
        <h1 className="text-2xl font-bold mb-4">Learn Next.js</h1>
        <p>16 chapters that take you from React to Next.js.</p>
        <button className="mt-6 px-4 py-2 bg-white text-black rounded">Start Learning →</button>
      </div>
    </div>
  );
};

export default AnotherPage;


// const AnotherPage = () => {
//   return (
//     // <div className="bg-zinc-950 min-h-screen">
//     //   <div className="flex">
//     //     <div className="bg-red-500 h-50 w-50"></div>
//     //   </div>
//     // </div>
//     <div className="bg-zinc-950 min-h-screen flex flex-col items-center justify-end">
//       <div className="bg-red-500 h-50 w-50"></div>
//     </div>
//   );
// };

// export default AnotherPage;

