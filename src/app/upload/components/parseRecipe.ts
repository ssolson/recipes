import { insertRecipesSchema } from '@/db/schema/recipes';


export async function safeParseRecipe(formData: FormData) {
    return insertRecipesSchema.safeParse({
      title: formData.get("title"),
      description: formData.get("description"),
      skillLevel: formData.get("skillLevel"),
      prepTime: Number(formData.get("prepTime")),
      cookTime: Number(formData.get("cookTime")),
      timeUnits: Number(formData.get("timeUnits")),
      servings: Number(formData.get("servings")),
      totalIngredients: Number(formData.get("totalIngredients")),
      totalSteps: Number(formData.get("totalSteps")),
      userId: formData.get("userId"),
    });
  }