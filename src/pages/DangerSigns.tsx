
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
  const [isMuted, setIsMuted] = useState(false);
  const [currentlyPlayingIndex, setCurrentlyPlayingIndex] = useState<number | null>(null);

  const handlePlayPause = async (index: number) => {
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
        // For now, we'll show a toast message
        toast.info("Audio guide will be available soon!");
        setIsPlaying(true);
        setCurrentlyPlayingIndex(index);
      }
    } catch (error) {
      toast.error("Failed to play audio guide");
      setIsPlaying(false);
      setCurrentlyPlayingIndex(null);
    }
  };

  const toggleMute = () => {
    if (audio) {
      audio.muted = !audio.muted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFE5B4] p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-semibold text-foreground text-center mb-8">
          Danger Signs During Pregnancy
        </h1>

        <div className="grid gap-6">
          {dangerSigns.map((sign, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="grid md:grid-cols-2 gap-6 p-6">
                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold text-foreground">{sign.title}</h2>
                  <p className="text-muted-foreground">{sign.description}</p>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline"
                      className="flex-1"
                      onClick={() => handlePlayPause(index)}
                    >
                      {currentlyPlayingIndex === index && isPlaying ? (
                        <Pause className="mr-2 h-4 w-4" />
                      ) : (
                        <Play className="mr-2 h-4 w-4" />
                      )}
                      {currentlyPlayingIndex === index && isPlaying ? 
                        "Pause Audio Guide" : 
                        "Play Audio Guide"
                      }
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={toggleMute}
                      disabled={currentlyPlayingIndex !== index || !isPlaying}
                    >
                      {isMuted ? (
                        <VolumeX className="h-4 w-4" />
                      ) : (
                        <Volume2 className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
                <div className="relative aspect-square">
                  <img
                    src={sign.image}
                    alt={sign.title}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
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
