import { useMemo } from "react";
import useFormWizard from "./hooks/useFormWizard";
import AdminForm from "./Forms/AdminForm";
import FinancialForm from "./Forms/FinancialForm";
import SubscriptionsForm from "./Forms/SubscriptionsForm";
import StepNavigation from "./StepNavigation";
import { SharedFieldsManager } from "./FormBuilder";
import HomeInsuranceForm from "./Forms/HomeInsuranceForm";
import HealthInsuranceForm from "./Forms/HealthInsuranceForm";
import MedicalForm from "./Forms/MedicalForm";
import { stepFormStatus } from "./data/stepFormStatus";

const PostLossWizard = () => {
  const { selectedStepIndex, steps, selectStep, completeStepAndNext } =
    useFormWizard([
      { status: stepFormStatus.PENDING, category: "Subscriptions" },
      { status: stepFormStatus.INACTIVE, category: "Financial" },
      { status: stepFormStatus.INACTIVE, category: "Admin" },
      { status: stepFormStatus.INACTIVE, category: "Home Insurance" },
      { status: stepFormStatus.INACTIVE, category: "Health Insurance" },
      { status: stepFormStatus.INACTIVE, category: "Medical" },
    ]);

  const formSteps = useMemo(() => {
    return [
      SubscriptionsForm,
      FinancialForm,
      AdminForm,
      HomeInsuranceForm,
      HealthInsuranceForm,
      MedicalForm,
    ].map((Form, index) => (
      <Form
        key={index}
        isSelected={index === selectedStepIndex}
        isCompleted={steps[index].status === stepFormStatus.COMPLETED}
        onCompleteStep={completeStepAndNext}
      />
    ));
  }, [selectedStepIndex, steps, completeStepAndNext]);

  return (
    <div className="h-auto bg-gray-100 md:bg-white md:flex md:p-4 md:h-[700px] md:w-[770px] md:rounded-xl md:shadow-lg md:mx-auto md:my-8">
      <SharedFieldsManager
        fields={{
          "old-address": "",
        }}
      >
        <StepNavigation selectedStepIndex={selectedStepIndex} steps={steps} onSelectStep={selectStep} />
        <div className="flex flex-col flex-1 bg-white md:w-2/3 md:px-20 md:py-10 md:justify-between">
          {formSteps}
        </div>
      </SharedFieldsManager>
    </div>
  );
};

export default PostLossWizard;
