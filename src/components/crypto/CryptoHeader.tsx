import { RefreshCcw } from "lucide-react";
import { Button } from "../ui/button";

interface CryptoHeaderProps {
  isUpdating: boolean;
  onToggleUpdates: () => void;
}

export function CryptoHeader({ isUpdating, onToggleUpdates }: CryptoHeaderProps) {
  return (
    <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold">Cryptocurrency Prices</h1>
        <p className="text-muted-foreground">
          Real-time crypto prices by market cap
        </p>
      </div>
      <Button 
        variant={isUpdating ? "destructive" : "default"}
        onClick={onToggleUpdates}
        className="gap-2"
      >
        <RefreshCcw className={`h-4 w-4 ${isUpdating ? 'animate-spin' : ''}`} />
        {isUpdating ? 'Stop Updates' : 'Start Updates'}
      </Button>
    </div>
  );
}