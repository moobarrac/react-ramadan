import React, {useState,  useEffect} from 'react'
import {useLocation, Link} from 'react-router-dom'
import {AiOutlineDoubleLeft} from 'react-icons/ai'
import '../styles/Countdown.css'

function Countdown() {
  const location = useLocation()
  const time = location.state.time

  const [count, setCount] = useState("00:00:00")
  const [countText, setCountText] = useState('')

  const convertTime = (time) => {
    let ms = Number(time.split(':')[0] * 60 * 60) + Number(time.split(':')[1] * 60)
    return ms;
  }

  const msToHMS = (millisecs) => {
    let  sec = Math.floor(millisecs % 60)
    let min = Math.floor((millisecs / 60) % 60)
    let hr = Math.floor((millisecs / 3600) % 60)

    hr = (hr < 10) ? '0' + hr : hr
    min = (min < 10) ? '0' + min : min
    sec = (sec < 10) ? '0' + sec : sec

    return hr + ':' + min + ':' + sec 
  }

  const TimeLeft = () => {
    const {sahur, iftar} = time
    let currentTimeMs = new Date().getHours() * 60 * 60 + new Date().getMinutes() * 60 + new Date().getSeconds()
    let iftarMs = convertTime(iftar)
    let sahurMs = convertTime(sahur)
    if(iftarMs > currentTimeMs && currentTimeMs > sahurMs) {
      let iftarDiff = msToHMS(iftarMs - currentTimeMs)
      setCount(iftarDiff)
      setCountText('Iftar')
    }
    if(iftarMs < currentTimeMs) {
      let midnight = convertTime('23:59')
      let sahurDiff = msToHMS(midnight - currentTimeMs + sahurMs)
      setCount(sahurDiff)
      setCountText('Sahur')
    }
  }
  useEffect(() => {
    let counting = setInterval(() =>  {
      TimeLeft()
    }, 1000)
    return () => clearInterval(counting)
  }, []);

  return (
    <>
    <div className="back">
      <Link to='/'>
        <p><AiOutlineDoubleLeft />Back</p>
      </Link>
    </div>
    <section className="counting">
      <div className="container">
        <div className="time-countdown">
          <h2>{count}</h2>
          <p>Time to {countText}, almost there!!!</p>
        </div>
      </div>
    </section>
    </>
    
  )
}

export default Countdown