
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import PageNavigation from "@/components/PageNavigation";
import { Play } from "lucide-react";

const Introduction = () => {
  return (
    <div className="min-h-screen bg-[#FFD580] p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-semibold text-center mb-8">
          Welcome to SMART ANC CARE
        </h1>

        <Card className="p-6">
          <div className="space-y-6">
            <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors">
              <Button variant="secondary" className="flex items-center gap-2">
                <Play className="w-6 h-6" />
                Watch Introduction
              </Button>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold">About SMART ANC CARE</h2>
              <p className="text-muted-foreground">
                Your comprehensive pregnancy care companion that guides you through every
                step of your journey. Learn about your baby's development, understand
                warning signs, and prepare for a healthy pregnancy.
              </p>
            </div>
          </div>
        </Card>

        <PageNavigation nextPath="/dashboard" />
      </div>
    </div>
  );
};

export default Introduction;
