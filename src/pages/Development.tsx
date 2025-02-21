
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import PageNavigation from "@/components/PageNavigation";

interface DevelopmentInfo {
  size: string;
  fruit: string;
  description: string;
}

const developmentData: { [key: number]: DevelopmentInfo } = {
  1: {
    size: "0.1 inches",
    fruit: "Poppy seed",
    description: "Your baby is beginning to develop major organs and structures.",
  },
  2: {
    size: "0.25 inches",
    fruit: "Sweet pea",
    description: "The heart begins to beat and facial features start forming.",
  },
  3: {
    size: "0.5 inches",
    fruit: "Blueberry",
    description: "Arms, legs, and major organs are developing rapidly.",
  },
  4: {
    size: "1 inch",
    fruit: "Grape",
    description: "External features become more defined, including fingers and toes.",
  },
  5: {
    size: "2 inches",
    fruit: "Lime",
    description: "Your baby is now fully formed and starting to move around.",
  },
  6: {
    size: "3 inches",
    fruit: "Lemon",
    description: "The baby's movements become more coordinated and purposeful.",
  },
  7: {
    size: "4 inches",
    fruit: "Orange",
    description: "Development focuses on growth and strengthening of organs.",
  },
  8: {
    size: "5 inches",
    fruit: "Mango",
    description: "Your baby's hearing is developing, and they may respond to sounds.",
  },
  9: {
    size: "6 inches",
    fruit: "Papaya",
    description: "The baby is becoming more active and developing sleep patterns.",
  },
  10: {
    size: "7 inches",
    fruit: "Banana",
    description: "Your baby's movements are stronger and more noticeable.",
  },
  11: {
    size: "8 inches",
    fruit: "Coconut",
    description: "The baby is gaining weight and developing more fat tissue.",
  },
  12: {
    size: "9 inches",
    fruit: "Grapefruit",
    description: "Your baby's organs are maturing for life outside the womb.",
  },
};

const Development = () => {
  const [month, setMonth] = useState(1);
  const info = developmentData[month];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-muted p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-semibold text-foreground text-center mb-8">
          Baby's Development
        </h1>

        <Card className="p-6 animate-fadeIn">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-lg font-medium text-foreground">
                Month {month}
              </h2>
              <Slider
                value={[month]}
                onValueChange={(value) => setMonth(value[0])}
                min={1}
                max={12}
                step={1}
                className="w-full"
              />
              <div className="text-sm text-muted-foreground text-center">
                Move the slider to see your baby's development
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="aspect-square bg-primary/10 rounded-lg flex items-center justify-center">
                  {/* Placeholder for embryo image */}
                  <div className="text-center p-4">
                    <p className="text-foreground font-medium">Month {month} Development</p>
                    <p className="text-sm text-foreground/80">Swipe slider to view different stages</p>
                  </div>
                </div>
                <div className="text-center space-y-2">
                  <p className="text-foreground font-medium">Size: {info.size}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-secondary/5 p-6 rounded-lg">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center">
                        {/* Placeholder for fruit comparison image */}
                        <p className="text-sm text-foreground font-medium">{info.fruit}</p>
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
