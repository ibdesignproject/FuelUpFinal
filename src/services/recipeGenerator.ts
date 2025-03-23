
import * as tf from '@tensorflow/tfjs';

export interface Recipe {
  id: string;
  name: string;
  image: string;
  description: string;
  prepTime: number; // in minutes
  cookTime: number; // in minutes
  calories: number;
  protein: number; // in grams
  carbs: number; // in grams
  fat: number; // in grams
  ingredients: string[];
  instructions: string[];
  tags: string[];
  rating?: number;
  source?: string;
  nutritionInfo?: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
}

interface GeneratorInput {
  ingredients?: string[];
  dietary?: string[];
  mealType?: string;
  calories?: {min: number; max: number};
  protein?: {min: number; max: number};
  prepTime?: number; // max prep time in minutes
}

// Mock database of recipes
const recipeDb: Recipe[] = [
  {
    id: '1',
    name: 'High-Protein Chicken Stir Fry',
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2072&q=80',
    description: 'A protein-packed stir fry perfect for athletes',
    prepTime: 15,
    cookTime: 10,
    calories: 450,
    protein: 40,
    carbs: 30,
    fat: 15,
    ingredients: [
      '1 lb chicken breast, sliced',
      '2 cups broccoli florets',
      '1 red bell pepper, sliced',
      '1 cup snap peas',
      '2 tbsp olive oil',
      '3 cloves garlic, minced',
      '1 tbsp ginger, grated',
      '3 tbsp low-sodium soy sauce',
      '1 tbsp honey',
      '1 tsp sesame oil',
      '1 tbsp cornstarch'
    ],
    instructions: [
      'Slice chicken into thin strips and marinate with 1 tbsp soy sauce for 10 minutes.',
      'Mix remaining soy sauce, honey, and cornstarch in a small bowl to create sauce.',
      'Heat olive oil in a large wok or skillet over high heat.',
      'Add chicken and cook until no longer pink, about 5-6 minutes.',
      'Add garlic and ginger, stir for 30 seconds until fragrant.',
      'Add broccoli, bell pepper, and snap peas, stir-fry for 3-4 minutes until vegetables are crisp-tender.',
      'Pour sauce over the mixture, stirring constantly until thickened, about 1-2 minutes.',
      'Drizzle with sesame oil before serving.'
    ],
    tags: ['high-protein', 'dinner', 'muscle-building', 'quick'],
    nutritionInfo: {
      calories: 450,
      protein: 40,
      carbs: 30,
      fat: 15
    }
  },
  {
    id: '2',
    name: 'Athlete\'s Overnight Oats',
    image: 'https://images.unsplash.com/photo-1584913527550-a3a5a804d922?auto=format&fit=crop&q=80&w=2000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Prepare this the night before for a quick energy-boosting breakfast',
    prepTime: 5,
    cookTime: 0,
    calories: 350,
    protein: 20,
    carbs: 45,
    fat: 10,
    ingredients: [
      '1 cup rolled oats',
      '1 cup milk of choice',
      '1/4 cup Greek yogurt',
      '1 tbsp chia seeds',
      '1 tbsp honey or maple syrup',
      '1/2 tsp vanilla extract',
      '1/2 cup berries',
      '1 tbsp almond butter'
    ],
    instructions: [
      'Combine oats, milk, yogurt, chia seeds, honey, and vanilla in a jar or container.',
      'Stir well to mix all ingredients thoroughly.',
      'Seal container and refrigerate overnight or for at least 4 hours.',
      'Before eating, top with berries and a tablespoon of almond butter.',
      'Can be stored in refrigerator for up to 3 days.'
    ],
    tags: ['breakfast', 'pre-workout', 'high-carb', 'no-cook'],
    nutritionInfo: {
      calories: 350,
      protein: 20,
      carbs: 45,
      fat: 10
    }
  },
  {
    id: '3',
    name: 'Recovery Smoothie Bowl',
    image: 'https://images.unsplash.com/photo-1546039907-9d4a26dfeee4?auto=format&fit=crop&q=80&w=2000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Perfect post-workout meal to aid muscle recovery',
    prepTime: 10,
    cookTime: 0,
    calories: 380,
    protein: 25,
    carbs: 50,
    fat: 12,
    ingredients: [
      '1 frozen banana',
      '1/2 cup frozen berries',
      '1 scoop protein powder (vanilla or flavor of choice)',
      '1 cup spinach',
      '1 tbsp almond butter',
      '1/2 cup almond milk',
      'Toppings: sliced banana, granola, chia seeds, berries'
    ],
    instructions: [
      'Place frozen banana, berries, protein powder, spinach, almond butter, and almond milk in a blender.',
      'Blend until smooth, adding more almond milk if needed for desired consistency.',
      'Pour into a bowl and top with sliced banana, granola, chia seeds, and additional berries.',
      'Consume immediately for optimal nutrition.'
    ],
    tags: ['post-workout', 'recovery', 'high-protein', 'no-cook'],
    nutritionInfo: {
      calories: 380,
      protein: 25,
      carbs: 50,
      fat: 12
    }
  }
];

// Model mock - in a real app this would be a trained TensorFlow model
class MealPlannerModel {
  model: any;
  
  constructor() {
    // In a real app, we would load a proper model
    this.model = {
      predict: (input: any) => {
        // This is just a mock implementation
        console.log("AI model processing input:", input);
        return tf.tensor1d([1, 2, 3]);
      }
    };
  }
  
  // This would predict which recipes are most suitable
  async predictRecipes(input: GeneratorInput): Promise<Recipe[]> {
    // In a real implementation, we would:
    // 1. Process the input to create model features
    // 2. Run the prediction
    // 3. Map prediction results to recipe IDs
    
    console.log("Generating recipes with parameters:", input);
    
    // Mock filtering based on inputs
    let filteredRecipes = [...recipeDb];
    
    // Filter by ingredients if specified
    if (input.ingredients && input.ingredients.length > 0) {
      filteredRecipes = filteredRecipes.filter(recipe => 
        input.ingredients!.some(ing => 
          recipe.ingredients.some(recipeIng => 
            recipeIng.toLowerCase().includes(ing.toLowerCase())
          )
        )
      );
    }
    
    // Filter by dietary restrictions
    if (input.dietary && input.dietary.length > 0) {
      // This would be more sophisticated in a real app
      // Here we just check if any tags match the dietary restrictions
      filteredRecipes = filteredRecipes.filter(recipe => 
        input.dietary!.some(diet => 
          recipe.tags.some(tag => tag.toLowerCase().includes(diet.toLowerCase()))
        )
      );
    }
    
    // Filter by meal type
    if (input.mealType) {
      filteredRecipes = filteredRecipes.filter(recipe => 
        recipe.tags.some(tag => tag.toLowerCase() === input.mealType!.toLowerCase())
      );
    }
    
    // Filter by calorie range
    if (input.calories) {
      filteredRecipes = filteredRecipes.filter(recipe => 
        recipe.calories >= input.calories!.min && 
        recipe.calories <= input.calories!.max
      );
    }
    
    // Filter by protein range
    if (input.protein) {
      filteredRecipes = filteredRecipes.filter(recipe => 
        recipe.protein >= input.protein!.min && 
        recipe.protein <= input.protein!.max
      );
    }
    
    // Filter by prep time
    if (input.prepTime) {
      filteredRecipes = filteredRecipes.filter(recipe => 
        recipe.prepTime <= input.prepTime!
      );
    }
    
    // If no recipes match the filters, return a random selection
    if (filteredRecipes.length === 0) {
      const randomRecipes = [];
      for (let i = 0; i < 3 && i < recipeDb.length; i++) {
        const randomIndex = Math.floor(Math.random() * recipeDb.length);
        randomRecipes.push(recipeDb[randomIndex]);
      }
      return randomRecipes;
    }
    
    return filteredRecipes;
  }
}

const model = new MealPlannerModel();

export const generateRecipesBasedOnPreferences = async (input: GeneratorInput): Promise<Recipe[]> => {
  try {
    return await model.predictRecipes(input);
  } catch (error) {
    console.error("Error generating recipes:", error);
    return recipeDb.slice(0, 3); // Fallback to returning the first 3 recipes
  }
};

export const getRecipes = (): Recipe[] => {
  return recipeDb;
};

export const getRecipeById = (id: string): Recipe | undefined => {
  return recipeDb.find(recipe => recipe.id === id);
};

// Add this function to get recommendations based on ingredients
export const getRecommendations = async (ingredients: any[]): Promise<Recipe[]> => {
  // Extract ingredient names if they're objects with a name property
  const ingredientNames = ingredients.filter(ing => ing.selected).map(ing => 
    typeof ing === 'string' ? ing : ing.name
  );
  
  return generateRecipesBasedOnPreferences({
    ingredients: ingredientNames
  });
};

// Export the service as an object with methods
export const recipeGenerator = {
  generateRecipesBasedOnPreferences,
  getRecipes,
  getRecipeById,
  getRecommendations
};

export const recipeGeneratorService = {
  generateRecipesBasedOnPreferences,
  getRecipes,
  getRecipeById
};
