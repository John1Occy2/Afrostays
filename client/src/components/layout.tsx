import { Link } from "wouter";
import { MdHotel } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";

export function Layout({ children }: { children: React.ReactNode }) {
  const { user, logoutMutation } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b sticky top-0 bg-background/95 backdrop-blur z-50">
        <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/">
            <Button variant="ghost" className="flex items-center gap-2 text-2xl font-bold text-primary p-0 h-auto">
              <MdHotel className="h-6 w-6" />
              <span>AfriStays</span>
            </Button>
          </Link>

          <div className="flex items-center gap-4">
            {user ? (
              <>
                {user.isHotelOwner && (
                  <Link href="/list-property">
                    <Button variant="outline">List Your Property</Button>
                  </Link>
                )}
                <span className="text-sm text-muted-foreground">
                  Welcome, {user.username}
                </span>
                <Button
                  variant="ghost"
                  onClick={() => logoutMutation.mutate()}
                  disabled={logoutMutation.isPending}
                >
                  {logoutMutation.isPending ? "Logging out..." : "Logout"}
                </Button>
              </>
            ) : (
              <Link href="/auth">
                <Button>Login / Register</Button>
              </Link>
            )}
          </div>
        </nav>
      </header>
      <main>{children}</main>
    </div>
  );
}