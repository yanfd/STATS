'use client'
import { Button } from '@/components/ui/button'
import { FallbackMode } from 'next/dist/lib/fallback';
import React from 'react'
import { useState } from 'react';

const user = {
  name: 'Hedy Lamarr',
  imageUrl: 'https://i.imgur.com/yXOvdOSs.jpg',
  imageSize: 90,
};
const products = [
  { title: 'Cabbage',isFruit:false, id: 1 },
  { title: 'Garlic',isFruit:false, id: 2 },
  { title: 'Apple',isFruit:true, id: 3 },
];



const productsList = products.map((product) => (
    
  <li key={product.id} className={product.isFruit ? 'text-red-600' : ''}>
    {product.title}
  </li>
));

const Page = () => {
    const [count, setCount] = useState(0);

    const clickMe = () => {
        setCount(count + 1);
        alert('Button clicked '+count+' times.');
        }


    return (
    <div className='bg-white w-full min-h-screen p-10'>
    {/* <h1>tsx testing page</h1>
    <p>This is a testing page for TSX in Next.js</p>*/}
    <Button className="btn btn-primary" onClick={clickMe}>click me</Button> 
    <h1> name = {user.name}</h1>
    <img src={user.imageUrl} alt={user.name} className='rounded-2xl w-[${user.imageSize}]px h-[${user.imageSize}]px' />

    <ul>{productsList}</ul>

    </div>
    )
}

export default Page