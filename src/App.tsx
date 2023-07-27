import { useState, useEffect } from 'react'
import './css/App.css'
import Clock from './components/Clock.tsx'
import DigitalClock from './components/DigitalClock.tsx'


function App() {

    const [curentTime, setCurrentTime] = useState<Date>()

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
        <DigitalClock time={curentTime} />
        <br />
        <Clock time={curentTime} />
    </div>
    </>
  )

}

export default App
