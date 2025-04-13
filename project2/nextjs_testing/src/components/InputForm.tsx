import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";
import { Card, CardHeader, CardTitle,CardDescription,CardContent,CardFooter } from "./ui/card";



export default function InputForm() {

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <Card>
                <CardHeader>
                    <CardTitle className="flex justify-center">login</CardTitle>
                    <CardDescription>input your email n pwd</CardDescription>
                </CardHeader>
                <CardContent>
                <Input placeholder="email" />
                <Input placeholder="password" />
                </CardContent>
                <CardFooter className="flex w-full justify-center">
                    <Button className="w-full">登录</Button>
                </CardFooter>
            </Card>
        </div>

      
        
  
    );
}
  