import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, RefreshCw, Sparkles, Zap } from "lucide-react";
import { toast } from "sonner";
import html2canvas from "html2canvas";

import { PlayerSearch } from "@/components/PlayerSearch";
import { TeamSelector } from "@/components/TeamSelector";
import { PriceInput } from "@/components/PriceInput";
import { AuctionPostPreview } from "@/components/AuctionPostPreview";
import { Player } from "@/data/auctionPlayers";
import { Team } from "@/data/teamData";

const Index = () => {
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [price, setPrice] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!previewRef.current || !selectedPlayer || !selectedTeam) {
      toast.error("Please select a player, team, and enter price first");
      return;
    }

    setIsGenerating(true);
    toast.loading("Generating your post...", { id: "generating" });

    try {
      const canvas = await html2canvas(previewRef.current, {
        scale: 2,
        backgroundColor: null,
        useCORS: true,
        allowTaint: true,
      });

      const link = document.createElement("a");
      link.download = `${selectedPlayer.fullName.replace(/\s+/g, "_")}_${selectedTeam.shortName}_auction.jpg`;
      link.href = canvas.toDataURL("image/jpeg", 0.95);
      link.click();

      toast.success("Post downloaded successfully!", { id: "generating" });
    } catch (error) {
      console.error("Error generating image:", error);
      toast.error("Failed to generate post. Please try again.", { id: "generating" });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleReset = () => {
    setSelectedPlayer(null);
    setSelectedTeam(null);
    setPrice("");
    toast.info("Form reset successfully");
  };

  const isFormComplete = selectedPlayer && selectedTeam && price;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-orange-500 flex items-center justify-center">
                <Zap className="h-5 w-5 text-accent-foreground" />
              </div>
              <div>
                <h1 className="font-display text-xl font-bold tracking-wide">
                  IPL AUCTION <span className="text-accent">POST GENERATOR</span>
                </h1>
                <p className="text-xs text-muted-foreground">Create stunning auction graphics instantly</p>
              </div>
            </div>
            <Badge variant="outline" className="bg-accent/10 text-accent border-accent/30">
              <Sparkles className="h-3 w-3 mr-1" />
              TATA IPL 2026
            </Badge>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Panel - Form */}
          <div className="space-y-6">
            {/* Step 1: Select Player */}
            <Card className="p-6 bg-card/50 border-border/50">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-sm font-bold text-primary">1</span>
                </div>
                <h2 className="font-display text-lg font-semibold">SELECT PLAYER</h2>
                {selectedPlayer && (
                  <Badge className="ml-auto bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                    {selectedPlayer.fullName}
                  </Badge>
                )}
              </div>
              <PlayerSearch
                onSelectPlayer={setSelectedPlayer}
                selectedPlayer={selectedPlayer}
              />
            </Card>

            {/* Step 2: Select Team */}
            <Card className="p-6 bg-card/50 border-border/50">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-sm font-bold text-primary">2</span>
                </div>
                <h2 className="font-display text-lg font-semibold">SELECT TEAM</h2>
                {selectedTeam && (
                  <Badge 
                    className="ml-auto border"
                    style={{ 
                      backgroundColor: `${selectedTeam.primaryColor}20`,
                      color: selectedTeam.primaryColor,
                      borderColor: `${selectedTeam.primaryColor}50`
                    }}
                  >
                    {selectedTeam.name}
                  </Badge>
                )}
              </div>
              <TeamSelector
                onSelectTeam={setSelectedTeam}
                selectedTeam={selectedTeam}
              />
            </Card>

            {/* Step 3: Enter Price */}
            <Card className="p-6 bg-card/50 border-border/50">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-sm font-bold text-primary">3</span>
                </div>
                <h2 className="font-display text-lg font-semibold">ENTER PRICE</h2>
                {price && (
                  <Badge className="ml-auto bg-accent/20 text-accent border-accent/30">
                    ₹{price} Crore
                  </Badge>
                )}
              </div>
              <PriceInput value={price} onChange={setPrice} />
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button
                variant="outline"
                className="flex-1 h-12 border-border/50"
                onClick={handleReset}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Reset
              </Button>
              <Button
                className="flex-1 h-12 bg-gradient-to-r from-accent to-orange-500 hover:from-accent/90 hover:to-orange-500/90 text-accent-foreground font-bold"
                onClick={handleDownload}
                disabled={!isFormComplete || isGenerating}
              >
                <Download className="h-4 w-4 mr-2" />
                {isGenerating ? "Generating..." : "Download Post"}
              </Button>
            </div>
          </div>

          {/* Right Panel - Preview */}
          <div className="lg:sticky lg:top-24 h-fit space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold text-muted-foreground">
                LIVE PREVIEW
              </h2>
              {isFormComplete && (
                <Badge variant="outline" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/30">
                  Ready to export
                </Badge>
              )}
            </div>
            <div className="bg-card/30 rounded-2xl p-4 border border-border/50">
              <AuctionPostPreview
                ref={previewRef}
                player={selectedPlayer}
                team={selectedTeam}
                price={price}
              />
            </div>
            <p className="text-xs text-center text-muted-foreground">
              Preview updates in real-time as you make selections
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 py-6 mt-12">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>Made for IPL Cricket Content Creators • Not affiliated with IPL or BCCI</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
