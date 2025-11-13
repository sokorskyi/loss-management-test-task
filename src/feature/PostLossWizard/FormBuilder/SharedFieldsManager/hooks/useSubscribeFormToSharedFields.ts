import { useEffect } from "react";
import type { UseFormReturn } from "react-hook-form";

export const useSubscribeFormToSharedFields = (sharedFields: Record<string, string>, form: UseFormReturn) => {
  useEffect(() => {
    const sharedFieldsKeys = Object.keys(sharedFields);
    if (sharedFieldsKeys.length) {
      for (const sharedFieldName of sharedFieldsKeys) {
        form.setValue(sharedFieldName, sharedFields[sharedFieldName]);
      }
    }
  }, [sharedFields, form.setValue]);
};
