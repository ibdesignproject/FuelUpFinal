
import { useState, useMemo } from 'react';
import { Recipe } from '@/services/recipeGenerator';

export const useRecipeFiltering = (recipes: Recipe[], sportRecipes: Recipe[]) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'popular' | 'recent' | 'sport'>('sport');
  
  const filteredRecipes = useMemo(() => {
    let results = [...recipes];
    
    if (filter === 'sport') {
      results = [...sportRecipes];
    }
    
    if (searchTerm) {
      results = results.filter(recipe => 
        recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (filter === 'popular') {
      return results.sort((a, b) => b.popularity! - a.popularity!);
    } else if (filter === 'recent') {
      return results.sort((a, b) => 
        new Date(b.timeAdded!).getTime() - new Date(a.timeAdded!).getTime()
      );
    }
    
    return results;
  }, [recipes, sportRecipes, searchTerm, filter]);
  
  return {
    searchTerm,
    setSearchTerm,
    filter,
    setFilter,
    filteredRecipes,
  };
};
