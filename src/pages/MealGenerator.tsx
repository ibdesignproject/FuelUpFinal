
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageTransition from '@/components/common/PageTransition';
import BottomNavigation from '@/components/layout/BottomNavigation';
import { ChevronLeft, ChevronRight, Search, ChevronDown, Plus, X, Check } from 'lucide-react';
import { Recipe, recipeGenerator } from '@/services/recipeGenerator';
import { userProfileService } from '@/services/userProfile';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';

interface Ingredient {
  name: string;
  selected: boolean;
}

const MealGenerator = () => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    { name: "Tomato", selected: false }, 
    { name: "Potato", selected: false }, 
    { name: "Garlic", selected: false }, 
    { name: "Onion", selected: false }, 
    { name: "Apple", selected: false }, 
    { name: "Lime", selected: false },
    { name: "Lemon", selected: false }, 
    { name: "Orange", selected: false }, 
    { name: "Cucumber", selected: false }
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [currentRecipeIndex, setCurrentRecipeIndex] = useState(0);
  const [showIngredients, setShowIngredients] = useState(true);
  const [newIngredient, setNewIngredient] = useState('');
  const navigate = useNavigate();
  
  // Filter ingredients based on search term
  const filteredIngredients = ingredients.filter(ingredient => 
    ingredient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  useEffect(() => {
    // Check if user is logged in
    const currentUser = userProfileService.getCurrentUser();
    if (!currentUser) {
      toast({
        title: "Not Logged In",
        description: "Please log in to use the meal generator.",
        variant: "destructive"
      });
      navigate('/');
    }
  }, [navigate]);
  
  // Generate recipe recommendations based on selected ingredients
  const generateRecipes = async () => {
    setIsGenerating(true);
    
    try {
      // Check if any ingredients are selected
      const hasSelectedIngredients = ingredients.some(ing => ing.selected);
      
      if (!hasSelectedIngredients) {
        toast({
          title: "No Ingredients Selected",
          description: "Please select at least one ingredient.",
        });
        setIsGenerating(false);
        return;
      }
      
      // Get selected ingredients only
      const selectedIngredients = ingredients.filter(ing => ing.selected);
      const recommendations = await recipeGenerator.getRecommendations(selectedIngredients);
      
      if (recommendations.length === 0) {
        toast({
          title: "No Recipes Found",
          description: "Try selecting different ingredients.",
        });
      } else {
        setRecipes(recommendations);
        setCurrentRecipeIndex(0);
        toast({
          title: "Recipes Generated",
          description: `Found ${recommendations.length} recipes with your ingredients.`,
        });
      }
    } catch (error) {
      console.error("Error generating recipes:", error);
      toast({
        title: "Error",
        description: "Failed to generate recipes. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };
  
  // Toggle ingredient selection
  const toggleIngredient = (index: number) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index].selected = !updatedIngredients[index].selected;
    setIngredients(updatedIngredients);
    
    toast({
      title: updatedIngredients[index].selected ? "Ingredient Added" : "Ingredient Removed",
      description: `${updatedIngredients[index].name} ${updatedIngredients[index].selected ? "added to" : "removed from"} your selection.`,
    });
  };
  
  // Add a new ingredient
  const addIngredient = () => {
    if (!newIngredient.trim()) {
      toast({
        title: "Empty Ingredient",
        description: "Please enter an ingredient name.",
      });
      return;
    }
    
    // Check if ingredient already exists
    if (ingredients.some(ing => ing.name.toLowerCase() === newIngredient.toLowerCase())) {
      toast({
        title: "Ingredient Already Exists",
        description: "This ingredient is already in your list.",
      });
      return;
    }
    
    const newIngredientObj = { name: newIngredient, selected: true };
    setIngredients([...ingredients, newIngredientObj]);
    setNewIngredient('');
    
    toast({
      title: "Ingredient Added",
      description: `${newIngredient} has been added to your ingredients.`,
    });
  };
  
  // Navigate through recipes
  const nextRecipe = () => {
    if (recipes.length === 0) return;
    setCurrentRecipeIndex((currentRecipeIndex + 1) % recipes.length);
  };
  
  const prevRecipe = () => {
    if (recipes.length === 0) return;
    setCurrentRecipeIndex((currentRecipeIndex - 1 + recipes.length) % recipes.length);
  };
  
  // Add current recipe to meal log
  const addRecipeToMealLog = () => {
    if (recipes.length === 0) return;
    
    const currentRecipe = recipes[currentRecipeIndex];
    
    userProfileService.addMeal({
      name: currentRecipe.name,
      calories: currentRecipe.nutritionInfo.calories,
      protein: currentRecipe.nutritionInfo.protein,
      carbs: currentRecipe.nutritionInfo.carbs,
      fat: currentRecipe.nutritionInfo.fat,
      time: new Date().getHours() < 12 ? 'breakfast' : 
            new Date().getHours() < 17 ? 'lunch' : 'dinner'
    });
    
    toast({
      title: "Recipe Added to Log",
      description: `${currentRecipe.name} has been added to your meal log.`,
    });
  };
  
  const currentRecipe = recipes.length > 0 ? recipes[currentRecipeIndex] : null;
  
  // Remove an ingredient
  const removeIngredient = (index: number) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients.splice(index, 1);
    setIngredients(updatedIngredients);
    
    toast({
      title: "Ingredient Removed",
      description: `${ingredients[index].name} has been removed from your ingredients.`,
    });
  };
  
  return (
    <PageTransition>
      <div className="app-container">
        <div className="page-content flex flex-col min-h-screen">
          <div className="flex-1 p-4">
            <div className="mt-8 mb-6">
              <h1 className="text-fuelup-text text-2xl font-heading font-bold">FuelUp AI Meal Generator</h1>
            </div>
            
            <div className="bg-fuelup-green rounded-lg shadow-md mb-6">
              <div 
                className="flex justify-between items-center p-4 cursor-pointer"
                onClick={() => setShowIngredients(!showIngredients)}
              >
                <span className="font-medium text-fuelup-bg text-lg">Ingredients available</span>
                <ChevronDown 
                  size={20} 
                  className={`transition-transform duration-300 text-fuelup-bg ${!showIngredients ? 'rotate-180' : ''}`}
                />
              </div>
              
              {showIngredients && (
                <div className="p-4 pt-0">
                  <div className="relative mb-4">
                    <input
                      type="text"
                      placeholder="Search ingredients..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="fuelup-input bg-fuelup-bg pl-10 text-fuelup-text border-fuelup-bg"
                    />
                    <Search className="absolute left-3 top-3.5 text-fuelup-green" size={20} />
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {filteredIngredients.map((ingredient, index) => (
                      <div 
                        key={ingredient.name} 
                        className={`px-3 py-1 rounded-md cursor-pointer flex items-center gap-1 transition-colors ${
                          ingredient.selected 
                            ? 'bg-fuelup-bg text-fuelup-text font-medium' 
                            : 'bg-fuelup-bg/30 text-fuelup-bg hover:bg-fuelup-bg/50'
                        }`}
                        onClick={() => toggleIngredient(ingredients.indexOf(ingredient))}
                      >
                        {ingredient.name}
                        {ingredient.selected ? (
                          <Check size={14} className="ml-1" />
                        ) : (
                          <Plus size={14} className="ml-1" />
                        )}
                      </div>
                    ))}
                  </div>
                  
                  <div className="bg-fuelup-bg/80 p-3 rounded-md mb-4">
                    <h3 className="font-medium mb-2 text-fuelup-green">Selected Ingredients:</h3>
                    <div className="flex flex-wrap gap-2">
                      {ingredients.filter(ing => ing.selected).length === 0 ? (
                        <p className="text-sm text-fuelup-text">No ingredients selected yet</p>
                      ) : (
                        ingredients.filter(ing => ing.selected).map((ing, idx) => (
                          <div 
                            key={idx} 
                            className="bg-fuelup-bg text-fuelup-text px-2 py-1 rounded-full text-sm flex items-center border border-fuelup-green"
                          >
                            {ing.name}
                            <X 
                              size={14} 
                              className="ml-1 cursor-pointer text-fuelup-green" 
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleIngredient(ingredients.indexOf(ing));
                              }}
                            />
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Add new ingredient..."
                      value={newIngredient}
                      onChange={(e) => setNewIngredient(e.target.value)}
                      className="fuelup-input bg-fuelup-bg flex-1 text-fuelup-text"
                      onKeyDown={(e) => e.key === 'Enter' && addIngredient()}
                    />
                    <button 
                      className="bg-fuelup-bg text-fuelup-green py-0 px-4 rounded-md font-medium hover:bg-fuelup-bg/90"
                      onClick={addIngredient}
                    >
                      Add
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex justify-center mb-4">
              <Button 
                onClick={generateRecipes}
                disabled={isGenerating}
                className="bg-fuelup-green text-fuelup-bg hover:bg-fuelup-green/90 py-2 px-6 rounded-lg font-medium shadow-sm"
              >
                {isGenerating ? "Generating..." : "Generate Recipe Suggestions"}
              </Button>
            </div>
            
            <div className="bg-fuelup-bg rounded-lg shadow-md">
              <div className="p-4 border-b border-fuelup-green/30">
                <h2 className="text-xl font-medium text-fuelup-green">
                  {recipes.length === 0 
                    ? "Select ingredients and generate recipes..." 
                    : "Recipe suggestions for you"}
                </h2>
              </div>
              
              {currentRecipe ? (
                <div className="relative p-4">
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="aspect-square flex items-center justify-center relative mb-4 bg-fuelup-green/10 rounded-lg overflow-hidden">
                      {currentRecipe.image ? (
                        <img 
                          src={currentRecipe.image} 
                          alt={currentRecipe.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <>
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
                        </>
                      )}
                    </div>
                    
                    <h3 className="text-xl font-medium text-center mb-2 text-fuelup-text">{currentRecipe.name}</h3>
                    <p className="text-sm mb-4 text-center text-fuelup-text">{currentRecipe.description}</p>
                    
                    <div className="bg-fuelup-green/10 rounded-lg p-3 mb-4">
                      <h4 className="font-medium mb-2 text-fuelup-green">Ingredients:</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        {currentRecipe.ingredients.map((ing, idx) => (
                          <li key={idx} className="text-sm text-fuelup-text">{ing}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="bg-fuelup-green/10 rounded-lg p-3 mb-4">
                      <h4 className="font-medium mb-2 text-fuelup-green">Instructions:</h4>
                      <ol className="list-decimal pl-5 space-y-1">
                        {currentRecipe.instructions.map((step, idx) => (
                          <li key={idx} className="text-sm text-fuelup-text">{step}</li>
                        ))}
                      </ol>
                    </div>
                    
                    <div className="bg-fuelup-green/10 rounded-lg p-3 mb-4">
                      <h4 className="font-medium mb-2 text-fuelup-green">Nutrition Info:</h4>
                      <div className="grid grid-cols-4 text-center">
                        <div>
                          <p className="font-medium text-fuelup-text">{currentRecipe.nutritionInfo.calories}</p>
                          <p className="text-xs text-fuelup-text/70">calories</p>
                        </div>
                        <div>
                          <p className="font-medium text-fuelup-text">{currentRecipe.nutritionInfo.protein}g</p>
                          <p className="text-xs text-fuelup-text/70">protein</p>
                        </div>
                        <div>
                          <p className="font-medium text-fuelup-text">{currentRecipe.nutritionInfo.carbs}g</p>
                          <p className="text-xs text-fuelup-text/70">carbs</p>
                        </div>
                        <div>
                          <p className="font-medium text-fuelup-text">{currentRecipe.nutritionInfo.fat}g</p>
                          <p className="text-xs text-fuelup-text/70">fat</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-center">
                      <Button
                        onClick={addRecipeToMealLog}
                        className="bg-fuelup-green hover:bg-fuelup-green/90 text-white py-2 px-6 rounded-lg font-medium shadow-sm"
                      >
                        Add to My Meals
                      </Button>
                    </div>
                  </div>
                  
                  <button 
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-fuelup-green rounded-full flex items-center justify-center shadow-md"
                    onClick={prevRecipe}
                  >
                    <ChevronLeft size={20} className="text-fuelup-bg" />
                  </button>
                  
                  <button 
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-fuelup-green rounded-full flex items-center justify-center shadow-md"
                    onClick={nextRecipe}
                  >
                    <ChevronRight size={20} className="text-fuelup-bg" />
                  </button>
                  
                  <p className="text-center mt-2 text-fuelup-text">
                    Recipe {currentRecipeIndex + 1} of {recipes.length}
                  </p>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-fuelup-text">No recipes generated yet</p>
                  <p className="text-sm mt-2 text-fuelup-text/70">Select ingredients and click Generate</p>
                </div>
              )}
              
              {recipes.length > 0 && (
                <p className="text-center mb-4 p-4 text-fuelup-text">All these recipes are made personally for you!</p>
              )}
            </div>
          </div>
          
          <BottomNavigation />
        </div>
      </div>
    </PageTransition>
  );
};

export default MealGenerator;
