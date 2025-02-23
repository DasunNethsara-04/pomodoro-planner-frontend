import React from 'react'
import AdminNavigation from '../Nav/AdminNavigation'
import PomodoroTimer from '../../../Components/PomodoroTimer/PomodoroTimer'

const Timer = () => {
    return (
        <>
            <AdminNavigation />
            <div className="App">
                <header className="App-header">
                    <PomodoroTimer />
                </header>
            </div>
        </>
    )
}

export default Timer