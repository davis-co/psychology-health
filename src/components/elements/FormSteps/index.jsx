import classNames from "classnames"
import React from "react"
import styles from "./styles.module.css"
import Button from "../Button"
import { stepToWord } from "./data"

export default function FormSteps({
    currentStep = 2,
    steps = [1, 2, 3, 4, 5, 6, 7, 8, 9],
}) {
    return (
        <>
            <div className={classNames(styles.mContainer, "lg:hidden")}>
                {steps.map((step) => (
                    <Button
                        className={
                            currentStep > step ?
                            styles.prevSteps :
                            currentStep === step
                                ? styles.currentStep
                                : styles.step
                        }
                        title={
                            step === currentStep
                                ? `سری ${stepToWord[step]} سوالات`
                                : step
                        }
                        key={"step" + step}
                    />
                ))}
            </div>
            <div
                className={classNames(styles.container, "hidden lg:flex")}
            ></div>
        </>
    )
}
