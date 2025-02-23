import React, { useState, useRef } from 'react';
import "./pomodoroStyles.css"
import TimesUpSound from "../../assets/times_up.mp3";
import TimerPauseSound from "../../assets/time_pause.mp3";
import TimerStartSound from "../../assets/timer_start.mp3";
import TimerReset from "../../assets/timer_reset.mp3";
import useSound from 'use-sound';

const PomodoroTimer = () => {
    const [timeLeft, setTimeLeft] = useState(10);
    const intervalRef = useRef(null);
    const [timesUp] = useSound(TimesUpSound);
    const [timerPause] = useSound(TimerPauseSound);
    const [timerStart] = useSound(TimerStartSound);
    const [timerReset] = useSound(TimerReset);

    const startTimer = () => {
        timerStart();
        intervalRef.current = setInterval(() => {
            setTimeLeft((prevTimeLeft) => {
                if (prevTimeLeft <= 0) {
                    timesUp();
                    clearInterval(intervalRef.current);
                    intervalRef.current = null;
                    return 0;
                }
                return prevTimeLeft - 1;
            });
        }, 1000);
    }

    const pauseTimer = () => {
        timerPause();
        clearInterval(intervalRef.current);
        intervalRef.current = null;
    }

    const resetTimer = () => {
        timerReset();
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        setTimeLeft(1500);
    }

    return (
        <>
            <div className="upper_wrapper">
                <div className="wrapper">
                    <h1>Pomodoro Timer</h1>
                    <div className="timer-display">
                        <span> {String(Math.floor(timeLeft / 60)).padStart(2, "0")} </span>
                        <span>:</span>
                        <span> {String(timeLeft % 60).padStart(2, "0")} </span>
                    </div>

                    <div className="buttons">
                        <button className='start' onClick={startTimer}>START</button>
                        <button className='pause' onClick={pauseTimer}>PAUSE</button>
                        <button className='stop' onClick={resetTimer}>RESET</button>
                    </div>
                </div>
            </div>
        </>
    )
};

export default PomodoroTimer;