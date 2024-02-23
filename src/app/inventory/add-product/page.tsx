import AddForm from "./add-from";
export default function addProduct() {
  return (
    <div className="mx-auto flex h-full max-w-3xl flex-col justify-center gap-3 px-10">
      <h1 className="text-center text-4xl font-bold">Add your product</h1>
      <AddForm />
    </div>
  );
}
