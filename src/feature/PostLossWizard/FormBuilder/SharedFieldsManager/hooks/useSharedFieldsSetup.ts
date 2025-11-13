import { useState, useCallback, useMemo } from "react";

export const useSharedFieldsSetup = (fields: Record<string, string>) => {
  const [sharedFields, setSharedFields] = useState(fields);

  const publishSharedFields = useCallback(
    (data: Record<string, string>) => {
      setSharedFields((prev) => {
        const updated = { ...prev };
        for (const syncField of Object.keys(sharedFields)) {
          updated[syncField] = data[syncField];
        }
        return updated;
      });
    },
    [sharedFields]
  );

  return useMemo(
    () => ({
      sharedFields,
      publishSharedFields,
    }),
    [sharedFields, publishSharedFields]
  );
};

export type SharedFieldsContextType = ReturnType<typeof useSharedFieldsSetup> 