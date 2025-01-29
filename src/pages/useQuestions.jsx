import { request } from "@/services";
import { FormFields } from "react-elements-davis";
import { useFormContext } from "react-hook-form";

export default function useQuestions(questions) {
  const getQuestion = (label) => {
    return (
      <FormFields
        {...questions[label]}
        label={label}
        BC={BC}
        request={request}
        useFormContext={useFormContext}
      />
    );
  };

  return [getQuestion];
}
