
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PageNavigationProps {
  prevPath?: string;
  nextPath?: string;
}

const PageNavigation = ({ prevPath, nextPath }: PageNavigationProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between mt-6 px-4">
      {prevPath ? (
        <Button
          variant="outline"
          onClick={() => navigate(prevPath)}
          className="text-secondary hover:text-secondary"
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      ) : (
        <div /> // Empty div for spacing
      )}
      {nextPath && (
        <Button
          variant="secondary"
          onClick={() => navigate(nextPath)}
          className="bg-secondary text-white hover:bg-secondary/90"
        >
          Next
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      )}
    </div>
  );
};

export default PageNavigation;
