
import React from 'react';
import PageTransition from '@/components/common/PageTransition';
import BottomNavigation from '@/components/layout/BottomNavigation';
import { Input } from '@/components/ui/input';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const MealGenerator = () => {
  return (
    <PageTransition>
      <div className="app-container">
        <div className="page-content flex flex-col min-h-screen bg-background">
          <div className="flex-1 p-4">
            <div className="mt-8 mb-6">
              <h1 className="text-xl font-semibold">AI Meal Generator</h1>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <Input 
                  placeholder="Input" 
                  className="w-full h-[45px]"
                />
              </div>
              
              <div className="relative">
                <div className="h-[200px] bg-secondary rounded-md flex items-center justify-center">
                  <p className="text-muted-foreground">Meal Image Placeholder</p>
                </div>
                
                <button className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center">
                  <ChevronLeft size={20} />
                </button>
                
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center">
                  <ChevronRight size={20} />
                </button>
              </div>
              
              <div className="p-3 bg-secondary rounded-md">
                <p className="text-sm">Text content about this meal</p>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="h-[100px] bg-secondary rounded-md"></div>
                <div className="h-[100px] bg-secondary rounded-md"></div>
                <div className="h-[100px] bg-secondary rounded-md"></div>
              </div>
            </div>
          </div>
          
          <BottomNavigation />
        </div>
      </div>
    </PageTransition>
  );
};

export default MealGenerator;
