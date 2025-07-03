import React from "react";

import classNames from "classnames";

import { Button } from "davis-components";
import { stepToWord } from "./data";
import styles from "./styles.module.css";

export default function FormSteps({
  currentStep = 2,
  steps = [1, 2, 3, 4, 5, 6, 7, 8, 9],
}) {
  return (
    <>
      <div className={classNames(styles.mContainer, "flex lg:hidden")}>
        {steps.map((step) => (
          <Button
            variant="outlined"
            className={
              currentStep > step
                ? styles.prevSteps
                : currentStep === step
                ? styles.currentStep
                : styles.step
            }
            title={
              step === currentStep ? `سری ${stepToWord[step]} سوالات` : step
            }
            key={stepToWord[step]}
          />
        ))}
      </div>
      <div className={classNames(styles.container, "hidden lg:flex")}>
        {steps.map((step) => (
          <>
            <Button
              variant="outlined"
              className={
                currentStep > step
                  ? styles.prevStepButton
                  : currentStep === step
                  ? styles.currentStepButton
                  : styles.stepButton
              }
              title={`سری ${stepToWord[step]} سوالات`}
              key={stepToWord[step]}
            />
            {step !== steps.length ? (
              <span
                className={
                  currentStep > step
                    ? styles.prevShape
                    : currentStep === step
                    ? styles.currentShape
                    : styles.shape
                }
                key={"stepS" + step}
              ></span>
            ) : null}
          </>
        ))}
      </div>
    </>
  );
}
