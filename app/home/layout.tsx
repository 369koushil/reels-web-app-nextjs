// /app/home/layout.tsx (❌ Do NOT use "use client" here)
import Header from "../components/Header";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header /> 
      {children} 
    </div>
  );
}
