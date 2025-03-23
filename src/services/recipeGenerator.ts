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
  popularity?: number;
  timeAdded?: string;
  source?: string;
  nutritionInfo: {
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
  },
  {
    id: '4',
    name: 'Protein-Packed Quinoa Salad',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    description: 'A nutrient-dense salad that\'s perfect for lunch or a light dinner',
    prepTime: 15,
    cookTime: 20,
    calories: 420,
    protein: 22,
    carbs: 45,
    fat: 18,
    ingredients: [
      '1 cup quinoa, rinsed',
      '2 cups vegetable or chicken broth',
      '1 can (15 oz) chickpeas, drained and rinsed',
      '1 cucumber, diced',
      '1 cup cherry tomatoes, halved',
      '1/2 red onion, finely diced',
      '1/4 cup feta cheese, crumbled',
      '1/4 cup fresh parsley, chopped',
      '3 tbsp olive oil',
      '2 tbsp lemon juice',
      '1 tbsp Dijon mustard',
      'Salt and pepper to taste'
    ],
    instructions: [
      'Cook quinoa in broth according to package directions. Allow to cool completely.',
      'In a large bowl, combine cooled quinoa, chickpeas, cucumber, tomatoes, red onion, feta cheese, and parsley.',
      'In a small bowl, whisk together olive oil, lemon juice, Dijon mustard, salt, and pepper.',
      'Pour dressing over quinoa mixture and toss to combine.',
      'Refrigerate for at least 30 minutes before serving to allow flavors to meld.',
      'Can be stored in the refrigerator for up to 3 days.'
    ],
    tags: ['lunch', 'high-protein', 'vegetarian', 'meal-prep'],
    nutritionInfo: {
      calories: 420,
      protein: 22,
      carbs: 45,
      fat: 18
    }
  },
  {
    id: '5',
    name: 'Tomato & Garlic Pasta',
    image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    description: 'A simple, flavorful pasta dish that\'s quick to make',
    prepTime: 10,
    cookTime: 15,
    calories: 380,
    protein: 12,
    carbs: 65,
    fat: 10,
    ingredients: [
      '8 oz whole wheat pasta',
      '3 large tomatoes, diced',
      '4 cloves garlic, minced',
      '1/4 cup olive oil',
      '1/4 cup fresh basil, chopped',
      '2 tbsp balsamic vinegar',
      '1/4 cup grated Parmesan cheese',
      'Salt and pepper to taste',
      'Red pepper flakes (optional)'
    ],
    instructions: [
      'Cook pasta according to package directions until al dente.',
      'While pasta cooks, heat olive oil in a large pan over medium heat.',
      'Add garlic and sauté for 1 minute until fragrant.',
      'Add diced tomatoes and cook for 5-7 minutes until they start to break down.',
      'Stir in balsamic vinegar, salt, pepper, and red pepper flakes if using.',
      'Drain pasta and add to the tomato sauce, tossing to combine.',
      'Remove from heat and stir in fresh basil and Parmesan cheese.',
      'Serve immediately, with additional Parmesan if desired.'
    ],
    tags: ['dinner', 'quick', 'vegetarian', 'tomato', 'garlic'],
    nutritionInfo: {
      calories: 380,
      protein: 12,
      carbs: 65,
      fat: 10
    }
  },
  {
    id: '6',
    name: 'Cucumber & Apple Smoothie',
    image: 'https://images.unsplash.com/photo-1638176536925-12fef6968afb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    description: 'A refreshing, hydrating smoothie perfect for hot days',
    prepTime: 5,
    cookTime: 0,
    calories: 150,
    protein: 3,
    carbs: 35,
    fat: 1,
    ingredients: [
      '1 cucumber, peeled and chopped',
      '1 green apple, cored and chopped',
      '1 cup spinach',
      '1/2 cup water',
      '1/2 cup ice',
      '1 tbsp lemon juice',
      '1 tbsp honey or maple syrup (optional)',
      '1/4 tsp ginger, grated (optional)'
    ],
    instructions: [
      'Add all ingredients to a blender.',
      'Blend on high until smooth and creamy.',
      'Taste and adjust sweetness if needed.',
      'Pour into glasses and serve immediately.'
    ],
    tags: ['breakfast', 'snack', 'low-calorie', 'no-cook', 'cucumber', 'apple'],
    nutritionInfo: {
      calories: 150,
      protein: 3,
      carbs: 35,
      fat: 1
    }
  },
  {
    id: '7',
    name: 'Potato & Onion Frittata',
    image: 'https://images.unsplash.com/photo-1594834749740-74b3f6764be4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    description: 'A hearty, protein-rich breakfast or brunch option',
    prepTime: 15,
    cookTime: 25,
    calories: 320,
    protein: 18,
    carbs: 30,
    fat: 15,
    ingredients: [
      '8 large eggs',
      '2 medium potatoes, thinly sliced',
      '1 medium onion, thinly sliced',
      '2 tbsp olive oil',
      '1/4 cup milk',
      '1/4 cup grated cheese (cheddar or Parmesan)',
      '2 tbsp fresh herbs (parsley, chives, or basil)',
      'Salt and pepper to taste'
    ],
    instructions: [
      'Preheat oven to 375°F (190°C).',
      'Heat olive oil in an oven-safe skillet over medium heat.',
      'Add sliced potatoes and cook for 10 minutes until tender.',
      'Add sliced onions and cook for another 5 minutes until soft and golden.',
      'In a bowl, whisk together eggs, milk, salt, and pepper.',
      'Pour egg mixture over the potatoes and onions in the skillet.',
      'Sprinkle with grated cheese and cook for 2 minutes.',
      'Transfer skillet to oven and bake for 15-18 minutes until set.',
      'Sprinkle with fresh herbs before serving.'
    ],
    tags: ['breakfast', 'brunch', 'high-protein', 'potato', 'onion'],
    nutritionInfo: {
      calories: 320,
      protein: 18,
      carbs: 30,
      fat: 15
    }
  },
  {
    id: '8',
    name: 'Lemon Garlic Baked Chicken',
    image: 'https://images.unsplash.com/photo-1604908177453-7462950a6a3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    description: 'Juicy, flavorful chicken with bright lemon and garlic notes',
    prepTime: 10,
    cookTime: 35,
    calories: 300,
    protein: 35,
    carbs: 5,
    fat: 16,
    ingredients: [
      '4 chicken breasts',
      '2 lemons, one juiced and one sliced',
      '4 cloves garlic, minced',
      '2 tbsp olive oil',
      '1 tbsp dried oregano',
      '1 tsp dried thyme',
      'Salt and pepper to taste',
      '1/4 cup chicken broth'
    ],
    instructions: [
      'Preheat oven to 400°F (200°C).',
      'In a bowl, mix lemon juice, olive oil, minced garlic, oregano, thyme, salt, and pepper.',
      'Place chicken breasts in a baking dish and pour the marinade over them.',
      'Arrange lemon slices around and on top of the chicken.',
      'Pour chicken broth into the bottom of the dish.',
      'Bake for 30-35 minutes until chicken reaches an internal temperature of 165°F (74°C).',
      'Let rest for 5 minutes before serving.',
      'Spoon the pan juices over the chicken when serving.'
    ],
    tags: ['dinner', 'high-protein', 'low-carb', 'lemon', 'garlic'],
    nutritionInfo: {
      calories: 300,
      protein: 35,
      carbs: 5,
      fat: 16
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
    console.log("Generating recipes with parameters:", input);
    
    // CRITICAL: The user has ONLY the selected ingredients and nothing else
    if (!input.ingredients || input.ingredients.length === 0) {
      console.log("No ingredients selected, returning empty recipe list");
      return [];
    }
    
    console.log("User has ONLY these ingredients:", input.ingredients);
    
    // First, try to find recipes that use ONLY the selected ingredients
    // We'll create custom recipes based solely on the provided ingredients
    
    // Generate a completely new recipe using ONLY the selected ingredients
    const generateNewRecipeFromIngredients = (ingredients: string[]): Recipe => {
      // Capitalize first letter of each ingredient for recipe name
      const formatIngName = (ing: string) => ing.charAt(0).toUpperCase() + ing.slice(1).toLowerCase();
      
      // Get up to 2 ingredients for the name
      const nameIngredients = ingredients.slice(0, 2).map(formatIngName);
      const recipeName = nameIngredients.join(' & ') + (ingredients.length > 2 ? ' Delight' : ' Special');
      
      // Generate simple instructions based only on these ingredients
      const instructions = [
        `Gather your ingredients: ${ingredients.join(', ')}.`,
        `Prepare the ${ingredients[0]} by washing and cutting into bite-sized pieces.`,
      ];
      
      // Add ingredient-specific instructions
      ingredients.forEach((ing, index) => {
        if (index === 0) return; // Skip first ingredient as it's already handled
        instructions.push(`Add the ${ing} and combine with the ${ingredients[0]}.`);
      });
      
      // Add finishing instructions
      instructions.push("Season with salt and pepper to taste.");
      instructions.push(`Serve your ${recipeName} fresh and enjoy!`);
      
      // Generate nutrition values based on number of ingredients
      const baseCalories = 150 + (ingredients.length * 20);
      const baseProtein = 5 + (ingredients.length * 2);
      const baseCarbs = 15 + (ingredients.length * 3);
      const baseFat = 7 + (ingredients.length);
      
      return {
        id: "strict-custom-" + Date.now(),
        name: recipeName,
        image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
        description: `A custom recipe created just for you using only ${ingredients.join(', ')}. Nothing else needed!`,
        prepTime: 10,
        cookTime: 15,
        calories: baseCalories,
        protein: baseProtein,
        carbs: baseCarbs,
        fat: baseFat,
        ingredients: ingredients.map(ing => `${ing}`),
        instructions: instructions,
        tags: ["custom", "quick", ...ingredients],
        nutritionInfo: {
          calories: baseCalories,
          protein: baseProtein,
          carbs: baseCarbs,
          fat: baseFat
        }
      };
    };
    
    // Generate 3 different variations of recipes using ONLY the provided ingredients
    const recipes: Recipe[] = [];
    
    // Recipe 1: Basic combination
    recipes.push(generateNewRecipeFromIngredients(input.ingredients));
    
    // Recipe 2: Different preparation style
    if (input.ingredients.length > 1) {
      const recipe2 = generateNewRecipeFromIngredients(input.ingredients);
      recipe2.id = "strict-custom-" + (Date.now() + 1);
      recipe2.name = input.ingredients[0] + " " + input.ingredients[1] + " Medley";
      recipe2.description = `A different preparation using only your selected ingredients: ${input.ingredients.join(', ')}`;
      
      // Different instructions
      recipe2.instructions = [
        `Start with all your ingredients: ${input.ingredients.join(', ')}.`,
        `Finely dice the ${input.ingredients[0]}.`
      ];
      
      input.ingredients.slice(1).forEach(ing => {
        recipe2.instructions.push(`Slice the ${ing} thinly and set aside.`);
      });
      
      recipe2.instructions.push(`Combine all prepared ingredients in a bowl.`);
      recipe2.instructions.push(`Mix well and let sit for 5 minutes to blend flavors.`);
      recipe2.instructions.push(`Serve your ${recipe2.name} chilled or at room temperature.`);
      
      recipes.push(recipe2);
    }
    
    // Recipe 3: Cooked version if more than 2 ingredients
    if (input.ingredients.length >= 2) {
      const recipe3 = generateNewRecipeFromIngredients(input.ingredients);
      recipe3.id = "strict-custom-" + (Date.now() + 2);
      recipe3.name = "Sautéed " + recipe3.name;
      recipe3.description = `A hot, cooked dish using only ${input.ingredients.join(' and ')}.`;
      
      // Different instructions for cooking
      recipe3.instructions = [
        `Prepare all ingredients: ${input.ingredients.join(', ')}.`,
        `Heat a pan over medium heat.`,
        `Add a small amount of water to the pan (if needed for cooking).`
      ];
      
      input.ingredients.forEach(ing => {
        recipe3.instructions.push(`Add the ${ing} to the pan and cook for 2-3 minutes.`);
      });
      
      recipe3.instructions.push(`Stir occasionally until everything is cooked through.`);
      recipe3.instructions.push(`Serve your ${recipe3.name} hot.`);
      
      recipes.push(recipe3);
    }
    
    console.log(`Generated ${recipes.length} recipes using ONLY the selected ingredients`);
    return recipes;
  }
}

const model = new MealPlannerModel();

export const generateRecipesBasedOnPreferences = async (input: GeneratorInput): Promise<Recipe[]> => {
  try {
    return await model.predictRecipes(input);
  } catch (error) {
    console.error("Error generating recipes:", error);
    return []; // Return empty array instead of fallbacks
  }
};

export const getRecipes = (): Recipe[] => {
  return recipeDb;
};

export const getRecipeById = (id: string): Recipe | undefined => {
  return recipeDb.find(recipe => recipe.id === id);
};

// Define the Ingredient type more clearly
export interface Ingredient {
  name: string;
  selected: boolean;
}

// Add this function to get recommendations based on ingredients
export const getRecommendations = async (ingredients: (Ingredient | string)[]): Promise<Recipe[]> => {
  // Extract ingredient names if they're objects with a name property
  const ingredientNames = ingredients
    .filter((ing): ing is Ingredient | string => {
      if (typeof ing === 'object' && ing !== null) {
        return 'selected' in ing && ing.selected;
      }
      return typeof ing === 'string';
    })
    .map((ing) => {
      if (typeof ing === 'string') {
        return ing;
      }
      // After our type guard above, TypeScript should know this is an Ingredient
      return ing.name;
    });
  
  console.log("Generating recipes with STRICTLY ONLY these ingredients:", ingredientNames);
  console.log("IMPORTANT: We assume the user has NO OTHER ingredients available");
  
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
