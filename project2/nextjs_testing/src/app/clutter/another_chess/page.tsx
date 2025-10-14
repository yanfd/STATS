'use client'
import React from 'react'
import { useState } from 'react'

import './chess.css'
// const square: React.CSSProperties = {
//   backgroundColor: '#fff',
//   border: '1px solid #999',
//   float: 'left',
//   fontSize: '24px',
//   fontWeight: 'bold',
//   lineHeight: '34px',
//   height: '34px',
//   marginRight: '-1px',
//   marginTop: '-1px',
//   padding: '0',
//   textAlign: 'center',
//   width: '34px',
// };

function Square() {
    const [value, setValue] = useState<string | null>(null);
    function handleClick(){
        setValue('X');
    }
        return (
            <button className='square' onClick={handleClick} >{value}</button>
        )
    }

// 当你单击它的时候，Square 组件需要显示“X”。
// 在 Square 内部声明一个名为 handleClick 的函数。然后，将 onClick 添加到由 Square 返回的 JSX 元素的 button 的 props 中：
export default function board() {
    

  return (
    <div className='min-h-screen bg-white'>
        <div className='board-row'>
            <Square />
            <Square />
            <Square />
        </div>
        <div className='board-row'>
            <Square />
            <Square />
            <Square />
        </div>
        <div className='board-row'>
            <Square />
            <Square />
            <Square />
        </div>
        
       
    </div>
  )
}
