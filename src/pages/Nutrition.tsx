
import React from 'react';
import PageTransition from '@/components/common/PageTransition';
import BottomNavigation from '@/components/layout/BottomNavigation';
import { Search, ChevronDown } from 'lucide-react';

const Nutrition = () => {
  return (
    <PageTransition>
      <div className="app-container">
        <div className="page-content flex flex-col min-h-screen">
          <div className="flex-1 p-4">
            <div className="mt-8 mb-6">
              <div className="text-fuelup-text text-xl">fuelup.com</div>
              <h1 className="text-fuelup-green text-2xl mt-4">Track and Log</h1>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="fuelup-card col-span-1">
                <div className="text-xl font-bold mb-2">Food</div>
                <div className="text-lg mb-1">000g</div>
                <div className="text-lg mb-2">Protein/Calories Consumed</div>
                <div className="text-lg mb-1">000g</div>
                <div className="text-lg mb-1">Target</div>
                <div className="text-xl font-bold mt-4">Keep pushing!</div>
              </div>
              
              <div className="fuelup-card col-span-1">
                <div className="text-xl font-bold mb-2">Water</div>
                <div className="text-lg mb-1">0000ml</div>
                <div className="text-lg mb-2">Drank today</div>
                <div className="text-lg mb-1">0000ml</div>
                <div className="text-lg mb-1">Target</div>
                <div className="text-xl font-bold mt-4">Keep pushing, you are almost there!</div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="fuelup-container flex items-center justify-center h-[50px]">
                <Search size={24} />
              </div>
              
              <div className="fuelup-container flex items-center justify-between h-[50px]">
                <span>Select amount</span>
                <ChevronDown size={20} />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-4">
              <button className="fuelup-button">Log Meal</button>
              <button className="fuelup-button">Log Water</button>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-4">
              <button className="fuelup-button">Log Snack</button>
              <button className="fuelup-button">Log Drink</button>
            </div>
          </div>
          
          <BottomNavigation />
        </div>
      </div>
    </PageTransition>
  );
};

export default Nutrition;
