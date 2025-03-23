import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, ArrowLeft, Heart, StarHalf, StarOff } from 'lucide-react';
import { Recipe } from '@/services/recipeGenerator';
import BottomNavigation from '@/components/layout/BottomNavigation';
import { toast } from '@/components/ui/use-toast';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';

interface RecipeDetailViewProps {
  recipe: Recipe;
  onClose: () => void;
}

const RecipeDetailView: React.FC<RecipeDetailViewProps> = ({ recipe, onClose }) => {
  const navigate = useNavigate();
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [hoveredRating, setHoveredRating] = useState<number>(0);
  
  const getRecipeImage = () => {
    if (recipe.image) return recipe.image;
    
    const hash = recipe.name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const hue = hash % 360;
    
    return `https://source.unsplash.com/featured/300x200/?${recipe.name.split(' ')[0]},food`;
  };
  
  const getDetailedSteps = (instructions: string[]) => {
    return instructions.map((instruction, index) => {
      if (instruction.split(' ').length > 10) return instruction;
      
      const enhancedInstructions = [
        `Prepare all ingredients before starting this step: ${instruction}`,
        `Make sure your equipment is clean and ready for: ${instruction}`,
        `Start by gathering all tools needed to: ${instruction}`,
        `For best results when you: ${instruction}`
      ];
      
      return `${instruction} ${enhancedInstructions[index % enhancedInstructions.length]}`;
    });
  };
  
  const handleRate = () => {
    setShowRatingModal(true);
  };
  
  const submitRating = () => {
    toast({
      title: `Recipe Rated: ${selectedRating} Stars`,
      description: `Thank you for rating ${recipe.name}!`,
    });
    setShowRatingModal(false);
  };
  
  const handleSave = () => {
    toast({
      title: "Recipe Saved",
      description: "Recipe has been saved to your favorites.",
    });
  };
  
  const renderStar = (position: number, filled: number) => {
    if (filled >= position) {
      return <Star size={24} className="text-yellow-400 fill-yellow-400" />;
    } else if (filled >= position - 0.5) {
      return <StarHalf size={24} className="text-yellow-400 fill-yellow-400" />;
    } else {
      return <StarOff size={24} className="text-gray-300" />;
    }
  };
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <div className="app-container relative flex flex-col h-full max-h-full overflow-auto">
        <div className="p-4 pb-24 flex-1">
          <div className="text-fuelup-text text-xl font-medium mb-4">fuelup.com</div>
          
          <h1 className="text-2xl text-fuelup-green font-bold mb-6 font-heading">{recipe.name}</h1>
          
          <div className="bg-fuelup-green rounded-lg p-4 mb-6">
            <div className="aspect-video bg-white rounded-md flex items-center justify-center relative mb-4">
              <img 
                src={getRecipeImage()}
                alt={recipe.name}
                className="w-full h-full object-cover rounded-md"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://source.unsplash.com/featured/300x200/?food';
                }}
              />
            </div>
            
            <div className="text-white">
              <h2 className="text-xl mb-2 font-semibold">Ingredients:</h2>
              <ul className="list-disc pl-6 mb-4 space-y-1">
                {recipe.ingredients.map((ingredient, idx) => (
                  <li key={idx} className="text-white text-base">{ingredient}</li>
                ))}
              </ul>
              
              <h2 className="text-xl mb-2 font-semibold">Steps:</h2>
              <ol className="list-decimal pl-6 mb-4 space-y-3">
                {getDetailedSteps(recipe.instructions).map((step, idx) => (
                  <li key={idx} className="text-white text-base">
                    <p>{step}</p>
                    <div className="text-sm mt-1 text-white/80">
                      <span className="font-medium">Tip:</span> {' '}
                      {idx % 3 === 0 ? 'For best flavor, don\'t rush this step.' : 
                       idx % 3 === 1 ? 'Make sure the temperature is just right here.' : 
                       'Timing is critical for perfect results.'}
                    </div>
                  </li>
                ))}
              </ol>
              
              <div className="mt-6">
                <h3 className="font-semibold mb-2">Nutrition Information:</h3>
                <div className="grid grid-cols-4 gap-2 text-center">
                  <div className="bg-white/30 rounded p-2">
                    <p className="font-bold text-white">{recipe.nutritionInfo?.calories || recipe.calories}</p>
                    <p className="text-xs text-white">calories</p>
                  </div>
                  <div className="bg-white/30 rounded p-2">
                    <p className="font-bold text-white">{recipe.nutritionInfo?.protein || recipe.protein}g</p>
                    <p className="text-xs text-white">protein</p>
                  </div>
                  <div className="bg-white/30 rounded p-2">
                    <p className="font-bold text-white">{recipe.nutritionInfo?.carbs || recipe.carbs}g</p>
                    <p className="text-xs text-white">carbs</p>
                  </div>
                  <div className="bg-white/30 rounded p-2">
                    <p className="font-bold text-white">{recipe.nutritionInfo?.fat || recipe.fat}g</p>
                    <p className="text-xs text-white">fat</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <button 
              className="bg-fuelup-green text-white rounded-lg py-3 flex items-center justify-center font-medium"
              onClick={onClose}
            >
              <ArrowLeft size={18} className="mr-2" />
              Back
            </button>
            <button 
              className="bg-fuelup-green text-white rounded-lg py-3 flex items-center justify-center font-medium"
              onClick={handleRate}
            >
              <Star size={18} className="mr-2" />
              Rate
            </button>
          </div>
        </div>
        
        {showRatingModal && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <Card className="w-[90%] max-w-md">
              <CardHeader>
                <h2 className="text-xl font-bold text-center">Rate This Recipe</h2>
                <p className="text-center text-muted-foreground">How would you rate {recipe.name}?</p>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center space-x-2 my-4">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      className="focus:outline-none transition-transform hover:scale-110"
                      onClick={() => setSelectedRating(rating)}
                      onMouseEnter={() => setHoveredRating(rating)}
                      onMouseLeave={() => setHoveredRating(0)}
                    >
                      {renderStar(
                        rating,
                        hoveredRating > 0 ? hoveredRating : selectedRating
                      )}
                    </button>
                  ))}
                </div>
                
                <p className="text-center font-medium mt-2">
                  {selectedRating === 1 && "Poor"}
                  {selectedRating === 2 && "Fair"}
                  {selectedRating === 3 && "Good"}
                  {selectedRating === 4 && "Very Good"}
                  {selectedRating === 5 && "Excellent"}
                </p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <button 
                  className="px-4 py-2 rounded-md border border-gray-300"
                  onClick={() => setShowRatingModal(false)}
                >
                  Cancel
                </button>
                <button 
                  className={`px-4 py-2 rounded-md bg-fuelup-green text-white ${!selectedRating ? 'opacity-50 cursor-not-allowed' : ''}`}
                  onClick={submitRating}
                  disabled={!selectedRating}
                >
                  Submit Rating
                </button>
              </CardFooter>
            </Card>
          </div>
        )}
        
        <BottomNavigation />
      </div>
    </div>
  );
};

export default RecipeDetailView;
