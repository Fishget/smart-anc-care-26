
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Baby,
  AlertOctagon,
  Activity,
  Bug,
  Car,
  Apple,
  Calendar,
  Syringe,
  LogOut,
  Play,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const menuItems = [
  {
    title: "Welcome & Introduction",
    icon: Play,
    description: "Introduction to antenatal care",
    path: "/intro",
    color: "bg-blue-100",
  },
  {
    title: "Baby's Development",
    icon: Baby,
    description: "Track fetal growth and development",
    path: "/development",
    color: "bg-pink-100",
  },
  {
    title: "Danger Signs",
    icon: AlertOctagon,
    description: "Recognize pregnancy warning signs",
    path: "/danger-signs",
    color: "bg-red-100",
  },
  {
    title: "Lifestyle Modifications",
    icon: Activity,
    description: "Health and wellness during pregnancy",
    path: "/lifestyle",
    color: "bg-green-100",
  },
  {
    title: "Malaria Prevention",
    icon: Bug,
    description: "Protection against malaria",
    path: "/malaria",
    color: "bg-yellow-100",
  },
  {
    title: "Birth Preparedness",
    icon: Car,
    description: "Plan for safe delivery",
    path: "/birth-prep",
    color: "bg-purple-100",
  },
  {
    title: "Nutrition Guide",
    icon: Apple,
    description: "Healthy eating during pregnancy",
    path: "/nutrition",
    color: "bg-orange-100",
  },
  {
    title: "Family Planning",
    icon: Calendar,
    description: "Postpartum contraception options",
    path: "/family-planning",
    color: "bg-indigo-100",
  },
  {
    title: "Immunization",
    icon: Syringe,
    description: "Vaccination schedule",
    path: "/immunization",
    color: "bg-teal-100",
  },
];

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-muted p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-foreground">
            ANC Counseling Tool
          </h1>
          <Button
            variant="outline"
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-secondary hover:text-secondary"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {menuItems.map((item) => (
            <Card
              key={item.title}
              className="p-6 cursor-pointer hover:shadow-lg transition-shadow animate-fadeIn"
              onClick={() => navigate(item.path)}
            >
              <div className="flex items-start space-x-4">
                <div className={`p-3 rounded-lg ${item.color}`}>
                  <item.icon className="w-6 h-6 text-foreground" />
                </div>
                <div className="space-y-1">
                  <h2 className="font-medium text-lg text-foreground">
                    {item.title}
                  </h2>
                  <p className="text-sm text-foreground/80">{item.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
