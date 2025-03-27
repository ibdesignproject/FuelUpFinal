
import React, { useState, useEffect } from 'react';
import PageTransition from '@/components/common/PageTransition';
import BottomNavigation from '@/components/layout/BottomNavigation';
import { Recipe, recipeGenerator } from '@/services/recipeGenerator';
import { userProfileService } from '@/services/userProfile';
import { toast } from '@/components/ui/use-toast';
import RecipeDetailView from '@/components/recipes/RecipeDetailView';
import RecipeCard from '@/components/recipes/RecipeCard';
import SearchAndFilter from '@/components/recipes/SearchAndFilter';
import { generateSportRecipes } from '@/utils/sportRecipeGenerator';
import { getUserSport as getStoredUserSport } from '@/utils/recipeUtils';
import { useRecipeFiltering } from '@/hooks/useRecipeFiltering';

const MealBrowsing = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [commandOpen, setCommandOpen] = useState(false);
  const [sportSpecificRecipes, setSportSpecificRecipes] = useState<Recipe[]>([]);
  const [imageErrors, setImageErrors] = useState<{[key: string]: boolean}>({});
  
  const getUserSport = (): string => {
    const sportFromStorage = getStoredUserSport();
    if (sportFromStorage) return sportFromStorage;
    
    const currentUser = userProfileService.getCurrentUser();
    return currentUser?.sport || 'Basketball'; // Default to Basketball if no sport found
  };
  
  const { 
    searchTerm, 
    setSearchTerm, 
    filter, 
    setFilter, 
    filteredRecipes 
  } = useRecipeFiltering(recipes, sportSpecificRecipes);
  
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
  
  const handleImageError = (recipeId: string) => {
    setImageErrors(prev => ({
      ...prev,
      [recipeId]: true
    }));
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
            
            <SearchAndFilter
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              commandOpen={commandOpen}
              setCommandOpen={setCommandOpen}
              filterOpen={filterOpen}
              setFilterOpen={setFilterOpen}
              filter={filter}
              setFilter={setFilter}
              resultsCount={filteredRecipes().length}
              sportRecipes={sportSpecificRecipes}
              userSport={getUserSport()}
            />
            
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
                  <RecipeCard
                    key={recipe.id}
                    recipe={recipe}
                    onSelect={openRecipeDetail}
                    imageErrors={imageErrors}
                    onImageError={handleImageError}
                  />
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
