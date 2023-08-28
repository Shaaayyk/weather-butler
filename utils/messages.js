import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const chatMessages = []

function initChatMessages(geoObj, weatherObj) {
  const system = {
    role: 'system',
    content: 'You are a helpful assistant'
  }
  
  const date = new Date(weatherObj.dt * 1000)
  const city = geoObj[0].name
  const state = geoObj[0].state
  const description = weatherObj.weather[0].description
  const temperature = Math.ceil(weatherObj.main.temp)
  const humidity = Math.ceil(weatherObj.main.humidity)
  const windSpeed = Math.ceil(weatherObj.wind.speed)

  const user =  {
      role: 'user',
      content: `
        Hello there. I need some fashion advice on what to wear based upon the current weather.
        The time is ${date.toLocaleTimeString()}. I'm in ${city}, ${state}.
        The weather description is ${description}. The temperature is
        ${temperature} degrees in Fahrenheit. The humidity is ${humidity} 
        percent. The wind speed is ${windSpeed} mph. Also what colors should I wear?
      `
    }
  
}

const completion = await openai.chat.completions.create({
  model: "gpt-3.5-turbo",
  messages: chatMessages,
  temperature: 0.7,
});