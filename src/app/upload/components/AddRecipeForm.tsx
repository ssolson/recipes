'use client';

import { useFormState } from 'react-dom';
import { createRecipe } from '@/app/upload/actions/createRecipe';
import Button from '@/app/upload/components/button';
import InputForm from '@/app/upload/components/input-form';

/**
 * `AddRecipeForm` is a React functional component that renders a form for adding new recipes.
 * It utilizes the `useFormState` hook to manage form state and handle submission.
 * Each field is created using the `InputForm` component.
 */
export default function AddRecipeForm() {
  const [state, formAction] = useFormState(createRecipe, null);
  return (
    <div>
      <h1 className="text-xl font-semibold mb-4 text-slate-300">New Recipe</h1>

      <form action={formAction} className="flex flex-col gap-2">
        <InputForm id="title" label="Title" errors={state} />
        <InputForm id="description" label="Description" errors={state} />
        <InputForm id="skillLevel" label="Skill Level" errors={state} />
        <InputForm id="prepTime" label="Preparation Time" errors={state} />
        <InputForm id="cookTime" label="Cook Time" errors={state} />
        <InputForm id="timeUnits" label="Time Units" errors={state} />
        <InputForm id="servings" label="Servings" errors={state} />
        <InputForm
          id="totalIngredients"
          label="Total Ingredients"
          errors={state}
        />
        <InputForm id="totalSteps" label="Total Steps" errors={state} />
        <InputForm id="userId" label="User ID" errors={state} />

        <Button type="submit" label="Create" />
      </form>
    </div>
  );
}
