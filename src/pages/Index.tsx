
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageTransition from '@/components/common/PageTransition';
import BottomNavigation from '@/components/layout/BottomNavigation';
import { userProfileService } from '@/services/userProfile';
import { toast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const currentUser = userProfileService.getCurrentUser();
    if (currentUser) {
      // User is already logged in, check if we should go to options or profile
      const savedData = localStorage.getItem('userFormData');
      if (savedData) {
        navigate('/profile');
      } else {
        navigate('/options');
      }
    }
  }, [navigate]);

  // Validate phone number whenever it changes
  useEffect(() => {
    setIsPhoneValid(phoneNumber.length === 10 && /^\d+$/.test(phoneNumber));
  }, [phoneNumber]);

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow digits
    if (/^\d*$/.test(value) && value.length <= 10) {
      setPhoneNumber(value);
    }
  };

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!phoneNumber || !password) {
      toast({
        title: "Missing Information",
        description: "Please enter both phone number and password.",
        variant: "destructive"
      });
      return;
    }

    if (!isPhoneValid) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a 10-digit phone number.",
        variant: "destructive"
      });
      return;
    }
    
    // Save to localStorage if rememberMe is checked
    if (rememberMe) {
      localStorage.setItem('phoneNumber', phoneNumber);
    } else {
      localStorage.removeItem('phoneNumber');
    }
    
    // Attempt login
    const loginSuccess = userProfileService.login(phoneNumber, password);
    
    if (loginSuccess) {
      // Check if user has already completed the form
      const savedData = localStorage.getItem('userFormData');
      if (savedData) {
        navigate('/profile');
      } else {
        navigate('/options');
      }
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid phone number or password.",
        variant: "destructive"
      });
    }
  };

  return (
    <PageTransition>
      <div className="app-container">
        <div className="page-content flex flex-col min-h-screen">
          <div className="flex-1 p-4">
            <div className="mt-8 mb-6">
              <h1 className="text-fuelup-text text-2xl">FuelUp</h1>
              <p className="text-fuelup-text text-sm mt-1">Nutrition for Athletes</p>
            </div>
            
            <div className="fuelup-container mt-8">
              <h1 className="text-2xl font-medium text-center mb-6">Signup / Login</h1>
              
              <form onSubmit={handleSignIn} className="space-y-6">
                <div className="space-y-4">
                  <Input
                    type="tel"
                    placeholder="Phone Number (10 digits)"
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                    className="fuelup-input bg-fuelup-bg"
                    maxLength={10}
                  />
                  
                  <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="fuelup-input bg-fuelup-bg"
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <div 
                    className={`w-8 h-8 rounded-full ${rememberMe ? 'bg-fuelup-bg' : 'bg-transparent border-2 border-fuelup-bg'} cursor-pointer flex items-center justify-center`}
                    onClick={() => setRememberMe(!rememberMe)}
                  >
                    {rememberMe && <div className="w-4 h-4 rounded-full bg-fuelup-green"></div>}
                  </div>
                  <span className="text-fuelup-bg">Remember me</span>
                  
                  <div className="flex-grow"></div>
                  
                  <Button 
                    type="submit" 
                    className="bg-fuelup-bg text-fuelup-green px-6 py-2 rounded-lg"
                    disabled={!isPhoneValid || !password}
                  >
                    Submit
                  </Button>
                </div>
                
                <div className="text-center text-fuelup-green">
                  <p className="text-sm">For demo purposes, enter any 10-digit number and password</p>
                </div>
              </form>
            </div>
          </div>
          
          <BottomNavigation />
        </div>
      </div>
    </PageTransition>
  );
};

export default Index;
