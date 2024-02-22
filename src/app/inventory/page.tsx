import Link from "next/link";
import { buttonVariants } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

export default async function Inventory() {
  // const { data: inventory } = await supabase.from("inventory").select();
  const inventory: any = [];
  return (
    <div className="flex h-full flex-col items-center justify-evenly">
      <h1 className="text-5xl font-medium">Inventory</h1>

      {inventory.length > 0 ? (
        inventory?.map((inventory: any) => (
          <Card className="w-[350px] hover:bg-slate-50">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                {inventory.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex justify-between text-xl">
              <div className="font-bold text-gray-500">{inventory.price}$</div>
              <div className="font-bold text-gray-500">
                In stock: {inventory.stock}
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <div className="flex flex-col gap-4">
          <p className="text-xl font-normal">Your inventory is empty</p>
          <Link href={"/inventory/add-product"} className={buttonVariants()}>
            Add first product
          </Link>
        </div>
      )}
    </div>
  );
}
