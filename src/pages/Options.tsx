
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageTransition from '@/components/common/PageTransition';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import BottomNavigation from '@/components/layout/BottomNavigation';

const Options = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/profile');
  };

  const options = [
    "Option 1",
    "Option 2",
    "Option 3",
    "Option 4",
    "Option 5",
    "Option 6"
  ];

  return (
    <PageTransition>
      <div className="app-container">
        <div className="page-content flex flex-col min-h-screen bg-background">
          <div className="flex-1 p-4">
            <div className="mt-8 mb-6">
              <h1 className="text-xl font-semibold">Get to know you!</h1>
            </div>
            
            <div className="space-y-2 mb-6">
              <p className="text-muted-foreground">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-8">
              <RadioGroup value={selectedOption} onValueChange={setSelectedOption} className="space-y-4">
                {options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <RadioGroupItem 
                      value={option} 
                      id={`option-${index}`} 
                      className="border-primary"
                    />
                    <Label htmlFor={`option-${index}`} className="text-foreground">{option}</Label>
                  </div>
                ))}
              </RadioGroup>
              
              <div className="flex justify-center mt-8">
                <button 
                  type="submit" 
                  className="bg-primary text-primary-foreground px-4 py-2 rounded w-[120px] h-[40px]"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
          
          <BottomNavigation />
        </div>
      </div>
    </PageTransition>
  );
};

export default Options;
