"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { supabase } from "~/app/utils/supabase/client";
import { useState, useEffect } from 'react';
import Link from "next/link";
import { buttonVariants } from "~/components/ui/button";

type cartItem = {
  name: string;
  price: number;
  stock: number;
};

export default function Cart() {
  const [cart, setcart] = useState<cartItem[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
      fetchItems();
  }, [])

  const fetchItems = async () => {
    const { data: cart } = await supabase.from("cart").select();
    if (cart) setcart(cart);
  };

  const handleDelete = async (name) => {
    console.log(`Deleting product: ${name}`);
    const { data, error } = await supabase
      .from('cart')
      .delete()
      .match({ name: name });
    if (error) {
      console.error('Error deleting item:', error);
    }
    fetchItems();
  };

  return (
    <div className="h-full p-8 flex flex-col gap-8">
      <div className='flex flex-col h-[90%] items-center justify-evenly pt-16 gap-16'>
          <div className="flex flex-col gap-8">
            <h1 className="text-5xl font-medium underline decoration-wavy underline-offset-8">Cart</h1>
          </div>
          <div className="flex flex-col gap-8 overflow-y-auto">
            {cart && cart.length >   0 ? (
              cart.map((item) => (
                <Card key={item.name} className="w-[350px] hover:bg-slate-50">
                  <CardHeader className="flex flex-row justify-between">
                    <CardTitle className="text-2xl font-bold">
                      {item.name}
                    </CardTitle>
                    <Button onClick={() => handleDelete(item.name)}>
                      <img src="/trash.svg" alt="Delete" width={20} height={20} className="filter invert"/>
                    </Button>
                  </CardHeader>
                  <CardContent className="flex justify-between text-xl">
                    <div className="font-bold">${item.price}</div>
                    <div className="font-bold">
                      In stock: {item.stock}
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <></>
            )}
          </div>
      </div>
      <div className='flex flex-row h-16 justify-between items-center justify-center'>
        <div className="text-2xl font-bold">
            <div className="text-2xl font-bold">Item count: {cart.length} </div>
            <div className="text-2xl font-bold">Total Cost: ${cart.reduce((acc, item) => acc + item.price,  0)}</div>
        </div>
        <Button className="text-xl py-4 px-6">Checkout</Button>
      </div>
      {/* <div className='flex flex-row justify-between'>
        // show number of items and total cost with the formal: "# of items: | Total Cost" on the left along with "Checkout" button to the right 
      </div> */}
    </div>
  );
}