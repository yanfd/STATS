import React from "react";

const YanfdAnimation: React.FC = () => {
  return (
    <div style={{
      height: '100%',
      width: '100%',
      display: 'flex',
      background: 'radial-gradient(#fff, #eaeaea)',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <svg width="365" height="365" viewBox="0 0 365 365">
        <style>
          {`
          /* 通用 */
          line, path { fill: none; stroke: #000; stroke-linecap: round; }

          /* Y */
          .Y-left-stroke { stroke-dasharray: 62; stroke-dashoffset: 62; animation: Y-left 2s ease forwards; }
          .Y-right-stroke { stroke-dasharray: 62; stroke-dashoffset: 62; animation: Y-right 2s ease forwards 0.5s; }
          .Y-bottom-stroke { stroke-dasharray: 62; stroke-dashoffset: 62; animation: Y-bottom 2s ease forwards 1s; }

          @keyframes Y-left { to { stroke-dashoffset: 0; } }
          @keyframes Y-right { to { stroke-dashoffset: 0; } }
          @keyframes Y-bottom { to { stroke-dashoffset: 0; } }

          /* A */
          .A-left-stroke { stroke-dasharray: 124; stroke-dashoffset: 124; animation: A-left 2s ease forwards 1.5s; }
          .A-right-stroke { stroke-dasharray: 124; stroke-dashoffset: 124; animation: A-right 2s ease forwards 2s; }
          .A-mid-stroke { stroke-dasharray: 36; stroke-dashoffset: 36; animation: A-mid 2s ease forwards 2.5s; }
          @keyframes A-left { to { stroke-dashoffset: 0; } }
          @keyframes A-right { to { stroke-dashoffset: 0; } }
          @keyframes A-mid { to { stroke-dashoffset: 0; } }

          /* N */
          .N-left-stroke { stroke-dasharray: 124; stroke-dashoffset: 124; animation: N-left 2s ease forwards 3s; }
          .N-diagonal-stroke { stroke-dasharray: 124; stroke-dashoffset: 124; animation: N-diagonal 2s ease forwards 3.5s; }
          .N-right-stroke { stroke-dasharray: 124; stroke-dashoffset: 124; animation: N-right 2s ease forwards 4s; }
          @keyframes N-left { to { stroke-dashoffset: 0; } }
          @keyframes N-diagonal { to { stroke-dashoffset: 0; } }
          @keyframes N-right { to { stroke-dashoffset: 0; } }

          /* F */
          .F-left-stroke { stroke-dasharray: 124; stroke-dashoffset: 124; animation: F-left 2s ease forwards 4.5s; }
          .F-top-stroke { stroke-dasharray: 45; stroke-dashoffset: 45; animation: F-top 2s ease forwards 5s; }
          .F-mid-stroke { stroke-dasharray: 35; stroke-dashoffset: 35; animation: F-mid 2s ease forwards 5.5s; }
          @keyframes F-left { to { stroke-dashoffset: 0; } }
          @keyframes F-top { to { stroke-dashoffset: 0; } }
          @keyframes F-mid { to { stroke-dashoffset: 0; } }

          /* D */
          .D-left-stroke { stroke-dasharray: 124; stroke-dashoffset: 124; animation: D-left 2s ease forwards 6s; }
          .D-curve { stroke-dasharray: 150; stroke-dashoffset: 150; animation: D-curve 2s ease forwards 6.5s; }
          @keyframes D-left { to { stroke-dashoffset: 0; } }
          @keyframes D-curve { to { stroke-dashoffset: 0; } }
          `}
        </style>

        {/* Y */}
        <g id="Y-letter">
          <line className="Y-left-stroke" x1="17" y1="0" x2="33" y2="62" strokeWidth="34"/>
          <line className="Y-right-stroke" x1="68" y1="62" x2="84" y2="0" strokeWidth="34"/>
          <line className="Y-bottom-stroke" x1="50" y1="62" x2="50" y2="124" strokeWidth="34"/>
        </g>

        {/* A */}
        <g id="A-letter">
          <line className="A-left-stroke" x1="104" y1="124" x2="120" y2="0" strokeWidth="34"/>
          <line className="A-right-stroke" x1="156" y1="124" x2="140" y2="0" strokeWidth="34"/>
          <line className="A-mid-stroke" x1="112" y1="62" x2="148" y2="62" strokeWidth="34"/>
        </g>

        {/* N */}
        <g id="N-letter">
          <line className="N-left-stroke" x1="170" y1="124" x2="170" y2="0" strokeWidth="34"/>
          <line className="N-diagonal-stroke" x1="170" y1="0" x2="220" y2="124" strokeWidth="34"/>
          <line className="N-right-stroke" x1="220" y1="124" x2="220" y2="0" strokeWidth="34"/>
        </g>

        {/* F */}
        <g id="F-letter">
          <line className="F-left-stroke" x1="235" y1="0" x2="235" y2="124" strokeWidth="34"/>
          <line className="F-top-stroke" x1="235" y1="0" x2="280" y2="0" strokeWidth="34"/>
          <line className="F-mid-stroke" x1="235" y1="62" x2="270" y2="62" strokeWidth="34"/>
        </g>

        {/* D */}
        <g id="D-letter">
          <line className="D-left-stroke" x1="300" y1="0" x2="300" y2="124" strokeWidth="34"/>
          <path className="D-curve" d="M300 0 Q340 62 300 124" strokeWidth="34"/>
        </g>

      </svg>
    </div>
  );
};

export default YanfdAnimation;
