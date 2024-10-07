import '@leenguyen/react-flip-clock-countdown/dist/index.css';

import React from 'react';

import classNames from 'classnames';

import FlipClockCountdown from '@leenguyen/react-flip-clock-countdown';

import { i18n } from './i18n';
import styles from './styles.module.css';

const CountDown = ({ onComplete = () => {}, containerClassName }) => {
    return (
        <div className={classNames(styles.container, containerClassName)}>
            <span className={styles.title}>{i18n.timeLeft}</span>
            <FlipClockCountdown
            theme='light'
                renderMap={[false, true, true, true]}
                to={(new Date().getTime() +  2 * 60 * 60 * 1000)}
                onComplete={() => onComplete()}
                labels={["", "", "", ""]}
                digitBlockStyle={{
                    width: 30,
                    height: 30,
                    fontSize: 25,
                    backgroundColor: "transparent",
                    color: "black",
                    boxShadow:"none"
                }}
                dividerStyle={{ color: "white", height: 1 }}
                separatorStyle={{ color: "black", size: "4px" }}
            />
        </div>
    )
}

export default CountDown
