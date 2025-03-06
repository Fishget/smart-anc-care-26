
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import PageNavigation from "@/components/PageNavigation";
import { Volume2, VolumeX, Play, Pause, Info, Film } from "lucide-react";
import { toast } from "sonner";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface DangerSign {
  title: string;
  description: string;
  contentType: "text" | "audio" | "video";
  content: string;
  image: string;
}

const dangerSigns: DangerSign[] = [
  {
    title: "Severe Headache",
    description: "If you experience persistent, severe headaches, especially with vision changes, this could indicate high blood pressure.",
    contentType: "audio",
    content: "A severe headache during pregnancy, especially when accompanied by vision changes, could be a sign of preeclampsia. Seek medical attention immediately.",
    image: "/lovable-uploads/492d75b4-1351-446d-9c80-2ac3eec03f05.png"
  },
  {
    title: "Vaginal Bleeding",
    description: "Any vaginal bleeding during pregnancy requires immediate medical attention.",
    contentType: "text",
    content: "Vaginal bleeding during pregnancy can indicate various conditions, from relatively minor issues to serious complications like placenta previa or placental abruption. No matter the amount, bleeding should prompt an immediate call to your healthcare provider. Don't wait to see if it stops on its own, and note details about the amount, color, and any accompanying symptoms to share with your doctor.",
    image: "/lovable-uploads/4fec9484-8331-4c26-9ea5-bdcb8d88a6dc.png"
  },
  {
    title: "Severe Abdominal Pain",
    description: "Sharp or severe abdominal pain could indicate serious complications.",
    contentType: "video",
    content: "This would be a video explaining abdominal pain during pregnancy and when to seek help.",
    image: "/lovable-uploads/6c63e382-eaa9-4ce3-ae53-243fd8e6bccf.png"
  }
];

// Define hotspot areas on the image with color coding
const hotspots = [
  { title: "Headache", left: "12%", top: "35%", signIndex: 0, color: "#8B5CF6", number: 1 }, // Purple
  { title: "Vaginal Bleeding", left: "50%", top: "30%", signIndex: 1, color: "#F97316", number: 2 }, // Orange
  { title: "Abdominal Pain", left: "30%", top: "60%", signIndex: 2, color: "#0EA5E9", number: 3 }, // Blue
];

const DangerSigns = () => {
  const [audio] = useState(new Audio());
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentlyPlayingIndex, setCurrentlyPlayingIndex] = useState<number | null>(null);
  const [selectedSign, setSelectedSign] = useState<number | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleImageClick = async (index: number) => {
    setSelectedSign(index);
    setDialogOpen(true);

    const sign = dangerSigns[index];
    if (sign.contentType === "audio") {
      try {
        if (currentlyPlayingIndex === index && isPlaying) {
          audio.pause();
          setIsPlaying(false);
          setCurrentlyPlayingIndex(null);
        } else {
          if (currentlyPlayingIndex !== null) {
            audio.pause();
          }
          // In a real implementation, we would set audio.src to the actual audio file
          // For now, we'll show a toast message with the audio content
          toast.info(`Playing audio: ${sign.content.substring(0, 50)}...`);
          setIsPlaying(true);
          setCurrentlyPlayingIndex(index);
        }
      } catch (error) {
        toast.error("Failed to play audio");
        setIsPlaying(false);
        setCurrentlyPlayingIndex(null);
      }
    }
  };

  const getContentIcon = (contentType: string) => {
    switch (contentType) {
      case "audio":
        return <Volume2 className="h-4 w-4" />;
      case "video":
        return <Film className="h-4 w-4" />;
      default:
        return <Info className="h-4 w-4" />;
    }
  };

  const renderDialogContent = () => {
    if (selectedSign === null) return null;
    
    const sign = dangerSigns[selectedSign];
    
    switch (sign.contentType) {
      case "audio":
        return (
          <>
            <DialogHeader>
              <DialogTitle>{sign.title}</DialogTitle>
              <DialogDescription>{sign.description}</DialogDescription>
            </DialogHeader>
            <div className="flex items-center gap-4 my-4">
              <Button 
                onClick={() => handleImageClick(selectedSign)}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                {currentlyPlayingIndex === selectedSign && isPlaying ? (
                  <>
                    <Pause className="h-4 w-4" /> Pause Audio
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4" /> Play Audio
                  </>
                )}
              </Button>
              <p className="text-sm text-muted-foreground italic">Click to listen to important information</p>
            </div>
            <p className="text-sm text-muted-foreground">{sign.content}</p>
          </>
        );
      case "video":
        return (
          <>
            <DialogHeader>
              <DialogTitle>{sign.title}</DialogTitle>
              <DialogDescription>{sign.description}</DialogDescription>
            </DialogHeader>
            <div className="my-4 aspect-video bg-slate-200 rounded flex items-center justify-center">
              <Film className="h-12 w-12 text-slate-400" />
              <p className="ml-2 text-slate-500">Video content would play here</p>
            </div>
            <p className="text-sm text-muted-foreground">{sign.content}</p>
          </>
        );
      default: // text
        return (
          <>
            <DialogHeader>
              <DialogTitle>{sign.title}</DialogTitle>
              <DialogDescription>{sign.description}</DialogDescription>
            </DialogHeader>
            <div className="my-4">
              <p className="text-foreground">{sign.content}</p>
            </div>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#FFE5B4] p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        <h1 className="text-3xl font-semibold text-foreground text-center mb-8">
          Danger Signs During Pregnancy
        </h1>

        <div className="relative w-full">
          <img 
            src="/lovable-uploads/727bd5ee-3e0d-4ef5-9ddd-58c1e4f0124f.png" 
            alt="Pregnancy Danger Signs Illustration" 
            className="w-full h-auto rounded-lg shadow-md"
          />
          
          {/* Interactive hotspots on the image */}
          <TooltipProvider>
            {hotspots.map((hotspot, index) => (
              <Tooltip key={index}>
                <TooltipTrigger asChild>
                  <div 
                    className="absolute cursor-pointer transition-all duration-300 animate-pulse hover:animate-none flex items-center justify-center"
                    style={{ 
                      left: hotspot.left, 
                      top: hotspot.top,
                      width: "12%",
                      height: "15%",
                      border: `3px solid ${hotspot.color}`,
                      borderRadius: "50%",
                      backgroundColor: `${hotspot.color}40`, // Adding 40 for 25% opacity
                      boxShadow: `0 0 15px ${hotspot.color}`
                    }}
                    onClick={() => handleImageClick(hotspot.signIndex)}
                  >
                    {/* Numbered indicator */}
                    <div className="font-bold text-white bg-primary-foreground rounded-full w-8 h-8 flex items-center justify-center" 
                         style={{ backgroundColor: hotspot.color }}>
                      {hotspot.number}
                    </div>
                    
                    {currentlyPlayingIndex === hotspot.signIndex && isPlaying && (
                      <div className="absolute -top-4 -right-4 bg-white/90 p-2 rounded-full">
                        <Volume2 className="h-4 w-4 text-primary animate-pulse" />
                      </div>
                    )}
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="font-semibold">{hotspot.number}. {hotspot.title}</p>
                  <p>Click for more info</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </TooltipProvider>
        </div>

        <div className="flex justify-center gap-4 mt-4">
          {hotspots.map((hotspot, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: hotspot.color }}></div>
              <span className="text-sm font-medium">{hotspot.number}. {hotspot.title}</span>
            </div>
          ))}
        </div>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="sm:max-w-md">
            {renderDialogContent()}
          </DialogContent>
        </Dialog>

        <div className="grid gap-6 mt-8">
          {dangerSigns.map((sign, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="p-6">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center text-white font-bold"
                    style={{ backgroundColor: hotspots.find(h => h.signIndex === index)?.color || "#732703" }}>
                    {hotspots.find(h => h.signIndex === index)?.number || index + 1}
                  </div>
                  <h2 className="text-2xl font-semibold text-foreground">{sign.title}</h2>
                </div>
                <p className="text-muted-foreground mt-2">{sign.description}</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-4"
                  onClick={() => handleImageClick(index)}
                  style={{ borderColor: hotspots.find(h => h.signIndex === index)?.color }}
                >
                  <span className="mr-2">{getContentIcon(sign.contentType)}</span>
                  View {sign.contentType.charAt(0).toUpperCase() + sign.contentType.slice(1)} Content
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <PageNavigation prevPath="/development" nextPath="/lifestyle" />
      </div>
    </div>
  );
};

export default DangerSigns;
