
import { Recipe } from '@/services/recipeGenerator';
import { userProfileService } from '@/services/userProfile';

export const getRecipeImage = (recipe: Recipe) => {
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

export const getUserSport = (): string => {
  const userData = localStorage.getItem('userFormData');
  if (userData) {
    const parsedData = JSON.parse(userData);
    return parsedData.sport || '';
  }
  const currentUser = userProfileService.getCurrentUser();
  return currentUser?.sport || 'Basketball'; // Default to Basketball if no sport found
};
