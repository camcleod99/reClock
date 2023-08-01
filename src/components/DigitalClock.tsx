import React, { useState, useEffect } from 'react'
import '../css/DigitalClock.css'

interface DigitalClockProps{
    time?: Date
}

const DigitalClock: React.FC<DigitalClockProps> = (props) => {
    interface TimeObject{
        [key: string]: string
    }
    const now = new Date(props.time || new Date())
    
    const formatTime = (time: Date) => {
        const formattedTime: TimeObject={
            hours:  (time.getHours().toString().padStart(2, '0')),
            minutes: (time.getMinutes().toString().padStart(2, '0')),
            seconds: (time.getSeconds().toString().padStart(2, '0'))
        }
        return formattedTime
    }

    const firstTime = formatTime(now)
    const [curentTime, setCurrentTime] = useState<TimeObject>(firstTime)

    useEffect(() => {
        const intervalId = setInterval(() => {
            const formattedTime = formatTime(now);
            setCurrentTime(formattedTime);
          }, 1000)
        return() => clearInterval(intervalId);
    })
    

    if (isNaN(Number.parseInt(curentTime.seconds))) {
        return(
            <div className="Wait" > <p> Set Up The Digital Clock </p> </div>
        )
    } else {
        return(
        <div id='DigitalClock' className="DigitalClock">{curentTime.hours}:{curentTime.minutes}::{curentTime.seconds}</div>
    )
    }
}

export default DigitalClock