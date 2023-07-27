import React, { useState, useEffect } from 'react'
import '../css/DigitalClock.css'

interface DigitalClockProps{
    format?: string
}

const DigitalClock: React.FC<DigitalClockProps> = ({format = 'hh:mm:ss'}) => {
    const [curentTime, setCurrentTime] = useState<string>('')

    useEffect(() => {
        const intervalId = setInterval(() => {
            const now = new Date();
            const formattedTime = formatTime(now, format);
            setCurrentTime(formattedTime);
          }, 1000)
        return() => clearInterval(intervalId);
    }, [format])
    
    const formatTime = (time: Date, format: string): string => {
        const hours = time.getHours().toString().padStart(2, '0')
        const minutes = time.getMinutes().toString().padStart(2, '0')
        const seconds = time.getSeconds().toString().padStart(2, '0')

        const formattedTime = format
        .replace('hh', hours)
        .replace('mm', minutes)
        .replace('ss', seconds)

        return formattedTime
    }

return <span className='digitalTimer'>{curentTime}</span>
}

export default DigitalClock