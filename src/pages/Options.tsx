
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import PageTransition from '@/components/common/PageTransition';
import BottomNavigation from '@/components/layout/BottomNavigation';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

const Options = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [sport, setSport] = useState("");
  const [date, setDate] = useState<Date>();
  const navigate = useNavigate();

  useEffect(() => {
    // Load saved data if available
    const savedData = localStorage.getItem('userFormData');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setName(parsedData.name || "");
      setAge(parsedData.age || "");
      setWeight(parsedData.weight || "");
      setHeight(parsedData.height || "");
      setSport(parsedData.sport || "");
      if (parsedData.competitionDate) {
        setDate(new Date(parsedData.competitionDate));
      }
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save to localStorage
    const formData = {
      name,
      age,
      weight,
      height,
      sport,
      competitionDate: date ? format(date, 'PPP') : ''
    };
    
    localStorage.setItem('userFormData', JSON.stringify(formData));
    navigate('/profile');
  };

  return (
    <PageTransition>
      <div className="app-container">
        <div className="page-content flex flex-col min-h-screen">
          <div className="flex-1 p-4">
            <div className="mt-8 mb-6">
              <div className="text-fuelup-text text-xl">fuelup.com</div>
              <h1 className="text-fuelup-green text-2xl mt-4">Let's get to know you!</h1>
            </div>
            
            <div className="fuelup-container mt-4">
              <h2 className="text-xl mb-4">Kindly enter the following information:</h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="fuelup-input bg-fuelup-bg"
                />
                
                <input
                  type="number"
                  placeholder="Age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="fuelup-input bg-fuelup-bg"
                />
                
                <input
                  type="text"
                  placeholder="Weight"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="fuelup-input bg-fuelup-bg"
                />
                
                <input
                  type="text"
                  placeholder="Height"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="fuelup-input bg-fuelup-bg"
                />
                
                <input
                  type="text"
                  placeholder="Sport you play"
                  value={sport}
                  onChange={(e) => setSport(e.target.value)}
                  className="fuelup-input bg-fuelup-bg"
                />
                
                <div className="mt-4">
                  <p className="text-lg mb-2">Date of next competition:</p>
                  
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full bg-fuelup-bg border-0 text-fuelup-green justify-start text-left font-normal h-[45px]",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Select a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div className="mt-4 flex justify-end">
                  <button 
                    type="submit" 
                    className="bg-fuelup-bg text-fuelup-green px-6 py-2 rounded-lg"
                  >
                    Submit
                  </button>
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

export default Options;
