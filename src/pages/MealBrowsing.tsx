
import React, { useState, useEffect } from 'react';
import PageTransition from '@/components/common/PageTransition';
import BottomNavigation from '@/components/layout/BottomNavigation';
import { Search, Star, Clock, Bookmark, ChevronDown } from 'lucide-react';
import { recipeGenerator } from '@/services/recipeGenerator';
import { userProfileService } from '@/services/userProfile';
import { toast } from '@/components/ui/use-toast';

const MealBrowsing = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [recipes, setRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filter, setFilter] = useState<'all' | 'popular' | 'recent'>('all');
  
  useEffect(() => {
    const loadRecipes = async () => {
      setLoading(true);
      try {
        // For demo purposes, we'll use the existing recipe generator with empty ingredients
        const allRecipes = await recipeGenerator.getRecommendations([]);
        
        // Add some mock data for UI
        const enhancedRecipes = allRecipes.map(recipe => ({
          ...recipe,
          rating: Math.floor(Math.random() * 5) + 1,
          timeAdded: new Date(Date.now() - Math.random() * 604800000).toISOString(), // Random time within last week
          popularity: Math.floor(Math.random() * 100) + 1
        }));
        
        setRecipes(enhancedRecipes);
      } catch (error) {
        console.error("Error loading recipes:", error);
        toast({
          title: "Error",
          description: "Failed to load recipes. Please try again.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    
    loadRecipes();
  }, []);
  
  // Filter recipes based on search term and selected filter
  const filteredRecipes = recipes
    .filter(recipe => 
      recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (filter === 'popular') {
        return b.popularity - a.popularity;
      } else if (filter === 'recent') {
        return new Date(b.timeAdded).getTime() - new Date(a.timeAdded).getTime();
      }
      return 0; // No sorting for 'all'
    });
  
  const addToMeals = (recipe: any) => {
    userProfileService.addMeal({
      name: recipe.name,
      calories: recipe.nutritionInfo.calories,
      protein: recipe.nutritionInfo.protein,
      carbs: recipe.nutritionInfo.carbs,
      fat: recipe.nutritionInfo.fat,
      time: new Date().getHours() < 12 ? 'breakfast' : 
            new Date().getHours() < 17 ? 'lunch' : 'dinner'
    });
    
    toast({
      title: "Recipe Added",
      description: `${recipe.name} has been added to your meals.`,
    });
  };
  
  return (
    <PageTransition>
      <div className="app-container">
        <div className="page-content flex flex-col min-h-screen">
          <div className="flex-1 p-4">
            <div className="mt-8 mb-6">
              <h1 className="text-fuelup-green text-2xl font-heading">Browse Recipes</h1>
            </div>
            
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="fuelup-input pl-10"
              />
              <Search className="absolute left-3 top-3.5 text-fuelup-green" size={20} />
            </div>
            
            <div className="flex justify-between items-center mb-4">
              <div 
                className="flex items-center space-x-2 cursor-pointer"
                onClick={() => setFilterOpen(!filterOpen)}
              >
                <span className="text-fuelup-text">Filter</span>
                <ChevronDown 
                  size={16} 
                  className={`text-fuelup-text transition-transform ${filterOpen ? 'rotate-180' : ''}`} 
                />
              </div>
              
              <div className="text-fuelup-text text-sm">
                {filteredRecipes.length} results
              </div>
            </div>
            
            {filterOpen && (
              <div className="bg-white rounded-lg shadow-md p-3 mb-4 animate-slide-in">
                <div className="space-y-2">
                  <div 
                    className={`p-2 rounded-md cursor-pointer ${filter === 'all' ? 'bg-fuelup-bg text-fuelup-green' : 'bg-gray-100'}`}
                    onClick={() => setFilter('all')}
                  >
                    All Recipes
                  </div>
                  <div 
                    className={`p-2 rounded-md cursor-pointer ${filter === 'popular' ? 'bg-fuelup-bg text-fuelup-green' : 'bg-gray-100'}`}
                    onClick={() => setFilter('popular')}
                  >
                    Most Popular
                  </div>
                  <div 
                    className={`p-2 rounded-md cursor-pointer ${filter === 'recent' ? 'bg-fuelup-bg text-fuelup-green' : 'bg-gray-100'}`}
                    onClick={() => setFilter('recent')}
                  >
                    Recently Added
                  </div>
                </div>
              </div>
            )}
            
            <div className="space-y-4 mb-6">
              {loading ? (
                <div className="text-center py-8">
                  <p>Loading recipes...</p>
                </div>
              ) : filteredRecipes.length === 0 ? (
                <div className="text-center py-8">
                  <p>No recipes found</p>
                  <p className="text-sm mt-2">Try a different search term</p>
                </div>
              ) : (
                filteredRecipes.map((recipe) => (
                  <div key={recipe.id} className="fuelup-container p-3">
                    <div className="flex space-x-4">
                      <div className="w-24 h-24 bg-fuelup-bg rounded flex items-center justify-center relative">
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
                        <div className="flex justify-between items-start">
                          <h3 className="text-lg font-medium mb-1">{recipe.name}</h3>
                          <div className="flex items-center space-x-1">
                            <button 
                              className="p-1.5 rounded-full bg-fuelup-bg/30 hover:bg-fuelup-bg transition-colors"
                              onClick={() => addToMeals(recipe)}
                            >
                              <Bookmark size={16} className="text-fuelup-green" />
                            </button>
                          </div>
                        </div>
                        
                        <p className="text-sm mb-2">{recipe.description}</p>
                        
                        <div className="flex justify-between items-center">
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star 
                                key={star} 
                                size={14} 
                                className="text-fuelup-bg" 
                                fill={star <= recipe.rating ? "currentColor" : "none"}
                              />
                            ))}
                          </div>
                          
                          <div className="flex items-center text-xs">
                            <Clock size={12} className="mr-1" />
                            <span>{Math.floor(Math.random() * 30) + 5} min</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
          
          <BottomNavigation />
        </div>
      </div>
    </PageTransition>
  );
};

export default MealBrowsing;
