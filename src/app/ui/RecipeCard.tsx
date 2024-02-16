import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { fetchRecipeInformation } from '../api/api'; // Import the fetchRecipeInformation function

interface RecipeCardProps {
  recipe: any;
  onClick: () => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onClick }) => {
  // State to manage whether to show the full recipe details
  const [showFullRecipe, setShowFullRecipe] = useState(false);
  // State to hold full recipe information
  const [fullRecipe, setFullRecipe] = useState<any>(null);

  // Function to fetch full recipe information when the component mounts or recipe changes
  useEffect(() => {
    const fetchFullRecipe = async () => {
      try {
        const fullRecipeData = await fetchRecipeInformation(recipe.id);
        setFullRecipe(fullRecipeData);
      } catch (error) {
        console.error("Error fetching full recipe information:", error);
      }
    };

    fetchFullRecipe();
  }, [recipe.id]);

  return (
    <div className="flex justify-center items-start mb-8">
      <div style={{ maxWidth: showFullRecipe ? '300px' : '100%', width: '100%', marginRight: showFullRecipe ? '16px' : '0' }}>
        {/* Recipe Card */}
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
      {/* Show full recipe details if enabled */}
      {showFullRecipe && fullRecipe && (
        <div style={{ maxWidth: '800px', width: '100%' }}>
          {/* Details */}
          <div className="border border-gray-300 rounded-lg p-4 mb-8">
            <p><strong>Servings:</strong> {fullRecipe.servings}</p>
            <p><strong>Ready in Minutes:</strong> {fullRecipe.readyInMinutes}</p>
            <p><strong>Health Score:</strong> {fullRecipe.healthScore}</p>

            {/* Ingredients */}
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

            {/* Steps */}
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
