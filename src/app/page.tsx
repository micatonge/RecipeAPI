'use client';
import React, { useState } from 'react';
import PageLayout from './ui/PageLayout';
import RecipeCard from './ui/RecipeCard';
import { fetchRepo, fetchVeganRecipes, fetchVegetarianRecipes, fetchGlutenFreeRecipes } from './api/api'; // Import necessary functions
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Create a new instance of QueryClient
const queryClient = new QueryClient();

export default function Home() {
  // State variables to store recipes and error message
  const [recipes, setRecipes] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Handler function for searching recipes
  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      return;
    }
    try {
      const data = await fetchRepo(query);
      console.log('Recipes:', data);
      if (Array.isArray(data) && data.length > 0) {
        setRecipes(data);
        setError(null);
      } else {
        setError("No recipe found. Try again.");
        setRecipes([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Error fetching data. Please try again.");
      setRecipes([]);
    }
  }

  // Handler function for clicking vegan filter
  const handleVeganClick = async () => {
    try {
      const data = await fetchVeganRecipes(); // Call API to fetch vegan recipes
      setRecipes(data);
      setError(null);
    } catch (error) {
      setError("Error fetching vegan recipes. Please try again.");
      setRecipes([]);
    }
  }

  // Handler function for clicking vegetarian filter
  const handleVegetarianClick = async () => {
    try {
      const data = await fetchVegetarianRecipes(); // Call API to fetch vegetarian recipes
      setRecipes(data);
      setError(null);
    } catch (error) {
      setError("Error fetching vegetarian recipes. Please try again.");
      setRecipes([]);
    }
  }

  // Handler function for clicking gluten-free filter
  const handleGlutenFreeClick = async () => {
    try {
      const data = await fetchGlutenFreeRecipes(); // Call API to fetch gluten-free recipes
      setRecipes(data);
      setError(null);
    } catch (error) {
      setError("Error fetching gluten-free recipes. Please try again.");
      setRecipes([]);
    }
  }

  // Handler function for clicking home icon
  const handleHomeClick = () => {
    // Reset state to its initial values
    setRecipes([]);
    setError(null);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <PageLayout 
        onSearch={handleSearch} 
        showSpecialDiets={recipes.length === 0} 
        onVeganClick={handleVeganClick} // Pass click handler for vegan
        onVegetarianClick={handleVegetarianClick} // Pass click handler for vegetarian
        onGlutenFreeClick={handleGlutenFreeClick} // Pass click handler for gluten-free
        onHomeClick={handleHomeClick} // Pass function to handle home click
      >
        {/* Display error message if there is an error */}
        {error && <p className="error-message">{error}</p>}
        {/* Display recipe cards */}
        <div className="flex flex-wrap mx-10 my-8 justify-between">
                    {recipes.map((recipe: any, index: number) => (
           <div key={index} className="flex-basis-30 mt-20">
              <RecipeCard 
                recipe={recipe} 
                onClick={() => {
                  // No need to fetch recipe information here, handled by FullRecipe component
                }}
              />
            </div>
          ))}
        </div>
      </PageLayout>
    </QueryClientProvider>
  );
}
