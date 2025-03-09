import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import PageNavigation from "@/components/PageNavigation";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { 
  Heart, 
  BedDouble, 
  Cigarette, 
  Baby, 
  Bath,
  Play,
  Pause,
  Volume2,
  VolumeX
} from "lucide-react";

interface LifestyleSection {
  id: string;
  title: string;
  icon: JSX.Element;
  content: string;
  audioContent: string;
  image?: string;
  tips: string[];
}

interface ANCVisit {
  date: Date;
  note: string;
}

const lifestyleSections: LifestyleSection[] = [
  {
    id: "exercise",
    title: "Physical Activity",
    icon: <Heart className="h-5 w-5" />,
    content: "As your body changes to meet your growing baby's needs, it's important to get moderate physical activity every day. Regular exercise helps prepare you for childbirth and keeps you healthy during pregnancy.",
    audioContent: "During pregnancy, moderate physical activity is essential. You should aim for 30 minutes of daily exercise, such as walking or swimming. Always listen to your body and stop if you feel uncomfortable.",
    tips: [
      "Walk for 30 minutes daily",
      "Do gentle stretching exercises",
      "Stop if you feel uncomfortable",
      "Adjust activities as pregnancy advances",
      "Focus on low-impact exercises",
      "Stay hydrated during exercise",
      "Wear comfortable clothing"
    ]
  },
  {
    id: "substances",
    title: "Substances to Avoid",
    icon: <Cigarette className="h-5 w-5" />,
    content: "During pregnancy, nearly everything you eat, drink, or are exposed to affects your baby. It's crucial to avoid harmful substances that could impact your baby's development.",
    audioContent: "It's important to avoid harmful substances during pregnancy. This includes alcohol, tobacco, and recreational drugs. These can seriously affect your baby's development.",
    tips: [
      "Avoid alcohol completely",
      "No smoking or second-hand smoke",
      "Avoid khat and recreational drugs",
      "Be careful with medications",
      "Consult healthcare provider about supplements",
      "Read labels carefully",
      "Stay away from harmful chemicals"
    ]
  },
  {
    id: "rest",
    title: "Rest and Sleep",
    icon: <BedDouble className="h-5 w-5" />,
    content: "When you're pregnant, you need more sleep than usual. Your sleep patterns might change, and you may need to adjust your routine to ensure you get enough rest.",
    audioContent: "Getting enough rest during pregnancy is crucial. Try to take short naps during the day and establish a regular sleep schedule. After 20 weeks, sleeping on your left side is recommended.",
    tips: [
      "Take naps during the day",
      "Go for afternoon walks",
      "Avoid caffeine before bedtime",
      "Sleep on your left side after 20 weeks",
      "Create a relaxing bedtime routine",
      "Use pregnancy pillows for comfort",
      "Keep your bedroom cool and dark"
    ]
  },
  {
    id: "hygiene",
    title: "Hygiene & Sanitation",
    icon: <Bath className="h-5 w-5" />,
    content: "During pregnancy, maintaining good hygiene is especially important to prevent infections. Proper sanitation helps protect both you and your baby.",
    audioContent: "Good hygiene is essential during pregnancy. Always wash your hands with soap, especially before eating and after using the bathroom. Use clean water for drinking and cooking.",
    tips: [
      "Wash hands frequently with soap",
      "Use safe water for drinking and cooking",
      "Keep your body clean",
      "Maintain clean surroundings",
      "Use clean toilets and facilities",
      "Change clothes regularly",
      "Keep food preparation areas clean"
    ]
  },
  {
    id: "anc",
    title: "ANC Visits",
    icon: <Baby className="h-5 w-5" />,
    content: "Regular antenatal care visits are crucial for monitoring your health and your baby's development. Don't miss your scheduled appointments.",
    audioContent: "Regular antenatal care visits are vital for your health and your baby's development. Make sure to attend all scheduled appointments and keep track of your progress.",
    tips: [
      "Attend all scheduled appointments",
      "Keep track of your visit dates",
      "Prepare questions beforehand",
      "Follow healthcare provider advice",
      "Bring your health records",
      "Report any concerns promptly",
      "Keep emergency contacts handy"
    ]
  }
];

const Lifestyle = () => {
  const [activeSection, setActiveSection] = useState<string>("exercise");
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [audio] = useState(new Audio());
  const [date, setDate] = useState<Date>();
  const [visits, setVisits] = useState<ANCVisit[]>([]);
  const [visitNote, setVisitNote] = useState("");

  const currentSection = lifestyleSections.find(section => section.id === activeSection);

  useEffect(() => {
    return () => {
      audio.pause();
      audio.src = "";
    };
  }, [audio]);

  const handlePlayPause = async () => {
    try {
      if (!isPlaying) {
        toast.info("Audio guide will be available soon!");
        setIsPlaying(true);
      } else {
        audio.pause();
        setIsPlaying(false);
      }
    } catch (error) {
      toast.error("Failed to play audio guide");
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (audio) {
      audio.muted = !audio.muted;
      setIsMuted(!isMuted);
    }
  };

  const addVisit = () => {
    if (!date) {
      toast.error("Please select a date");
      return;
    }
    setVisits([...visits, { date, note: visitNote }]);
    setDate(undefined);
    setVisitNote("");
    toast.success("ANC visit scheduled!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-muted p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-semibold text-foreground text-center mb-8 animate-fade-in">
          Lifestyle Modifications During Pregnancy
        </h1>

        <Card className="p-6">
          <Tabs defaultValue="exercise" value={activeSection} onValueChange={setActiveSection}>
            <TabsList className="grid grid-cols-2 md:grid-cols-6 gap-2">
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
              <TabsTrigger value="scheduler" className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4" />
                <span className="hidden md:inline">Schedule Visit</span>
              </TabsTrigger>
            </TabsList>

            {lifestyleSections.map((section) => (
              <TabsContent key={section.id} value={section.id}>
                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div className="space-y-4">
                    <h2 className="text-2xl font-semibold text-foreground flex items-center gap-2">
                      {section.icon}
                      {section.title}
                    </h2>
                    <p className="text-foreground/80 leading-relaxed animate-fade-in">
                      {section.content}
                    </p>

                    <div className="bg-secondary/5 p-4 rounded-lg space-y-2 hover:bg-secondary/10 transition-colors">
                      <h3 className="font-medium text-foreground">Key Tips:</h3>
                      <ul className="list-disc list-inside space-y-1">
                        {section.tips.map((tip, index) => (
                          <li 
                            key={index} 
                            className="text-foreground/80 text-sm animate-fade-in"
                            style={{ animationDelay: `${index * 100}ms` }}
                          >
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex gap-2">
                      <Button 
                        variant="outline"
                        className="flex-1 transition-all hover:scale-105"
                        onClick={handlePlayPause}
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
                        onClick={toggleMute}
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
                      src="/lovable-uploads/314ccb3f-8b22-43a4-b4e9-5e2806f06dde.png"
                      alt={`${section.title} illustration`}
                      className="w-full h-full object-cover transition-transform hover:scale-105"
                    />
                  </div>
                </div>
              </TabsContent>
            ))}

            <TabsContent value="scheduler" className="mt-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold">Schedule ANC Visit</h2>
                  <div className="grid gap-4">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : "Select visit date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <Input
                      placeholder="Add notes for the visit"
                      value={visitNote}
                      onChange={(e) => setVisitNote(e.target.value)}
                    />
                    <Button onClick={addVisit}>Schedule Visit</Button>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="font-medium">Upcoming Visits</h3>
                  <div className="space-y-2">
                    {visits.map((visit, index) => (
                      <Card key={index} className="p-4">
                        <p className="font-medium">{format(visit.date, "PPP")}</p>
                        {visit.note && <p className="text-sm text-muted-foreground">{visit.note}</p>}
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </Card>

        <PageNavigation prevPath="/danger-signs" nextPath="/malaria" />
      </div>
    </div>
  );
};

export default Lifestyle;
