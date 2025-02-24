
import { Card } from "@/components/ui/card";
import PageNavigation from "@/components/PageNavigation";

const Summary = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-muted p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-semibold text-center mb-8">
          SMART ANC CARE Summary
        </h1>
        <Card className="p-6">
          <p className="text-muted-foreground">
            Summary of your antenatal care journey and next steps...
          </p>
        </Card>
        <PageNavigation prevPath="/birth-prep" nextPath="/dashboard" />
      </div>
    </div>
  );
};

export default Summary;
