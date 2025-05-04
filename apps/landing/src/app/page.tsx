import Hero from "@/components/Hero";
import ValueProps from "@/components/ValueProps";
import Mission from "@/components/Mission";
import WaitlistForm from "../components/WaitlistForm";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center px-4 py-16">
      <Hero />
      <ValueProps />
      <Mission />
      <WaitlistForm />    
    </main>
  );
}