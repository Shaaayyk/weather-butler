import { NextResponse } from 'next/server'
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request) {
  const geoURL = 'http://api.openweathermap.org/geo/1.0/direct?q='
  const weatherURL = 'https://api.openweathermap.org/data/2.5/weather?units=imperial&'
  const body = await request.json()
  console.log(body)
  const geoResponse = await fetch(`${geoURL}${body.input}&appid=${process.env.OPENWEATHER_API_KEY}`)
  const geoData = await geoResponse.json()
  console.log(geoData)
  const lat = geoData[0].lat
  const lon = geoData[0].lon

  const weatherResponse = await fetch(`${weatherURL}lat=${lat}&lon=${lon}&appid=${process.env.OPENWEATHER_API_KEY}`)
  const weatherData = await weatherResponse.json()
  console.log(weatherData)

  const date = new Date(weatherData.dt * 1000)
  console.log(date.toString())

  // {role: 'user', content: 'message'}

  const chatMessages = [
    {
      role: 'system',
      content: 'You are a helpful assistant'
    },
    {
      role: 'user',
      content: `
        Hello there. I need some fashion advice on what to wear based upon the current weather.
        The time is ${date.toLocaleTimeString()}. I'm in ${geoData[0].name}, ${geoData[0].state}.
        The weather description is ${weatherData.weather[0].description}. The temperature is
        ${Math.ceil(weatherData.main.temp)} degrees in Fahrenheit. The humidity is ${weatherData.main.humidity} 
        percent. The wind speed is ${Math.ceil(weatherData.wind.speed)} mph. Also what colors should I wear?
      `
    }
  ]

  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: chatMessages,
    temperature: 0.7,
  });
  
  return NextResponse.json({input: `You sent in ${body.input}`, weather: weatherData, geo: geoData, messages: chatMessages, completion})
}
