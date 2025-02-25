import { Card } from "@/components/ui/card";
import PageNavigation from "@/components/PageNavigation";
import { Baby, Heart, Shield, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Summary = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FFD580] p-6">
      <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-semibold">
            🎉 Congratulations on Completing SMART ANC CARE! 🎉
          </h1>
          <p className="text-lg text-muted-foreground">
            You've taken important steps towards a healthy pregnancy
          </p>
        </div>

        <Card className="p-6">
          <div className="space-y-6">
            <div className="grid gap-4">
              <div className="flex items-center gap-3">
                <Trophy className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold">Your Achievements</h2>
              </div>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Completed malaria prevention training</li>
                <li>Learned essential danger signs</li>
                <li>Understood baby's development stages</li>
                <li>Mastered healthy lifestyle choices</li>
              </ul>
            </div>

            <div className="grid gap-4">
              <div className="flex items-center gap-3">
                <Heart className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold">Health Checklist</h2>
              </div>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Regular ANC visits scheduled</li>
                <li>Danger signs awareness</li>
                <li>Lifestyle modifications</li>
                <li>Birth preparedness plan</li>
              </ul>
            </div>

            <div className="grid gap-4">
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold">Next Steps</h2>
              </div>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Continue regular check-ups</li>
                <li>Follow nutrition guidelines</li>
                <li>Stay active and healthy</li>
                <li>Prepare for delivery</li>
              </ul>
            </div>
          </div>
        </Card>

        <Button 
          onClick={() => navigate("/dashboard")} 
          className="mx-auto block"
        >
          Back to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default Summary;
