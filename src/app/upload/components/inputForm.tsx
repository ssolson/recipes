'use client';

type InputFormProps = {
  label?: string;
  id: string;
  type?: string;
  placeholder?: string;
  errors?: any;
};

/**
 * `InputForm` is a component that renders an individual input field for a form.
 * It accepts several props to customize its behavior and appearance:
 *
 * @param {string} label - The label for the input field.
 * @param {string} id - The unique identifier for the input field.
 * @param {string} [type='text'] - The type of the input (e.g., 'text', 'number'). Default is 'text'.
 * @param {string} [placeholder] - Placeholder text for the input field.
 * @param {any} [errors] - Object containing error messages for the input fields.
 *
 * The component conditionally renders error messages if they are present in the `errors` prop.
 * It also applies different CSS classes based on the error state to visually indicate validation feedback.
 */
export default function InputForm({
  label,
  type,
  id,
  errors,
  placeholder,
}: InputFormProps) {
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
