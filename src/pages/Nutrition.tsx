
import React, { useState, useEffect } from 'react';
import PageTransition from '@/components/common/PageTransition';
import BottomNavigation from '@/components/layout/BottomNavigation';
import { Plus, BarChart2, Droplet, Award, Beef, Flame } from 'lucide-react';
import { userProfileService, NutritionLog } from '@/services/userProfile';
import { toast } from '@/components/ui/use-toast';

const Nutrition = () => {
  const [nutritionLog, setNutritionLog] = useState<NutritionLog | null>(null);
  const [waterAmount, setWaterAmount] = useState<number>(250); // ml
  const [proteinAmount, setProteinAmount] = useState<number>(20); // g
  const [caloriesAmount, setCaloriesAmount] = useState<number>(250); // kcal
  const [showWaterInput, setShowWaterInput] = useState(false);
  const [showProteinInput, setShowProteinInput] = useState(false);
  const [showCaloriesInput, setShowCaloriesInput] = useState(false);
  
  // Calculate progress percentages
  const waterProgress = nutritionLog ? Math.min((nutritionLog.water / 2000) * 100, 100) : 0;
  const proteinProgress = nutritionLog ? Math.min((nutritionLog.protein / 120) * 100, 100) : 0;
  const calorieProgress = nutritionLog ? Math.min((nutritionLog.calories / 2500) * 100, 100) : 0;
  
  useEffect(() => {
    // Load nutrition log
    const log = userProfileService.getTodayNutritionLog();
    setNutritionLog(log);
  }, []);
  
  const handleAddWater = () => {
    if (waterAmount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid water amount.",
      });
      return;
    }
    
    userProfileService.updateWaterIntake(waterAmount);
    
    // Refresh log data
    const updatedLog = userProfileService.getTodayNutritionLog();
    setNutritionLog(updatedLog);
    
    toast({
      title: "Water Added",
      description: `Added ${waterAmount}ml of water to your log.`,
    });
    
    setShowWaterInput(false);
  };

  const handleAddProtein = () => {
    if (proteinAmount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid protein amount.",
      });
      return;
    }
    
    // Create a simple meal structure for the protein
    const proteinMeal = {
      name: "Protein Intake",
      calories: 0, // We're only tracking protein here
      protein: proteinAmount,
      carbs: 0,
      fat: 0,
      time: "snack"
    };
    
    userProfileService.addMeal(proteinMeal);
    
    // Refresh log data
    const updatedLog = userProfileService.getTodayNutritionLog();
    setNutritionLog(updatedLog);
    
    toast({
      title: "Protein Added",
      description: `Added ${proteinAmount}g of protein to your log.`,
    });
    
    setShowProteinInput(false);
  };

  const handleAddCalories = () => {
    if (caloriesAmount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid calorie amount.",
      });
      return;
    }
    
    // Create a simple meal structure for the calories
    const calorieMeal = {
      name: "Calorie Intake",
      calories: caloriesAmount,
      protein: 0, // We're only tracking calories here
      carbs: 0,
      fat: 0,
      time: "snack"
    };
    
    userProfileService.addMeal(calorieMeal);
    
    // Refresh log data
    const updatedLog = userProfileService.getTodayNutritionLog();
    setNutritionLog(updatedLog);
    
    toast({
      title: "Calories Added",
      description: `Added ${caloriesAmount} calories to your log.`,
    });
    
    setShowCaloriesInput(false);
  };
  
  return (
    <PageTransition>
      <div className="app-container">
        <div className="page-content flex flex-col min-h-screen">
          <div className="flex-1 p-4">
            <div className="mt-8 mb-6">
              <h1 className="text-fuelup-green text-2xl font-heading">Nutrition Tracking</h1>
            </div>
            
            <div className="fuelup-container mb-6">
              <h2 className="text-xl mb-4 font-medium">Today's Progress</h2>
              
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="flex flex-col items-center">
                  <div className="relative h-20 w-20 mb-2">
                    <svg className="w-full h-full" viewBox="0 0 36 36">
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="rgba(245, 242, 237, 0.3)"
                        strokeWidth="3"
                      />
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#f5f2ed"
                        strokeWidth="3"
                        strokeDasharray={`${waterProgress}, 100`}
                      />
                    </svg>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                      <Droplet size={24} className="mx-auto" />
                      <span className="text-xs font-medium block">
                        {nutritionLog?.water || 0}/2000ml
                      </span>
                    </div>
                  </div>
                  <span className="text-sm font-medium">Water</span>
                  <span className="text-xs">{waterProgress.toFixed(0)}%</span>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="relative h-20 w-20 mb-2">
                    <svg className="w-full h-full" viewBox="0 0 36 36">
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="rgba(245, 242, 237, 0.3)"
                        strokeWidth="3"
                      />
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#f5f2ed"
                        strokeWidth="3"
                        strokeDasharray={`${proteinProgress}, 100`}
                      />
                    </svg>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                      <Beef size={24} className="mx-auto" />
                      <span className="text-xs font-medium block">
                        {nutritionLog?.protein || 0}/120g
                      </span>
                    </div>
                  </div>
                  <span className="text-sm font-medium">Protein</span>
                  <span className="text-xs">{proteinProgress.toFixed(0)}%</span>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="relative h-20 w-20 mb-2">
                    <svg className="w-full h-full" viewBox="0 0 36 36">
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="rgba(245, 242, 237, 0.3)"
                        strokeWidth="3"
                      />
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#f5f2ed"
                        strokeWidth="3"
                        strokeDasharray={`${calorieProgress}, 100`}
                      />
                    </svg>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                      <Flame size={24} className="mx-auto" />
                      <span className="text-xs font-medium block">
                        {nutritionLog?.calories || 0}/2500
                      </span>
                    </div>
                  </div>
                  <span className="text-sm font-medium">Calories</span>
                  <span className="text-xs">{calorieProgress.toFixed(0)}%</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-fuelup-green/30 rounded-lg mb-4">
                <div className="flex items-center">
                  <Droplet size={20} className="mr-2" />
                  <span>Add water intake</span>
                </div>
                <button 
                  className="bg-fuelup-green text-white p-1.5 rounded-full"
                  onClick={() => setShowWaterInput(!showWaterInput)}
                >
                  <Plus size={16} />
                </button>
              </div>
              
              {showWaterInput && (
                <div className="bg-fuelup-green/20 p-3 rounded-lg mb-4 animate-slide-in">
                  <div className="flex gap-2 items-center">
                    <div className="flex-1">
                      <input
                        type="number"
                        value={waterAmount}
                        onChange={(e) => setWaterAmount(parseInt(e.target.value) || 0)}
                        className="fuelup-input text-center"
                        placeholder="Amount in ml"
                      />
                    </div>
                    <button 
                      className="bg-fuelup-green text-white py-2 px-4 rounded-lg"
                      onClick={handleAddWater}
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex justify-between mt-3">
                    <button 
                      className="bg-fuelup-green/30 text-white py-1 px-3 rounded-lg text-sm"
                      onClick={() => setWaterAmount(100)}
                    >
                      100ml
                    </button>
                    <button 
                      className="bg-fuelup-green/30 text-white py-1 px-3 rounded-lg text-sm"
                      onClick={() => setWaterAmount(250)}
                    >
                      250ml
                    </button>
                    <button 
                      className="bg-fuelup-green/30 text-white py-1 px-3 rounded-lg text-sm"
                      onClick={() => setWaterAmount(500)}
                    >
                      500ml
                    </button>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between p-3 bg-fuelup-green/30 rounded-lg mb-4">
                <div className="flex items-center">
                  <Beef size={20} className="mr-2" />
                  <span>Add protein intake</span>
                </div>
                <button 
                  className="bg-fuelup-green text-white p-1.5 rounded-full"
                  onClick={() => setShowProteinInput(!showProteinInput)}
                >
                  <Plus size={16} />
                </button>
              </div>
              
              {showProteinInput && (
                <div className="bg-fuelup-green/20 p-3 rounded-lg mb-4 animate-slide-in">
                  <div className="flex gap-2 items-center">
                    <div className="flex-1">
                      <input
                        type="number"
                        value={proteinAmount}
                        onChange={(e) => setProteinAmount(parseInt(e.target.value) || 0)}
                        className="fuelup-input text-center"
                        placeholder="Amount in grams"
                      />
                    </div>
                    <button 
                      className="bg-fuelup-green text-white py-2 px-4 rounded-lg"
                      onClick={handleAddProtein}
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex justify-between mt-3">
                    <button 
                      className="bg-fuelup-green/30 text-white py-1 px-3 rounded-lg text-sm"
                      onClick={() => setProteinAmount(10)}
                    >
                      10g
                    </button>
                    <button 
                      className="bg-fuelup-green/30 text-white py-1 px-3 rounded-lg text-sm"
                      onClick={() => setProteinAmount(20)}
                    >
                      20g
                    </button>
                    <button 
                      className="bg-fuelup-green/30 text-white py-1 px-3 rounded-lg text-sm"
                      onClick={() => setProteinAmount(30)}
                    >
                      30g
                    </button>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between p-3 bg-fuelup-green/30 rounded-lg mb-4">
                <div className="flex items-center">
                  <Flame size={20} className="mr-2" />
                  <span>Add calorie intake</span>
                </div>
                <button 
                  className="bg-fuelup-green text-white p-1.5 rounded-full"
                  onClick={() => setShowCaloriesInput(!showCaloriesInput)}
                >
                  <Plus size={16} />
                </button>
              </div>
              
              {showCaloriesInput && (
                <div className="bg-fuelup-green/20 p-3 rounded-lg mb-4 animate-slide-in">
                  <div className="flex gap-2 items-center">
                    <div className="flex-1">
                      <input
                        type="number"
                        value={caloriesAmount}
                        onChange={(e) => setCaloriesAmount(parseInt(e.target.value) || 0)}
                        className="fuelup-input text-center"
                        placeholder="Amount in calories"
                      />
                    </div>
                    <button 
                      className="bg-fuelup-green text-white py-2 px-4 rounded-lg"
                      onClick={handleAddCalories}
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex justify-between mt-3">
                    <button 
                      className="bg-fuelup-green/30 text-white py-1 px-3 rounded-lg text-sm"
                      onClick={() => setCaloriesAmount(100)}
                    >
                      100 cal
                    </button>
                    <button 
                      className="bg-fuelup-green/30 text-white py-1 px-3 rounded-lg text-sm"
                      onClick={() => setCaloriesAmount(250)}
                    >
                      250 cal
                    </button>
                    <button 
                      className="bg-fuelup-green/30 text-white py-1 px-3 rounded-lg text-sm"
                      onClick={() => setCaloriesAmount(500)}
                    >
                      500 cal
                    </button>
                  </div>
                </div>
              )}
              
              <h3 className="text-lg mb-3 font-medium">Current Streaks</h3>
              
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="bg-fuelup-bg rounded-lg p-3 flex flex-col items-center">
                  <Droplet size={24} className="mb-1 text-fuelup-green" />
                  <span className="text-lg font-bold text-fuelup-green">
                    {userProfileService.getCurrentUser()?.streaks.water || 0}
                  </span>
                  <span className="text-xs text-fuelup-green">Days</span>
                </div>
                
                <div className="bg-fuelup-bg rounded-lg p-3 flex flex-col items-center">
                  <Beef size={24} className="mb-1 text-fuelup-green" />
                  <span className="text-lg font-bold text-fuelup-green">
                    {userProfileService.getCurrentUser()?.streaks.protein || 0}
                  </span>
                  <span className="text-xs text-fuelup-green">Days</span>
                </div>
                
                <div className="bg-fuelup-bg rounded-lg p-3 flex flex-col items-center">
                  <Flame size={24} className="mb-1 text-fuelup-green" />
                  <span className="text-lg font-bold text-fuelup-green">
                    {userProfileService.getCurrentUser()?.streaks.calories || 0}
                  </span>
                  <span className="text-xs text-fuelup-green">Days</span>
                </div>
              </div>
              
              <div className="bg-fuelup-green/20 p-3 rounded-lg">
                <div className="flex items-center mb-2">
                  <Award size={20} className="mr-2" />
                  <span className="font-medium">Achievement</span>
                </div>
                <p className="text-sm">
                  {waterProgress >= 100 ? 
                    "Hydration Hero! You've reached your daily water goal." : 
                    `${(2000 - (nutritionLog?.water || 0)).toFixed(0)}ml of water left to reach your daily goal.`}
                </p>
              </div>
            </div>
          </div>
          
          <BottomNavigation />
        </div>
      </div>
    </PageTransition>
  );
};

export default Nutrition;
