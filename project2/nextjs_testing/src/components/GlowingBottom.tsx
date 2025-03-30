import React from 'react';

interface Props {
  children: React.ReactNode;
}

const SubtleBottomGlow: React.FC<Props> = ({ children }) => {
  return (
    <div className="relative">
      {children}
      <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-white/0 via-blue/40 to-black/400 pointer-events-none"></div>
    </div>
  );
};

export default SubtleBottomGlow;