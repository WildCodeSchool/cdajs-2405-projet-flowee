import Navigation from "@organisms/Navigation";
import { ReactNode } from "react";

interface SignedInLayoutProps {
  children: ReactNode;
}
export default function SignedInLayout({ children }: SignedInLayoutProps) {
  return (
    <div className="flex flex-col mt-4 md:flex-row h-full overflow-hidden">
      <aside className="md:w-20 md:flex-shrink-0">
        <Navigation />
      </aside>
      <main className="flex-1 p-6 md:ml-4 h-full overflow-hidden w-full flex-col  gap-6 flex">
        {children}
      </main>
    </div>
  );
}
