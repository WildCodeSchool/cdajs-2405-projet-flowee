import Navigation from "../components/Navigation";
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
      <main className="flex-1">{children}</main>
    </div>
  );
}
