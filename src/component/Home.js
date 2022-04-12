import React, {useState, useEffect} from 'react'
import '../styles/Home.css'
import {BiCurrentLocation} from 'react-icons/bi'
import {BsFillSunsetFill,  BsFillSunriseFill, BsCalendarPlusFill, BsCalendarMinusFill} from 'react-icons/bs'
import {RiSingleQuotesL, RiSingleQuotesR}  from 'react-icons/ri'
import {AiOutlineDoubleRight} from 'react-icons/ai'
import { Link } from 'react-router-dom'


function Home() {
  const  [isLoading, setIsLoading] = useState(true)
  const [city, setCity] = useState('ikeja')
  const [count, setCount] = useState({})
  const [time, setTime] = useState({})
  const [verse, setVerse] = useState('')
  const [value,  setValue] = useState('')

  const prayerAPI = `https://api.pray.zone/v2/times/today.json?city=${city}`
  
  const prayersTimes = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(prayerAPI)
      const dataOb = await response.json()
      const datetime = dataOb.results.datetime[0]

      let today = datetime.date.hijri;
      let date = new Date(today).getDate()
      let dateRemain = 29 - date
      setCount({date, dateRemain})

      let sahur = datetime.times.Fajr;
      let iftar = datetime.times.Maghrib;
      setTime({sahur, iftar})

      setIsLoading(false)
      
    } catch (error) {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    prayersTimes()
  }, [city])

  const RandomVerse = async () => {
    const generateRandomNum = () => {
      return Math.floor(Math.random() * 6236)
    }
    const RandomNum = generateRandomNum()
    const quranAPI = `https://api.alquran.cloud/v1/ayah/${RandomNum}/en.sahih`

    try {
      const res = await fetch(quranAPI)
      const data = await res.json()
      let quote = data.data.text
      if(quote.length > 120) {
        RandomVerse()
      }
      else{
      setVerse(quote + '....')
      }
    } catch (error) {
      
    }
  }
  useEffect(() => {
    RandomVerse()
  }, [])
  
  const {date, dateRemain} =  count
  const {sahur, iftar} = time

  const getInput = (e) => {
    const newCity = e.target.value
    setValue(newCity)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    let getCity =  value
    setCity(getCity)
  }

  if(isLoading) {
    return <section className='home'>
      <div className='loading'>Wait for it...</div>
    </section>
  }

  return(
    <section className="home">
      <div className="heading">
        <h2>Ramadan Kareem</h2>
      </div>
      <div className="container">
        <form className="city" onSubmit={handleSubmit}>
          <label htmlFor="city"><BiCurrentLocation style={{fontSize: '2.5rem', marginRight: '5px'}}/>Which city do u live in?</label>
            <input type="text" name='city' onChange={getInput} placeholder='Input city name here...'/>
            <button type='submit'>Submit</button>
        </form>
        <div className="box-container">
          <div className="boxs">
            <div className="box">
              <BsCalendarPlusFill fontSize={'2.4rem'}/>
              <h4>{date}</h4>
              <p>Days</p>
            </div>
            <div className="box">
              <BsCalendarMinusFill fontSize={'2.4rem'}/>
              <h4>{dateRemain} or {dateRemain + 1}</h4>
              <p>left</p>
            </div>
            <div className="box">
              <BsFillSunriseFill fontSize={'3rem'}/>
              <p>sahur in</p>
              <h4>{sahur}</h4>
            </div>
            <div className="box">
              <BsFillSunsetFill  fontSize={'3rem'}/>
              <p>iftar in</p>
              <h4>{iftar}</h4>
            </div>
          </div>
        </div>
        <div className="quote-container">
          <div className="quote">
            <RiSingleQuotesL/>
            {verse}
            <RiSingleQuotesR/>
          </div>
        </div>
      </div>
      <div className="countdown">
        <Link to="/countdown" state={{time}}>
          <button>
            Count<AiOutlineDoubleRight/>
          </button>
        </Link>
      </div>
    </section>
  )
}

export default Home
