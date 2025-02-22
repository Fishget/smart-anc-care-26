
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import PageNavigation from "@/components/PageNavigation";
import { 
  Baby,
  Car,
  Money,
  List,
  PhoneCall,
  Heart,
  Calendar,
  MapPin,
  Calculator,
  CheckSquare
} from "lucide-react";

interface PrepSection {
  id: string;
  title: string;
  icon: JSX.Element;
  content: string;
  checklist?: string[];
  contacts?: { role: string; info: string }[];
}

interface SavingsState {
  transport: number;
  supplies: number;
  care: number;
  emergency: number;
}

const prepSections: PrepSection[] = [
  {
    id: "facility",
    title: "Birth Facility",
    icon: <MapPin className="h-5 w-5" />,
    content: "Choose a health facility with skilled birth attendants. Consider distance, available services, and your preferences.",
    checklist: [
      "Research nearby facilities",
      "Visit chosen facility in advance",
      "Meet healthcare providers",
      "Understand available services",
      "Check facility operating hours",
      "Verify emergency services"
    ]
  },
  {
    id: "transport",
    title: "Transportation",
    icon: <Car className="h-5 w-5" />,
    content: "Plan your transportation to the health facility, including backup options for emergencies.",
    checklist: [
      "Identify primary transport method",
      "Have backup transport plan",
      "Save emergency taxi numbers",
      "Map out different routes",
      "Estimate travel time",
      "Plan for different scenarios"
    ]
  },
  {
    id: "savings",
    title: "Financial Plan",
    icon: <Money className="h-5 w-5" />,
    content: "Calculate and save money for delivery costs, supplies, and emergency situations.",
    checklist: [
      "Calculate expected costs",
      "Set up savings plan",
      "Prepare emergency funds",
      "Research insurance options",
      "Keep money accessible",
      "Track savings progress"
    ]
  },
  {
    id: "supplies",
    title: "Essential Items",
    icon: <List className="h-5 w-5" />,
    content: "Prepare a delivery kit with all necessary items for you and your baby.",
    checklist: [
      "Mother's clothing",
      "Baby clothes",
      "Sanitary pads",
      "Diapers",
      "Blankets",
      "Toiletries",
      "Important documents"
    ]
  },
  {
    id: "contacts",
    title: "Emergency Contacts",
    icon: <PhoneCall className="h-5 w-5" />,
    content: "Keep important contact numbers readily available for emergencies.",
    contacts: [
      { role: "Primary Healthcare Provider", info: "Add contact" },
      { role: "Backup Healthcare Provider", info: "Add contact" },
      { role: "Emergency Transport", info: "Add contact" },
      { role: "Support Person", info: "Add contact" },
      { role: "Decision Maker", info: "Add contact" }
    ]
  }
];

const BirthPrep = () => {
  const [activeSection, setActiveSection] = useState<string>("facility");
  const [contacts, setContacts] = useState<Record<string, string>>({});
  const [savings, setSavings] = useState<SavingsState>({
    transport: 0,
    supplies: 0,
    care: 0,
    emergency: 0
  });

  const handleContactUpdate = (role: string, value: string) => {
    setContacts(prev => ({ ...prev, [role]: value }));
    toast.success("Contact updated successfully");
  };

  const updateSavings = (category: keyof SavingsState, value: string) => {
    setSavings(prev => ({
      ...prev,
      [category]: parseFloat(value) || 0
    }));
  };

  const calculateTotal = () => {
    return Object.values(savings).reduce((acc, curr) => acc + curr, 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-muted p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-semibold text-foreground text-center mb-8 animate-fade-in flex items-center justify-center gap-2">
          <Baby className="h-6 w-6" />
          Birth Preparedness Plan
        </h1>

        <Card className="p-6">
          <Tabs defaultValue="facility" value={activeSection} onValueChange={setActiveSection}>
            <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-2">
              {prepSections.map((section) => (
                <TabsTrigger
                  key={section.id}
                  value={section.id}
                  className="flex items-center gap-2 transition-all hover:scale-105"
                >
                  {section.icon}
                  <span className="hidden md:inline">{section.title}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            <ScrollArea className="h-[600px] rounded-md border p-4 mt-6">
              {prepSections.map((section) => (
                <TabsContent 
                  key={section.id} 
                  value={section.id}
                  className="space-y-6 animate-fade-in"
                >
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h2 className="text-2xl font-semibold text-foreground flex items-center gap-2">
                        {section.icon}
                        {section.title}
                      </h2>
                      <p className="text-foreground/80 leading-relaxed">
                        {section.content}
                      </p>

                      {section.checklist && (
                        <div className="bg-primary/5 p-4 rounded-lg space-y-2">
                          <h3 className="font-medium text-foreground flex items-center gap-2">
                            <CheckSquare className="h-4 w-4" />
                            Checklist:
                          </h3>
                          <ul className="list-disc list-inside space-y-1">
                            {section.checklist.map((item, index) => (
                              <li 
                                key={index} 
                                className="text-foreground/80 text-sm animate-fade-in"
                                style={{ animationDelay: `${index * 100}ms` }}
                              >
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {section.id === "contacts" && (
                        <div className="space-y-4">
                          {section.contacts?.map((contact, index) => (
                            <div key={index} className="flex gap-2 items-center animate-fade-in">
                              <Input
                                placeholder={contact.info}
                                value={contacts[contact.role] || ""}
                                onChange={(e) => handleContactUpdate(contact.role, e.target.value)}
                                className="flex-1"
                              />
                              <span className="text-sm text-foreground/60">{contact.role}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {section.id === "savings" && (
                        <div className="space-y-4 bg-primary/5 p-4 rounded-lg">
                          <h3 className="font-medium text-foreground flex items-center gap-2">
                            <Calculator className="h-4 w-4" />
                            Savings Calculator:
                          </h3>
                          <div className="space-y-2">
                            {Object.entries(savings).map(([category, amount], index) => (
                              <div key={index} className="flex gap-2 items-center animate-fade-in">
                                <Input
                                  type="number"
                                  placeholder="0"
                                  value={amount || ""}
                                  onChange={(e) => updateSavings(category as keyof SavingsState, e.target.value)}
                                  className="flex-1"
                                />
                                <span className="text-sm text-foreground/60 w-24">
                                  {category.charAt(0).toUpperCase() + category.slice(1)}
                                </span>
                              </div>
                            ))}
                            <div className="pt-2 border-t">
                              <p className="text-right font-semibold">
                                Total: ${calculateTotal().toFixed(2)}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="aspect-square bg-primary/5 rounded-lg overflow-hidden hover:shadow-lg transition-all">
                      <img
                        src="/lovable-uploads/492d75b4-1351-446d-9c80-2ac3eec03f05.png"
                        alt={`${section.title} illustration`}
                        className="w-full h-full object-cover transition-transform hover:scale-105"
                      />
                    </div>
                  </div>
                </TabsContent>
              ))}
            </ScrollArea>
          </Tabs>
        </Card>

        <PageNavigation prevPath="/malaria" nextPath="/summary" />
      </div>
    </div>
  );
};

export default BirthPrep;
