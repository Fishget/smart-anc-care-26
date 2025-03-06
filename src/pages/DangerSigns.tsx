
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import PageNavigation from "@/components/PageNavigation";
import { Volume2, VolumeX, Play, Pause } from "lucide-react";
import { toast } from "sonner";

interface DangerSign {
  title: string;
  description: string;
  audioContent: string;
  image: string;
}

const dangerSigns: DangerSign[] = [
  {
    title: "Severe Headache",
    description: "If you experience persistent, severe headaches, especially with vision changes, this could indicate high blood pressure.",
    audioContent: "A severe headache during pregnancy, especially when accompanied by vision changes, could be a sign of preeclampsia. Seek medical attention immediately.",
    image: "/lovable-uploads/492d75b4-1351-446d-9c80-2ac3eec03f05.png"
  },
  {
    title: "Vaginal Bleeding",
    description: "Any vaginal bleeding during pregnancy requires immediate medical attention.",
    audioContent: "Any amount of vaginal bleeding during pregnancy is not normal and requires immediate medical attention. Don't wait - contact your healthcare provider right away.",
    image: "/lovable-uploads/4fec9484-8331-4c26-9ea5-bdcb8d88a6dc.png"
  },
  {
    title: "Severe Abdominal Pain",
    description: "Sharp or severe abdominal pain could indicate serious complications.",
    audioContent: "If you experience sharp or severe abdominal pain during pregnancy, don't ignore it. This could indicate serious complications that need immediate medical attention.",
    image: "/lovable-uploads/6c63e382-eaa9-4ce3-ae53-243fd8e6bccf.png"
  }
];

const DangerSigns = () => {
  const [audio] = useState(new Audio());
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentlyPlayingIndex, setCurrentlyPlayingIndex] = useState<number | null>(null);

  const handleImageClick = async (index: number) => {
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
        toast.info(dangerSigns[index].audioContent);
        setIsPlaying(true);
        setCurrentlyPlayingIndex(index);
      }
    } catch (error) {
      toast.error("Failed to play audio");
      setIsPlaying(false);
      setCurrentlyPlayingIndex(null);
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
          <div className="absolute left-[12%] top-[35%] w-[12%] h-[15%] cursor-pointer rounded-full hover:bg-white/20 transition-colors" 
               onClick={() => handleImageClick(0)}>
            {currentlyPlayingIndex === 0 && isPlaying && (
              <div className="absolute -top-4 -right-4 bg-white/90 p-2 rounded-full">
                <Volume2 className="h-4 w-4 text-primary animate-pulse" />
              </div>
            )}
          </div>
          
          <div className="absolute left-[50%] top-[30%] w-[12%] h-[15%] cursor-pointer rounded-full hover:bg-white/20 transition-colors" 
               onClick={() => handleImageClick(1)}>
            {currentlyPlayingIndex === 1 && isPlaying && (
              <div className="absolute -top-4 -right-4 bg-white/90 p-2 rounded-full">
                <Volume2 className="h-4 w-4 text-primary animate-pulse" />
              </div>
            )}
          </div>
          
          <div className="absolute left-[30%] top-[60%] w-[12%] h-[15%] cursor-pointer rounded-full hover:bg-white/20 transition-colors" 
               onClick={() => handleImageClick(2)}>
            {currentlyPlayingIndex === 2 && isPlaying && (
              <div className="absolute -top-4 -right-4 bg-white/90 p-2 rounded-full">
                <Volume2 className="h-4 w-4 text-primary animate-pulse" />
              </div>
            )}
          </div>
        </div>

        <div className="grid gap-6 mt-8">
          {dangerSigns.map((sign, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-foreground">{sign.title}</h2>
                <p className="text-muted-foreground mt-2">{sign.description}</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-4"
                  onClick={() => handleImageClick(index)}
                >
                  {currentlyPlayingIndex === index && isPlaying ? (
                    <>
                      <Pause className="mr-2 h-4 w-4" /> Pause Audio
                    </>
                  ) : (
                    <>
                      <Play className="mr-2 h-4 w-4" /> Play Audio
                    </>
                  )}
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
