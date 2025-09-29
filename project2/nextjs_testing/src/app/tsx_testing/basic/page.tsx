'use client'

// import React, { useState } from 'react'
// import { Button } from '@/components/ui/button'
// import { on } from 'events'

// // 模拟用户信息
// const user = {
//   name: 'Hedy Lamarr',
//   imageUrl: 'https://i.imgur.com/yXOvdOSs.jpg',
//   imageSize: 90,
// }

// // 模拟产品列表
// const products = [
//   { title: 'Cabbage', isFruit: false, id: 1 },
//   { title: 'Garlic', isFruit: false, id: 2 },
//   { title: 'Apple', isFruit: true, id: 3 },
// ]

// /**
//  * 单独计数按钮
//  */


// /**
//  * 主页面
//  */
// const Page = () => {
//     const [count, setCount] = useState<any>(null)
    
//     const CounterButton = () => {
//     return (
//         <Button
//         className="btn btn-primary m-2"
//         onClick={() => setCount(count + 1)}
//         >
//         clicked {count} times.
//         </Button>
//     )
//     }
//     const onClick = () => {
//         setCount(count + 1)
//     }
        
//   return (
//     <div className="bg-white w-full min-h-screen p-10 space-y-6">
//       <h1 className="text-xl font-bold">独立计数按钮测试页</h1>

//       {/* 四个独立计数按钮 */}
//       <div className="flex flex-wrap gap-2">
//         {/* <CounterButton />
//         <CounterButton />
//         <CounterButton />
//         <CounterButton /> */}

//         <Button onClick={onClick}>clicked {count} times.</Button>
//         <Button onClick={onClick}>clicked {count} times.</Button>
//         <Button onClick={onClick}>clicked {count} times.</Button>
//         <Button onClick={onClick}>clicked {count} times.</Button>
        
//       </div>
//       <div>
//         <CounterButton />
//         <CounterButton />
//         <CounterButton />
//         <CounterButton />
//       </div>

//       {/* 用户信息 */}
//       <div className="space-y-2">
//         <h2 className="text-lg">User Info</h2>
//         <h3 className="font-medium">name = {user.name}</h3>
//         <img
//           src={user.imageUrl}
//           alt={user.name}
//           className="rounded-2xl"
//           style={{ width: user.imageSize, height: user.imageSize }}
//         />
//       </div>

//       {/* 产品列表 */}
//       <div>
//         <h2 className="text-lg">Products</h2>
//         <ul className="list-disc pl-6">
//           {products.map((product) => (
//             <li
//               key={product.id}
//               className={product.isFruit ? 'text-red-600' : 'text-gray-800'}
//             >
//               {product.title}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   )
// }

// export default Page




import React from 'react'

const Page2 = () => {
    const [count, setCount] = React.useState(0);
    
    const HandleClick = () => {
        setCount(count + 1);
    }


  return (
    <div>
        <h1>共享计数按钮</h1>
        <MyButton count={count} onClick={HandleClick}/>
        <MyButton count={count} onClick={HandleClick}/>
        <MyButton count={count} onClick={HandleClick}/>
        <MyButton count={count} onClick={HandleClick}/>

    </div>
  );
}

type MyProps ={
    count: number;
    onClick: () => void;
}

export const MyButton = ({ count, onClick }: MyProps) => {
    return (
        <button onClick={onClick}>
            clicked {count}times.
        </button>
    )
}

export default Page2


