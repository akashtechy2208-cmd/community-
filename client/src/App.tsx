import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import ErrorBoundary from "./components/ErrorBoundary";
import IntroLoader from "./components/IntroLoader";
import Home from "./pages/Home";

function App() {
  return (
    <ErrorBoundary>
      <TooltipProvider>
        <IntroLoader />
        <Toaster />
        <Home />
      </TooltipProvider>
    </ErrorBoundary>
  );
}

export default App;
