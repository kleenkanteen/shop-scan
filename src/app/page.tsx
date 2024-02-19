import "tailwindcss/tailwind.css"
import Cam from "./cam";

export default function HomePage() {
  return (
    <main className="bg-purple-300">
      <h1 className="font-bold text-2xl">
        Shop Scan
      </h1>
      <Cam />
    </main>
  );
}
