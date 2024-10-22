//const [prompt, setPrompt] = useState("");
import React, { useState } from "react";

function RecipeForm() {
  // States for individual inputs
  const [prompt, setPrompt] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [timeRequired, setTimeRequired] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [recipe, setRecipe] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle individual input changes
  const handleIngredientsChange = (e) => setIngredients(e.target.value);
  const handleTimeChange = (e) => setTimeRequired(e.target.value);
  const handleCuisineChange = (e) => setCuisine(e.target.value);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setRecipe("");

    const prompt = `Ingredients: ${ingredients}\nTime Required: ${timeRequired}\nCuisine Type: ${cuisine}`;

    try {
      const response = await fetch("http://localhost:3000/api/prompt-post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }), // Send the combined prompt
      });

      if (!response.ok) {
        throw new Error("Failed to fetch the recipe");
      }

      const data = await response.json();
      setRecipe(data); // Set the recipe response
    } catch (error) {
      console.error("Error:", error);
      setRecipe("Error generating recipe");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Meal Recipe Generator</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Ingredients:</label>
          <input
            type="text"
            value={ingredients}
            onChange={handleIngredientsChange}
            placeholder="Enter ingredients"
          />
        </div>
        <br />
        <div>
          <label>Time Required (minutes):</label>
          <input
            type="text"
            value={timeRequired}
            onChange={handleTimeChange}
            placeholder="Enter time required"
          />
        </div>
        <br />
        <div>
          <label>Cuisine Type:</label>
          <input
            type="text"
            value={cuisine}
            onChange={handleCuisineChange}
            placeholder="Enter cuisine type"
          />
        </div>
        <br />
        <button type="submit" disabled={loading}>
          {loading ? "Generating..." : "Generate Recipe"}
        </button>
      </form>

      {recipe && (
        <div>
          <h2>Generated Recipe:</h2>
          <p>{recipe}</p>
        </div>
      )}
    </div>
  );
}

export default RecipeForm;
