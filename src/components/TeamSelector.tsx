import { useState } from "react";
import { teams, Team } from "@/data/teamData";
import { cn } from "@/lib/utils";

interface TeamSelectorProps {
  onSelectTeam: (team: Team) => void;
  selectedTeam: Team | null;
}

export const TeamSelector = ({ onSelectTeam, selectedTeam }: TeamSelectorProps) => {
  const [logoErrors, setLogoErrors] = useState<Set<string>>(new Set());

  const handleLogoError = (teamId: string) => {
    setLogoErrors(prev => new Set(prev).add(teamId));
  };

  return (
    <div className="grid grid-cols-5 gap-3">
      {teams.map((team) => (
        <button
          key={team.id}
          onClick={() => onSelectTeam(team)}
          className={cn(
            "group relative p-3 rounded-xl transition-all duration-300",
            "bg-secondary/30 hover:bg-secondary/60 border-2 border-transparent",
            "flex flex-col items-center gap-2",
            "hover:scale-105 hover:shadow-lg",
            selectedTeam?.id === team.id && "border-2 shadow-lg scale-105"
          )}
          style={{
            borderColor: selectedTeam?.id === team.id ? team.primaryColor : 'transparent',
            boxShadow: selectedTeam?.id === team.id 
              ? `0 0 25px ${team.primaryColor}40` 
              : undefined
          }}
        >
          <div 
            className="w-14 h-14 rounded-full flex items-center justify-center overflow-hidden"
            style={{ 
              background: `linear-gradient(135deg, ${team.primaryColor}30, ${team.secondaryColor}20)`,
              border: `2px solid ${team.primaryColor}60`
            }}
          >
            {!logoErrors.has(team.id) ? (
              <img 
                src={team.logoUrl} 
                alt={team.name}
                className="w-10 h-10 object-contain"
                onError={() => handleLogoError(team.id)}
              />
            ) : (
              <span 
                className="font-display text-lg font-bold"
                style={{ color: team.primaryColor }}
              >
                {team.shortName}
              </span>
            )}
          </div>
          <span 
            className="text-xs font-bold font-display tracking-wide transition-colors"
            style={{ color: selectedTeam?.id === team.id ? team.primaryColor : undefined }}
          >
            {team.shortName}
          </span>
          
          {/* Selection indicator */}
          {selectedTeam?.id === team.id && (
            <div 
              className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center"
              style={{ background: team.primaryColor }}
            >
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke={team.textColor} strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          )}
        </button>
      ))}
    </div>
  );
};
