import { useState, useEffect } from 'react'
// import '../css/clock.css'

const Clock = () => {
    const [currentHands, setCurrentHands] = useState<number[]>([])

    useEffect(() => {
        const intervalId = setInterval(() => {
            const now = new Date();
            const hands = formatTime(now)
            setCurrentHands(hands);
          }, 1000)
        return() => clearInterval(intervalId);
    })
    
    const formatTime = (time:Date)  => {
        let hands:number[] = []

        const hours   = time.getHours()
        const minutes = time.getMinutes()
        const seconds = time.getSeconds()
        
        // Format the time to degrees on a circle
        hands.push((hours / 12) * 360)
        hands.push((minutes / 60) * 360)
        hands.push((seconds / 60) * 360)

        return hands
    }

return(
    <div className='clock'>
        <span className='digitalTimer'>{currentHands.join(',')}</span>
    </div>
)
}

export default Clock