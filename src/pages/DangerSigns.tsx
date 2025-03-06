
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
                </div>
                <div 
                  className="relative aspect-square cursor-pointer group"
                  onClick={() => handleImageClick(index)}
                >
                  <img
                    src={sign.image}
                    alt={sign.title}
                    className="w-full h-full object-cover rounded-lg transition-transform hover:scale-[1.02]"
                  />
                  {currentlyPlayingIndex === index && isPlaying && (
                    <div className="absolute top-2 right-2 bg-white/90 p-2 rounded-full">
                      <Volume2 className="h-4 w-4 text-primary animate-pulse" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-black/10 transition-colors rounded-lg flex items-center justify-center">
                    {!(currentlyPlayingIndex === index && isPlaying) && (
                      <div className="bg-white/90 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                        <Play className="h-4 w-4 text-primary" />
                      </div>
                    )}
                  </div>
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
