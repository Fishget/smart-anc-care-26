import { useState } from "react";
import { Card } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import PageNavigation from "@/components/PageNavigation";
import { Button } from "@/components/ui/button";

interface DangerSign {
  title: string;
  description: string;
  coords: { x: number; y: number };
  timing: "all" | "early" | "late";
  video?: string;
  popupContent?: string;
}

const dangerSigns: DangerSign[] = [
  {
    title: "Abdominal Cramps",
    description: "Severe abdominal pain or cramps could be a sign of complications. Visit the health facility immediately.",
    coords: { x: 15, y: 30 },
    timing: "all"
  },
  {
    title: "Convulsions/Fits",
    description: "If you experience any convulsions or fits, this is a serious emergency. Seek medical help immediately.",
    coords: { x: 30, y: 45 },
    timing: "late"
  },
  {
    title: "Swollen Feet",
    description: "Significant swelling in feet and legs could indicate a serious condition. Should be evaluated by healthcare provider.",
    coords: { x: 15, y: 75 },
    timing: "all"
  },
  {
    title: "Fever and Fatigue",
    description: "High fever with extreme fatigue could indicate infection. Requires immediate medical attention.",
    coords: { x: 45, y: 60 },
    timing: "all"
  },
  {
    title: "Vaginal Bleeding",
    description: "Any vaginal bleeding during pregnancy should be evaluated immediately. In early pregnancy, it could indicate miscarriage risk.",
    coords: { x: 60, y: 40 },
    timing: "all",
    popupContent: "Seek immediate care if you experience:\n- Any amount of vaginal bleeding\n- Cramping with bleeding\n- Passing tissue"
  },
  {
    title: "Severe Headache and Blurred Vision",
    description: "Persistent headache with visual changes could indicate high blood pressure. Seek immediate medical attention.",
    coords: { x: 75, y: 55 },
    timing: "late",
    popupContent: "Warning signs of preeclampsia include:\n- Severe headaches\n- Vision changes\n- Upper abdominal pain\n- Rapid swelling",
    video: "https://www.youtube.com/embed/your_video_id_here"
  }
];

const DangerSigns = () => {
  const [activeSign, setActiveSign] = useState<string | null>(null);
  const [showVideo, setShowVideo] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-muted p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-semibold text-foreground text-center mb-8">
          Pregnancy Danger Signs
        </h1>

        <Card className="p-6">
          <div className="space-y-6">
            <p className="text-foreground/80">
              During pregnancy, it's important to be aware of warning signs that require immediate medical attention. 
              Click on different areas of the image to learn more about each danger sign.
            </p>

            <div className="relative w-full aspect-[16/9] bg-primary/5 rounded-lg overflow-hidden">
              <img
                src="/lovable-uploads/6c63e382-eaa9-4ce3-ae53-243fd8e6bccf.png"
                alt="Pregnancy danger signs illustration"
                className="w-full h-full object-contain"
              />
              
              {dangerSigns.map((sign) => (
                <Dialog key={sign.title}>
                  <DialogTrigger asChild>
                    <button
                      className={`absolute w-12 h-12 rounded-full transition-all 
                        ${activeSign === sign.title 
                          ? 'bg-destructive/20 ring-4 ring-destructive' 
                          : 'bg-destructive/10 hover:bg-destructive/20'}`}
                      style={{
                        left: `${sign.coords.x}%`,
                        top: `${sign.coords.y}%`,
                        transform: 'translate(-50%, -50%)'
                      }}
                      onClick={() => setActiveSign(sign.title)}
                    >
                      <span className="sr-only">{sign.title}</span>
                    </button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                      <DialogTitle className="text-xl text-destructive">
                        {sign.title}
                      </DialogTitle>
                    </DialogHeader>
                    <div className="mt-4 space-y-4">
                      <p className="text-foreground/80">{sign.description}</p>
                      {sign.popupContent && (
                        <div className="bg-destructive/5 p-4 rounded-lg">
                          <pre className="whitespace-pre-wrap text-sm text-destructive/80">
                            {sign.popupContent}
                          </pre>
                        </div>
                      )}
                      {sign.video && (
                        <div className="aspect-video mt-4">
                          <iframe
                            width="100%"
                            height="100%"
                            src={sign.video}
                            title={`Video about ${sign.title}`}
                            allowFullScreen
                            className="rounded-lg"
                          />
                        </div>
                      )}
                    </div>
                  </DialogContent>
                </Dialog>
              ))}
            </div>
          </div>
        </Card>

        <PageNavigation prevPath="/development" nextPath="/lifestyle" />
      </div>
    </div>
  );
};

export default DangerSigns;
