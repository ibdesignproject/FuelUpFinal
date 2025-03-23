
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageTransition from '@/components/common/PageTransition';
import BottomNavigation from '@/components/layout/BottomNavigation';
import { Check, LogOut, Square } from 'lucide-react';
import { userProfileService } from '@/services/userProfile';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';

interface Goal {
  id: string;
  text: string;
  checked: boolean;
}

const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: '',
    age: '',
    weight: '',
    height: '',
    sport: '',
    competitionDate: ''
  });
  
  const [goals, setGoals] = useState<Goal[]>([
    { id: '1', text: 'Increase daily water intake', checked: true },
    { id: '2', text: 'Increase daily protein intake', checked: true },
    { id: '3', text: 'Stop unhealthy snacking', checked: true },
    { id: '4', text: 'Quit processed drinks', checked: true },
  ]);

  useEffect(() => {
    // Check if user is logged in
    const currentUser = userProfileService.getCurrentUser();
    if (!currentUser) {
      // Redirect to login if not logged in
      navigate('/');
      return;
    }
    
    // Load user data from localStorage
    const savedData = localStorage.getItem('userFormData');
    if (savedData) {
      setUserData(JSON.parse(savedData));
    } else {
      // If no data in localStorage, use the current user from service
      if (currentUser) {
        setUserData({
          name: currentUser.name || '',
          age: currentUser.age?.toString() || '',
          weight: currentUser.weight?.toString() || '',
          height: currentUser.height?.toString() || '',
          sport: '',
          competitionDate: ''
        });
      }
    }
    
    // Load saved goals if they exist
    const savedGoals = localStorage.getItem('userGoals');
    if (savedGoals) {
      setGoals(JSON.parse(savedGoals));
    }
  }, [navigate]);
  
  // Save goals to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('userGoals', JSON.stringify(goals));
  }, [goals]);

  const handleLogout = () => {
    userProfileService.logout();
    
    // Clear any user-related data from localStorage
    localStorage.removeItem('userFormData');
    localStorage.removeItem('userGoals');
    localStorage.removeItem('phoneNumber');
    
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account.",
    });
    
    // Navigate back to login page
    navigate('/');
  };
  
  const toggleGoal = (id: string) => {
    setGoals(goals.map(goal => 
      goal.id === id ? { ...goal, checked: !goal.checked } : goal
    ));
    
    toast({
      title: "Goal updated",
      description: "Your fitness goal has been updated.",
    });
  };

  return (
    <PageTransition>
      <div className="app-container">
        <div className="page-content flex flex-col min-h-screen">
          <div className="flex-1 p-4">
            <div className="mt-8 mb-6">
              <div className="text-fuelup-text text-xl">fuelup.com</div>
              <div className="flex justify-between items-start mt-4">
                <h2 className="text-fuelup-green text-2xl">Hello {userData.name || 'Athlete'},</h2>
                <div className="w-[80px] h-[80px] rounded-full border-2 border-fuelup-green flex items-center justify-center overflow-hidden bg-white">
                  <svg className="w-12 h-12 text-fuelup-green" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
              </div>
              
              <div className="mt-4 mb-2">
                <Button 
                  className="fuelup-button w-full flex items-center justify-center gap-2" 
                  onClick={handleLogout}
                  variant="default"
                >
                  <LogOut size={18} />
                  <span>Log Out</span>
                </Button>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="fuelup-container py-3 text-center">
                <p className="text-lg">{userData.name || 'Name'}</p>
              </div>
              
              <div className="fuelup-container py-3 text-center">
                <p className="text-lg">{userData.age || 'Age'}</p>
              </div>
              
              <div className="fuelup-container py-3 text-center">
                <p className="text-lg">{userData.weight || 'Weight'}</p>
              </div>
              
              <div className="fuelup-container py-3 text-center">
                <p className="text-lg">{userData.height || 'Height'}</p>
              </div>
              
              <div className="fuelup-container py-3 text-center">
                <p className="text-lg">{userData.sport || 'Sport you play'}</p>
              </div>
              
              <div className="fuelup-container py-3 text-center">
                <p className="text-lg">{userData.competitionDate || 'Date of next competition'}</p>
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="text-fuelup-green text-xl mb-4">Select all goals that apply to you:</h3>
              
              <div className="space-y-3">
                {goals.map((goal) => (
                  <div 
                    key={goal.id} 
                    className="flex items-center cursor-pointer"
                    onClick={() => toggleGoal(goal.id)}
                  >
                    <div className="w-6 h-6 flex items-center justify-center rounded mr-3 transition-colors">
                      {goal.checked ? (
                        <div className="w-6 h-6 bg-fuelup-green rounded flex items-center justify-center">
                          <Check size={16} className="text-white" />
                        </div>
                      ) : (
                        <Square size={22} className="text-fuelup-green" />
                      )}
                    </div>
                    <span className="text-fuelup-green">{goal.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <BottomNavigation />
        </div>
      </div>
    </PageTransition>
  );
};

export default Profile;
