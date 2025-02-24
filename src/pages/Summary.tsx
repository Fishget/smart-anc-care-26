
import { Card } from "@/components/ui/card";
import PageNavigation from "@/components/PageNavigation";
import { Baby, Heart, Shield } from "lucide-react";

const Summary = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-muted p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-semibold text-center mb-8">
          SMART ANC CARE Summary
        </h1>

        <Card className="p-6">
          <div className="space-y-6">
            <div className="grid gap-4">
              <div className="flex items-center gap-3">
                <Baby className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold">Your Journey So Far</h2>
              </div>
              <p className="text-muted-foreground">
                Track your progress through pregnancy care and next steps.
              </p>
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

        <PageNavigation prevPath="/birth-prep" nextPath="/dashboard" />
      </div>
    </div>
  );
};

export default Summary;
