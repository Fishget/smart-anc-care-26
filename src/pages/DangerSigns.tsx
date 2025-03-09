
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Volume2, VolumeX, Play, Pause, Info, Film } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageNavigation from "@/components/PageNavigation";
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
  },
  {
    title: "Reduced Fetal Movement",
    description: "If you notice a significant decrease in your baby's movements, contact your healthcare provider.",
    contentType: "audio",
    content: "A reduction in your baby's movements can be concerning. Most pregnant women feel their baby's first movements between 16-25 weeks, and movements typically increase until 32 weeks. If you notice a significant decrease or absence of movement, especially after 28 weeks, contact your healthcare provider immediately.",
    image: "/lovable-uploads/11e96e9b-9b84-488d-8290-547e0f91278d.png"
  },
  {
    title: "Fever & Chills",
    description: "High fever during pregnancy may indicate an infection that could affect your baby.",
    contentType: "text",
    content: "A fever during pregnancy (temperature above 100.4°F or 38°C) shouldn't be ignored. It could indicate an infection that may affect your baby. Contact your healthcare provider immediately, especially if accompanied by chills, body aches, or unusual fatigue. While many infections during pregnancy are manageable, prompt treatment is essential to prevent complications.",
    image: "/lovable-uploads/13b0c1b2-6429-4af2-bd29-bab595918deb.png"
  },
  {
    title: "Swelling",
    description: "Sudden or severe swelling in your face, hands, or feet may indicate preeclampsia.",
    contentType: "video",
    content: "This would be a video explaining concerning types of swelling during pregnancy and preeclampsia warning signs.",
    image: "/lovable-uploads/48ac85e6-e6e7-49df-9b4e-3e46162771a9.png"
  }
];

// Define hotspot areas on the image with color coding - more subtle colors
const hotspots = [
  { title: "Headache", left: "10%", top: "35%", signIndex: 0, color: "rgba(139, 92, 246, 0.7)", number: 1 }, // Purple
  { title: "Vaginal Bleeding", left: "50%", top: "30%", signIndex: 1, color: "rgba(249, 115, 22, 0.7)", number: 2 }, // Orange
  { title: "Abdominal Pain", left: "30%", top: "60%", signIndex: 2, color: "rgba(14, 165, 233, 0.7)", number: 3 }, // Blue
  { title: "Reduced Movement", left: "60%", top: "55%", signIndex: 3, color: "rgba(217, 70, 239, 0.7)", number: 4 }, // Magenta 
  { title: "Fever & Chills", left: "70%", top: "38%", signIndex: 4, color: "rgba(234, 88, 12, 0.7)", number: 5 }, // Burnt Orange
  { title: "Swelling", left: "25%", top: "80%", signIndex: 5, color: "rgba(5, 150, 105, 0.7)", number: 6 }, // Teal
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
          
          {/* Interactive hotspots on the image - more subtle styling */}
          <TooltipProvider>
            {hotspots.map((hotspot, index) => (
              <Tooltip key={index}>
                <TooltipTrigger asChild>
                  <div 
                    className="absolute cursor-pointer transition-all duration-300 hover:scale-105 flex items-center justify-center"
                    style={{ 
                      left: hotspot.left, 
                      top: hotspot.top,
                      width: "10%",
                      height: "12%",
                      border: `2px solid ${hotspot.color}`,
                      borderRadius: "50%",
                      backgroundColor: `${hotspot.color}40`, // Adding 40 for 25% opacity
                      boxShadow: `0 0 10px ${hotspot.color}`,
                      transform: "translate(-50%, -50%)"
                    }}
                    onClick={() => handleImageClick(hotspot.signIndex)}
                  >
                    {/* More subtle numbered indicator */}
                    <div className="font-bold text-white rounded-full w-6 h-6 flex items-center justify-center text-sm" 
                         style={{ backgroundColor: hotspot.color }}>
                      {hotspot.number}
                    </div>
                    
                    {currentlyPlayingIndex === hotspot.signIndex && isPlaying && (
                      <div className="absolute -top-3 -right-3 bg-white/80 p-1 rounded-full">
                        <Volume2 className="h-3 w-3 text-primary animate-pulse" />
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

        <div className="flex flex-wrap justify-center gap-4 mt-4">
          {hotspots.map((hotspot, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: hotspot.color }}></div>
              <span className="text-xs font-medium">{hotspot.number}. {hotspot.title}</span>
            </div>
          ))}
        </div>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="sm:max-w-md">
            {renderDialogContent()}
          </DialogContent>
        </Dialog>

        <PageNavigation prevPath="/development" nextPath="/lifestyle" />
      </div>
    </div>
  );
};

export default DangerSigns;
