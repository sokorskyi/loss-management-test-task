export const stepFormStatus = {
  PENDING: 'PENDING',
  INACTIVE: 'INACTIVE',
  COMPLETED: 'COMPLETED',
} as const;

// Create a type from the object's values
export type StepFormStatusType = typeof stepFormStatus[keyof typeof stepFormStatus];