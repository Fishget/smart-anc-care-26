
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import PageNavigation from "@/components/PageNavigation";
import {
  Apple,
  Brain,
  Heart,
  Eye,
  Bone,
  Dumbbell,
  Fish,
  Carrot,
  Banana,
  GlassWater,
  Calculator,
  Check,
  X
} from "lucide-react";

interface NutrientInfo {
  title: string;
  description: string;
  foods: string[];
  icon: JSX.Element;
}

interface BodyPartInfo {
  name: string;
  foods: string[];
  benefits: string;
  icon: JSX.Element;
}

const foodGroups = {
  energy: ["Cereals", "Potatoes", "Pumpkin", "Sweet Potatoes"],
  immunity: ["Fruits", "Vegetables", "Citrus", "Green Leafy Vegetables"],
  bodyBuilding: ["Meat", "Fish", "Eggs", "Beans", "Dairy"],
  warmth: ["Fish", "Avocado", "Nuts", "Healthy Oils"]
};

const bodyParts: BodyPartInfo[] = [
  {
    name: "Brain",
    foods: ["Fish", "Avocado", "Walnuts", "Pumpkin"],
    benefits: "Supports cognitive development and nervous system",
    icon: <Brain className="h-6 w-6" />
  },
  {
    name: "Eyes",
    foods: ["Eggs", "Carrots", "Maize", "Green Leafy Vegetables"],
    benefits: "Promotes healthy vision development",
    icon: <Eye className="h-6 w-6" />
  },
  {
    name: "Heart",
    foods: ["Potatoes", "Tomatoes", "Olives", "Chickpeas"],
    benefits: "Supports cardiovascular development",
    icon: <Heart className="h-6 w-6" />
  },
  {
    name: "Bones",
    foods: ["Red Peppers", "Milk", "Fish", "Oranges"],
    benefits: "Strengthens bone development",
    icon: <Bone className="h-6 w-6" />
  },
  {
    name: "Muscles",
    foods: ["Beef", "Banana", "Fish", "Eggs"],
    benefits: "Aids in muscle development",
    icon: <Dumbbell className="h-6 w-6" />
  }
];

const nutrients: NutrientInfo[] = [
  {
    title: "Iron",
    description: "Essential for preventing anemia and supporting oxygen transport",
    foods: ["Spinach", "Red Meat", "Beans", "Lentils"],
    icon: <Apple className="h-6 w-6" />
  },
  {
    title: "Protein",
    description: "Critical for baby's growth and development",
    foods: ["Eggs", "Fish", "Meat", "Dairy", "Legumes"],
    icon: <Fish className="h-6 w-6" />
  },
  {
    title: "Folate",
    description: "Prevents birth defects and supports cell growth",
    foods: ["Lentils", "Oranges", "Green Vegetables", "Fortified Cereals"],
    icon: <Carrot className="h-6 w-6" />
  },
  {
    title: "Calcium",
    description: "Builds strong bones and teeth",
    foods: ["Milk", "Yogurt", "Cheese", "Leafy Greens"],
    icon: <Bone className="h-6 w-6" />
  }
];

const Nutrition = () => {
  const [selectedBodyPart, setSelectedBodyPart] = useState<BodyPartInfo | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [dietBalance, setDietBalance] = useState({
    fruits: false,
    vegetables: false,
    protein: false,
    grains: false,
    dairy: false,
    water: false
  });

  const calculateNutritionScore = () => {
    const checkedItems = Object.values(dietBalance).filter(Boolean).length;
    const totalItems = Object.keys(dietBalance).length;
    const score = (checkedItems / totalItems) * 100;
    
    let message = "";
    if (score >= 80) message = "Excellent! Your diet is well-balanced.";
    else if (score >= 60) message = "Good! Try to include more variety in your diet.";
    else message = "Consider including more servings from each food group.";

    toast.success(message);
  };

  const handleImageClick = (event: React.MouseEvent<HTMLImageElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const relativeX = x / rect.width;
    const relativeY = y / rect.height;

    // Determine clicked region and show relevant information
    if (relativeY < 0.33) {
      setSelectedGroup("immunity");
    } else if (relativeY < 0.66) {
      setSelectedGroup("bodyBuilding");
    } else {
      setSelectedGroup("energy");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FEF7CD] to-white p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-semibold text-foreground text-center mb-8">
          Nutrition During Pregnancy
        </h1>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid grid-cols-3 gap-2">
            <TabsTrigger value="overview">Food Guide</TabsTrigger>
            <TabsTrigger value="bodyParts">Body Benefits</TabsTrigger>
            <TabsTrigger value="calculator">Diet Balance</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <Card className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Interactive Food Guide</h2>
                  <p className="text-muted-foreground">
                    Click on different areas of the image to learn about food groups:
                  </p>
                  {selectedGroup && (
                    <div className="p-4 bg-primary/5 rounded-lg animate-fade-in">
                      <h3 className="font-medium capitalize mb-2">{selectedGroup}</h3>
                      <ul className="text-sm space-y-1">
                        {foodGroups[selectedGroup as keyof typeof foodGroups].map((food) => (
                          <li key={food} className="text-muted-foreground">{food}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                <div className="relative aspect-square cursor-pointer">
                  <img
                    src="/lovable-uploads/43488e3d-21a7-4a5f-b15d-e6928f8e640e.png"
                    alt="Food groups illustration"
                    className="w-full h-full object-contain rounded-lg hover:shadow-lg transition-all"
                    onClick={handleImageClick}
                  />
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="bodyParts" className="space-y-4">
            <Card className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="relative aspect-square cursor-pointer">
                  <img
                    src="/lovable-uploads/a417a917-f62c-4e53-b921-3a82bf0dd9ec.png"
                    alt="Body nutrition guide"
                    className="w-full h-full object-contain rounded-lg hover:shadow-lg transition-all"
                  />
                  {bodyParts.map((part, index) => (
                    <Button
                      key={part.name}
                      variant="outline"
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 rounded-full p-2 h-auto w-auto hover:scale-110"
                      style={{
                        top: `${(index + 1) * 20}%`,
                        left: '50%'
                      }}
                      onClick={() => setSelectedBodyPart(part)}
                    >
                      {part.icon}
                    </Button>
                  ))}
                </div>
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Body Benefits</h2>
                  <p className="text-muted-foreground">
                    Click on body parts to learn about their nutritional needs:
                  </p>
                  {selectedBodyPart && (
                    <div className="p-4 bg-primary/5 rounded-lg animate-fade-in">
                      <h3 className="font-medium flex items-center gap-2">
                        {selectedBodyPart.icon}
                        {selectedBodyPart.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-2">
                        {selectedBodyPart.benefits}
                      </p>
                      <div className="mt-2">
                        <h4 className="text-sm font-medium">Recommended Foods:</h4>
                        <ul className="text-sm text-muted-foreground list-disc list-inside">
                          {selectedBodyPart.foods.map((food) => (
                            <li key={food}>{food}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="calculator" className="space-y-4">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Diet Balance Checker</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  {Object.entries(dietBalance).map(([category, checked]) => (
                    <Button
                      key={category}
                      variant="outline"
                      className={`w-full justify-between h-auto p-4 ${
                        checked ? 'bg-primary/10' : ''
                      }`}
                      onClick={() =>
                        setDietBalance((prev) => ({
                          ...prev,
                          [category]: !prev[category as keyof typeof dietBalance]
                        }))
                      }
                    >
                      <span className="capitalize">{category}</span>
                      {checked ? (
                        <Check className="h-4 w-4 text-primary" />
                      ) : (
                        <X className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  ))}
                  <Button
                    className="w-full"
                    onClick={calculateNutritionScore}
                  >
                    <Calculator className="mr-2 h-4 w-4" />
                    Check Diet Balance
                  </Button>
                </div>
                <div className="bg-primary/5 p-4 rounded-lg">
                  <h3 className="font-medium mb-4">Daily Recommendations</h3>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p className="flex items-center gap-2">
                      <Apple className="h-4 w-4" />
                      Fruits: 2-4 servings
                    </p>
                    <p className="flex items-center gap-2">
                      <Carrot className="h-4 w-4" />
                      Vegetables: 3-5 servings
                    </p>
                    <p className="flex items-center gap-2">
                      <Fish className="h-4 w-4" />
                      Protein: 2-3 servings
                    </p>
                    <p className="flex items-center gap-2">
                      <Banana className="h-4 w-4" />
                      Grains: 6-8 servings
                    </p>
                    <p className="flex items-center gap-2">
                      <Bone className="h-4 w-4" />
                      Dairy: 3-4 servings
                    </p>
                    <p className="flex items-center gap-2">
                      <GlassWater className="h-4 w-4" />
                      Water: 8-10 glasses
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        <PageNavigation prevPath="/birth-prep" nextPath="/summary" />
      </div>
    </div>
  );
};

export default Nutrition;
