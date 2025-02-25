import { useState, useEffect } from "react";
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
  HeartPulse,
  X,
  ChevronDown
} from "lucide-react";

interface ChecklistItem {
  id: string;
  text: string;
  checked: boolean;
  category: string;
  image: string;
  details: {
    text: string;
    audioUrl?: string;
    videoUrl?: string;
  };
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
  currentSaving: number;
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
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  const [checklist, setChecklist] = useState<ChecklistItem[]>([
    { 
      id: "facility", 
      text: "Identify and visit preferred health facility", 
      checked: false, 
      category: "Facility",
      image: "/lovable-uploads/4fec9484-8331-4c26-9ea5-bdcb8d88a6dc.png",
      details: {
        text: "Choose a facility that provides comprehensive maternity care. Consider factors like distance, available services, and cost."
      }
    },
    { 
      id: "staff", 
      text: "Meet with healthcare providers", 
      checked: false, 
      category: "Facility",
      image: "/lovable-uploads/314ccb3f-8b22-43a4-b4e9-5e2806f06dde.png",
      details: {
        text: "Schedule appointments with healthcare providers to discuss your birth plan and preferences."
      }
    },
    { 
      id: "services", 
      text: "Understand available services and costs", 
      checked: false, 
      category: "Facility",
      image: "/lovable-uploads/43488e3d-21a7-4a5f-b15d-e6928f8e640e.png",
      details: {
        text: "Research and understand the services offered at your chosen facility and their associated costs."
      }
    },
    { 
      id: "transport1", 
      text: "Arrange primary transportation method", 
      checked: false, 
      category: "Transport",
      image: "/lovable-uploads/13b0c1b2-6429-4af2-bd29-bab595918deb.png",
      details: {
        text: "Plan your primary mode of transportation to the health facility."
      }
    },
    { 
      id: "transport2", 
      text: "Set up backup transport plan", 
      checked: false, 
      category: "Transport",
      image: "/lovable-uploads/53696afc-1da0-4d7c-bb1e-05985ef7b285.png",
      details: {
        text: "Have a backup transportation plan in case your primary option is unavailable."
      }
    },
    { 
      id: "transport3", 
      text: "Save emergency taxi numbers", 
      checked: false, 
      category: "Transport",
      image: "/lovable-uploads/6c63e382-eaa9-4ce3-ae53-243fd8e6bccf.png",
      details: {
        text: "Keep emergency transport numbers readily available. Store ambulance and reliable taxi service contacts."
      }
    },
    { 
      id: "items1", 
      text: "Pack mother's clothing", 
      checked: false, 
      category: "Items",
      image: "/lovable-uploads/70f05d9b-971b-46a3-9ff5-7b0f58674249.png",
      details: {
        text: "Pack comfortable maternity clothing suitable for hospital stay."
      }
    },
    { 
      id: "items2", 
      text: "Pack baby clothes and blankets", 
      checked: false, 
      category: "Items",
      image: "/lovable-uploads/a417a917-f62c-4e53-b921-3a82bf0dd9ec.png",
      details: {
        text: "Pack appropriately sized clothing and blankets for the newborn."
      }
    },
    { 
      id: "items3", 
      text: "Pack sanitary supplies", 
      checked: false, 
      category: "Items",
      image: "/placeholder.svg",
      details: {
        text: "Include necessary sanitary supplies in your hospital bag."
      }
    },
    { 
      id: "items4", 
      text: "Prepare essential documents", 
      checked: false, 
      category: "Items",
      image: "/placeholder.svg",
      details: {
        text: "Gather and organize all necessary medical and identification documents."
      }
    },
    { 
      id: "support1", 
      text: "Arrange birth support person", 
      checked: false, 
      category: "Support",
      image: "/placeholder.svg",
      details: {
        text: "Choose and confirm your birth support person or doula."
      }
    },
    { 
      id: "support2", 
      text: "Plan postpartum care support", 
      checked: false, 
      category: "Support",
      image: "/placeholder.svg",
      details: {
        text: "Arrange for help and support during the postpartum period."
      }
    },
    { 
      id: "support3", 
      text: "Discuss family planning options", 
      checked: false, 
      category: "Support",
      image: "/placeholder.svg",
      details: {
        text: "Consider and discuss postpartum family planning options with your healthcare provider."
      }
    },
    { 
      id: "comm1", 
      text: "Create emergency contact list", 
      checked: false, 
      category: "Communication",
      image: "/placeholder.svg",
      details: {
        text: "Compile a list of emergency contacts and keep it easily accessible."
      }
    },
    { 
      id: "comm2", 
      text: "Set up communication plan", 
      checked: false, 
      category: "Communication",
      image: "/placeholder.svg",
      details: {
        text: "Create a plan for communicating with family and support persons during labor."
      }
    },
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
    currentSaving: 0,
    expenses: {
      transport: 0,
      facility: 0,
      supplies: 0,
      emergency: 0,
      postpartum: 0
    }
  });

  const [selectedItem, setSelectedItem] = useState<ChecklistItem | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [dueDate, setDueDate] = useState<Date>();

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

  const saveContactsToLocalStorage = () => {
    localStorage.setItem('birthPrepContacts', JSON.stringify(contacts));
    toast.success("Emergency contacts saved successfully!");
  };

  const loadContactsFromLocalStorage = () => {
    const savedContacts = localStorage.getItem('birthPrepContacts');
    if (savedContacts) {
      setContacts(JSON.parse(savedContacts));
      toast.success("Emergency contacts loaded successfully!");
    }
  };

  useEffect(() => {
    loadContactsFromLocalStorage();
  }, []);

  const toggleCategory = (category: string) => {
    if (expandedCategory === category) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(category);
    }
  };

  const handleChecklistItemClick = (itemId: string) => {
    if (selectedItemId === itemId) {
      setSelectedItemId(null);
      setSelectedImage(null);
    } else {
      setSelectedItemId(itemId);
      const item = checklist.find(i => i.id === itemId);
      if (item) {
        setSelectedImage(item.image);
      }
    }
    toggleChecklistItem(itemId);
  };

  const getDaysUntilBirth = () => {
    if (!dueDate) return null;
    const today = new Date();
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  return (
    <div className="min-h-screen bg-[#FFE5B4] p-6">
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
              <div className="grid md:grid-cols-3 gap-6">
                {["Facility", "Transport", "Items"].map(category => (
                  <div key={category} className="space-y-2">
                    <Button
                      variant="ghost"
                      className="w-full justify-between p-4 hover:bg-primary/5"
                      onClick={() => toggleCategory(category)}
                    >
                      <span className="font-medium flex items-center gap-2">
                        {category === "Facility" && <MapPin className="h-4 w-4" />}
                        {category === "Transport" && <Car className="h-4 w-4" />}
                        {category === "Items" && <List className="h-4 w-4" />}
                        {category}
                      </span>
                      <ChevronDown 
                        className={`h-4 w-4 transition-transform ${
                          expandedCategory === category ? 'rotate-180' : ''
                        }`}
                      />
                    </Button>
                    {expandedCategory === category && (
                      <div className="space-y-2 animate-accordion-down">
                        {checklist
                          .filter(item => item.category === category)
                          .map(item => (
                            <div key={item.id} className="space-y-2">
                              <Button
                                variant="outline"
                                className={`w-full justify-between h-auto p-4 ${
                                  item.checked ? 'bg-primary/10' : ''
                                }`}
                                onClick={() => handleChecklistItemClick(item.id)}
                              >
                                <span className="text-sm text-left">{item.text}</span>
                                <CheckSquare 
                                  className={`h-4 w-4 ${
                                    item.checked ? 'text-primary' : 'text-muted-foreground'
                                  }`} 
                                />
                              </Button>
                              {selectedItemId === item.id && (
                                <div className="animate-fade-in">
                                  <img
                                    src={item.image}
                                    alt={item.text}
                                    className="w-full h-32 object-cover rounded-lg cursor-pointer"
                                    onClick={() => {
                                      setSelectedItem(item);
                                      setShowDetails(true);
                                    }}
                                  />
                                  <p className="text-sm text-muted-foreground mt-2 px-2">
                                    {item.details.text}
                                  </p>
                                </div>
                              )}
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                ))}
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
                  <Button 
                    className="w-full" 
                    onClick={saveContactsToLocalStorage}
                  >
                    <Phone className="mr-2 h-4 w-4" />
                    Save Emergency Contacts
                  </Button>
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

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Target Saving Amount</label>
                    <Input
                      type="number"
                      placeholder="Enter target amount"
                      value={financialPlan.targetSaving || ""}
                      onChange={(e) => setFinancialPlan(prev => ({
                        ...prev,
                        targetSaving: parseFloat(e.target.value) || 0
                      }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Current Savings</label>
                    <Input
                      type="number"
                      placeholder="Enter current savings"
                      value={financialPlan.currentSaving || ""}
                      onChange={(e) => setFinancialPlan(prev => ({
                        ...prev,
                        currentSaving: parseFloat(e.target.value) || 0
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
                    <h3 className="font-medium mb-4">Savings Progress</h3>
                    <div className="space-y-4">
                      <div className="grid gap-2">
                        <div className="flex justify-between text-sm">
                          <span>Target Amount</span>
                          <span className="font-medium">${financialPlan.targetSaving}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Current Savings</span>
                          <span className="font-medium">${financialPlan.currentSaving}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Remaining to Save</span>
                          <span className="font-medium">
                            ${Math.max(0, financialPlan.targetSaving - financialPlan.currentSaving)}
                          </span>
                        </div>
                        <div className="h-2 bg-primary/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary transition-all duration-500"
                            style={{ 
                              width: `${Math.min(
                                (financialPlan.currentSaving / financialPlan.targetSaving) * 100,
                                100
                              )}%` 
                            }}
                          />
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

        <div className="text-center mb-4">
          {getDaysUntilBirth() !== null && (
            <p className="text-lg font-semibold">
              Days until birth: {getDaysUntilBirth()}
            </p>
          )}
        </div>

        {showDetails && selectedItem && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-2xl">
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-medium">{selectedItem.text}</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowDetails(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                
                <img
                  src={selectedItem.image}
                  alt={selectedItem.text}
                  className="w-full h-64 object-cover rounded-lg"
                />
                
                <p className="text-muted-foreground">{selectedItem.details.text}</p>
                
                {selectedItem.details.audioUrl && (
                  <audio controls className="w-full">
                    <source src={selectedItem.details.audioUrl} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                )}
                
                {selectedItem.details.videoUrl && (
                  <video controls className="w-full">
                    <source src={selectedItem.details.videoUrl} type="video/mp4" />
                    Your browser does not support the video element.
                  </video>
                )}
              </div>
            </Card>
          </div>
        )}

        <PageNavigation prevPath="/malaria" nextPath="/nutrition" />
      </div>
    </div>
  );
};

export default BirthPrep;
