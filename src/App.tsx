import './css/App.css'
import Clock from './components/clock'
import DigitalClock from './components/digitalClock'


function App() {

  return (
    <>
    <div>
        <DigitalClock format="hh:mm:ss" />
        <hr />
        <Clock />
    </div>
    </>
  )

}

export default App
