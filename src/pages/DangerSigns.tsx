
import { useState } from "react";
import { Card } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import PageNavigation from "@/components/PageNavigation";

interface DangerSign {
  title: string;
  description: string;
  coords: { x: number; y: number };
  timing: "all" | "early" | "late";
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
    timing: "all"
  },
  {
    title: "Severe Headache and Blurred Vision",
    description: "Persistent headache with visual changes could indicate high blood pressure. Seek immediate medical attention.",
    coords: { x: 75, y: 55 },
    timing: "late"
  }
];

const DangerSigns = () => {
  const [activeSign, setActiveSign] = useState<string | null>(null);

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
                <Tooltip key={sign.title}>
                  <TooltipTrigger asChild>
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
                  </TooltipTrigger>
                  <TooltipContent 
                    className="max-w-xs p-4 bg-white shadow-xl"
                    side="right"
                  >
                    <h3 className="font-semibold text-foreground mb-2">{sign.title}</h3>
                    <p className="text-sm text-foreground/80">{sign.description}</p>
                    <p className="text-xs text-destructive mt-2">
                      {sign.timing === "all" 
                        ? "Watch for this throughout pregnancy"
                        : sign.timing === "early"
                        ? "Important in early pregnancy"
                        : "Critical in late pregnancy"}
                    </p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>

            <div className="bg-secondary/5 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-destructive mb-2">
                Important Note
              </h3>
              <p className="text-foreground/80">
                If you experience any of these symptoms, visit your healthcare facility immediately. 
                Early detection and treatment of complications is crucial for both mother and baby's health.
              </p>
            </div>
          </div>
        </Card>

        <PageNavigation prevPath="/development" nextPath="/lifestyle" />
      </div>
    </div>
  );
};

export default DangerSigns;
