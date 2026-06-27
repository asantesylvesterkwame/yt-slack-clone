import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24 text-2xl text-rose-500">
      Hello Corpland Academy!
      <Button variant="slack">Click me to open</Button>
    </div>
  );
}
