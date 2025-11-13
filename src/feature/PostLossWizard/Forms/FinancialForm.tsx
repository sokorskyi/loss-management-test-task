
import { FormBuilder } from "../FormBuilder";
import type { FormProps } from "./types";

const FinancialForm = (props: FormProps) => {
  
  return (
    <FormBuilder {...props} title='Locate and List Known Assets'>
      <FormBuilder.Input
        label="Old Forwarding Address"
        name="old-address"
        required
      />
      <FormBuilder.Textarea
        label="List of Known Assets (e.g., bank, stock)"
        name="asset-list"
        required
      />
      <FormBuilder.ActionButton />
    </FormBuilder>
  );
};

export default FinancialForm;
