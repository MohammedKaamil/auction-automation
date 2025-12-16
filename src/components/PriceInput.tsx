import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface PriceInputProps {
  value: string;
  onChange: (value: string) => void;
}

const quickPrices = [
  { label: "50L", value: "0.50" },
  { label: "1 CR", value: "1" },
  { label: "2 CR", value: "2" },
  { label: "5 CR", value: "5" },
  { label: "10 CR", value: "10" },
  { label: "15 CR", value: "15" },
  { label: "18 CR", value: "18" },
  { label: "24.75 CR", value: "24.75" },
];

export const PriceInput = ({ value, onChange }: PriceInputProps) => {
  return (
    <div className="space-y-3">
      <Label className="text-sm font-medium text-muted-foreground">
        Sold Price (in Crores)
      </Label>
      
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-accent font-bold text-lg">
          ₹
        </span>
        <Input
          type="number"
          step="0.25"
          min="0"
          placeholder="Enter price"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="pl-8 pr-12 text-xl font-bold bg-secondary/50 border-border/50 focus:border-accent/50 h-14"
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">
          CR
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        {quickPrices.map((price) => (
          <button
            key={price.value}
            onClick={() => onChange(price.value)}
            className={cn(
              "px-3 py-1.5 rounded-lg text-sm font-medium transition-all",
              "bg-secondary/50 hover:bg-secondary border border-border/50",
              value === price.value && "bg-accent/20 border-accent text-accent"
            )}
          >
            {price.label}
          </button>
        ))}
      </div>
    </div>
  );
};
