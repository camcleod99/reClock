import { useState, useEffect } from 'react'
import './css/App.css'
import Clock from './components/Clock.tsx'
import DigitalClock from './components/DigitalClock.tsx'
import WordClock from './components/WordClock.tsx'


function App() {

    const [currentTime, setCurrentTime] = useState<Date>()

    useEffect(() => {
        const intervalId = setInterval(() => {
            const now = new Date();
            setCurrentTime(now);
          }, 1000)
        return() => clearInterval(intervalId);
    })

  return (
    <>
    <div>
        <WordClock time={currentTime} />
        <DigitalClock time={currentTime} />
        <br />
        <Clock time={currentTime} />
    </div>
    </>
  )

}

export default App
