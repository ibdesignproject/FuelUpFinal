
import React from 'react';
import PageTransition from '@/components/common/PageTransition';
import BottomNavigation from '@/components/layout/BottomNavigation';
import { Search, Star } from 'lucide-react';

const MealBrowsing = () => {
  return (
    <PageTransition>
      <div className="app-container">
        <div className="page-content flex flex-col min-h-screen">
          <div className="flex-1 p-4">
            <div className="mt-8 mb-6">
              <div className="text-fuelup-text text-xl">fuelup.com</div>
              <h1 className="text-fuelup-green text-2xl mt-4">Browse Recipes</h1>
            </div>
            
            <div className="relative mb-6">
              <input
                type="text"
                placeholder="Search"
                className="fuelup-input pl-10"
              />
              <Search className="absolute left-3 top-3.5 text-fuelup-green" size={20} />
              <div className="absolute right-3 top-3.5 text-fuelup-green">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"></path>
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                  <line x1="12" y1="19" x2="12" y2="22"></line>
                </svg>
              </div>
            </div>
            
            <div className="space-y-6">
              {[1, 2, 3].map((item) => (
                <div key={item} className="fuelup-container p-3">
                  <div className="flex space-x-4">
                    <div className="w-24 h-24 bg-fuelup-bg rounded flex items-center justify-center">
                      <div className="w-8 h-8 rounded-full bg-fuelup-green mb-6"></div>
                      <div className="absolute flex items-center justify-center">
                        <svg viewBox="0 0 100 50" className="w-16 h-auto text-fuelup-green">
                          <polyline 
                            points="0,40 30,20 50,30 80,10" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="2"
                          />
                        </svg>
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-lg font-medium">Recipe Name</h3>
                      <p className="text-sm">Recipe Description and overview</p>
                      
                      <div className="flex mt-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star 
                            key={star} 
                            size={16} 
                            className="text-fuelup-bg" 
                            fill={star <= 4 ? "currentColor" : "none"}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <BottomNavigation />
        </div>
      </div>
    </PageTransition>
  );
};

export default MealBrowsing;
