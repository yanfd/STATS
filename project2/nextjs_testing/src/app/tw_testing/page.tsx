"use client"; // 明确标记这是一个 Client Component
import { useState } from "react";
import { twMerge as tw } from "tailwind-merge";

export default function tw_testing() {

  return (
    <div>
    <div className="flex flex-col items-center justify-center space-x-1">
      <div className="w-14 h-14 bg-red-500 rounded-full"></div>
      <div className="w-14 h-14 bg-yellow-500 rounded-full"></div>
      <div className="w-14 h-14 bg-blue-500 rounded-full"></div>
    </div>
    {/* <div className="flex justify-start space-x-1">
      <div className="w-14 h-14 bg-red-500 rounded-full"></div>
      <div className="w-14 h-14 bg-yellow-500 rounded-full"></div>
      <div className="w-14 h-14 bg-blue-500 rounded-full"></div>
    </div>
    <div className="flex justify-end space-x-1">
      <div className="w-14 h-14 bg-red-500 rounded-full"></div>
      <div className="w-14 h-14 bg-yellow-500 rounded-full"></div>
      <div className="w-14 h-14 bg-blue-500 rounded-full"></div>
    </div>
    <div className="flex justify-around space-x-1">
      <div className="w-14 h-14 bg-red-500 rounded-full"></div>
      <div className="w-14 h-14 bg-yellow-500 rounded-full"></div>
      <div className="w-14 h-14 bg-blue-500 rounded-full"></div>
    </div>
    <div className="flex justify-baseline space-x-1">
      <div className="w-14 h-14 bg-red-500 rounded-full"></div>
      <div className="w-14 h-14 bg-yellow-500 rounded-full"></div>
      <div className="w-14 h-14 bg-blue-500 rounded-full"></div>
    </div> */}
    </div>
    

  );
}