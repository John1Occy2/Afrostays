import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/hooks/use-auth";
import { Layout } from "@/components/layout";
import { ProtectedRoute } from "@/lib/protected-route";
import Home from "@/pages/home";
import Hotel from "@/pages/hotel";
import Booking from "@/pages/booking";
import Auth from "@/pages/auth";
import ListProperty from "@/pages/list-property";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/auth" component={Auth} />
        <Route path="/hotel/:id" component={Hotel} />
        <ProtectedRoute path="/booking/:id" component={Booking} />
        <ProtectedRoute path="/list-property" component={ListProperty} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router />
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;