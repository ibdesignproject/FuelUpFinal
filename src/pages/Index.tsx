
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageTransition from '@/components/common/PageTransition';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
        <div className="page-content flex flex-col min-h-screen bg-background">
          <div className="flex-1 p-4">
            <div className="mt-8 mb-6">
              <h1 className="text-xl font-semibold text-center">Sign up / Login</h1>
            </div>
            
            <form onSubmit={handleSignIn} className="space-y-6 mt-8">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input 
                  id="phone" 
                  type="tel" 
                  placeholder="Phone Number" 
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full h-[45px]"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="Password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-[45px]"
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="rememberMe" 
                  checked={rememberMe} 
                  onCheckedChange={(checked) => setRememberMe(checked === true)}
                />
                <Label htmlFor="rememberMe" className="text-sm">Remember me</Label>
              </div>
              
              <div className="flex justify-end">
                <button 
                  type="submit" 
                  className="bg-primary text-primary-foreground px-4 py-2 rounded w-[120px] h-[40px]"
                >
                  Sign in
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

export default Index;
