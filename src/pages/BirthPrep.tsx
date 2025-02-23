
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
  Wallet,
  List,
  PhoneCall,
  Heart,
  Calendar,
  MapPin,
  Calculator,
  CheckSquare,
  Users,
  Phone,
  User,
  MessageCircle,
  Clock,
  HeartPulse
} from "lucide-react";

interface ChecklistItem {
  id: string;
  text: string;
  checked: boolean;
  category: string;
}

interface EmergencyContact {
  role: string;
  name: string;
  phone: string;
  isDecisionMaker: boolean;
}

interface FinancialPlan {
  dueDate: string;
  targetSaving: number;
  expenses: {
    transport: number;
    facility: number;
    supplies: number;
    emergency: number;
    postpartum: number;
  };
}

const BirthPrep = () => {
  const [activeTab, setActiveTab] = useState("checklist");
  const [checklist, setChecklist] = useState<ChecklistItem[]>([
    { id: "facility", text: "Identify and visit preferred health facility", checked: false, category: "Facility" },
    { id: "staff", text: "Meet with healthcare providers", checked: false, category: "Facility" },
    { id: "services", text: "Understand available services and costs", checked: false, category: "Facility" },
    { id: "transport1", text: "Arrange primary transportation method", checked: false, category: "Transport" },
    { id: "transport2", text: "Set up backup transport plan", checked: false, category: "Transport" },
    { id: "transport3", text: "Save emergency taxi numbers", checked: false, category: "Transport" },
    { id: "items1", text: "Pack mother's clothing", checked: false, category: "Items" },
    { id: "items2", text: "Pack baby clothes and blankets", checked: false, category: "Items" },
    { id: "items3", text: "Pack sanitary supplies", checked: false, category: "Items" },
    { id: "items4", text: "Prepare essential documents", checked: false, category: "Items" },
    { id: "support1", text: "Arrange birth support person", checked: false, category: "Support" },
    { id: "support2", text: "Plan postpartum care support", checked: false, category: "Support" },
    { id: "support3", text: "Discuss family planning options", checked: false, category: "Support" },
    { id: "comm1", text: "Create emergency contact list", checked: false, category: "Communication" },
    { id: "comm2", text: "Set up communication plan", checked: false, category: "Communication" },
  ]);

  const [contacts, setContacts] = useState<EmergencyContact[]>([
    { role: "Primary Healthcare Provider", name: "", phone: "", isDecisionMaker: false },
    { role: "Backup Healthcare Provider", name: "", phone: "", isDecisionMaker: false },
    { role: "Birth Support Person", name: "", phone: "", isDecisionMaker: false },
    { role: "Emergency Transport", name: "", phone: "", isDecisionMaker: false },
    { role: "Decision Maker", name: "", phone: "", isDecisionMaker: true },
  ]);

  const [financialPlan, setFinancialPlan] = useState<FinancialPlan>({
    dueDate: "",
    targetSaving: 0,
    expenses: {
      transport: 0,
      facility: 0,
      supplies: 0,
      emergency: 0,
      postpartum: 0
    }
  });

  const toggleChecklistItem = (id: string) => {
    setChecklist(prev => prev.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  const updateContact = (index: number, field: keyof EmergencyContact, value: string) => {
    setContacts(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
    toast.success("Contact information updated");
  };

  const updateExpense = (category: keyof FinancialPlan["expenses"], value: string) => {
    setFinancialPlan(prev => ({
      ...prev,
      expenses: {
        ...prev.expenses,
        [category]: parseFloat(value) || 0
      }
    }));
  };

  const calculateProgress = () => {
    const checkedCount = checklist.filter(item => item.checked).length;
    return (checkedCount / checklist.length) * 100;
  };

  const calculateTotalExpenses = () => {
    return Object.values(financialPlan.expenses).reduce((acc, curr) => acc + curr, 0);
  };

  const getRemainingDays = () => {
    if (!financialPlan.dueDate) return 0;
    const due = new Date(financialPlan.dueDate);
    const today = new Date();
    const diff = due.getTime() - today.getTime();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  };

  const getDailySavingsTarget = () => {
    const remainingDays = getRemainingDays();
    const totalNeeded = calculateTotalExpenses();
    return remainingDays > 0 ? totalNeeded / remainingDays : 0;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-muted p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <h1 className="text-3xl font-semibold text-foreground text-center mb-8 animate-fade-in flex items-center justify-center gap-2">
          <Baby className="h-6 w-6" />
          Birth Preparedness Plan
        </h1>

        <Card className="p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 gap-2">
              <TabsTrigger value="checklist" className="flex items-center gap-2">
                <CheckSquare className="h-4 w-4" />
                Preparation Checklist
              </TabsTrigger>
              <TabsTrigger value="contacts" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Emergency Contacts
              </TabsTrigger>
              <TabsTrigger value="financial" className="flex items-center gap-2">
                <Calculator className="h-4 w-4" />
                Financial Planning
              </TabsTrigger>
            </TabsList>

            <TabsContent value="checklist" className="mt-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  {["Facility", "Transport", "Items", "Support", "Communication"].map(category => (
                    <div key={category} className="space-y-2">
                      <h3 className="font-medium flex items-center gap-2">
                        {category === "Facility" && <MapPin className="h-4 w-4" />}
                        {category === "Transport" && <Car className="h-4 w-4" />}
                        {category === "Items" && <List className="h-4 w-4" />}
                        {category === "Support" && <Users className="h-4 w-4" />}
                        {category === "Communication" && <MessageCircle className="h-4 w-4" />}
                        {category}
                      </h3>
                      {checklist
                        .filter(item => item.category === category)
                        .map(item => (
                          <Button
                            key={item.id}
                            variant="outline"
                            className={`w-full justify-between h-auto p-4 ${
                              item.checked ? 'bg-primary/10' : ''
                            }`}
                            onClick={() => toggleChecklistItem(item.id)}
                          >
                            <span className="text-sm text-left">{item.text}</span>
                            <CheckSquare 
                              className={`h-4 w-4 ${
                                item.checked ? 'text-primary' : 'text-muted-foreground'
                              }`} 
                            />
                          </Button>
                        ))}
                    </div>
                  ))}
                </div>
                <div className="space-y-4">
                  <div className="bg-primary/5 p-6 rounded-lg">
                    <h3 className="font-medium mb-4">Progress Overview</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Overall Progress</span>
                        <span>{Math.round(calculateProgress())}%</span>
                      </div>
                      <div className="h-2 bg-primary/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary transition-all duration-500"
                          style={{ width: `${calculateProgress()}%` }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="aspect-square">
                    <img
                      src="/lovable-uploads/492d75b4-1351-446d-9c80-2ac3eec03f05.png"
                      alt="Birth preparedness illustration"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="contacts" className="mt-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  {contacts.map((contact, index) => (
                    <div key={contact.role} className="space-y-2 p-4 bg-primary/5 rounded-lg">
                      <h3 className="font-medium flex items-center gap-2">
                        <User className="h-4 w-4" />
                        {contact.role}
                        {contact.isDecisionMaker && (
                          <span className="text-xs bg-primary/20 px-2 py-1 rounded">
                            Decision Maker
                          </span>
                        )}
                      </h3>
                      <div className="grid gap-2">
                        <Input
                          placeholder="Name"
                          value={contact.name}
                          onChange={(e) => updateContact(index, "name", e.target.value)}
                        />
                        <Input
                          placeholder="Phone"
                          value={contact.phone}
                          onChange={(e) => updateContact(index, "phone", e.target.value)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="space-y-4">
                  <div className="bg-primary/5 p-6 rounded-lg">
                    <h3 className="font-medium mb-4">Important Notes</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <Phone className="h-4 w-4 shrink-0 mt-1" />
                        Keep these numbers easily accessible
                      </li>
                      <li className="flex items-start gap-2">
                        <User className="h-4 w-4 shrink-0 mt-1" />
                        Discuss your preferences with your decision maker
                      </li>
                      <li className="flex items-start gap-2">
                        <MessageCircle className="h-4 w-4 shrink-0 mt-1" />
                        Ensure all contacts know their roles
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="financial" className="mt-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Expected Due Date</label>
                    <Input
                      type="date"
                      value={financialPlan.dueDate}
                      onChange={(e) => setFinancialPlan(prev => ({
                        ...prev,
                        dueDate: e.target.value
                      }))}
                    />
                  </div>

                  <div className="grid gap-4">
                    {Object.entries(financialPlan.expenses).map(([category, amount]) => (
                      <div key={category} className="space-y-2">
                        <label className="text-sm font-medium capitalize">
                          {category.replace(/([A-Z])/g, ' $1').trim()}
                        </label>
                        <Input
                          type="number"
                          placeholder="0"
                          value={amount || ""}
                          onChange={(e) => updateExpense(
                            category as keyof FinancialPlan["expenses"],
                            e.target.value
                          )}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-primary/5 p-6 rounded-lg">
                    <h3 className="font-medium mb-4">Financial Summary</h3>
                    <div className="space-y-4">
                      <div className="grid gap-2">
                        <div className="flex justify-between text-sm">
                          <span>Total Expenses</span>
                          <span className="font-medium">${calculateTotalExpenses()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Days until due date</span>
                          <span className="font-medium">{getRemainingDays()} days</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Recommended daily savings</span>
                          <span className="font-medium">${getDailySavingsTarget().toFixed(2)}</span>
                        </div>
                      </div>
                      
                      <div className="pt-4 border-t">
                        <h4 className="text-sm font-medium mb-2">Expense Breakdown</h4>
                        {Object.entries(financialPlan.expenses).map(([category, amount]) => (
                          <div key={category} className="flex justify-between text-sm">
                            <span className="capitalize text-muted-foreground">
                              {category.replace(/([A-Z])/g, ' $1').trim()}
                            </span>
                            <span>${amount}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Time-based Saving Tips
                    </h4>
                    <ul className="text-sm space-y-2 text-muted-foreground">
                      <li>• Start saving early in pregnancy</li>
                      <li>• Set aside a fixed amount weekly</li>
                      <li>• Create an emergency fund separately</li>
                      <li>• Track expenses regularly</li>
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </Card>

        <PageNavigation prevPath="/malaria" nextPath="/nutrition" />
      </div>
    </div>
  );
};

export default BirthPrep;
