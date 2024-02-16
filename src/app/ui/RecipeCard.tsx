import React, { useState, useEffect } from 'react';
import RecipeComponent from "./RecipeOpenAI"; 
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { fetchRecipeInformation } from '../api/api'; // Import the fetchRecipeInformation function

interface RecipeCardProps {
  recipe: any;
  onClick: () => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onClick }) => {
  const [showFullRecipe, setShowFullRecipe] = useState(false);
  const [fullRecipe, setFullRecipe] = useState<any>(null); // State to hold full recipe information

  useEffect(() => {
    const fetchFullRecipe = async () => {
      try {
        const fullRecipeData = await fetchRecipeInformation(recipe.id); // Fetch full recipe information using the recipe ID
        setFullRecipe(fullRecipeData);
      } catch (error) {
        console.error("Error fetching full recipe information:", error);
      }
    };

    fetchFullRecipe(); // Call the fetchFullRecipe function when the component mounts
  }, [recipe.id]); // Add recipe.id as a dependency to re-fetch when the recipe changes

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', marginBottom: '8px' }}>
      <div style={{ maxWidth: showFullRecipe ? '300px' : '100%', width: '100%', marginRight: showFullRecipe ? '16px' : '0' }}>
        <Card
          onClick={() => setShowFullRecipe(!showFullRecipe)}
          style={{ cursor: 'pointer' }}
        >
          <CardHeader>
            <CardTitle>{recipe.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <img src={recipe.image} alt={recipe.title} style={{ width: '100%', borderRadius: '8px', marginBottom: '8px' }} />
            <CardDescription>
              <strong>Description:</strong> {fullRecipe?.summary ? fullRecipe.summary.replace(/<[^>]*>/g, '').split('.')[0] : 'No description available'}
            </CardDescription>
          </CardContent>
        </Card>
      </div>
      {showFullRecipe && fullRecipe && (
        <div style={{ maxWidth: '800px', width: '100%' }}>
          <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '16px', marginBottom: '8px' }}>
            <p><strong>Servings:</strong> {fullRecipe.servings}</p>
            <p><strong>Ready in Minutes:</strong> {fullRecipe.readyInMinutes}</p>
            <p><strong>Health Score:</strong> {fullRecipe.healthScore}</p>

            <Accordion type="single" collapsible>
              <AccordionItem value="ingredients">
                <AccordionTrigger>Ingredients</AccordionTrigger>
                <AccordionContent>
                  <ul>
                    {fullRecipe.extendedIngredients && fullRecipe.extendedIngredients.map((ingredient: any, index: number) => (
                      <li key={index}>{ingredient.original}</li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <Accordion type="single" collapsible>
              <AccordionItem value="steps">
                <AccordionTrigger>Steps</AccordionTrigger>
                <AccordionContent>
                  <ol>
                    {fullRecipe.analyzedInstructions && fullRecipe.analyzedInstructions[0]?.steps && fullRecipe.analyzedInstructions[0]?.steps.map((step: any, index: number) => (
                      <li key={index}>{step.step}</li>
                    ))}
                  </ol>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeCard;
