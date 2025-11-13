import { FormBuilder } from '../FormBuilder';
import type { FormProps } from "./types";

const HomeInsuranceForm = (props: FormProps) => {
  return (
    <FormBuilder {...props} title='Contact Home Insurance Provider'>
      <FormBuilder.Input
        label="Old Forwarding Address"
        name="old-address"
        required
      />
      <FormBuilder.Input
        label="Policy Number"
        name="policy-number"
        required
      />
      <FormBuilder.Input
        label="Agent Contact Name"
        name="agent-name"
      />
      <FormBuilder.ActionButton />
    </FormBuilder>
  );
};

export default HomeInsuranceForm