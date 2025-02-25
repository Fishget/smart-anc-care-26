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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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

interface FoodCategory {
  name: string;
  icon: JSX.Element;
  minRequired: number;
  items: {
    name: string;
    checked: boolean;
  }[];
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

const foodBenefits = {
  fruits: "Rich in vitamins and antioxidants for immune support",
  vegetables: "Provides essential nutrients and fiber",
  protein: "Builds and repairs tissues, crucial for baby's growth",
  dairy: "Strengthens bones and teeth with calcium"
};

const Nutrition = () => {
  const [selectedBodyPart, setSelectedBodyPart] = useState<BodyPartInfo | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [foodCategories, setFoodCategories] = useState<FoodCategory[]>([
    {
      name: "Fruits",
      icon: <Apple className="h-4 w-4" />,
      minRequired: 3,
      items: [
        { name: "Oranges", checked: false },
        { name: "Bananas", checked: false },
        { name: "Apples", checked: false },
        { name: "Berries", checked: false },
        { name: "Mango", checked: false }
      ]
    },
    {
      name: "Vegetables",
      icon: <Carrot className="h-4 w-4" />,
      minRequired: 3,
      items: [
        { name: "Spinach", checked: false },
        { name: "Carrots", checked: false },
        { name: "Tomatoes", checked: false },
        { name: "Green Beans", checked: false },
        { name: "Sweet Potatoes", checked: false }
      ]
    },
    {
      name: "Protein",
      icon: <Fish className="h-4 w-4" />,
      minRequired: 2,
      items: [
        { name: "Fish", checked: false },
        { name: "Eggs", checked: false },
        { name: "Chicken", checked: false },
        { name: "Beans", checked: false },
        { name: "Nuts", checked: false }
      ]
    },
    {
      name: "Dairy",
      icon: <Bone className="h-4 w-4" />,
      minRequired: 2,
      items: [
        { name: "Milk", checked: false },
        { name: "Yogurt", checked: false },
        { name: "Cheese", checked: false },
        { name: "Fortified Milk", checked: false }
      ]
    },
    {
      name: "Grains",
      icon: <Banana className="h-4 w-4" />,
      minRequired: 3,
      items: [
        { name: "Brown Rice", checked: false },
        { name: "Whole Wheat Bread", checked: false },
        { name: "Oatmeal", checked: false },
        { name: "Quinoa", checked: false },
        { name: "Fortified Cereals", checked: false }
      ]
    }
  ]);

  const toggleFoodItem = (categoryIndex: number, itemIndex: number) => {
    setFoodCategories(prev => {
      const newCategories = [...prev];
      newCategories[categoryIndex].items[itemIndex].checked = 
        !newCategories[categoryIndex].items[itemIndex].checked;
      return newCategories;
    });
  };

  const calculateCategoryProgress = (category: FoodCategory) => {
    const checkedCount = category.items.filter(item => item.checked).length;
    return {
      percentage: (checkedCount / category.minRequired) * 100,
      isComplete: checkedCount >= category.minRequired
    };
  };

  const getSuggestions = (category: FoodCategory) => {
    const checkedCount = category.items.filter(item => item.checked).length;
    if (checkedCount < category.minRequired) {
      const needed = category.minRequired - checkedCount;
      const uncheckedItems = category.items
        .filter(item => !item.checked)
        .map(item => item.name)
        .slice(0, 2);
      return `Add ${needed} more: Try ${uncheckedItems.join(' or ')}`;
    }
    return "Great choice!";
  };

  const calculateOverallProgress = () => {
    const totalProgress = foodCategories.reduce((acc, category) => {
      const { percentage } = calculateCategoryProgress(category);
      return acc + (percentage > 100 ? 100 : percentage);
    }, 0);
    
    const overallPercentage = totalProgress / foodCategories.length;
    
    let message = "";
    if (overallPercentage >= 100) {
      message = "🎉 Perfect! Your diet is extremely well-balanced!";
    } else if (overallPercentage >= 80) {
      message = "🌟 Great job! Your diet is well-balanced.";
    } else if (overallPercentage >= 60) {
      message = "👍 Good start! Try adding more variety to your diet.";
    } else {
      message = "💪 Keep going! Try to include more items from each food group.";
    }

    toast.success(`${message} (${Math.round(overallPercentage)}% complete)`);
  };

  const handleImageClick = (event: React.MouseEvent<HTMLImageElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const relativeX = x / rect.width;
    const relativeY = y / rect.height;

    if (relativeY < 0.33) {
      setSelectedGroup("immunity");
    } else if (relativeY < 0.66) {
      setSelectedGroup("bodyBuilding");
    } else {
      setSelectedGroup("energy");
    }
  };

  const foodGroups = {
    energy: [
      "Rice",
      "Bread",
      "Potatoes",
      "Pasta",
      "Cereals",
      "Sweet potatoes",
      "Plantains"
    ],
    immunity: [
      "Oranges",
      "Lemons",
      "Spinach",
      "Broccoli",
      "Bell peppers",
      "Berries"
    ],
    bodyBuilding: [
      "Eggs",
      "Fish",
      "Lean meat",
      "Beans",
      "Lentils",
      "Dairy products"
    ],
    warmth: [
      "Avocados",
      "Nuts",
      "Seeds",
      "Olive oil",
      "Fish oils",
      "Coconut oil"
    ]
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

  return (
    <div className="min-h-screen bg-[#FFE5B4] p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-semibold text-foreground text-center mb-8 animate-fade-in">
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
                    src="/lovable-uploads/a417a917-f62c-4e53-b921-3a82bf0dd9ec.png"
                    alt="Food groups illustration"
                    className="w-full h-full object-contain rounded-lg hover:shadow-lg transition-all"
                    onClick={handleImageClick}
                  />
                  <div 
                    className="absolute top-0 left-0 w-1/2 h-1/3 cursor-pointer hover:bg-primary/10 transition-colors rounded-lg"
                    onClick={() => setSelectedGroup("immunity")}
                  />
                  <div 
                    className="absolute top-1/3 left-0 w-1/2 h-1/3 cursor-pointer hover:bg-primary/10 transition-colors rounded-lg"
                    onClick={() => setSelectedGroup("energy")}
                  />
                  <div 
                    className="absolute bottom-0 left-0 w-1/2 h-1/3 cursor-pointer hover:bg-primary/10 transition-colors rounded-lg"
                    onClick={() => setSelectedGroup("warmth")}
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
                    src="/lovable-uploads/43488e3d-21a7-4a5f-b15d-e6928f8e640e.png"
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
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Diet Balance Checker</h2>
                  <Button onClick={calculateOverallProgress}>
                    <Calculator className="mr-2 h-4 w-4" />
                    Check Progress
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                  {foodCategories.map((category, categoryIndex) => (
                    <div key={category.name} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium flex items-center gap-2">
                          {category.icon}
                          {category.name}
                        </h3>
                        <span className="text-sm text-muted-foreground">
                          {category.items.filter(item => item.checked).length}/
                          {category.minRequired}
                        </span>
                      </div>
                      
                      <div className="space-y-1">
                        {category.items.map((item, itemIndex) => (
                          <TooltipProvider key={item.name}>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className={`w-full justify-between py-1 px-2 h-8 text-xs ${
                                    item.checked ? 'bg-primary/10' : ''
                                  }`}
                                  onClick={() => toggleFoodItem(categoryIndex, itemIndex)}
                                >
                                  <span>{item.name}</span>
                                  {item.checked ? (
                                    <Check className="h-3 w-3 text-primary" />
                                  ) : (
                                    <X className="h-3 w-3 text-muted-foreground" />
                                  )}
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{foodBenefits[category.name.toLowerCase() as keyof typeof foodBenefits]}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        ))}
                      </div>
                      
                      <div>
                        <div className="h-1.5 bg-primary/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary transition-all duration-500"
                            style={{
                              width: `${Math.min(
                                calculateCategoryProgress(category).percentage,
                                100
                              )}%`
                            }}
                          />
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {getSuggestions(category)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-primary/5 p-4 rounded-lg">
                  <h3 className="font-medium mb-3">Overall Progress</h3>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {foodCategories.map(category => (
                      <div key={category.name} className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <span className="flex items-center gap-1">
                            {category.icon}
                            {category.name}
                          </span>
                          <span className={
                            calculateCategoryProgress(category).isComplete 
                              ? 'text-primary' 
                              : 'text-muted-foreground'
                          }>
                            {Math.min(
                              Math.round(calculateCategoryProgress(category).percentage),
                              100
                            )}%
                          </span>
                        </div>
                        <div className="h-1.5 bg-primary/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary transition-all duration-500"
                            style={{
                              width: `${Math.min(
                                calculateCategoryProgress(category).percentage,
                                100
                              )}%`
                            }}
                          />
                        </div>
                      </div>
                    ))}
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
