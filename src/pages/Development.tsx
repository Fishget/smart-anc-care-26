import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import PageNavigation from "@/components/PageNavigation";

interface DevelopmentInfo {
  size: string;
  fruit: string;
  description: string;
  trimester: number;
}

const developmentData: { [key: number]: DevelopmentInfo } = {
  1: {
    size: "Smaller than a grain of rice",
    fruit: "Poppy seed",
    description: "In these first few weeks, the mouth, lower jaw and throat are developing. The tiny heart tube will beat 65 times a minute by the end of the fourth week.",
    trimester: 1
  },
  2: {
    size: "Size of a kidney bean",
    fruit: "Sweet pea",
    description: "Facial features and ears are developing. Arms and legs, fingers and toes are starting to form. At about 6 weeks, a heartbeat can usually be detected.",
    trimester: 1
  },
  3: {
    size: "Size of a lemon",
    fruit: "Blueberry",
    description: "The arms, hands, fingers, feet and toes are fully formed. The fetus is starting to explore by opening and closing its fists and mouth. Fingernails, toenails and teeth (under the gums) are beginning to develop.",
    trimester: 1
  },
  4: {
    size: "Size of an avocado",
    fruit: "Grape",
    description: "The fingers and toes are well defined. Eyelids, eyebrows, eyelashes, nails and hair are formed. Teeth and bones become denser. The fetus can even suck their thumb, yawn, stretch and make faces.",
    trimester: 2
  },
  5: {
    size: "Size of a banana",
    fruit: "Lime",
    description: "At this stage, you may begin to feel the fetus moving around. The fetus is developing muscles and exercising them.",
    trimester: 2
  },
  6: {
    size: "Size of maize",
    fruit: "Lemon",
    description: "The fetus's skin is reddish in color, wrinkled and veins are visible through translucent skin. The finger and toe prints are visible. In this stage, the eye lids begin to part and the eyes open.",
    trimester: 2
  },
  7: {
    size: "Size of an aubergine",
    fruit: "Orange",
    description: "The fetus continues to mature and develop reserves of body fat. At this point hearing is fully developed. The fetus changes position frequently and responds to stimuli, including sound, pain and light.",
    trimester: 2
  },
  8: {
    size: "Size of a cabbage",
    fruit: "Mango",
    description: "The fetus continues to mature and develop reserves of body fat. You may notice more kicking. The brain is developing rapidly at this time and the fetus can see and hear.",
    trimester: 3
  },
  9: {
    size: "Size of a pumpkin",
    fruit: "Papaya",
    description: "The lungs are close to being fully developed at this point. The fetus has coordinated reflexes and can blink, close the eyes, turn the head, grasp firmly and respond to sounds, light and touch.",
    trimester: 3
  },
  10: {
    size: "Size of a watermelon",
    fruit: "Banana",
    description: "In this final month, the space in your belly is tight and you could go into labor at any time. The fetus's position may have changed to be head down to prepare for birth.",
    trimester: 3
  }
};

const trimesterImages = {
  1: "/lovable-uploads/492d75b4-1351-446d-9c80-2ac3eec03f05.png",
  2: "/lovable-uploads/53696afc-1da0-4d7c-bb1e-05985ef7b285.png",  
  3: "/lovable-uploads/13b0c1b2-6429-4af2-bd29-bab595918deb.png"
};

const Development = () => {
  const [month, setMonth] = useState(1);
  const info = developmentData[month] || developmentData[1]; // Fallback to first month if invalid

  const getTrimesterText = (trimester: number) => {
    return `Trimester ${trimester} (${
      trimester === 1 ? "Weeks 1-12" :
      trimester === 2 ? "Weeks 13-26" : "Weeks 27-40"
    })`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-muted p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-semibold text-foreground text-center mb-8">
          Baby's Development
        </h1>

        <Card className="p-6 animate-fadeIn">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-medium text-foreground">
                  Month {month}
                </h2>
                <span className="text-sm font-medium text-secondary">
                  {getTrimesterText(info.trimester)}
                </span>
              </div>
              
              <div className="space-y-2">
                <Slider
                  value={[month]}
                  onValueChange={(value) => setMonth(value[0])}
                  min={1}
                  max={10}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between px-2">
                  {Array.from({ length: 10 }, (_, i) => (
                    <span 
                      key={i + 1} 
                      className={`text-xs ${month === i + 1 ? 'text-secondary font-bold' : 'text-foreground/60'}`}
                    >
                      {i + 1}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="text-sm text-muted-foreground text-center">
                Move the slider to see your baby's development
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="aspect-square bg-primary/10 rounded-lg flex items-center justify-center overflow-hidden">
                  <img 
                    src={trimesterImages[info.trimester]}
                    alt={`Embryo development - Month ${month}`}
                    className="w-full h-full object-contain p-4"
                  />
                </div>
                <div className="text-center space-y-2">
                  <p className="text-foreground font-medium">Size: {info.size}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-secondary/5 p-6 rounded-lg">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center overflow-hidden">
                        <img 
                          src="https://images.unsplash.com/photo-1582562124811-c09040d0a901"
                          alt={info.fruit}
                          className="w-12 h-12 object-contain"
                        />
                      </div>
                      <p className="text-foreground">
                        Your baby is now the size of a {info.fruit}
                      </p>
                    </div>
                    <p className="text-foreground/80">{info.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <PageNavigation prevPath="/intro" nextPath="/danger-signs" />
      </div>
    </div>
  );
};

export default Development;
