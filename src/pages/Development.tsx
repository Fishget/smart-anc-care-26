import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import PageNavigation from "@/components/PageNavigation";

interface DevelopmentInfo {
  size: string;
  fruit: string;
  description: string;
  trimester: number;
}

const developmentData: { [key: number]: DevelopmentInfo } = {
  1: {
    size: "0.1 inches",
    fruit: "Poppy seed",
    description: "Your baby is beginning to develop major organs and structures.",
    trimester: 1
  },
  2: {
    size: "0.25 inches",
    fruit: "Sweet pea",
    description: "The heart begins to beat and facial features start forming.",
    trimester: 1
  },
  3: {
    size: "0.5 inches",
    fruit: "Blueberry",
    description: "Arms, legs, and major organs are developing rapidly.",
    trimester: 1
  },
  4: {
    size: "1 inch",
    fruit: "Grape",
    description: "External features become more defined, including fingers and toes.",
    trimester: 2
  },
  5: {
    size: "2 inches",
    fruit: "Lime",
    description: "Your baby is now fully formed and starting to move around.",
    trimester: 2
  },
  6: {
    size: "3 inches",
    fruit: "Lemon",
    description: "The baby's movements become more coordinated and purposeful.",
    trimester: 2
  },
  7: {
    size: "4 inches",
    fruit: "Orange",
    description: "Development focuses on growth and strengthening of organs.",
    trimester: 2
  },
  8: {
    size: "5 inches",
    fruit: "Mango",
    description: "Your baby's hearing is developing, and they may respond to sounds.",
    trimester: 3
  },
  9: {
    size: "6 inches",
    fruit: "Papaya",
    description: "The baby is becoming more active and developing sleep patterns.",
    trimester: 3
  },
  10: {
    size: "7 inches",
    fruit: "Banana",
    description: "Your baby's movements are stronger and more noticeable.",
    trimester: 3
  },
  11: {
    size: "8 inches",
    fruit: "Coconut",
    description: "The baby is gaining weight and developing more fat tissue.",
    trimester: 3
  },
  12: {
    size: "9 inches",
    fruit: "Grapefruit",
    description: "Your baby's organs are maturing for life outside the womb.",
    trimester: 3
  },
};

const trimesterImages = {
  1: "/lovable-uploads/492d75b4-1351-446d-9c80-2ac3eec03f05.png",
  2: "/lovable-uploads/53696afc-1da0-4d7c-bb1e-05985ef7b285.png",
  3: "/lovable-uploads/13b0c1b2-6429-4af2-bd29-bab595918deb.png"
};

const fruitImages = {
  "Poppy seed": "https://placehold.co/100x100/FFD580/732703/png?text=Poppy",
  "Sweet pea": "https://placehold.co/100x100/FFD580/732703/png?text=Pea",
  "Blueberry": "https://placehold.co/100x100/FFD580/732703/png?text=Berry",
  "Grape": "https://placehold.co/100x100/FFD580/732703/png?text=Grape",
  "Lime": "https://placehold.co/100x100/FFD580/732703/png?text=Lime",
  "Lemon": "https://placehold.co/100x100/FFD580/732703/png?text=Lemon",
  "Orange": "https://placehold.co/100x100/FFD580/732703/png?text=Orange",
  "Mango": "https://placehold.co/100x100/FFD580/732703/png?text=Mango",
  "Papaya": "https://placehold.co/100x100/FFD580/732703/png?text=Papaya",
  "Banana": "https://placehold.co/100x100/FFD580/732703/png?text=Banana",
  "Coconut": "https://placehold.co/100x100/FFD580/732703/png?text=Coconut",
  "Grapefruit": "https://placehold.co/100x100/FFD580/732703/png?text=Grapefruit"
};

const Development = () => {
  const [month, setMonth] = useState(1);
  const info = developmentData[month];

  const getTrimesterText = (trimester: number) => {
    return `Trimester ${trimester} (${
      trimester === 1 ? "Weeks 1-12" :
      trimester === 2 ? "Weeks 13-26" : "Weeks 27-40"
    })`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-muted p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-semibold text-foreground text-center mb-8">
          Baby's Development
        </h1>

        <Card className="p-6 animate-fadeIn">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-medium text-foreground">
                  Month {month}
                </h2>
                <span className="text-sm font-medium text-secondary">
                  {getTrimesterText(info.trimester)}
                </span>
              </div>
              
              <div className="space-y-2">
                <Slider
                  value={[month]}
                  onValueChange={(value) => setMonth(value[0])}
                  min={1}
                  max={12}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between px-2">
                  {Array.from({ length: 12 }, (_, i) => (
                    <span 
                      key={i + 1} 
                      className={`text-xs ${month === i + 1 ? 'text-secondary font-bold' : 'text-foreground/60'}`}
                    >
                      {i + 1}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="text-sm text-muted-foreground text-center">
                Move the slider to see your baby's development
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="aspect-square bg-primary/10 rounded-lg flex items-center justify-center overflow-hidden">
                  <img 
                    src={trimesterImages[info.trimester]}
                    alt={`Embryo development - Month ${month}`}
                    className="w-full h-full object-contain p-4"
                  />
                </div>
                <div className="text-center space-y-2">
                  <p className="text-foreground font-medium">Size: {info.size}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-secondary/5 p-6 rounded-lg">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center overflow-hidden">
                        <img 
                          src={fruitImages[info.fruit]}
                          alt={info.fruit}
                          className="w-12 h-12 object-contain"
                        />
                      </div>
                      <p className="text-foreground">
                        Your baby is now the size of a {info.fruit}
                      </p>
                    </div>
                    <p className="text-foreground/80">{info.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <PageNavigation prevPath="/intro" nextPath="/danger-signs" />
      </div>
    </div>
  );
};

export default Development;
