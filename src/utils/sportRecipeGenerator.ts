
import { Recipe } from '@/services/recipeGenerator';

export const generateSportRecipes = (sport: string): Recipe[] => {
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
    const profile = getNutritionProfile(sportPrefix);
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
