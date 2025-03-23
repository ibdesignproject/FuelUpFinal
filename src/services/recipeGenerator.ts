
import * as tf from '@tensorflow/tfjs';

interface Ingredient {
  name: string;
  selected: boolean;
}

interface Recipe {
  id: string;
  name: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  nutritionInfo: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  imageUrl?: string;
  rating?: number;
}

// Mock recipes database - in a real app, this would be fetched from an API
const recipesDatabase: Recipe[] = [
  {
    id: '1',
    name: 'Tomato & Cucumber Salad',
    description: 'A refreshing salad perfect for athletes',
    ingredients: ['Tomato', 'Cucumber', 'Olive Oil', 'Lemon', 'Salt'],
    instructions: [
      'Dice tomatoes and cucumbers into small cubes',
      'Mix in a bowl with olive oil, lemon juice, and salt',
      'Let it sit for 10 minutes before serving'
    ],
    nutritionInfo: {
      calories: 120,
      protein: 2,
      carbs: 8,
      fat: 9
    }
  },
  {
    id: '2',
    name: 'Apple & Orange Smoothie',
    description: 'Energy-boosting smoothie for pre-workout',
    ingredients: ['Apple', 'Orange', 'Yogurt', 'Honey'],
    instructions: [
      'Peel and chop the apple and orange',
      'Blend with yogurt and a teaspoon of honey',
      'Serve cold'
    ],
    nutritionInfo: {
      calories: 200,
      protein: 5,
      carbs: 40,
      fat: 2
    }
  },
  {
    id: '3',
    name: 'Potato & Garlic Mash',
    description: 'Great carb source for post-workout recovery',
    ingredients: ['Potato', 'Garlic', 'Butter', 'Milk', 'Salt'],
    instructions: [
      'Boil potatoes until soft',
      'Mash with roasted garlic, butter, and a splash of milk',
      'Season with salt to taste'
    ],
    nutritionInfo: {
      calories: 250,
      protein: 4,
      carbs: 45,
      fat: 8
    }
  },
  {
    id: '4',
    name: 'Lime & Cucumber Detox Water',
    description: 'Hydrating drink for athletes',
    ingredients: ['Cucumber', 'Lime', 'Mint', 'Water'],
    instructions: [
      'Slice cucumber and lime',
      'Add to a pitcher of water with mint leaves',
      'Refrigerate for at least 1 hour before drinking'
    ],
    nutritionInfo: {
      calories: 30,
      protein: 0,
      carbs: 8,
      fat: 0
    }
  },
  {
    id: '5',
    name: 'Garlic & Onion Quinoa',
    description: 'Protein-rich side dish',
    ingredients: ['Quinoa', 'Garlic', 'Onion', 'Vegetable Broth', 'Olive Oil'],
    instructions: [
      'Sauté garlic and onion in olive oil',
      'Add quinoa and vegetable broth',
      'Cook until quinoa is fluffy and liquid is absorbed'
    ],
    nutritionInfo: {
      calories: 220,
      protein: 8,
      carbs: 35,
      fat: 6
    }
  }
];

// This is a simplified model to simulate TensorFlow.js embedding and recipe recommendations
export class RecipeGenerator {
  private model: tf.Sequential | null = null;
  private isModelLoading: boolean = false;
  
  constructor() {
    // Initialize model on first use
    this.loadModel();
  }
  
  private async loadModel(): Promise<void> {
    if (this.model !== null || this.isModelLoading) return;
    
    this.isModelLoading = true;
    
    try {
      // In a real application, we would load a pre-trained model from a server
      // For this demo, we'll create a simple model that simulates recipe generation
      const model = tf.sequential();
      model.add(tf.layers.dense({
        inputShape: [10],
        units: 128,
        activation: 'relu'
      }));
      model.add(tf.layers.dense({
        units: 64,
        activation: 'relu'
      }));
      model.add(tf.layers.dense({
        units: 5, // Number of recipe IDs
        activation: 'softmax'
      }));
      
      await model.compile({
        optimizer: tf.train.adam(),
        loss: 'categoricalCrossentropy',
        metrics: ['accuracy']
      });
      
      this.model = model;
      console.log("Recipe recommendation model initialized");
    } catch (error) {
      console.error("Error loading model:", error);
    } finally {
      this.isModelLoading = false;
    }
  }
  
  // Generate recipe embeddings based on selected ingredients
  private generateEmbedding(ingredients: Ingredient[]): tf.Tensor {
    // This is a simplified simulation - in a real app, we'd use proper embeddings
    // Create a binary vector where 1 means ingredient is selected
    const inputArray = new Array(10).fill(0);
    
    ingredients.forEach((ingredient, index) => {
      if (ingredient.selected && index < 10) {
        inputArray[index] = 1;
      }
    });
    
    return tf.tensor2d([inputArray]);
  }
  
  // Find recipes that match selected ingredients
  public async getRecommendations(ingredients: Ingredient[]): Promise<Recipe[]> {
    // Wait for model to load if it's still loading
    if (this.isModelLoading) {
      await new Promise(resolve => {
        const checkLoading = () => {
          if (!this.isModelLoading) {
            resolve(true);
          } else {
            setTimeout(checkLoading, 100);
          }
        };
        checkLoading();
      });
    }
    
    // Load model if not loaded
    if (this.model === null) {
      await this.loadModel();
    }
    
    try {
      // For simplicity, we'll just filter recipes based on ingredients
      const selectedIngredients = ingredients
        .filter(ing => ing.selected)
        .map(ing => ing.name);
      
      if (selectedIngredients.length === 0) {
        return recipesDatabase.slice(0, 3); // Return first 3 recipes if no ingredients selected
      }
      
      // Find recipes that contain at least one of the selected ingredients
      const matchedRecipes = recipesDatabase.filter(recipe => {
        return recipe.ingredients.some(ingredient => 
          selectedIngredients.includes(ingredient)
        );
      });
      
      // If we have a model, we would use it for ranking in a real application
      if (this.model !== null) {
        // Simulate model prediction with TensorFlow
        const embedding = this.generateEmbedding(ingredients);
        const prediction = this.model.predict(embedding) as tf.Tensor;
        
        // Log prediction (just for demonstration)
        prediction.data().then(data => {
          console.log("Recipe recommendation scores:", data);
        });
        
        // Clean up tensors
        embedding.dispose();
        prediction.dispose();
      }
      
      return matchedRecipes.length > 0 
        ? matchedRecipes 
        : recipesDatabase.slice(0, 3); // Fallback to first 3 recipes if no matches
      
    } catch (error) {
      console.error("Error generating recommendations:", error);
      return recipesDatabase.slice(0, 3); // Return first 3 recipes as fallback
    }
  }
}

// Singleton instance
export const recipeGenerator = new RecipeGenerator();
