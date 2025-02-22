
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
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
  Info
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
  const [dailyIntake, setDailyIntake] = useState({
    fruits: 0,
    vegetables: 0,
    protein: 0,
    grains: 0,
    dairy: 0,
    water: 0
  });

  const calculateNutritionScore = () => {
    const total = Object.values(dailyIntake).reduce((acc, val) => acc + val, 0);
    const score = (total / (Object.keys(dailyIntake).length * 5)) * 100;
    
    let message = "";
    if (score >= 80) message = "Excellent! Your diet is well-balanced.";
    else if (score >= 60) message = "Good! Try to include more variety in your diet.";
    else message = "Consider including more servings from each food group.";

    toast.success(message);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FEF7CD] to-white p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-semibold text-foreground text-center mb-8">
          Nutrition During Pregnancy
        </h1>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="bodyParts">Body Benefits</TabsTrigger>
            <TabsTrigger value="calculator">Food Calculator</TabsTrigger>
            <TabsTrigger value="nutrients">Key Nutrients</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <Card className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Food Groups</h2>
                  <p className="text-muted-foreground">
                    A balanced diet during pregnancy should include various food groups:
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(foodGroups).map(([group, foods]) => (
                      <div key={group} className="p-4 bg-primary/5 rounded-lg">
                        <h3 className="font-medium capitalize mb-2">{group}</h3>
                        <ul className="text-sm space-y-1">
                          {foods.map((food) => (
                            <li key={food} className="text-muted-foreground">{food}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="relative aspect-square">
                  <img
                    src="/lovable-uploads/43488e3d-21a7-4a5f-b15d-e6928f8e640e.png"
                    alt="Food groups illustration"
                    className="w-full h-full object-contain rounded-lg"
                  />
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="bodyParts" className="space-y-4">
            <Card className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Nutritional Benefits</h2>
                  <p className="text-muted-foreground">
                    Click on different body parts to learn about their nutritional needs:
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    {bodyParts.map((part) => (
                      <Button
                        key={part.name}
                        variant="outline"
                        className="p-4 h-auto flex flex-col gap-2"
                        onClick={() => setSelectedBodyPart(part)}
                      >
                        {part.icon}
                        <span>{part.name}</span>
                      </Button>
                    ))}
                  </div>
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
                <div className="relative aspect-square">
                  <img
                    src="/lovable-uploads/a417a917-f62c-4e53-b921-3a82bf0dd9ec.png"
                    alt="Body nutrition guide"
                    className="w-full h-full object-contain rounded-lg"
                  />
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="calculator" className="space-y-4">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Daily Nutrition Calculator</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  {Object.entries(dailyIntake).map(([category, value]) => (
                    <div key={category} className="space-y-2">
                      <label className="text-sm font-medium capitalize">
                        {category} (servings)
                      </label>
                      <Input
                        type="number"
                        min="0"
                        max="10"
                        value={value}
                        onChange={(e) =>
                          setDailyIntake((prev) => ({
                            ...prev,
                            [category]: Number(e.target.value)
                          }))
                        }
                      />
                    </div>
                  ))}
                  <Button
                    className="w-full"
                    onClick={calculateNutritionScore}
                  >
                    <Calculator className="mr-2 h-4 w-4" />
                    Calculate Balance
                  </Button>
                </div>
                <div className="bg-primary/5 p-4 rounded-lg">
                  <h3 className="font-medium mb-2 flex items-center gap-2">
                    <Info className="h-4 w-4" />
                    Recommended Daily Servings
                  </h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>Fruits: 2-4 servings</li>
                    <li>Vegetables: 3-5 servings</li>
                    <li>Protein: 2-3 servings</li>
                    <li>Grains: 6-8 servings</li>
                    <li>Dairy: 3-4 servings</li>
                    <li>Water: 8-10 glasses</li>
                  </ul>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="nutrients" className="space-y-4">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Essential Nutrients</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {nutrients.map((nutrient) => (
                  <div
                    key={nutrient.title}
                    className="p-4 bg-primary/5 rounded-lg space-y-2"
                  >
                    <h3 className="font-medium flex items-center gap-2">
                      {nutrient.icon}
                      {nutrient.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {nutrient.description}
                    </p>
                    <div>
                      <h4 className="text-sm font-medium">Found in:</h4>
                      <ul className="text-sm text-muted-foreground list-disc list-inside">
                        {nutrient.foods.map((food) => (
                          <li key={food}>{food}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
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
