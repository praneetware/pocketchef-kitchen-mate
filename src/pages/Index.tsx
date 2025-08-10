import { useState } from "react";
import { SearchFilters } from "@/components/SearchFilters";
import { RecipeCard } from "@/components/ui/recipe-card";
import { RecipeModal } from "@/components/RecipeModal";
import { Button } from "@/components/ui/button";
import { ChefHat, Sparkles, Clock, DollarSign } from "lucide-react";
import heroImage from "@/assets/hero-cooking.jpg";
import ingredientsImage from "@/assets/ingredients-collection.jpg";
import recipeImage from "@/assets/recipe-pasta.jpg";

// Sample recipe data
const sampleRecipes = [
  {
    title: "Quick Veggie Pasta",
    description: "A delicious and nutritious pasta dish with fresh vegetables, perfect for hostel cooking.",
    image: recipeImage,
    cookTime: 15,
    servings: 2,
    costPerServing: 35,
    difficulty: "Easy" as const,
    tags: ["Vegetarian", "Quick", "Budget-Friendly"],
    ingredients: [
      "200g pasta",
      "1 onion, diced",
      "2 tomatoes, chopped",
      "1 bell pepper, sliced",
      "2 cloves garlic, minced",
      "2 tbsp olive oil",
      "Salt and pepper to taste",
      "Fresh herbs (basil or parsley)"
    ],
    instructions: [
      "Boil water in a large pot and cook pasta according to package instructions.",
      "Heat olive oil in a pan and sauté onions until translucent.",
      "Add garlic and cook for 1 minute until fragrant.",
      "Add bell peppers and tomatoes, cook for 5-7 minutes.",
      "Drain pasta and add to the vegetable mixture.",
      "Season with salt, pepper, and fresh herbs.",
      "Serve hot and enjoy your quick meal!"
    ],
    nutrition: {
      calories: 320,
      protein: 12,
      carbs: 58,
      fat: 8
    }
  },
  {
    title: "Protein Rice Bowl",
    description: "A balanced meal with rice, lentils, and vegetables - perfect for students on a budget.",
    image: ingredientsImage,
    cookTime: 25,
    servings: 3,
    costPerServing: 28,
    difficulty: "Easy" as const,
    tags: ["High-Protein", "Vegetarian", "Filling"],
    ingredients: [
      "1 cup basmati rice",
      "1/2 cup yellow lentils (moong dal)",
      "1 onion, chopped",
      "1 carrot, diced",
      "1 tsp turmeric",
      "1 tsp cumin seeds",
      "2 tbsp ghee or oil",
      "Salt to taste"
    ],
    instructions: [
      "Wash and soak rice and lentils for 15 minutes.",
      "Heat ghee in a pressure cooker and add cumin seeds.",
      "Add onions and sauté until golden brown.",
      "Add carrots, turmeric, and salt.",
      "Add rice, lentils, and 3 cups water.",
      "Pressure cook for 3 whistles.",
      "Let it cool, then serve with pickle or yogurt."
    ],
    nutrition: {
      calories: 285,
      protein: 18,
      carbs: 52,
      fat: 6
    }
  }
];

const Index = () => {
  const [selectedRecipe, setSelectedRecipe] = useState<typeof sampleRecipes[0] | null>(null);
  const [filteredRecipes, setFilteredRecipes] = useState(sampleRecipes);

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setFilteredRecipes(sampleRecipes);
      return;
    }
    
    const filtered = sampleRecipes.filter(recipe =>
      recipe.title.toLowerCase().includes(query.toLowerCase()) ||
      recipe.description.toLowerCase().includes(query.toLowerCase()) ||
      recipe.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
    );
    setFilteredRecipes(filtered);
  };

  const handleFilterChange = (filters: any) => {
    let filtered = [...sampleRecipes];
    
    if (filters.maxTime) {
      filtered = filtered.filter(recipe => recipe.cookTime <= filters.maxTime);
    }
    if (filters.maxCost) {
      filtered = filtered.filter(recipe => recipe.costPerServing <= filters.maxCost);
    }
    if (filters.difficulty) {
      filtered = filtered.filter(recipe => recipe.difficulty === filters.difficulty);
    }
    if (filters.dietType) {
      filtered = filtered.filter(recipe => 
        recipe.tags.some(tag => tag.toLowerCase().includes(filters.dietType.toLowerCase()))
      );
    }
    
    setFilteredRecipes(filtered);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative bg-gradient-hero overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        
        <div className="relative container mx-auto px-4 py-20 text-center text-white">
          <div className="flex items-center justify-center mb-6">
            <ChefHat className="w-12 h-12 mr-3" />
            <h1 className="text-4xl md:text-6xl font-bold">PocketChef</h1>
          </div>
          
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto opacity-90">
            Your AI-powered cooking companion for hostel & PG life. 
            Find recipes based on what you have!
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <Sparkles className="w-8 h-8 mx-auto mb-2" />
              <h3 className="font-semibold mb-1">Smart Recipe Finder</h3>
              <p className="text-sm opacity-90">Upload ingredients, get perfect recipes</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <Clock className="w-8 h-8 mx-auto mb-2" />
              <h3 className="font-semibold mb-1">Quick Meals</h3>
              <p className="text-sm opacity-90">15-minute recipes for busy students</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <DollarSign className="w-8 h-8 mx-auto mb-2" />
              <h3 className="font-semibold mb-1">Budget Friendly</h3>
              <p className="text-sm opacity-90">Delicious meals under ₹50</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Search and Filters */}
        <div className="mb-8">
          <SearchFilters 
            onSearch={handleSearch}
            onFilterChange={handleFilterChange}
          />
        </div>

        {/* Recipe Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Recommended Recipes</h2>
            <Button variant="outline">
              View All
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecipes.map((recipe, index) => (
              <RecipeCard
                key={index}
                {...recipe}
                onClick={() => setSelectedRecipe(recipe)}
              />
            ))}
          </div>
          
          {filteredRecipes.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                No recipes found. Try adjusting your filters!
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Recipe Modal */}
      <RecipeModal
        recipe={selectedRecipe}
        isOpen={!!selectedRecipe}
        onClose={() => setSelectedRecipe(null)}
      />
    </div>
  );
};

export default Index;
