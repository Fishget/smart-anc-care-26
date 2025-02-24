
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import PageNavigation from "@/components/PageNavigation";
import { 
  Bug, 
  Shield, 
  Thermometer, 
  CheckSquare, 
  Star,
  Trophy,
  ArrowRight
} from "lucide-react";

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
  checklist?: string[];
}

const levels: GameLevel[] = [
  {
    id: 1,
    title: "Understanding Malaria",
    description: "Learn the basics of malaria during pregnancy",
    points: 100,
    icon: <Bug className="h-6 w-6" />,
    quiz: {
      question: "Which of these is NOT a malaria symptom?",
      options: ["Fever", "Headache", "Rash", "Chills"],
      correct: 2
    }
  },
  {
    id: 2,
    title: "Prevention Master",
    description: "Master malaria prevention techniques",
    points: 150,
    icon: <Shield className="h-6 w-6" />,
    checklist: [
      "Use mosquito net daily",
      "Keep surroundings clean",
      "Take preventive medicine",
      "Wear protective clothing"
    ]
  },
  {
    id: 3,
    title: "Symptom Detective",
    description: "Learn to identify malaria symptoms",
    points: 200,
    icon: <Thermometer className="h-6 w-6" />,
    quiz: {
      question: "When should you seek medical help?",
      options: [
        "When fever starts",
        "After one week",
        "When symptoms are severe",
        "Only if prescribed"
      ],
      correct: 0
    }
  },
  {
    id: 4,
    title: "Prevention Champion",
    description: "Complete your malaria prevention journey",
    points: 250,
    icon: <Trophy className="h-6 w-6" />,
    checklist: [
      "Schedule regular check-ups",
      "Complete preventive treatment",
      "Maintain prevention habits",
      "Share knowledge with others"
    ]
  }
];

const Malaria = () => {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [completedLevels, setCompletedLevels] = useState<number[]>([]);

  const handleAnswer = (levelId: number, answerIndex: number) => {
    const level = levels.find(l => l.id === levelId);
    if (level?.quiz && answerIndex === level.quiz.correct) {
      toast.success(`Correct! +${level.points} points`);
      setScore(prev => prev + level.points);
      setCompletedLevels(prev => [...prev, levelId]);
      if (currentLevel < levels.length) {
        setCurrentLevel(prev => prev + 1);
      }
    } else {
      toast.error("Try again!");
    }
  };

  const handleChecklistComplete = (levelId: number) => {
    const level = levels.find(l => l.id === levelId);
    if (level) {
      toast.success(`Level completed! +${level.points} points`);
      setScore(prev => prev + level.points);
      setCompletedLevels(prev => [...prev, levelId]);
      if (currentLevel < levels.length) {
        setCurrentLevel(prev => prev + 1);
      }
    }
  };

  const progress = (completedLevels.length / levels.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-muted p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold text-foreground flex items-center gap-2">
            <Bug className="h-8 w-8" />
            Malaria Prevention Quest
          </h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              <span className="font-bold">{score}</span>
            </div>
          </div>
        </div>

        <Card className="p-6">
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

                    {level.quiz && currentLevel === level.id && (
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

                    {level.checklist && currentLevel === level.id && (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          {level.checklist.map((item, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <input 
                                type="checkbox" 
                                id={`checklist-${level.id}-${index}`}
                                className="rounded border-gray-300 text-primary focus:ring-primary"
                              />
                              <label 
                                htmlFor={`checklist-${level.id}-${index}`}
                                className="text-sm"
                              >
                                {item}
                              </label>
                            </div>
                          ))}
                        </div>
                        <Button 
                          className="w-full"
                          onClick={() => handleChecklistComplete(level.id)}
                        >
                          Complete Level <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </ScrollArea>
          </div>
        </Card>

        <PageNavigation prevPath="/lifestyle" nextPath="/birth-prep" />
      </div>
    </div>
  );
};

export default Malaria;
