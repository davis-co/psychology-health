import React, { Component } from "react"

import FlipClockCountdown from "@leenguyen/react-flip-clock-countdown"
import "@leenguyen/react-flip-clock-countdown/dist/index.css"
import classNames from "classnames"
import styles from "./styles.module.css";
import { i18n } from "./i18n";

const CountDown = ({ onComplete = () => {}, containerClassName }) => {
    return (
        <div className={classNames(styles.container, containerClassName)}>
            <span className={styles.title}>{i18n.timeLeft}</span>
            <FlipClockCountdown
                renderMap={[false, true, true, true]}
                to={(new Date().getTime() +  2 * 60 * 60 * 1000)}
                onComplete={() => onComplete()}
                labels={["", "", "", ""]}
                digitBlockStyle={{
                    width: 15,
                    height: 25,
                    fontSize: 18,
                    backgroundColor: "#fff",
                    color: "black",
                }}
                dividerStyle={{ color: "white", height: 1 }}
                separatorStyle={{ color: "black", size: "4px" }}
            />
        </div>
    )
}

export default CountDown
