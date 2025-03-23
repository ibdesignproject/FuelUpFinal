
import React from 'react';
import PageTransition from '@/components/common/PageTransition';
import BottomNavigation from '@/components/layout/BottomNavigation';
import { ChevronLeft, ChevronRight, Search, ChevronDown } from 'lucide-react';

const MealGenerator = () => {
  const ingredients = [
    "Tomato", "Potato", "Garlic", 
    "Onion", "Apple", "Lime",
    "Lemon", "Orange", "Cucumber"
  ];

  return (
    <PageTransition>
      <div className="app-container">
        <div className="page-content flex flex-col min-h-screen">
          <div className="flex-1 p-4">
            <div className="mt-8 mb-6">
              <div className="text-fuelup-text text-xl">fuelup.com</div>
              <h1 className="text-fuelup-green text-2xl mt-4">FuelUp AI</h1>
            </div>
            
            <div className="fuelup-container mb-6">
              <div className="flex justify-between items-center mb-4">
                <span>Ingredients available</span>
                <ChevronDown size={20} />
              </div>
              
              <div className="relative mb-4">
                <input
                  type="text"
                  placeholder="Search..."
                  className="fuelup-input bg-fuelup-bg pl-10"
                />
                <Search className="absolute left-3 top-3.5 text-fuelup-green" size={20} />
              </div>
              
              <div className="flex flex-wrap gap-2">
                {ingredients.map((ingredient, index) => (
                  <div key={index} className="bg-fuelup-bg text-fuelup-green px-3 py-1 rounded-md">
                    {ingredient}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="fuelup-container">
              <h2 className="text-xl mb-4">Generated recipe options...</h2>
              
              <div className="relative my-6">
                <div className="bg-fuelup-bg rounded-lg aspect-square flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-fuelup-green mb-8"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg viewBox="0 0 100 50" className="w-3/4 h-auto text-fuelup-green">
                      <polyline 
                        points="0,40 30,20 50,30 80,10" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                </div>
                
                <button className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-fuelup-green rounded-full flex items-center justify-center">
                  <ChevronLeft size={20} className="text-fuelup-bg" />
                </button>
                
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-fuelup-green rounded-full flex items-center justify-center">
                  <ChevronRight size={20} className="text-fuelup-bg" />
                </button>
                
                <p className="text-center mt-2">Recipe Name</p>
              </div>
              
              <p className="text-center mb-4">All these recipes are made personally for you!</p>
            </div>
          </div>
          
          <BottomNavigation />
        </div>
      </div>
    </PageTransition>
  );
};

export default MealGenerator;
