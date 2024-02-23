import "tailwindcss/tailwind.css"
import Cam from "./cam";

export default function HomePage() {
  return (
    <main>
      <div className="h-full flex flex-col items-center justify-evenly pt-16 gap-16">
        <div className="flex flex-col gap-8">
          <h1 className="text-5xl font-medium underline decoration-wavy underline-offset-8">Shop Scan</h1>
        </div>
      </div>
      <Cam />
    </main>
  );
}
