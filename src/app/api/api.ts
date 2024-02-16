const apiKey = 'f9e1c0abc2584dbda3331f85f26b8977';

// Function to fetch recipes based on a query
export async function fetchRepo(query: string) {
    const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${apiKey}`;
    
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.results ?? []; // Return results or an empty array if no results are found
    } catch (error) {
        console.error("Error fetching data:", error);
        throw new Error("Error fetching data. Please try again."); // Throw an error if fetching fails
    }
}

// Function to fetch detailed information about a recipe using its ID
export async function fetchRecipeInformation(recipeId: number) {
    const apiUrl = `https://api.spoonacular.com/recipes/${recipeId}/information?includeNutrition=false&apiKey=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data; // Return recipe information
    } catch (error) {
        console.error("Error fetching recipe information:", error);
        throw new Error("Error fetching recipe information. Please try again."); // Throw an error if fetching fails
    }
}

// Function to fetch vegan recipes
export async function fetchVeganRecipes() {
    const query = 'vegan';
    return await fetchRepo(query); // Use fetchRepo function with the 'vegan' query
}

// Function to fetch vegetarian recipes
export async function fetchVegetarianRecipes() {
    const query = 'vegetarian';
    return await fetchRepo(query); // Use fetchRepo function with the 'vegetarian' query
}

// Function to fetch gluten-free recipes
export async function fetchGlutenFreeRecipes() {
    const query = 'gluten free';
    return await fetchRepo(query); // Use fetchRepo function with the 'gluten free' query
}
