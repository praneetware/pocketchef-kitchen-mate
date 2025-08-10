import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, DollarSign, Play, ChefHat } from "lucide-react";
import { useState } from "react";

interface Recipe {
  title: string;
  description: string;
  image: string;
  cookTime: number;
  servings: number;
  costPerServing: number;
  difficulty: "Easy" | "Medium" | "Hard";
  tags: string[];
  ingredients: string[];
  instructions: string[];
  nutrition: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
}

interface RecipeModalProps {
  recipe: Recipe | null;
  isOpen: boolean;
  onClose: () => void;
}

export function RecipeModal({ recipe, isOpen, onClose }: RecipeModalProps) {
  const [activeTab, setActiveTab] = useState<"ingredients" | "instructions" | "nutrition">("ingredients");

  if (!recipe) return null;

  const difficultyColors = {
    Easy: "bg-secondary text-secondary-foreground",
    Medium: "bg-accent text-accent-foreground",
    Hard: "bg-destructive text-destructive-foreground"
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{recipe.title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Recipe Image */}
          <div className="relative overflow-hidden rounded-lg">
            <img 
              src={recipe.image} 
              alt={recipe.title}
              className="w-full h-64 object-cover"
            />
            <div className="absolute top-4 right-4">
              <Badge className={difficultyColors[recipe.difficulty]}>
                {recipe.difficulty}
              </Badge>
            </div>
          </div>

          {/* Recipe Info */}
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="flex flex-col items-center space-y-1">
              <Clock className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">{recipe.cookTime} min</span>
            </div>
            <div className="flex flex-col items-center space-y-1">
              <Users className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">{recipe.servings} servings</span>
            </div>
            <div className="flex flex-col items-center space-y-1">
              <DollarSign className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">₹{recipe.costPerServing}/serving</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-muted-foreground">{recipe.description}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {recipe.tags.map((tag, index) => (
              <Badge key={index} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Tab Navigation */}
          <div className="flex border-b">
            {["ingredients", "instructions", "nutrition"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`px-4 py-2 font-medium capitalize transition-colors ${
                  activeTab === tab 
                    ? "text-primary border-b-2 border-primary" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="space-y-4">
            {activeTab === "ingredients" && (
              <div className="space-y-3">
                <h3 className="font-semibold text-lg">Ingredients</h3>
                <ul className="space-y-2">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      <span>{ingredient}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === "instructions" && (
              <div className="space-y-3">
                <h3 className="font-semibold text-lg">Instructions</h3>
                <ol className="space-y-3">
                  {recipe.instructions.map((step, index) => (
                    <li key={index} className="flex space-x-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </span>
                      <span className="pt-0.5">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {activeTab === "nutrition" && (
              <div className="space-y-3">
                <h3 className="font-semibold text-lg">Nutrition (per serving)</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-muted rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-primary">{recipe.nutrition.calories}</div>
                    <div className="text-sm text-muted-foreground">Calories</div>
                  </div>
                  <div className="bg-muted rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-primary">{recipe.nutrition.protein}g</div>
                    <div className="text-sm text-muted-foreground">Protein</div>
                  </div>
                  <div className="bg-muted rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-primary">{recipe.nutrition.carbs}g</div>
                    <div className="text-sm text-muted-foreground">Carbs</div>
                  </div>
                  <div className="bg-muted rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-primary">{recipe.nutrition.fat}g</div>
                    <div className="text-sm text-muted-foreground">Fat</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4">
            <Button className="flex-1 bg-gradient-primary hover:opacity-90">
              <Play className="w-4 h-4 mr-2" />
              Start Cooking
            </Button>
            <Button variant="outline" className="flex-1">
              <ChefHat className="w-4 h-4 mr-2" />
              Save Recipe
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}