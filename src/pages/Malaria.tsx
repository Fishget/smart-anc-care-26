import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import PageNavigation from "@/components/PageNavigation";
import { 
  Bug, 
  Shield, 
  Thermometer, 
  CheckSquare, 
  Calendar,
  Info,
  MapPin,
  Play,
  Pause,
  Volume2,
  VolumeX,
  ChevronRight,
  ArrowRight
} from "lucide-react";

interface MalariaSection {
  id: string;
  title: string;
  icon: JSX.Element;
  content: string;
  audioContent: string;
  checklist?: string[];
  symptoms?: string[];
  image?: string;
}

const malariaSections: MalariaSection[] = [
  {
    id: "overview",
    title: "What is Malaria?",
    icon: <Info className="h-5 w-5" />,
    content: "Malaria is a life-threatening disease spread to humans by certain types of mosquitoes. When you are pregnant, you are at higher risk of severe infection. Malaria can increase the risk of early delivery, miscarriage, or stillbirth.",
    audioContent: "Malaria is a serious disease that can affect pregnant women more severely. It's important to understand the risks and take preventive measures.",
    symptoms: [
      "High fever",
      "Headaches",
      "Muscle aches",
      "Stomach pains",
      "Chills and shivering"
    ]
  },
  {
    id: "prevention",
    title: "Prevention Methods",
    icon: <Shield className="h-5 w-5" />,
    content: "One of the best ways to prevent malaria is to sleep under a long-lasting insecticide treated net (LLIN). These nets provide dual protection: physical barrier and insecticide coating that kills mosquitoes.",
    audioContent: "Using an insecticide-treated bed net is crucial for preventing malaria. Make sure to use it every night.",
    checklist: [
      "Sleep under LLIN every night",
      "Ensure net is properly installed",
      "Keep net in good condition",
      "Replace damaged nets",
      "Use net even during daytime naps"
    ]
  },
  {
    id: "symptoms",
    title: "Symptoms & Action",
    icon: <Thermometer className="h-5 w-5" />,
    content: "If you experience any malaria symptoms, it's crucial to seek medical attention immediately. Early treatment is essential for protecting both you and your baby.",
    audioContent: "Know the warning signs of malaria and seek help immediately if you experience any symptoms.",
    symptoms: [
      "High fever",
      "Severe headaches",
      "Body aches and chills",
      "Fatigue and weakness",
      "Nausea and vomiting"
    ]
  },
  {
    id: "treatment",
    title: "Preventive Treatment",
    icon: <CheckSquare className="h-5 w-5" />,
    content: "Starting in the 4th month of pregnancy, you'll receive preventive medicine against malaria. This treatment happens at least three times, with one month between doses.",
    audioContent: "Preventive malaria treatment is essential during pregnancy. Make sure to attend all your scheduled appointments.",
    checklist: [
      "Start treatment at 4 months",
      "Complete all three doses",
      "Maintain one month gap between doses",
      "Attend all ANC visits",
      "Report any side effects"
    ]
  },
  {
    id: "resources",
    title: "Local Resources",
    icon: <MapPin className="h-5 w-5" />,
    content: "If you don't have a mosquito net, we can help you find one. Many health facilities and community programs provide free or subsidized LLINs for pregnant women.",
    audioContent: "Ask your healthcare provider about getting a mosquito net if you don't have one. Many facilities provide them for free.",
    checklist: [
      "Ask about free LLIN programs",
      "Register for distribution events",
      "Check community resources",
      "Maintain contact with CHWs",
      "Keep facility contact numbers"
    ]
  }
];

const Malaria = () => {
  const [activeSection, setActiveSection] = useState<string>("overview");
  const [currentStep, setCurrentStep] = useState(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  const handleNextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(prev => prev + 1);
      toast.success("Great job! Moving to next step.");
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const steps = [
    {
      title: "Understanding Malaria",
      content: "Learn about what malaria is and how it affects pregnant women.",
      action: "Click next to learn about prevention methods"
    },
    {
      title: "Prevention Methods",
      content: "Use insecticide-treated bed nets and keep your environment clean.",
      action: "Complete the prevention checklist"
    },
    {
      title: "Symptoms Recognition",
      content: "Know the warning signs of malaria infection.",
      action: "Practice identifying symptoms"
    },
    {
      title: "Treatment Guidelines",
      content: "Learn about safe malaria treatment during pregnancy.",
      action: "Review treatment options"
    },
    {
      title: "Follow-up Care",
      content: "Understand the importance of regular check-ups.",
      action: "Schedule your next visit"
    }
  ];

  const currentSection = malariaSections.find(section => section.id === activeSection);

  const handlePlayAudio = () => {
    setIsPlaying(!isPlaying);
    toast.info("Audio guide will be available soon!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-muted p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-semibold text-foreground text-center mb-8 animate-fade-in flex items-center justify-center gap-2">
          <Bug className="h-6 w-6" />
          Malaria Prevention During Pregnancy
        </h1>

        <Card className="p-6">
          <div className="space-y-6">
            <div className="bg-primary/5 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium">Interactive Guide: Step {currentStep} of 5</h2>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handlePrevStep}
                    disabled={currentStep === 1}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="default"
                    size="sm"
                    onClick={handleNextStep}
                    disabled={currentStep === 5}
                  >
                    Next <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="mt-4">
                <h3 className="font-medium text-lg">{steps[currentStep - 1].title}</h3>
                <p className="text-muted-foreground mt-2">{steps[currentStep - 1].content}</p>
                <p className="text-sm text-primary mt-4 flex items-center gap-2">
                  <ChevronRight className="h-4 w-4" />
                  {steps[currentStep - 1].action}
                </p>
              </div>
            </div>

            <Tabs defaultValue="overview" value={activeSection} onValueChange={setActiveSection}>
              <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-2">
                {malariaSections.map((section) => (
                  <TabsTrigger
                    key={section.id}
                    value={section.id}
                    className="flex items-center gap-2 transition-all hover:scale-105"
                  >
                    {section.icon}
                    <span className="hidden md:inline">{section.title}</span>
                  </TabsTrigger>
                ))}
              </TabsList>

              <ScrollArea className="h-[600px] rounded-md border p-4 mt-6">
                {malariaSections.map((section) => (
                  <TabsContent 
                    key={section.id} 
                    value={section.id}
                    className="space-y-6 animate-fade-in"
                  >
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h2 className="text-2xl font-semibold text-foreground flex items-center gap-2">
                          {section.icon}
                          {section.title}
                        </h2>
                        <p className="text-foreground/80 leading-relaxed">
                          {section.content}
                        </p>

                        {section.symptoms && (
                          <div className="bg-red-50 p-4 rounded-lg space-y-2">
                            <h3 className="font-medium text-red-700 flex items-center gap-2">
                              <Thermometer className="h-4 w-4" />
                              Warning Signs:
                            </h3>
                            <ul className="list-disc list-inside space-y-1">
                              {section.symptoms.map((symptom, index) => (
                                <li 
                                  key={index} 
                                  className="text-red-600/80 text-sm animate-fade-in"
                                  style={{ animationDelay: `${index * 100}ms` }}
                                >
                                  {symptom}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {section.checklist && (
                          <div className="bg-green-50 p-4 rounded-lg space-y-2">
                            <h3 className="font-medium text-green-700 flex items-center gap-2">
                              <CheckSquare className="h-4 w-4" />
                              Action Items:
                            </h3>
                            <ul className="list-disc list-inside space-y-1">
                              {section.checklist.map((item, index) => (
                                <li 
                                  key={index} 
                                  className="text-green-600/80 text-sm animate-fade-in"
                                  style={{ animationDelay: `${index * 100}ms` }}
                                >
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        <div className="flex gap-2">
                          <Button 
                            variant="outline"
                            className="flex-1 transition-all hover:scale-105"
                            onClick={handlePlayAudio}
                          >
                            {isPlaying ? (
                              <Pause className="mr-2 h-4 w-4" />
                            ) : (
                              <Play className="mr-2 h-4 w-4" />
                            )}
                            {isPlaying ? "Pause Audio Guide" : "Play Audio Guide"}
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setIsMuted(!isMuted)}
                            className="transition-all hover:scale-105"
                          >
                            {isMuted ? (
                              <VolumeX className="h-4 w-4" />
                            ) : (
                              <Volume2 className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </div>

                      <div className="aspect-square bg-primary/5 rounded-lg overflow-hidden hover:shadow-lg transition-all">
                        <img
                          src="/lovable-uploads/70f05d9b-971b-46a3-9ff5-7b0f58674249.png"
                          alt={`${section.title} illustration`}
                          className="w-full h-full object-cover transition-transform hover:scale-105"
                        />
                      </div>
                    </div>
                  </TabsContent>
                ))}
              </ScrollArea>
            </Tabs>
          </div>
        </Card>

        <PageNavigation prevPath="/lifestyle" nextPath="/birth-prep" />
      </div>
    </div>
  );
};

export default Malaria;
