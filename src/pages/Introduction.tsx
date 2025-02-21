
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import PageNavigation from "@/components/PageNavigation";

const Introduction = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-muted p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-semibold text-foreground text-center mb-8">
          Welcome to Antenatal Care
        </h1>

        <Card className="p-6 animate-fadeIn">
          <div className="space-y-6">
            <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
              <Button variant="secondary" className="flex items-center gap-2">
                <Play className="w-6 h-6" />
                Play Introduction Video
              </Button>
            </div>

            <div className="space-y-4 text-foreground">
              <h2 className="text-xl font-semibold">Overview of ANC</h2>
              <p>
                Antenatal care (ANC) is essential for ensuring a healthy pregnancy,
                reducing complications, and preparing for safe delivery. It includes
                regular checkups, nutritional support, health education, and early
                detection of risks.
              </p>
              <p>
                Early ANC visits improve both maternal and newborn health outcomes.
              </p>

              <h3 className="text-lg font-semibold mt-4">Key Benefits:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Regular monitoring of mother and baby's health</li>
                <li>Early detection of potential complications</li>
                <li>Nutritional guidance and supplementation</li>
                <li>Preparation for safe delivery</li>
                <li>Access to essential vaccines and medications</li>
              </ul>
            </div>
          </div>
        </Card>

        <PageNavigation prevPath="/dashboard" nextPath="/development" />
      </div>
    </div>
  );
};

export default Introduction;
