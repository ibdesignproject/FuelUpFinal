
import React from 'react';
import PageTransition from '@/components/common/PageTransition';
import BottomNavigation from '@/components/layout/BottomNavigation';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Nutrition = () => {
  return (
    <PageTransition>
      <div className="app-container">
        <div className="page-content flex flex-col min-h-screen bg-background">
          <div className="flex-1 p-4">
            <div className="mt-8 mb-6">
              <h1 className="text-xl font-semibold">Nutrition Tracking</h1>
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="h-[170px] bg-secondary rounded-md flex items-center justify-center">
                  <p className="text-sm text-center">Nutrition Chart 1</p>
                </div>
                <div className="h-[170px] bg-secondary rounded-md flex items-center justify-center">
                  <p className="text-sm text-center">Nutrition Chart 2</p>
                </div>
              </div>
              
              <div className="p-3 bg-secondary rounded-md">
                <p className="text-sm">Text content about nutrition tracking and charts</p>
              </div>
              
              <div className="space-y-3">
                <div className="flex space-x-2">
                  <Input className="w-[160px] h-[45px]" placeholder="Search" />
                  <Select>
                    <SelectTrigger className="w-[160px] h-[45px]">
                      <SelectValue placeholder="Filter" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="option1">Option 1</SelectItem>
                      <SelectItem value="option2">Option 2</SelectItem>
                      <SelectItem value="option3">Option 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <button className="bg-primary text-primary-foreground h-[45px] rounded w-[160px]">
                  Log Food
                </button>
                <button className="bg-primary text-primary-foreground h-[45px] rounded w-[160px]">
                  Log Water
                </button>
              </div>
            </div>
          </div>
          
          <BottomNavigation />
        </div>
      </div>
    </PageTransition>
  );
};

export default Nutrition;
