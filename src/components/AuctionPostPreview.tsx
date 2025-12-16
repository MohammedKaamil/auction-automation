import { forwardRef, useState } from "react";
import { Player } from "@/data/auctionPlayers";
import { Team } from "@/data/teamData";

interface AuctionPostPreviewProps {
  player: Player | null;
  team: Team | null;
  price: string;
}

export const AuctionPostPreview = forwardRef<HTMLDivElement, AuctionPostPreviewProps>(
  ({ player, team, price }, ref) => {
    const [logoError, setLogoError] = useState(false);

    if (!player || !team) {
      return (
        <div className="w-full bg-gradient-to-br from-card to-background rounded-xl flex items-center justify-center border border-border/50" style={{ aspectRatio: '4/5' }}>
          <div className="text-center p-8">
            <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-muted to-background flex items-center justify-center border-2 border-border/30">
              <svg className="w-12 h-12 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-muted-foreground font-medium text-lg">Select a player and team</p>
            <p className="text-muted-foreground/60 text-sm mt-1">to preview your post</p>
          </div>
        </div>
      );
    }

    const formatPrice = (priceStr: string) => {
      const num = parseFloat(priceStr);
      if (isNaN(num) || num === 0) return "0";
      if (num < 1) return `${(num * 100).toFixed(0)} LAKH`;
      return `${num}`;
    };

    const displayPrice = formatPrice(price);
    const priceUnit = parseFloat(price) < 1 ? "" : "CR";

    return (
      <div
        ref={ref}
        className="w-full rounded-xl overflow-hidden relative"
        style={{
          aspectRatio: '4/5',
          background: `linear-gradient(180deg, ${team.gradientFrom}20 0%, #0a0f1a 40%, #0a0f1a 60%, ${team.gradientTo}20 100%)`,
        }}
      >
        {/* Background Wave Patterns */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 500" preserveAspectRatio="none">
          <defs>
            <linearGradient id={`waveGrad1-${team.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={team.primaryColor} stopOpacity="0.4" />
              <stop offset="100%" stopColor={team.primaryColor} stopOpacity="0.05" />
            </linearGradient>
            <linearGradient id={`waveGrad2-${team.id}`} x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={team.secondaryColor} stopOpacity="0.3" />
              <stop offset="100%" stopColor={team.secondaryColor} stopOpacity="0.02" />
            </linearGradient>
          </defs>
          {/* Top Waves */}
          <path
            d="M-50,120 Q100,60 200,120 T450,120 L450,0 L-50,0 Z"
            fill={`url(#waveGrad1-${team.id})`}
          />
          <path
            d="M-50,150 Q125,80 200,150 T450,150 L450,0 L-50,0 Z"
            fill={`url(#waveGrad2-${team.id})`}
          />
          {/* Bottom Waves */}
          <path
            d="M-50,380 Q100,440 200,380 T450,380 L450,500 L-50,500 Z"
            fill={`url(#waveGrad1-${team.id})`}
          />
          <path
            d="M-50,410 Q125,470 200,410 T450,410 L450,500 L-50,500 Z"
            fill={`url(#waveGrad2-${team.id})`}
          />
        </svg>

        {/* IPL Auction Badge - Top Right */}
        <div className="absolute top-4 right-4 z-20">
          <div 
            className="px-3 py-1.5 rounded-lg border"
            style={{ 
              background: 'rgba(255,255,255,0.08)',
              borderColor: 'rgba(255,255,255,0.15)',
              backdropFilter: 'blur(8px)'
            }}
          >
            <div className="flex items-center gap-1">
              <span className="text-[9px] font-semibold text-white/50 tracking-wider">TATA</span>
              <span 
                className="font-display font-bold text-lg tracking-tight"
                style={{ color: team.primaryColor }}
              >
                IPL
              </span>
            </div>
            <div className="text-[7px] text-white/40 text-center tracking-[0.2em] -mt-0.5">AUCTION</div>
          </div>
        </div>

        {/* Glow Effect Behind Player */}
        <div 
          className="absolute top-[6%] left-1/2 -translate-x-1/2 w-48 h-48 rounded-full blur-3xl opacity-30"
          style={{ background: team.primaryColor }}
        />

        {/* Player Image Container */}
        <div className="absolute top-[8%] left-1/2 -translate-x-1/2 z-10">
          <div className="relative">
            {/* Outer Ring */}
            <div 
              className="absolute -inset-2 rounded-full opacity-40"
              style={{
                border: `2px solid ${team.primaryColor}`,
              }}
            />
            
            {/* Main Circle */}
            <div 
              className="relative w-32 h-32 rounded-full overflow-hidden"
              style={{
                border: `4px solid ${team.primaryColor}`,
                boxShadow: `0 0 40px ${team.primaryColor}50, inset 0 0 30px ${team.primaryColor}20`,
              }}
            >
              <div 
                className="w-full h-full flex items-center justify-center"
                style={{ 
                  background: `linear-gradient(180deg, ${team.primaryColor}40 0%, ${team.gradientTo}60 100%)`,
                }}
              >
                <span 
                  className="font-display text-4xl font-bold tracking-tight"
                  style={{ color: team.textColor }}
                >
                  {player.firstName.charAt(0)}{player.surname.charAt(0)}
                </span>
              </div>
            </div>

            {/* Country Badge */}
            <div 
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full font-bold text-[10px] tracking-wider whitespace-nowrap"
              style={{ 
                background: team.primaryColor,
                color: team.textColor,
                boxShadow: `0 4px 15px ${team.primaryColor}60`
              }}
            >
              {player.country.toUpperCase()}
            </div>
          </div>
        </div>

        {/* Player Name */}
        <div className="absolute top-[38%] left-1/2 -translate-x-1/2 text-center z-10 w-full px-4">
          <h2 
            className="font-display text-3xl font-bold tracking-wide uppercase leading-tight"
            style={{ 
              color: '#FFFFFF',
              textShadow: `0 0 40px ${team.primaryColor}80, 0 2px 4px rgba(0,0,0,0.5)` 
            }}
          >
            {player.firstName}
          </h2>
          <h3 
            className="font-display text-xl font-semibold tracking-[0.12em] uppercase mt-0.5 leading-tight"
            style={{ color: 'rgba(255,255,255,0.7)' }}
          >
            {player.surname}
          </h3>
        </div>

        {/* Sold To Section */}
        <div className="absolute top-[52%] left-1/2 -translate-x-1/2 z-10 w-full">
          <div className="flex flex-col items-center gap-1.5">
            {/* SOLD TO Label */}
            <div 
              className="px-6 py-1 font-display text-xs font-bold tracking-[0.25em]"
              style={{ 
                background: `linear-gradient(90deg, transparent, ${team.primaryColor}30, transparent)`,
                color: 'rgba(255,255,255,0.8)'
              }}
            >
              SOLD TO
            </div>
            
            {/* Team Name and Logo */}
            <div className="flex items-center gap-2 mt-1">
              {!logoError && (
                <img 
                  src={team.logoUrl} 
                  alt={team.name}
                  className="w-8 h-8 object-contain"
                  onError={() => setLogoError(true)}
                />
              )}
              <div 
                className="font-display text-lg font-bold uppercase tracking-wide text-center"
                style={{ color: team.primaryColor }}
              >
                {team.name}
              </div>
            </div>
          </div>
        </div>

        {/* Price Tag */}
        <div className="absolute top-[68%] left-1/2 -translate-x-1/2 z-10">
          <div 
            className="px-10 py-3 rounded-xl"
            style={{
              background: `linear-gradient(135deg, ${team.primaryColor}, ${team.gradientTo})`,
              boxShadow: `0 12px 40px ${team.primaryColor}50`,
            }}
          >
            <div className="flex items-baseline justify-center gap-1">
              <span 
                className="text-xl font-bold"
                style={{ color: team.textColor }}
              >
                ₹
              </span>
              <span 
                className="font-display text-4xl font-bold tracking-tight"
                style={{ color: team.textColor }}
              >
                {displayPrice}
              </span>
              {priceUnit && (
                <span 
                  className="text-xl font-bold ml-1"
                  style={{ color: team.textColor }}
                >
                  {priceUnit}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Branding */}
        <div className="absolute bottom-3 left-4 right-4 flex justify-end items-center z-10">
          <span className="text-[9px] text-white/30 font-semibold tracking-wider">#TATAIPLAuction</span>
        </div>
      </div>
    );
  }
);

AuctionPostPreview.displayName = "AuctionPostPreview";
