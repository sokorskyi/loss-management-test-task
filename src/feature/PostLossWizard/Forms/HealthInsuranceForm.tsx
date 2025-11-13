import { FormBuilder } from "../FormBuilder";
import type { FormProps } from "./types";

const HealthInsuranceForm = (props: FormProps) => {
  return (
    <FormBuilder {...props} title="Contact Health Insurance Provider">
      <FormBuilder.Input
        label="Primary Hospital/Clinic Name"
        name="hospital-name"
        required
      />
      <FormBuilder.Input
        label="Old Forwarding Address"
        name="old-address"
        required
      />
      <FormBuilder.Input label="Policy Number" name="policy-number" required />
      <FormBuilder.Input label="Agent Contact Name" name="agent-name" />
      <FormBuilder.ActionButton />
    </FormBuilder>
  );
};

export default HealthInsuranceForm;
