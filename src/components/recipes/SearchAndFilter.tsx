
import React from 'react';
import { Search, ChevronDown } from 'lucide-react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command";

interface SearchAndFilterProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  commandOpen: boolean;
  setCommandOpen: (open: boolean) => void;
  filterOpen: boolean;
  setFilterOpen: (open: boolean) => void;
  filter: 'all' | 'popular' | 'recent' | 'sport';
  setFilter: (filter: 'all' | 'popular' | 'recent' | 'sport') => void;
  resultsCount: number;
  sportRecipes: any[];
  userSport: string;
}

const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  searchTerm,
  setSearchTerm,
  commandOpen,
  setCommandOpen,
  filterOpen,
  setFilterOpen,
  filter,
  setFilter,
  resultsCount,
  sportRecipes,
  userSport
}) => {
  return (
    <>
      <div className="relative mb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setCommandOpen(true)}
            className="fuelup-input pl-10"
          />
          <Search className="absolute left-3 top-3.5 text-fuelup-green" size={20} />
        </div>
        
        {commandOpen && (
          <div className="absolute z-10 w-full bg-white rounded-md shadow-lg mt-1">
            <Command>
              <CommandInput placeholder="Search recipes..." value={searchTerm} onValueChange={setSearchTerm} />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Sport-Specific Recipes">
                  {sportRecipes.slice(0, 5).map((recipe) => (
                    <CommandItem 
                      key={recipe.id}
                      onSelect={() => {
                        setSearchTerm(recipe.name);
                        setCommandOpen(false);
                        setFilter('sport');
                      }}
                    >
                      {recipe.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
                <CommandGroup heading="Suggestions">
                  {userSport && (
                    <CommandItem onSelect={() => {
                      setSearchTerm("");
                      setCommandOpen(false);
                      setFilter('sport');
                    }}>
                      All {userSport} Recipes
                    </CommandItem>
                  )}
                  <CommandItem onSelect={() => {
                    setSearchTerm("protein");
                    setCommandOpen(false);
                  }}>
                    High Protein
                  </CommandItem>
                  <CommandItem onSelect={() => {
                    setSearchTerm("quick");
                    setCommandOpen(false);
                  }}>
                    Quick Recipes
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </div>
        )}
      </div>
      
      <div className="flex justify-between items-center mb-4">
        <div 
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => setFilterOpen(!filterOpen)}
        >
          <span className="text-fuelup-text">Filter</span>
          <ChevronDown 
            size={16} 
            className={`text-fuelup-text transition-transform ${filterOpen ? 'rotate-180' : ''}`} 
          />
        </div>
        
        <div className="text-fuelup-text text-sm">
          {resultsCount} results
        </div>
      </div>
      
      {filterOpen && (
        <div className="bg-white rounded-lg shadow-md p-3 mb-4 animate-slide-in">
          <div className="space-y-2">
            <div 
              className={`p-2 rounded-md cursor-pointer ${filter === 'all' ? 'bg-fuelup-bg text-fuelup-green' : 'bg-gray-100'}`}
              onClick={() => setFilter('all')}
            >
              All Recipes
            </div>
            <div 
              className={`p-2 rounded-md cursor-pointer ${filter === 'popular' ? 'bg-fuelup-bg text-fuelup-green' : 'bg-gray-100'}`}
              onClick={() => setFilter('popular')}
            >
              Most Popular
            </div>
            <div 
              className={`p-2 rounded-md cursor-pointer ${filter === 'recent' ? 'bg-fuelup-bg text-fuelup-green' : 'bg-gray-100'}`}
              onClick={() => setFilter('recent')}
            >
              Recently Added
            </div>
            {sportRecipes.length > 0 && (
              <div 
                className={`p-2 rounded-md cursor-pointer ${filter === 'sport' ? 'bg-fuelup-bg text-fuelup-green' : 'bg-gray-100'}`}
                onClick={() => setFilter('sport')}
              >
                {userSport} Recipes
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default SearchAndFilter;
