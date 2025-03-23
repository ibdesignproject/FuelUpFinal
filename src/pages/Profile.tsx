
import React from 'react';
import PageTransition from '@/components/common/PageTransition';
import BottomNavigation from '@/components/layout/BottomNavigation';

const Profile = () => {
  return (
    <PageTransition>
      <div className="app-container">
        <div className="page-content flex flex-col min-h-screen bg-background">
          <div className="flex-1 p-4">
            <div className="mt-8 mb-6">
              <h2 className="text-xl font-semibold">Hello Name,</h2>
            </div>
            
            <div className="flex justify-center mb-6">
              <div className="w-[100px] h-[100px] rounded-full bg-secondary flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="p-3 bg-secondary rounded-md">
                <h3 className="font-medium">Personal Details</h3>
                <p className="text-sm text-muted-foreground">Lorem ipsum dolor sit amet</p>
                <p className="text-sm text-muted-foreground">Consectetur adipiscing elit</p>
              </div>
              
              <div className="p-3 bg-secondary rounded-md">
                <h3 className="font-medium">Nutrition Preferences</h3>
                <p className="text-sm text-muted-foreground">Sed do eiusmod tempor incididunt</p>
                <p className="text-sm text-muted-foreground">Ut labore et dolore magna aliqua</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              <div className="h-[120px] bg-secondary rounded-md"></div>
              <div className="h-[120px] bg-secondary rounded-md"></div>
            </div>
          </div>
          
          <BottomNavigation />
        </div>
      </div>
    </PageTransition>
  );
};

export default Profile;
