
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import PageNavigation from "@/components/PageNavigation";
import {
  Bug,
  Shield,
  BookOpen,
  Info,
  ArrowRight
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface GameLevel {
  id: number;
  title: string;
  description: string;
  points: number;
  icon: JSX.Element;
  quiz?: {
    question: string;
    options: string[];
    correct: number;
  };
}

const levels: GameLevel[] = [
  {
    id: 1,
    title: "Malaria Knowledge",
    description: "Test your knowledge about malaria",
    points: 150,
    icon: <Bug className="h-6 w-6" />,
    quiz: {
      question: "Which of these is the most effective way to prevent malaria during pregnancy?",
      options: [
        "Sleep under an insecticide-treated bed net",
        "Stay indoors at all times",
        "Taking medicine only when sick",
        "Using perfume to keep mosquitoes away"
      ],
      correct: 0
    }
  },
  {
    id: 2,
    title: "Prevention Master",
    description: "Master malaria prevention techniques",
    points: 150,
    icon: <Shield className="h-6 w-6" />,
    quiz: {
      question: "When should you seek medical help if you suspect malaria?",
      options: [
        "Immediately when fever starts",
        "After one week of symptoms",
        "Only if prescribed by a friend",
        "There's no need to seek help"
      ],
      correct: 0
    }
  }
];

const Malaria = () => {
  const navigate = useNavigate();
  const [showEducation, setShowEducation] = useState(true);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [completedLevels, setCompletedLevels] = useState<number[]>([]);
  const [showSummary, setShowSummary] = useState(false);

  const handleStartQuiz = () => {
    setShowEducation(false);
  };

  const handleAnswer = (levelId: number, answerIndex: number) => {
    const level = levels.find(l => l.id === levelId);
    if (level?.quiz && answerIndex === level.quiz.correct) {
      toast.success(`Correct! +${level.points} points`);
      setScore(prev => prev + level.points);
      setCompletedLevels(prev => [...prev, levelId]);
      if (currentLevel < levels.length) {
        setCurrentLevel(prev => prev + 1);
      } else {
        handleComplete();
      }
    } else {
      toast.error("Try again!");
    }
  };

  const handleComplete = () => {
    if (completedLevels.length === levels.length) {
      setShowSummary(true);
      toast.success("🎉 Congratulations! You've completed the malaria quiz!", {
        duration: 5000
      });
    }
  };

  const progress = (completedLevels.length / levels.length) * 100;

  const renderHotspots = () => (
    <div className="relative">
      <img
        src="/lovable-uploads/896d3b86-9724-462d-9ff5-5af853c9c313.png"
        alt="Malaria prevention illustration"
        className="w-full rounded-lg"
      />
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="absolute top-[10%] left-[15%] rounded-full w-8 h-8 animate-pulse"
            >
              <Info className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Mosquitoes can carry and transmit malaria</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="absolute top-[40%] left-[50%] rounded-full w-8 h-8 animate-pulse"
            >
              <Info className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Sleep under an insecticide-treated bed net</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="absolute bottom-[30%] right-[20%] rounded-full w-8 h-8 animate-pulse"
            >
              <Info className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Regular check-ups help prevent malaria</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FFE5B4] p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold text-foreground flex items-center gap-2">
            <Bug className="h-8 w-8" />
            Malaria Prevention Quest
          </h1>
          {!showEducation && (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="font-bold">Score: {score}</span>
              </div>
            </div>
          )}
        </div>

        <Card className="p-6">
          {showEducation ? (
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-primary" />
                <h2 className="text-xl font-semibold">Learn About Malaria</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Educational text */}
                <div className="prose max-w-none">
                  <p>Malaria is a life-threatening disease spread to humans by some types of mosquitoes. It is preventable and curable. When you are pregnant, you are more at risk of severe infection.</p>
                  
                  <p>Malaria can increase the risk of negative outcomes for your baby, such as early delivery, miscarriage or stillbirth.</p>

                  <h3 className="font-semibold mt-4">Prevention:</h3>
                  <p>One of the best things you can do to prevent infection is to sleep under a long-lasting insecticide treated net (LLIN). These nets are treated with special chemicals that not only block but also kill mosquitoes.</p>

                  <h3 className="font-semibold mt-4">Treatment:</h3>
                  <p>Starting in the 4th month of pregnancy you will receive preventative medicine. You will receive this at least three times, with one month between each dose.</p>
                </div>
                
                {/* Interactive image with hotspots */}
                {renderHotspots()}
              </div>
              
              <div className="mt-6">
                <Button 
                  onClick={handleStartQuiz}
                  className="w-full"
                >
                  Start Quiz <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Progress value={progress} className="flex-1" />
                <span className="text-sm font-medium">{Math.round(progress)}%</span>
              </div>

              <ScrollArea className="h-[500px] rounded-md border p-4">
                {levels.map((level) => (
                  <Card 
                    key={level.id} 
                    className={`p-6 mb-4 ${
                      currentLevel === level.id ? 'ring-2 ring-primary' : ''
                    } ${
                      completedLevels.includes(level.id) ? 'opacity-50' : ''
                    }`}
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {level.icon}
                          <h2 className="font-semibold">{level.title}</h2>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {level.points} points
                        </span>
                      </div>

                      <p className="text-muted-foreground">{level.description}</p>

                      {level.quiz && currentLevel === level.id && !completedLevels.includes(level.id) && (
                        <div className="space-y-4">
                          <p className="font-medium">{level.quiz.question}</p>
                          <div className="grid gap-2">
                            {level.quiz.options.map((option, index) => (
                              <Button
                                key={index}
                                variant="outline"
                                className="justify-start"
                                onClick={() => handleAnswer(level.id, index)}
                              >
                                {option}
                              </Button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </Card>
                ))}

                {showSummary && (
                  <Card className="p-6 bg-secondary/10">
                    <div className="text-center space-y-4">
                      <h2 className="text-xl font-semibold">Quiz Completed!</h2>
                      <p>You've successfully completed the Malaria Prevention Quiz.</p>
                      <p className="text-lg font-bold">Total Score: {score}</p>
                      <p>Remember to always sleep under an insecticide-treated bed net and take preventive medicine as prescribed during your pregnancy.</p>
                    </div>
                  </Card>
                )}
              </ScrollArea>
            </div>
          )}
        </Card>

        <PageNavigation 
          prevPath="/lifestyle" 
          nextPath={completedLevels.length === levels.length ? "/birth-prep" : "/birth-prep"}
        />
      </div>
    </div>
  );
};

export default Malaria;
