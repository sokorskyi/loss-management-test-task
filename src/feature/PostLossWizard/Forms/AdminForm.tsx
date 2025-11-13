
import { FormBuilder } from "../FormBuilder";
import type { FormProps } from "./types";

const AdminForm = (props: FormProps) => {
  return (
    <FormBuilder {...props} title='Notify Post Office'>
      <FormBuilder.Input
        label="Old Forwarding Address"
        name="old-address"
        required
      />
      <FormBuilder.Input
        label="New Forwarding Address (if applicable)"
        name="new-address"
      />
      <FormBuilder.Input
        type="date"
        label="Effective Start Date"
        name="start-date"
        required
      />
      <FormBuilder.ActionButton />
    </FormBuilder>
  );
};

export default AdminForm;
