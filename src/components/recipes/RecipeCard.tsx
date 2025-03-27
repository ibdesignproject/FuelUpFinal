
import React from 'react';
import { Recipe } from '@/services/recipeGenerator';
import { Star, Clock, Bookmark, Image } from 'lucide-react';
import { getRecipeImage } from '@/utils/recipeUtils';
import { toast } from '@/components/ui/use-toast';
import { userProfileService } from '@/services/userProfile';

interface RecipeCardProps {
  recipe: Recipe;
  onSelect: (recipe: Recipe) => void;
  imageErrors: {[key: string]: boolean};
  onImageError: (recipeId: string) => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ 
  recipe, 
  onSelect,
  imageErrors,
  onImageError
}) => {
  const addToMeals = (e: React.MouseEvent) => {
    e.stopPropagation();
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
    <div className="fuelup-container p-3 cursor-pointer" onClick={() => onSelect(recipe)}>
      <div className="flex space-x-4">
        <div className="w-24 h-24 bg-fuelup-bg rounded flex items-center justify-center relative overflow-hidden">
          {!imageErrors[recipe.id] ? (
            <img 
              src={getRecipeImage(recipe)} 
              alt={recipe.name} 
              className="w-full h-full object-cover rounded"
              onError={() => onImageError(recipe.id)}
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
                onClick={addToMeals}
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
  );
};

export default RecipeCard;
