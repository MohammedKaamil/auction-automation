import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import { Player, auctionPlayers } from "@/data/auctionPlayers";
import { cn } from "@/lib/utils";

interface PlayerSearchProps {
  onSelectPlayer: (player: Player) => void;
  selectedPlayer: Player | null;
}

const specialismConfig: Record<string, { color: string; icon: string }> = {
  BATTER: { color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30", icon: "🏏" },
  "ALL-ROUNDER": { color: "bg-purple-500/20 text-purple-400 border-purple-500/30", icon: "⚡" },
  WICKETKEEPER: { color: "bg-blue-500/20 text-blue-400 border-blue-500/30", icon: "🧤" },
  BOWLER: { color: "bg-red-500/20 text-red-400 border-red-500/30", icon: "🎯" },
};

const countryFlags: Record<string, string> = {
  "India": "🇮🇳",
  "Australia": "🇦🇺",
  "England": "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
  "South Africa": "🇿🇦",
  "New Zealand": "🇳🇿",
  "West Indies": "🌴",
  "Sri Lanka": "🇱🇰",
  "Afghanistan": "🇦🇫",
  "Bangladesh": "🇧🇩",
  "Pakistan": "🇵🇰",
};

export const PlayerSearch = ({ onSelectPlayer, selectedPlayer }: PlayerSearchProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPlayers = useMemo(() => {
    if (!searchQuery.trim()) return auctionPlayers.slice(0, 10);
    
    const query = searchQuery.toLowerCase();
    return auctionPlayers.filter(
      (player) =>
        player.fullName.toLowerCase().includes(query) ||
        player.country.toLowerCase().includes(query) ||
        player.specialism.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const getInitials = (player: Player) => {
    return `${player.firstName.charAt(0)}${player.surname.charAt(0)}`;
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search players by name, country, role..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-secondary/50 border-border/50 focus:border-primary/50 h-11"
        />
      </div>

      <div className="max-h-[360px] overflow-y-auto space-y-2 pr-1">
        {filteredPlayers.map((player) => {
          const config = specialismConfig[player.specialism] || specialismConfig.BATTER;
          const flag = countryFlags[player.country] || "🏳️";
          
          return (
            <button
              key={player.id}
              onClick={() => onSelectPlayer(player)}
              className={cn(
                "w-full p-3 rounded-lg text-left transition-all duration-200",
                "bg-secondary/30 hover:bg-secondary/60 border border-transparent",
                "flex items-center gap-3 group",
                selectedPlayer?.id === player.id && "border-primary bg-primary/10 shadow-lg shadow-primary/10"
              )}
            >
              <div 
                className={cn(
                  "w-11 h-11 rounded-full flex items-center justify-center shrink-0 font-display font-bold text-sm",
                  "bg-gradient-to-br from-muted to-background border border-border/50"
                )}
              >
                {getInitials(player)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold text-foreground">
                    {player.fullName}
                  </span>
                  <Badge
                    variant="outline"
                    className={cn("text-xs shrink-0", config.color)}
                  >
                    {config.icon} {player.specialism}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-0.5">
                  <span>{flag} {player.country}</span>
                  <span className="text-muted-foreground/40">•</span>
                  <span>Age {player.age}</span>
                  <span className="text-muted-foreground/40">•</span>
                  <span className="text-accent">₹{player.reservePrice}L Base</span>
                </div>
              </div>
              {selectedPlayer?.id === player.id && (
                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center shrink-0">
                  <svg className="w-3.5 h-3.5 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </button>
          );
        })}
        {filteredPlayers.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <div className="text-2xl mb-2">🔍</div>
            No players found matching "{searchQuery}"
          </div>
        )}
      </div>
      
      <p className="text-xs text-muted-foreground text-center">
        {auctionPlayers.length} players available • Search by name, country, or role
      </p>
    </div>
  );
};
