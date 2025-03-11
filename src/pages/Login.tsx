
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

// Predefined user accounts
const USERS = [
  { username: "user1", password: "password1" },
  { username: "user2", password: "password2" },
  { username: "user3", password: "password3" },
  { username: "user4", password: "password4" },
  { username: "user5", password: "password5" },
  { username: "user6", password: "password6" },
  { username: "user7", password: "password7" },
  { username: "user8", password: "password8" },
  { username: "user9", password: "password9" },
  { username: "user10", password: "password10" },
  // The original generic login will still work
  { username: "admin", password: "admin" },
];

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if username and password match any predefined user
    const user = USERS.find(
      (u) => u.username === formData.username && u.password === formData.password
    );
    
    if (user) {
      // Store the username in localStorage for later use if needed
      localStorage.setItem("currentUser", formData.username);
      navigate("/intro");
    } else if (formData.username && formData.password) {
      // Any non-empty credentials still work for demo purposes
      navigate("/intro");
    } else {
      // Show error toast if fields are empty
      toast({
        title: "Login Failed",
        description: "Please enter your username and password",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-muted flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-6 space-y-6">
        <div className="text-center space-y-2">
          <img 
            src="/lovable-uploads/6624391a-92ec-44e7-a6c6-17520fabfb34.png" 
            alt="PSI Logo" 
            className="h-16 mx-auto"
          />
          <h1 className="text-2xl font-semibold">Welcome to SMART ANC CARE</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default Login;
