
import { toast } from "@/components/ui/use-toast";

export interface UserProfile {
  id: string;
  name: string;
  age: number;
  weight: number;
  height: number;
  activityLevel: 'low' | 'moderate' | 'high';
  goals: string[];
  dietaryPreferences: string[];
  streaks: {
    water: number;
    protein: number;
    calories: number;
  };
}

export interface NutritionLog {
  id: string;
  userId: string;
  date: string;
  water: number; // in ml
  protein: number; // in grams
  calories: number; // in kcal
  meals: {
    id: string;
    name: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    time: string; // e.g. 'breakfast', 'lunch', 'dinner', 'snack'
  }[];
}

class UserProfileService {
  private currentUser: UserProfile | null = null;
  private nutritionLogs: NutritionLog[] = [];
  
  constructor() {
    // Load user data from localStorage on initialization
    this.loadUserData();
  }
  
  private loadUserData(): void {
    try {
      const userData = localStorage.getItem('userProfile');
      const logsData = localStorage.getItem('nutritionLogs');
      
      if (userData) {
        this.currentUser = JSON.parse(userData);
      }
      
      if (logsData) {
        this.nutritionLogs = JSON.parse(logsData);
      }
    } catch (error) {
      console.error("Error loading user data:", error);
    }
  }
  
  private saveUserData(): void {
    try {
      if (this.currentUser) {
        localStorage.setItem('userProfile', JSON.stringify(this.currentUser));
      }
      
      localStorage.setItem('nutritionLogs', JSON.stringify(this.nutritionLogs));
    } catch (error) {
      console.error("Error saving user data:", error);
    }
  }
  
  public login(phoneNumber: string, password: string): boolean {
    // In a real app, this would validate credentials against a backend
    // For demo purposes, we'll create a mock user if none exists
    if (!this.currentUser) {
      this.currentUser = {
        id: '1',
        name: 'Alex Smith',
        age: 17,
        weight: 68, // in kg
        height: 175, // in cm
        activityLevel: 'high',
        goals: ['Build muscle', 'Improve endurance'],
        dietaryPreferences: ['High protein', 'Low sugar'],
        streaks: {
          water: 3,
          protein: 5,
          calories: 2
        }
      };
      
      // Create sample nutrition log for today
      const today = new Date().toISOString().split('T')[0];
      this.nutritionLogs.push({
        id: '1',
        userId: '1',
        date: today,
        water: 1200,
        protein: 45,
        calories: 1500,
        meals: [
          {
            id: '1',
            name: 'Protein Oatmeal',
            calories: 350,
            protein: 20,
            carbs: 45,
            fat: 8,
            time: 'breakfast'
          },
          {
            id: '2',
            name: 'Chicken Salad',
            calories: 450,
            protein: 35,
            carbs: 15,
            fat: 20,
            time: 'lunch'
          }
        ]
      });
      
      this.saveUserData();
      
      toast({
        title: "Welcome to FuelUp!",
        description: "Your account has been created successfully.",
      });
      
      return true;
    }
    
    // Simulate successful login
    toast({
      title: "Welcome back!",
      description: "You are now logged in.",
    });
    
    return true;
  }
  
  public logout(): void {
    // In a real app, we would clear session tokens
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
  }
  
  public getCurrentUser(): UserProfile | null {
    return this.currentUser;
  }
  
  public getTodayNutritionLog(): NutritionLog | null {
    const today = new Date().toISOString().split('T')[0];
    return this.nutritionLogs.find(log => log.date === today) || null;
  }
  
  public updateWaterIntake(amount: number): void {
    if (!this.currentUser) return;
    
    let todayLog = this.getTodayNutritionLog();
    
    if (!todayLog) {
      // Create new log for today
      const today = new Date().toISOString().split('T')[0];
      todayLog = {
        id: Date.now().toString(),
        userId: this.currentUser.id,
        date: today,
        water: 0,
        protein: 0,
        calories: 0,
        meals: []
      };
      this.nutritionLogs.push(todayLog);
    }
    
    todayLog.water += amount;
    
    // Update streak if goal reached (2000ml)
    if (todayLog.water >= 2000 && this.currentUser.streaks.water === 0) {
      this.currentUser.streaks.water += 1;
      toast({
        title: "Water Streak Updated!",
        description: `You're on a ${this.currentUser.streaks.water} day streak!`,
      });
    }
    
    this.saveUserData();
  }
  
  public addMeal(meal: {
    name: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    time: string;
  }): void {
    if (!this.currentUser) return;
    
    let todayLog = this.getTodayNutritionLog();
    
    if (!todayLog) {
      // Create new log for today
      const today = new Date().toISOString().split('T')[0];
      todayLog = {
        id: Date.now().toString(),
        userId: this.currentUser.id,
        date: today,
        water: 0,
        protein: 0,
        calories: 0,
        meals: []
      };
      this.nutritionLogs.push(todayLog);
    }
    
    // Add meal
    todayLog.meals.push({
      id: Date.now().toString(),
      ...meal
    });
    
    // Update totals
    todayLog.calories += meal.calories;
    todayLog.protein += meal.protein;
    
    // Update streaks if goals reached
    // Protein goal: 120g for athletes
    if (todayLog.protein >= 120 && this.currentUser.streaks.protein === 0) {
      this.currentUser.streaks.protein += 1;
      toast({
        title: "Protein Streak Updated!",
        description: `You're on a ${this.currentUser.streaks.protein} day streak!`,
      });
    }
    
    // Calorie goal (example: 2500 for teenage athletes)
    if (todayLog.calories >= 2500 && this.currentUser.streaks.calories === 0) {
      this.currentUser.streaks.calories += 1;
      toast({
        title: "Calorie Streak Updated!",
        description: `You're on a ${this.currentUser.streaks.calories} day streak!`,
      });
    }
    
    this.saveUserData();
    
    toast({
      title: "Meal Added",
      description: `${meal.name} has been added to your log.`,
    });
  }
  
  public resetStreaks(): void {
    if (!this.currentUser) return;
    
    this.currentUser.streaks = {
      water: 0,
      protein: 0,
      calories: 0
    };
    
    this.saveUserData();
  }
}

// Singleton instance
export const userProfileService = new UserProfileService();
