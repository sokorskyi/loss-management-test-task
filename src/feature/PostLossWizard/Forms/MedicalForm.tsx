import { FormBuilder } from "../FormBuilder";
import type { FormProps } from "./types";

const MedicalForm = (props: FormProps) => {
  return (
    <FormBuilder {...props} title='Collect Medical Records'>
      <FormBuilder.Input
        label="Primary Hospital/Clinic Name"
        name="hospital-name"
        required
      />
      <FormBuilder.ActionButton />
    </FormBuilder>
  );
};

export default MedicalForm;