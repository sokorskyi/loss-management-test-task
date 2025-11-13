import { clsx } from "clsx";
import type { UseFormWizardType, WizardStep } from "./hooks/useFormWizard";
import { stepFormStatus } from "./data/stepFormStatus";

type StepNavItemProps = {
  step: WizardStep;
  stepIndex: number;
  onSelectStep: UseFormWizardType['selectStep'];
  isSelected: boolean;
}

const StepNavItem = ({ step, stepIndex, onSelectStep, isSelected }: StepNavItemProps) => {
  const onSelect = () => onSelectStep(step, stepIndex);
  const stepStatusStyles = clsx({
    "bg-emerald-300 text-emerald-950 border-emerald-300":
      step.status === stepFormStatus.COMPLETED,
    "bg-amber-300 text-black border-amber-400": step.status === stepFormStatus.PENDING,
    "bg-gray-200 text-black border-white/70": step.status === stepFormStatus.INACTIVE,
  });

  const stepNumber = stepIndex + 1;
  return (
    <li role="presentation" key={stepIndex} className="w-full md:space-x-3">
      <button
        role="tab"
        aria-selected={isSelected}
        aria-controls={`step-${stepNumber}-${step.category}-panel`}
        id={`step-${stepNumber}-${step.category}-tab`}
        className={`flex items-center flex-col justify-center gap-2 focus-visible:ring-2 focus-visible:ring-amber-400 focus:outline-none md:justify-start md:flex-row ${
          step.status !== stepFormStatus.INACTIVE && "cursor-pointer"
        }`}
        onClick={onSelect}
      >
        <div
          className={`w-8 h-8 rounded-full border border-white flex items-center justify-center font-bold transition-colors ${stepStatusStyles}`}
        >
          {stepNumber}
        </div>
        <div className="hidden md:flex flex-col text-xs justify-center space-y-0">
          <span className="tracking-wide text-sm uppercase">
            {step.category}
          </span>
        </div>
      </button>
    </li>
  );
};

type StepNavigationProps = {
  steps: WizardStep[];
  selectedStepIndex: number;
  onSelectStep: UseFormWizardType['selectStep'];
}

const StepNavigation = ({ steps, onSelectStep, selectedStepIndex }: StepNavigationProps) => {
  const stepList = steps.map((step, i) => (
    <StepNavItem
      key={i}
      step={step}
      stepIndex={i}
      isSelected={selectedStepIndex === i}
      onSelectStep={onSelectStep}
    />
  ));

  return (
    <div
      className={`
          md:w-1/3 md:bg-cover md:bg-center md:bg-no-repeat md:p-6 md:text-white md:rounded-xl
          w-full bg-cover bg-center bg-no-repeat p-6 text-white rounded-t-sm
          bg-[url('/assets/images/bg-sidebar.svg')]
        `}
    >
      {/* Desktop */}
      <ul
        role="tablist"
        aria-label="Post Loss Form Steps"
        className="hidden md:block space-y-4 mt-8"
      >
        {stepList}
      </ul>

      {/* Mobile */}
      <div className="md:hidden flex flex-1 justify-center items-center">
        <ul
          role="tablist"
          aria-label="Post Loss Form Steps"
          className="flex gap-1 space-x-2 md:space-x-4 justify-center"
        >
          {stepList}
        </ul>
      </div>
    </div>
  );
};

export default StepNavigation;
