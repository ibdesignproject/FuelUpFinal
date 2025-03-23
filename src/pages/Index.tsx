
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageTransition from '@/components/common/PageTransition';
import BottomNavigation from '@/components/layout/BottomNavigation';

const Index = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/options');
  };

  return (
    <PageTransition>
      <div className="app-container">
        <div className="page-content flex flex-col min-h-screen">
          <div className="flex-1 p-4">
            <div className="mt-8 mb-6">
              <div className="text-fuelup-text text-xl">fuelup.com</div>
            </div>
            
            <div className="fuelup-container mt-8">
              <h1 className="text-2xl font-medium text-center mb-6">Signup / Login</h1>
              
              <form onSubmit={handleSignIn} className="space-y-6">
                <div className="space-y-4">
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="fuelup-input bg-fuelup-bg"
                  />
                  
                  <input
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

export default Index;
