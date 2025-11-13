
import { FormBuilder } from "../FormBuilder";
import type { FormProps } from "./types";

const SubscriptionsForm = (props: FormProps) => {

  return (
    <FormBuilder {...props} title='Cancel Subscriptions'>
      <FormBuilder.Input label="Username(s)" name="usernames" required />
      <FormBuilder.Input type="password" label="Password(s)" name="passwords" required />
      <FormBuilder.Input
        label="Old Forwarding Address"
        name="old-address"
        required
      />
      <FormBuilder.ActionButton />
    </FormBuilder>
  );
};

export default SubscriptionsForm;
