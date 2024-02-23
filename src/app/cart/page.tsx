"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { supabase } from "~/app/utils/supabase/client";
import { useState, useEffect } from 'react';
import Link from "next/link";
import { buttonVariants } from "~/components/ui/button";

type InventoryItem = {
  name: string;
  price: number;
  stock: number;
};

export default function Cart() {
  const [inventory, setInventory] = useState<InventoryItem[]>([])

  useEffect(() => {
      fetchItems();
  }, [])

  const fetchItems = async () => {
    const { data: inventory } = await supabase.from("inventory").select();
    if (inventory) setInventory(inventory);
  };

  const handleDelete = async (name) => {
    console.log(`Deleting product: ${name}`);
    const { data, error } = await supabase
      .from('inventory')
      .delete()
      .match({ name: name });
    if (error) {
      console.error('Error deleting item:', error);
    }
    fetchItems();
  };

  return (
    <div className="h-full flex flex-col items-center justify-evenly pt-16 gap-16">
      <div className="flex flex-col gap-8">
        <h1 className="text-5xl font-medium underline decoration-wavy underline-offset-8">Cart</h1>
      </div>
      <div className="flex flex-col gap-8 overflow-y-auto">
        {inventory && inventory.length >   0 ? (
          inventory.map((item) => (
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
  );
}