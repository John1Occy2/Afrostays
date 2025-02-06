import { Link } from "wouter";
import { MdHotel } from "react-icons/md";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/">
            <a className="flex items-center gap-2 text-2xl font-bold text-primary">
              <MdHotel className="h-6 w-6" />
              <span>AfriStays</span>
            </a>
          </Link>
        </nav>
      </header>
      <main>{children}</main>
    </div>
  );
}
