
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageTransition from '@/components/common/PageTransition';
import BottomNavigation from '@/components/layout/BottomNavigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Options = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [sport, setSport] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/profile');
  };

  // Calendar days
  const days = Array.from({ length: 28 }, (_, i) => i + 1);
  const weekdays = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

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
                  
                  <div className="bg-fuelup-bg rounded-lg p-3 mb-4">
                    <div className="flex justify-between items-center mb-4">
                      <ChevronLeft className="text-fuelup-green" />
                      <span className="text-fuelup-green">February 2017</span>
                      <ChevronRight className="text-fuelup-green" />
                    </div>
                    
                    <div className="grid grid-cols-7 gap-1">
                      {weekdays.map((day, index) => (
                        <div key={`weekday-${index}`} className="text-center text-fuelup-green">
                          {day}
                        </div>
                      ))}
                      
                      {days.map((day) => (
                        <div 
                          key={`day-${day}`} 
                          className="text-center text-fuelup-green py-1"
                        >
                          {day}
                        </div>
                      ))}
                    </div>
                  </div>
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
