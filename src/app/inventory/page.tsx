import { supabase } from "../utils/supabase/client";

export default async function Inventory() {
  const { data: inventory } = await supabase.from("inventory").select();

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-4">
      Inventory
      {inventory?.map((inventory) => <div>{inventory.name}</div>)}
    </div>
  );
}
