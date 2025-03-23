
import React from 'react';
import PageTransition from '@/components/common/PageTransition';
import BottomNavigation from '@/components/layout/BottomNavigation';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Star } from 'lucide-react';

const MealBrowsing = () => {
  const mealItems = [1, 2, 3]; // Just for demonstration
  
  return (
    <PageTransition>
      <div className="app-container">
        <div className="page-content flex flex-col min-h-screen bg-background">
          <div className="flex-1 p-4">
            <div className="mt-8 mb-6">
              <h1 className="text-xl font-semibold">Meal Browsing</h1>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-3">
                <div className="flex space-x-2">
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
                  
                  <Select>
                    <SelectTrigger className="w-[160px] h-[45px]">
                      <SelectValue placeholder="Sort" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Newest</SelectItem>
                      <SelectItem value="oldest">Oldest</SelectItem>
                      <SelectItem value="popular">Most Popular</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-4">
                {mealItems.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="h-[120px] bg-secondary rounded-md"></div>
                    <p className="text-sm text-muted-foreground">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                          key={star} 
                          size={16} 
                          className="text-yellow-500" 
                          fill={star <= 3 ? "currentColor" : "none"}
                        />
                      ))}
                    </div>
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

export default MealBrowsing;
