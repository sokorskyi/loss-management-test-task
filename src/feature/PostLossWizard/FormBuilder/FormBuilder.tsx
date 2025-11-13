import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  type ComponentProps,
  type PropsWithChildren,
} from "react";
import { useForm, type UseFormReturn } from "react-hook-form";
import Input from "../../../components/UI/Input";
import Button from "../../../components/UI/Button";
import { useSharedFieldsManager } from "./SharedFieldsManager/SharedFieldsManager";
import { useSubscribeFormToSharedFields } from "./SharedFieldsManager";
import Textarea from "../../../components/UI/Textarea";

type FormBuilderContextType = {
  isCompleted: boolean;
  form: UseFormReturn;
};

const FormBuilderProvider = createContext<FormBuilderContextType | undefined>(
  undefined
);

const useFormBuilder = () => {
  const formBuilder = useContext(FormBuilderProvider);
  if (formBuilder == null) {
    throw new Error("useFormBuilder must be within FormBuilder");
  }
  return formBuilder;
};

export type FormBuilderProps = {
  isSelected: boolean;
  onCompleteStep: () => void;
  isCompleted: boolean;
  title: string;
};

export default function FormBuilder({
  isSelected,
  onCompleteStep,
  isCompleted,
  title,
  children,
}: FormBuilderProps & PropsWithChildren) {
  const sharedFieldsManager = useSharedFieldsManager();
  const sharedFields = useMemo(
    () => sharedFieldsManager?.sharedFields || {},
    [sharedFieldsManager]
  );
  const form = useForm({ mode: "all", defaultValues: { ...sharedFields } });

  useSubscribeFormToSharedFields(sharedFields, form);

  const onFormSubmit = useCallback(
    (data: Record<string, string>) => {
      if (sharedFieldsManager) {
        sharedFieldsManager.publishSharedFields(data);
      }
      onCompleteStep();
    },
    [onCompleteStep, sharedFieldsManager]
  );

  return (
    <FormBuilderProvider value={{ form, isCompleted }}>
      <div
        style={{ display: isSelected ? "block" : "none" }}
        className="flex-1 px-6 py-4"
      >
        <h2 className="text-blue-950 md:text-2xl text-xl font-bold md:mb-6 mb-2">
          {title}
        </h2>
        <form onSubmit={form.handleSubmit(onFormSubmit)}>{children}</form>
      </div>
    </FormBuilderProvider>
  );
}

type FormBuilderFieldProps = {
  label: string;
  name: string;
  required?: boolean;
};

type FormBuilderInputProps = FormBuilderFieldProps & ComponentProps<"input">;

FormBuilder.Input = function FormBuilderInput({
  label,
  name,
  required,
  ...props
}: FormBuilderInputProps) {
  const { form, isCompleted } = useFormBuilder();
  const { errors } = form.formState;

  return (
    <div className="mb-4">
      <Input
        label={label}
        error={errors?.[name]}
        {...props}
        {...form.register(name, {
          required: required ? `The "${label}" is required` : false,
        })}
        name={name}
        disabled={isCompleted}
      />
    </div>
  );
};

type FormBuilderTextareaProps = FormBuilderFieldProps &
  ComponentProps<"textarea">;

FormBuilder.Textarea = function FormBuilderTextarea({
  label,
  name,
  required,
  ...props
}: FormBuilderTextareaProps) {
  const { form, isCompleted } = useFormBuilder();
  const { errors } = form.formState;

  return (
    <div className="mb-4">
      <Textarea
        label={label}
        error={errors?.[name]}
        {...form.register(name, {
          required: required ? `The "${label}" is required` : false,
        })}
        {...props}
        name={name}
        disabled={isCompleted}
      />
    </div>
  );
};

FormBuilder.ActionButton = function FormBuilderActionButton() {
  const { form, isCompleted } = useFormBuilder();
  const { isValid } = form.formState;

  return (
    !isCompleted && (
      <Button type="submit" disabled={!isValid}>
        Mark as complete
      </Button>
    )
  );
};
