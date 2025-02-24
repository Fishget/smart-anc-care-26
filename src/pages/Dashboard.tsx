
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Baby,
  AlertTriangle,
  Heart,
  Shield,
  ShoppingBag,
  Apple,
} from "lucide-react";

const menuItems = [
  {
    title: "Baby Development",
    icon: <Baby className="h-6 w-6" />,
    description: "Track your baby's growth week by week",
    path: "/development",
  },
  {
    title: "Danger Signs",
    icon: <AlertTriangle className="h-6 w-6" />,
    description: "Know when to seek immediate care",
    path: "/danger-signs",
  },
  {
    title: "Lifestyle Modifications",
    icon: <Heart className="h-6 w-6" />,
    description: "Healthy habits during pregnancy",
    path: "/lifestyle",
  },
  {
    title: "Malaria Prevention",
    icon: <Shield className="h-6 w-6" />,
    description: "Protect yourself from malaria",
    path: "/malaria",
  },
  {
    title: "Birth Preparedness",
    icon: <ShoppingBag className="h-6 w-6" />,
    description: "Plan ahead for delivery",
    path: "/birth-prep",
  },
  {
    title: "Nutrition Guide",
    icon: <Apple className="h-6 w-6" />,
    description: "Eat well for you and your baby",
    path: "/nutrition",
  },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeCard, setActiveCard] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-muted p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-semibold">SMART ANC CARE</h1>
          <p className="text-muted-foreground">
            Your comprehensive pregnancy care companion
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {menuItems.map((item) => (
            <Card
              key={item.title}
              className={`p-6 cursor-pointer transition-all hover:shadow-lg ${
                activeCard === item.title ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => {
                setActiveCard(item.title);
                navigate(item.path);
              }}
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  {item.icon}
                  <h2 className="font-semibold">{item.title}</h2>
                </div>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
