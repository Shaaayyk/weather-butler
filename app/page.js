'use client'
import { useState } from 'react'
import styles from './page.module.css'

export default function Home() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([])
  const [weather, setWeather] = useState({})

  async function handleSubmit(e){
    e.preventDefault()
    const response = await fetch('/api/weather', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({input})
    })
    const data = await response.json()
    console.log(data)
    setMessages(data.messages)
    setWeather(data.weather)
    setInput('')
  }
  return (
    <main className={styles.main}>
      <h1>Weather Butler</h1>
      <p>Enter a location to get the current weather and some clothing suggestions!!</p>
      <form onSubmit={handleSubmit}>
        <input name='input' type='text' value={input} onChange={(e) => setInput(e.target.value)} />
        <input type='submit' />
      </form>
      

      {weather.name ?
        <div className={styles.weatherDiv}>
          <h2>The weather currently in {weather.name} is...</h2>
          <div className={styles.weatherSubDiv}>
            <h3>Temp: {Math.ceil(weather.main?.temp)}&deg;F</h3>
            <h3>High Temp: {Math.ceil(weather.main?.temp_max)}&deg;F</h3>
            <h3>Humidity: {weather.main?.humidity}%</h3>
            <h3>Wind Speed: {Math.ceil(weather.wind?.speed)} mph</h3>
            <h3>Looks like the weather is {weather.weather && weather.weather[0].description}</h3>
          </div>
        </div>
        :
        null 
      }
      


      {messages.length ?
        <div className={styles.messagesDiv}>
          <h2>Here are some suggestions from our Weather Butler!</h2>
          <p>{messages[2].content}</p>
        </div>
        :
        null
      }
    </main>
  )
}
