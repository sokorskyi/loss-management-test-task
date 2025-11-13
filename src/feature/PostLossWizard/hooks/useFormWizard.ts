import { useState, useCallback, useMemo } from "react";
import { stepFormStatus, type StepFormStatusType } from "../data/stepFormStatus";


const useFormWizard = (initialSteps: Array<WizardStep>) => {
  const [selectedStepIndex, setSelectedStepIndex] = useState(0);
  const [steps, setSteps] = useState(initialSteps);

  const selectStep = useCallback((step: WizardStep, stepIndex: number) => {
    if (step.status !== stepFormStatus.INACTIVE) {
      setSelectedStepIndex(stepIndex);
    }
  }, []);

  const completeStepAndNext = useCallback(() => {
    setSteps((prevSteps) => {
      const isLastCompleted = selectedStepIndex === prevSteps.length - 1;
      const nextStepIndex = selectedStepIndex + 1;
      return prevSteps.map((step, i) => {
        if (i === selectedStepIndex) {
          return {
            ...step,
            status: stepFormStatus.COMPLETED,
          };
        }
        if (!isLastCompleted && i === nextStepIndex) {
          setSelectedStepIndex(nextStepIndex);
          return {
            ...step,
            status: stepFormStatus.PENDING,
          };
        }
        return step;
      });
    });
  }, [selectedStepIndex]);

  return useMemo(
    () => ({
      steps,
      selectedStepIndex,
      selectStep,
      completeStepAndNext,
    }),
    [steps, selectedStepIndex, selectStep, completeStepAndNext]
  );
};

export default useFormWizard;

export type WizardStep = {
  status: StepFormStatusType;
  category: string;
}

export type UseFormWizardType = ReturnType<typeof useFormWizard>
