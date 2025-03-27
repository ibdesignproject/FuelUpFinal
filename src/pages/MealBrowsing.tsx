import React, { useState, useEffect } from 'react';
import PageTransition from '@/components/common/PageTransition';
import BottomNavigation from '@/components/layout/BottomNavigation';
import { Search, Star, Clock, Bookmark, ChevronDown, Image } from 'lucide-react';
import { Recipe, recipeGenerator } from '@/services/recipeGenerator';
import { userProfileService } from '@/services/userProfile';
import { toast } from '@/components/ui/use-toast';
import RecipeDetailView from '@/components/recipes/RecipeDetailView';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command";

const MealBrowsing = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filter, setFilter] = useState<'all' | 'popular' | 'recent' | 'sport'>('sport'); // Default to sport
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [commandOpen, setCommandOpen] = useState(false);
  const [sportSpecificRecipes, setSportSpecificRecipes] = useState<Recipe[]>([]);
  const [imageErrors, setImageErrors] = useState<{[key: string]: boolean}>({});
  
  const getUserSport = (): string => {
    const userData = localStorage.getItem('userFormData');
    if (userData) {
      const parsedData = JSON.parse(userData);
      return parsedData.sport || '';
    }
    const currentUser = userProfileService.getCurrentUser();
    return currentUser?.sport || 'Basketball'; // Default to Basketball if no sport found
  };
  
  const generateSportRecipes = (sport: string): Recipe[] => {
    const sportBasedRecipes: Recipe[] = [];
    const sportPrefix = sport.toLowerCase();
    
    const getNutritionProfile = (sport: string) => {
      const profiles: Record<string, {protein: number, carbs: number, fat: number, calories: number}> = {
        'basketball': {protein: 25, carbs: 55, fat: 20, calories: 500},
        'football': {protein: 30, carbs: 50, fat: 20, calories: 600},
        'soccer': {protein: 20, carbs: 60, fat: 20, calories: 450},
        'tennis': {protein: 22, carbs: 58, fat: 20, calories: 400},
        'golf': {protein: 18, carbs: 52, fat: 30, calories: 350},
        'swimming': {protein: 25, carbs: 60, fat: 15, calories: 500},
        'running': {protein: 20, carbs: 65, fat: 15, calories: 450},
        'cycling': {protein: 22, carbs: 63, fat: 15, calories: 500},
        'weightlifting': {protein: 35, carbs: 45, fat: 20, calories: 550},
        'crossfit': {protein: 30, carbs: 50, fat: 20, calories: 550},
        'yoga': {protein: 18, carbs: 52, fat: 30, calories: 350},
        'pilates': {protein: 18, carbs: 52, fat: 30, calories: 350},
        'volleyball': {protein: 22, carbs: 55, fat: 23, calories: 450},
        'boxing': {protein: 30, carbs: 50, fat: 20, calories: 500},
        'martial arts': {protein: 28, carbs: 52, fat: 20, calories: 500},
      };
      
      const defaultProfile = {protein: 25, carbs: 55, fat: 20, calories: 450};
      
      for (const key in profiles) {
        if (sport.toLowerCase().includes(key)) {
          return profiles[key];
        }
      }
      
      return defaultProfile;
    };
    
    const profile = getNutritionProfile(sportPrefix);
    
    const getIngredientsByNutrition = (profile: any) => {
      const ingredients = {
        highProtein: ['chicken breast', 'salmon', 'tuna', 'turkey', 'lean beef', 'tofu', 'tempeh', 'eggs', 'greek yogurt', 'cottage cheese', 'protein powder', 'lentils', 'chickpeas', 'black beans', 'quinoa'],
        highCarb: ['sweet potato', 'brown rice', 'oats', 'pasta', 'quinoa', 'banana', 'honey', 'mango', 'pineapple', 'dates', 'whole grain bread', 'potatoes', 'barley', 'bulgur'],
        healthyFats: ['avocado', 'olive oil', 'nuts', 'seeds', 'nut butter', 'coconut oil', 'flaxseed', 'chia seeds', 'salmon', 'whole eggs', 'dark chocolate'],
      };
      
      const result = [];
      const proteinCount = Math.round(profile.protein / 100 * 10);
      const carbCount = Math.round(profile.carbs / 100 * 10);
      const fatCount = Math.round(profile.fat / 100 * 10);
      
      for (let i = 0; i < proteinCount; i++) {
        result.push(ingredients.highProtein[Math.floor(Math.random() * ingredients.highProtein.length)]);
      }
      
      for (let i = 0; i < carbCount; i++) {
        result.push(ingredients.highCarb[Math.floor(Math.random() * ingredients.highCarb.length)]);
      }
      
      for (let i = 0; i < fatCount; i++) {
        result.push(ingredients.healthyFats[Math.floor(Math.random() * ingredients.healthyFats.length)]);
      }
      
      return [...new Set(result)];
    };
    
    const prepMethods = ['baked', 'grilled', 'roasted', 'sautéed', 'steamed', 'raw', 'slow-cooked', 'pressure-cooked', 'stir-fried', 'boiled'];
    
    const getRecipeTypesBySport = (sport: string) => {
      const sportLower = sport.toLowerCase();
      const types = {
        default: ['meal', 'bowl', 'smoothie', 'salad', 'snack', 'breakfast', 'lunch', 'dinner'],
        endurance: ['energy bar', 'recovery smoothie', 'electrolyte drink', 'carb-loading pasta', 'energy balls'],
        strength: ['protein shake', 'muscle recovery meal', 'bulking bowl', 'mass builder', 'protein pancakes'],
        team: ['team snack', 'quick energy boost', 'halftime refuel', 'post-game recovery', 'game day prep'],
        technical: ['brain food', 'focus enhancer', 'steady energy meal', 'nutrient-dense snack', 'mental clarity bowl']
      };
      
      const enduranceSports = ['running', 'cycling', 'swimming', 'triathlon', 'marathon'];
      const strengthSports = ['weightlifting', 'crossfit', 'bodybuilding', 'powerlifting', 'strength training'];
      const teamSports = ['basketball', 'football', 'soccer', 'volleyball', 'hockey', 'baseball'];
      const technicalSports = ['golf', 'tennis', 'gymnastics', 'figure skating', 'diving', 'archery'];
      
      let category = 'default';
      if (enduranceSports.some(s => sportLower.includes(s))) category = 'endurance';
      else if (strengthSports.some(s => sportLower.includes(s))) category = 'strength';
      else if (teamSports.some(s => sportLower.includes(s))) category = 'team';
      else if (technicalSports.some(s => sportLower.includes(s))) category = 'technical';
      
      return [...types[category as keyof typeof types], ...types.default];
    };
    
    for (let i = 1; i <= 50; i++) {
      const ingredients = getIngredientsByNutrition(profile);
      const recipeTypes = getRecipeTypesBySport(sportPrefix);
      const prepMethod = prepMethods[Math.floor(Math.random() * prepMethods.length)];
      const recipeType = recipeTypes[Math.floor(Math.random() * recipeTypes.length)];
      
      const mainIngredients = ingredients.slice(0, Math.floor(Math.random() * 2) + 2);
      
      const proteinVar = profile.protein * (0.9 + Math.random() * 0.2);
      const carbsVar = profile.carbs * (0.9 + Math.random() * 0.2);
      const fatVar = profile.fat * (0.9 + Math.random() * 0.2);
      const caloriesVar = profile.calories * (0.9 + Math.random() * 0.2);
      
      const recipeName = `${sportPrefix.charAt(0).toUpperCase() + sportPrefix.slice(1)} ${prepMethod} ${mainIngredients.join(' & ')} ${recipeType}`;
      
      sportBasedRecipes.push({
        id: `sport-${i}`,
        name: recipeName,
        image: '',
        description: `Perfect for ${sport} athletes. High in nutrients needed for peak performance.`,
        prepTime: Math.floor(Math.random() * 20) + 5,
        cookTime: Math.floor(Math.random() * 30) + 5,
        calories: Math.round(caloriesVar),
        protein: Math.round(proteinVar),
        carbs: Math.round(carbsVar),
        fat: Math.round(fatVar),
        ingredients: ingredients,
        instructions: [
          `Prepare the ${mainIngredients.join(' and ')}.`,
          `${prepMethod.charAt(0).toUpperCase() + prepMethod.slice(1)} until done.`,
          'Combine all ingredients and serve.'
        ],
        tags: [sport.toLowerCase(), recipeType, prepMethod, 'performance'],
        rating: Math.floor(Math.random() * 3) + 3,
        popularity: Math.floor(Math.random() * 80) + 20,
        timeAdded: new Date(Date.now() - Math.random() * 604800000).toISOString(),
        nutritionInfo: {
          calories: Math.round(caloriesVar),
          protein: Math.round(proteinVar),
          carbs: Math.round(carbsVar),
          fat: Math.round(fatVar)
        }
      });
    }
    
    return sportBasedRecipes;
  };
  
  useEffect(() => {
    const loadRecipes = async () => {
      setLoading(true);
      try {
        const allRecipes = await recipeGenerator.getRecommendations([]);
        const enhancedRecipes = allRecipes.map(recipe => ({
          ...recipe,
          rating: Math.floor(Math.random() * 5) + 1,
          timeAdded: new Date(Date.now() - Math.random() * 604800000).toISOString(),
          popularity: Math.floor(Math.random() * 100) + 1
        }));
        setRecipes(enhancedRecipes);
        
        const userSport = getUserSport();
        if (userSport) {
          console.log("Generating recipes for sport:", userSport);
          const sportRecipes = generateSportRecipes(userSport);
          setSportSpecificRecipes(sportRecipes);
          console.log(`Generated ${sportRecipes.length} sport-specific recipes`);
        }
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
  
  const filteredRecipes = () => {
    let results = [...recipes];
    
    if (filter === 'sport') {
      results = [...sportSpecificRecipes];
    }
    
    if (searchTerm) {
      results = results.filter(recipe => 
        recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (filter === 'popular') {
      return results.sort((a, b) => b.popularity! - a.popularity!);
    } else if (filter === 'recent') {
      return results.sort((a, b) => 
        new Date(b.timeAdded!).getTime() - new Date(a.timeAdded!).getTime()
      );
    }
    
    return results;
  };
  
  const getRecipeImage = (recipe: Recipe) => {
    if (recipe.image && recipe.image.length > 0) return recipe.image;
    
    const defaultImages = [
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c',
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd',
      'https://images.unsplash.com/photo-1467003909585-2f8a72700288',
      'https://images.unsplash.com/photo-1490645935967-10de6ba17061',
      'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f',
      'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe',
    ];
    
    const recipeIdHash = parseInt(recipe.id.replace(/[^0-9]/g, '0')) || 0;
    const imageIndex = recipeIdHash % defaultImages.length;
    
    return defaultImages[imageIndex];
  };
  
  const handleImageError = (recipeId: string) => {
    setImageErrors(prev => ({
      ...prev,
      [recipeId]: true
    }));
  };
  
  const addToMeals = (recipe: Recipe) => {
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
  
  const openRecipeDetail = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
  };

  const closeRecipeDetail = () => {
    setSelectedRecipe(null);
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
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={() => setCommandOpen(true)}
                  className="fuelup-input pl-10"
                />
                <Search className="absolute left-3 top-3.5 text-fuelup-green" size={20} />
              </div>
              
              {commandOpen && (
                <div className="absolute z-10 w-full bg-white rounded-md shadow-lg mt-1">
                  <Command>
                    <CommandInput placeholder="Search recipes..." value={searchTerm} onValueChange={setSearchTerm} />
                    <CommandList>
                      <CommandEmpty>No results found.</CommandEmpty>
                      <CommandGroup heading="Sport-Specific Recipes">
                        {sportSpecificRecipes.slice(0, 5).map((recipe) => (
                          <CommandItem 
                            key={recipe.id}
                            onSelect={() => {
                              setSearchTerm(recipe.name);
                              setCommandOpen(false);
                              setFilter('sport');
                            }}
                          >
                            {recipe.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                      <CommandGroup heading="Suggestions">
                        {getUserSport() && (
                          <CommandItem onSelect={() => {
                            setSearchTerm("");
                            setCommandOpen(false);
                            setFilter('sport');
                          }}>
                            All {getUserSport()} Recipes
                          </CommandItem>
                        )}
                        <CommandItem onSelect={() => {
                          setSearchTerm("protein");
                          setCommandOpen(false);
                        }}>
                          High Protein
                        </CommandItem>
                        <CommandItem onSelect={() => {
                          setSearchTerm("quick");
                          setCommandOpen(false);
                        }}>
                          Quick Recipes
                        </CommandItem>
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </div>
              )}
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
                {filteredRecipes().length} results
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
                  {sportSpecificRecipes.length > 0 && (
                    <div 
                      className={`p-2 rounded-md cursor-pointer ${filter === 'sport' ? 'bg-fuelup-bg text-fuelup-green' : 'bg-gray-100'}`}
                      onClick={() => setFilter('sport')}
                    >
                      {getUserSport()} Recipes
                    </div>
                  )}
                </div>
              </div>
            )}
            
            <div className="space-y-4 mb-6">
              {loading ? (
                <div className="text-center py-8">
                  <p>Loading recipes...</p>
                </div>
              ) : filteredRecipes().length === 0 ? (
                <div className="text-center py-8">
                  <p>No recipes found</p>
                  <p className="text-sm mt-2">Try a different search term</p>
                </div>
              ) : (
                filteredRecipes().map((recipe) => (
                  <div key={recipe.id} className="fuelup-container p-3 cursor-pointer" onClick={() => openRecipeDetail(recipe)}>
                    <div className="flex space-x-4">
                      <div className="w-24 h-24 bg-fuelup-bg rounded flex items-center justify-center relative overflow-hidden">
                        {!imageErrors[recipe.id] ? (
                          <img 
                            src={getRecipeImage(recipe)} 
                            alt={recipe.name} 
                            className="w-full h-full object-cover rounded"
                            onError={() => handleImageError(recipe.id)}
                          />
                        ) : (
                          <div className="flex items-center justify-center w-full h-full">
                            <Image size={32} className="text-fuelup-green opacity-50" />
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h3 className="text-lg font-medium mb-1">{recipe.name}</h3>
                          <div className="flex items-center space-x-1">
                            <button 
                              className="p-1.5 rounded-full bg-fuelup-bg/30 hover:bg-fuelup-bg transition-colors"
                              onClick={(e) => {
                                e.stopPropagation();
                                addToMeals(recipe);
                              }}
                            >
                              <Bookmark size={16} className="text-fuelup-green" />
                            </button>
                          </div>
                        </div>
                        
                        <p className="text-sm mb-2 line-clamp-2">{recipe.description}</p>
                        
                        <div className="flex justify-between items-center">
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star 
                                key={star} 
                                size={14} 
                                className="text-fuelup-bg" 
                                fill={star <= (recipe.rating || 0) ? "currentColor" : "none"}
                              />
                            ))}
                          </div>
                          
                          <div className="flex items-center text-xs">
                            <Clock size={12} className="mr-1" />
                            <span>{recipe.prepTime + recipe.cookTime} min</span>
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
        
        {selectedRecipe && (
          <RecipeDetailView recipe={selectedRecipe} onClose={closeRecipeDetail} />
        )}
      </div>
    </PageTransition>
  );
};

export default MealBrowsing;
