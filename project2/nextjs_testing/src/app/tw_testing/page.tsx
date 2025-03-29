"use client"; // 明确标记这是一个 Client Component
import { useState } from "react";
import { twMerge as tw } from "tailwind-merge";
import { Button } from "@/components/ui/button";

export default function tw_testing() {

  return (
    <div>
        <div className="lg:block hidden">
            <h1 className="text-blue text-5xl">response when lg</h1>

        </div>
        <Button>Click me</Button>
    {/* <div className="flex flex-col items-center justify-center space-x-1">
      <div className="w-14 h-14 bg-red-500 rounded-full"></div>
      <div className="w-14 h-14 bg-yellow-500 rounded-full"></div>
      <div className="w-14 h-14 bg-blue-500 rounded-full"></div>
    </div> */}
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