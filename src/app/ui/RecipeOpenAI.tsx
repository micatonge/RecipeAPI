import React, { useState, useEffect } from 'react';
import { CardDescription } from "@/components/ui/card"; // Adjust imports according to your project structure
import OpenAI from 'openai';

// Define the type of the html prop
interface RecipeComponentProps {
  html: string; // Assuming html is a string
}

const openai = new OpenAI({
  apiKey: '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'
});

const RecipeComponent: React.FC<RecipeComponentProps> = ({ html }) => {
  const [summary, setSummary] = useState('');

  useEffect(() => {
    if (html) {
      summarizeRecipe(html)
        .then((summary) => setSummary(summary))
        .catch((error) => console.error('Error:', error));
    }
  }, [html]);

  const summarizeRecipe = async (html: string) => {
    try {
      const text = stripHtmlTags(html); // Convert HTML to plain text
      const response = await openai.completions.create({
        model: "gpt-4",
        temperature: 0,
        prompt: "You are a highly skilled AI trained in language comprehension and summarization. I would like you to read the following text and summarize it into a concise abstract paragraph. Aim to retain the most important points, providing a coherent and readable summary that could help a person understand the main points of the discussion without needing to read the entire text. Please avoid unnecessary details or tangential points.",
        messages: [
          {
            "role": "user",
            "content": text
          }
        ]
      } as { model: string; temperature: number; prompt: string; messages: { role: string; content: string }[] }); // Include prompt
      return response.choices[0].text; 
    } catch (error) {
      throw error;
    }
  };

  const stripHtmlTags = (html: string) => {
    return html.replace(/<[^>]+>/g, ''); // Strip HTML tags
  };

  return (
      <CardDescription>
        <strong>Description:</strong> {summary}
      </CardDescription>
  );
};

export default RecipeComponent;
