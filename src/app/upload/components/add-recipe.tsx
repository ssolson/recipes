'use client';

import { createRecipe } from '@/app/upload/action';
import Button from '@/app/upload/components/button';
import { useFormState } from 'react-dom';
import { ZodError } from 'zod';

const initialState: ZodError['format'] | null = null;

export default function AddForm() {
  const [state, formAction] = useFormState(createRecipe, null);
  console.log('Form state:', state);
  console.log('Form action:', formAction);
  return (
    <div>
      <h1 className="text-xl font-semibold mb-4 text-slate-300">New Recipe</h1>

      <form action={formAction} className="flex flex-col gap-2">
        <InputForm id="recipeId" label="Recipe ID" errors={state} />
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

type InputFormProps = {
  label?: string;
  id: string;
  type?: string;
  placeholder?: string;
  errors?: any;
};

function InputForm({ label, type, id, errors, placeholder }: InputFormProps) {
  const typeForm = type ? type : 'text';

  let inputErr: string[] = [];
  let isError = false;

  if (errors?.[id]?._errors) {
    isError = true;
    inputErr = errors?.[id]?._errors as string[];
  }

  const classError = isError ? 'border-red-500' : 'border-slate-700';

  return (
    <div className="flex flex-col gap-1 transition-all duration-150 ease-in-out">
      {label ? (
        <label htmlFor={id} className="text-slate-500 text-sm">
          {label}
        </label>
      ) : (
        <></>
      )}

      <input
        type={typeForm}
        id={id}
        name={id}
        placeholder={placeholder}
        className={`px-2 py-1 rounded-md outline-none bg-slate-700 bg-opacity-50 border border-slate-700
            focus:bg-white focus:border-opacity-0 focus:ring focus:ring-slate-700 focus:text-slate-800 ${classError}`}
      />

      {isError && (
        <div className="text-xs bg-red-500 bg-opacity-20 border border-red-500 border-opacity-30 rounded-md p-2 text-red-500">
          {inputErr.map((error, k) => (
            <div key={`err-${id}-${k}`}>{error}</div>
          ))}
        </div>
      )}
    </div>
  );
}
