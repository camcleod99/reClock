//TODO:THIS
import { useState, useEffect } from 'react'
import '../css/clock.css'

interface ClockProps{
    time?: Date
}

const BinaryClock: React.FC<ClockProps> = (props) => {
    interface HandsObject {
        [key: string]: number; 
    }
    
    const now = new Date(props.time || new Date())
    
    const formatTime = (time:Date)  => {
        const hours   = time.getHours()
        const minutes = time.getMinutes()
        const seconds = time.getSeconds()
        
        // Format the time to degrees on a circle
        const hands: HandsObject ={
            hours: ((hours / 12) * 360 + 180),
            minutes: ((minutes / 60) * 360 + 180),
            seconds: ((seconds / 60) * 360 + 180)
        }
        return hands
    }

    const firstHands = formatTime(now)
    const [currentHands, setCurrentHands] = useState<HandsObject>(firstHands)

    useEffect(() => {
        const intervalId = setInterval(() => {
            const hands:HandsObject = formatTime(now)
            setCurrentHands(hands);
          }, 1000)
        return() => clearInterval(intervalId);
    })

    //if the value of currentHands is nan, then return null
    if (isNaN(currentHands.seconds)) {
        return(
            <div className="Wait" > <p> Set up the Clock</p> </div>
        )
    } else {
        return(
        <div id='Clock' className="clock">
            <div className="second-hand" style={{ transform: `rotate(${currentHands.seconds}deg)` }}></div>
            <div className="minute-hand" style={{ transform: `rotate(${currentHands.minutes}deg)` }}></div>
            <div className="hour-hand" style={{ transform: `rotate(${currentHands.hours}deg)` }}></div>
            <div className="center-circle" />
        </div>
    )
    }
}
export default BinaryClock