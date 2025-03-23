
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageTransition from '@/components/common/PageTransition';
import BottomNavigation from '@/components/layout/BottomNavigation';
import { Check, Calendar as CalendarIcon } from 'lucide-react';
import { userProfileService } from '@/services/userProfile';
import { toast } from '@/components/ui/use-toast';

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

  useEffect(() => {
    // Load user data from localStorage
    const savedData = localStorage.getItem('userFormData');
    if (savedData) {
      setUserData(JSON.parse(savedData));
    } else {
      // If no data in localStorage, use the current user from service
      const currentUser = userProfileService.getCurrentUser();
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
  }, []);

  const handleEditProfile = () => {
    navigate('/options');
  };

  const handleLogout = () => {
    userProfileService.logout();
    navigate('/');
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
                <button className="fuelup-button mb-2 w-full" onClick={handleEditProfile}>Edit Profile</button>
                <button className="fuelup-button w-full" onClick={handleLogout}>Log Out</button>
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
                <div className="flex items-center">
                  <div className="w-6 h-6 flex items-center justify-center bg-fuelup-green rounded mr-3">
                    <Check size={16} className="text-white" />
                  </div>
                  <span className="text-fuelup-green">Increase daily water intake</span>
                </div>
                
                <div className="flex items-center">
                  <div className="w-6 h-6 flex items-center justify-center bg-fuelup-green rounded mr-3">
                    <Check size={16} className="text-white" />
                  </div>
                  <span className="text-fuelup-green">Increase daily protein intake</span>
                </div>
                
                <div className="flex items-center">
                  <div className="w-6 h-6 flex items-center justify-center bg-fuelup-green rounded mr-3">
                    <Check size={16} className="text-white" />
                  </div>
                  <span className="text-fuelup-green">Stop unhealthy snacking</span>
                </div>
                
                <div className="flex items-center">
                  <div className="w-6 h-6 flex items-center justify-center bg-fuelup-green rounded mr-3">
                    <Check size={16} className="text-white" />
                  </div>
                  <span className="text-fuelup-green">Quit processed drinks</span>
                </div>
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
