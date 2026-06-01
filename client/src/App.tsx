import { QueryClientProvider } from "@tanstack/react-query";
import { Router, Switch, Route } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import { queryClient } from "./lib/queryClient";
import { Dashboard } from "./pages/Dashboard";
import { Toaster } from "@/components/ui/toaster";
import { DisclaimerModal } from "./components/DisclaimerModal";

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router hook={useHashLocation}>
        <Switch>
          <Route path="/" component={Dashboard} />
          <Route>
            <div className="flex items-center justify-center h-screen text-muted-foreground text-sm">
              Page not found
            </div>
          </Route>
        </Switch>
      </Router>
      <Toaster />
      <DisclaimerModal />
    </QueryClientProvider>
  );
}
