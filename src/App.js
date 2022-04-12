import './App.css';
import React, {useState, useEffect} from 'react'
import { Route, Routes} from 'react-router-dom'
import Home from './component/Home'
import Countdown from './component/Countdown';


import Ramadan01 from './assets/ramadan-01.jpg'
import Ramadan02 from './assets/ramadan-02.jpg'
import Ramadan03 from './assets/ramadan-03.jpg'
import Ramadan04 from './assets/ramadan-04.jpg'
import Ramadan06 from './assets/ramadan-06.jpg'



function App() {
  let count = 0
  const images = [Ramadan01, Ramadan02,  Ramadan03, Ramadan04,  Ramadan06]
  const [bgImage, setBgImage] = useState(images[count])

  const changeBg = () => {
    count++
    if(count > images.length - 1) {
      count = 0
    }
    setBgImage(images[count])
  }

  useEffect(() => {
    const imageInterval = setInterval(() => {
      changeBg()
    }, 3000)
    return () => clearInterval(imageInterval)
  }, [])

  return (
    <div className="App" style={{backgroundImage: `url(${bgImage})`}}>
      <Routes>
        <Route path='/' exact element={<Home/>} />
        <Route path='/countdown' exact element={<Countdown/>} />
      </Routes>
    </div>
  );
}

export default App;
