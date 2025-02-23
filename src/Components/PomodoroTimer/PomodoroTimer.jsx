import React, { useState, useEffect } from 'react';
import "./pomodoroStyles.css"

const PomodoroTimer = () => {
    const [time, setTime] = useState(25 * 60); // 25 minutes in seconds
    const [isActive, setIsActive] = useState(false);
    const [isBreak, setIsBreak] = useState(false);

    useEffect(() => {
        let interval = null;
        if (isActive) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime - 1);
            }, 1000);
        } else if (!isActive && time !== 0) {
            clearInterval(interval);
        }
        if (time === 0) {
            clearInterval(interval);
            setIsBreak(!isBreak);
            setTime(isBreak ? 25 * 60 : 5 * 60); // Switch between work and break periods
        }
        return () => clearInterval(interval);
    }, [isActive, time, isBreak]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    const handleStartPause = () => {
        setIsActive(!isActive);
    };

    const handleReset = () => {
        setIsActive(false);
        setTime(25 * 60);
        setIsBreak(false);
    };

    return (
        <div className="pomodoro-timer">
            <h1>{isBreak ? 'Break Time' : 'Work Time'}</h1>
            <div className="timer">{formatTime(time)}</div>
            <button onClick={handleStartPause}>
                {isActive ? 'Pause' : 'Start'}
            </button>
            <button onClick={handleReset}>Reset</button>
        </div>
    );
};

export default PomodoroTimer;