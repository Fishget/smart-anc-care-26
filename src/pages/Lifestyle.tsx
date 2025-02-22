
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PageNavigation from "@/components/PageNavigation";
import { 
  Heart, 
  BedDouble, 
  Cigarette, 
  Baby, 
  Bath,
  Play,
  Pause 
} from "lucide-react";

interface LifestyleSection {
  id: string;
  title: string;
  icon: JSX.Element;
  content: string;
  audioUrl?: string;
  image?: string;
  tips: string[];
}

const lifestyleSections: LifestyleSection[] = [
  {
    id: "exercise",
    title: "Physical Activity",
    icon: <Heart className="h-5 w-5" />,
    content: "As your body changes to meet your growing baby's needs, it's important to get moderate physical activity every day.",
    tips: [
      "Walk for 30 minutes daily",
      "Do gentle stretching exercises",
      "Stop if you feel uncomfortable",
      "Adjust activities as pregnancy advances",
      "Focus on low-impact exercises"
    ]
  },
  {
    id: "substances",
    title: "Substances to Avoid",
    icon: <Cigarette className="h-5 w-5" />,
    content: "During pregnancy, nearly everything you eat, drink, or are exposed to affects your baby.",
    tips: [
      "Avoid alcohol completely",
      "No smoking or second-hand smoke",
      "Avoid khat and recreational drugs",
      "Be careful with medications",
      "Consult healthcare provider about supplements"
    ]
  },
  {
    id: "rest",
    title: "Rest and Sleep",
    icon: <BedDouble className="h-5 w-5" />,
    content: "When you're pregnant, you need more sleep than usual. However, your sleep might be disrupted or less restful when pregnant.",
    tips: [
      "Take naps during the day",
      "Go for afternoon walks",
      "Avoid caffeine before bedtime",
      "Sleep on your left side after 20 weeks",
      "Create a relaxing bedtime routine"
    ]
  },
  {
    id: "hygiene",
    title: "Hygiene & Sanitation",
    icon: <Bath className="h-5 w-5" />,
    content: "During pregnancy, you should be especially careful about your personal hygiene and sanitation to prevent infections.",
    tips: [
      "Wash hands frequently with soap",
      "Use safe water for drinking and cooking",
      "Keep your body clean",
      "Maintain clean surroundings",
      "Use clean toilets and facilities"
    ]
  },
  {
    id: "anc",
    title: "ANC Visits",
    icon: <Baby className="h-5 w-5" />,
    content: "Regular antenatal care visits are crucial for monitoring your health and your baby's development.",
    tips: [
      "Attend all scheduled appointments",
      "Keep track of your visit dates",
      "Prepare questions beforehand",
      "Follow healthcare provider advice",
      "Bring your health records"
    ]
  }
];

const Lifestyle = () => {
  const [activeSection, setActiveSection] = useState<string>("exercise");
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const currentSection = lifestyleSections.find(section => section.id === activeSection);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-muted p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-semibold text-foreground text-center mb-8">
          Lifestyle Modifications During Pregnancy
        </h1>

        <Card className="p-6">
          <Tabs defaultValue="exercise" value={activeSection} onValueChange={setActiveSection}>
            <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-2">
              {lifestyleSections.map((section) => (
                <TabsTrigger
                  key={section.id}
                  value={section.id}
                  className="flex items-center gap-2"
                >
                  {section.icon}
                  <span className="hidden md:inline">{section.title}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {lifestyleSections.map((section) => (
              <TabsContent key={section.id} value={section.id} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div className="space-y-4">
                    <h2 className="text-2xl font-semibold text-foreground flex items-center gap-2">
                      {section.icon}
                      {section.title}
                    </h2>
                    <p className="text-foreground/80 leading-relaxed">
                      {section.content}
                    </p>

                    <div className="bg-secondary/5 p-4 rounded-lg space-y-2">
                      <h3 className="font-medium text-foreground">Key Tips:</h3>
                      <ul className="list-disc list-inside space-y-1">
                        {section.tips.map((tip, index) => (
                          <li key={index} className="text-foreground/80 text-sm">
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Button 
                      variant="outline"
                      className="w-full mt-4"
                      onClick={() => setIsPlaying(!isPlaying)}
                    >
                      {isPlaying ? (
                        <Pause className="mr-2 h-4 w-4" />
                      ) : (
                        <Play className="mr-2 h-4 w-4" />
                      )}
                      {isPlaying ? "Pause Audio Guide" : "Play Audio Guide"}
                    </Button>
                  </div>

                  <div className="aspect-square bg-primary/5 rounded-lg overflow-hidden">
                    <img
                      src="/lovable-uploads/314ccb3f-8b22-43a4-b4e9-5e2806f06dde.png"
                      alt={`${section.title} illustration`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </Card>

        <PageNavigation prevPath="/danger-signs" nextPath="/summary" />
      </div>
    </div>
  );
};

export default Lifestyle;
