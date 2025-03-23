
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, ArrowLeft, Heart } from 'lucide-react';
import { Recipe } from '@/services/recipeGenerator';
import BottomNavigation from '@/components/layout/BottomNavigation';
import { toast } from '@/components/ui/use-toast';

interface RecipeDetailViewProps {
  recipe: Recipe;
  onClose: () => void;
}

const RecipeDetailView: React.FC<RecipeDetailViewProps> = ({ recipe, onClose }) => {
  const navigate = useNavigate();
  
  const handleRate = () => {
    toast({
      title: "Recipe Rated",
      description: "Thank you for rating this recipe!",
    });
  };
  
  const handleSave = () => {
    toast({
      title: "Recipe Saved",
      description: "Recipe has been saved to your favorites.",
    });
  };
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <div className="app-container relative flex flex-col h-full max-h-full overflow-auto">
        <div className="p-4 pb-24 flex-1">
          <div className="text-fuelup-text text-xl mb-4">fuelup.com</div>
          
          <h1 className="text-2xl text-fuelup-green mb-6 font-heading">{recipe.name}</h1>
          
          <div className="bg-fuelup-green rounded-lg p-4 mb-6">
            <div className="aspect-video bg-white rounded-md flex items-center justify-center relative mb-4">
              {recipe.image ? (
                <img 
                  src={recipe.image} 
                  alt={recipe.name}
                  className="w-full h-full object-cover rounded-md"
                />
              ) : (
                <div className="flex flex-col items-center justify-center w-full h-full">
                  <div className="w-16 h-16 rounded-full bg-fuelup-bg mb-4"></div>
                  <svg viewBox="0 0 100 50" className="w-1/2 h-auto text-fuelup-bg">
                    <polyline 
                      points="0,40 30,20 50,30 80,10" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2"
                    />
                  </svg>
                </div>
              )}
            </div>
            
            <div className="text-white">
              <h2 className="text-xl mb-2 font-semibold">Ingredients:</h2>
              <ul className="list-disc pl-6 mb-4 space-y-1">
                {recipe.ingredients.map((ingredient, idx) => (
                  <li key={idx}>{ingredient}</li>
                ))}
              </ul>
              
              <h2 className="text-xl mb-2 font-semibold">Steps:</h2>
              <ol className="list-decimal pl-6 mb-4 space-y-1">
                {recipe.instructions.map((step, idx) => (
                  <li key={idx}>{step}</li>
                ))}
              </ol>
              
              <div className="mt-6">
                <h3 className="font-semibold mb-2">Nutrition Information:</h3>
                <div className="grid grid-cols-4 gap-2 text-center">
                  <div className="bg-fuelup-bg/30 rounded p-2">
                    <p className="font-bold">{recipe.nutritionInfo?.calories || recipe.calories}</p>
                    <p className="text-xs">calories</p>
                  </div>
                  <div className="bg-fuelup-bg/30 rounded p-2">
                    <p className="font-bold">{recipe.nutritionInfo?.protein || recipe.protein}g</p>
                    <p className="text-xs">protein</p>
                  </div>
                  <div className="bg-fuelup-bg/30 rounded p-2">
                    <p className="font-bold">{recipe.nutritionInfo?.carbs || recipe.carbs}g</p>
                    <p className="text-xs">carbs</p>
                  </div>
                  <div className="bg-fuelup-bg/30 rounded p-2">
                    <p className="font-bold">{recipe.nutritionInfo?.fat || recipe.fat}g</p>
                    <p className="text-xs">fat</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <button 
              className="bg-fuelup-bg text-fuelup-green rounded-lg py-3 flex items-center justify-center"
              onClick={onClose}
            >
              <ArrowLeft size={18} className="mr-2" />
              Back
            </button>
            <button 
              className="bg-fuelup-bg text-fuelup-green rounded-lg py-3 flex items-center justify-center"
              onClick={handleRate}
            >
              <Star size={18} className="mr-2" />
              Rate
            </button>
          </div>
        </div>
        
        <BottomNavigation />
      </div>
    </div>
  );
};

export default RecipeDetailView;
