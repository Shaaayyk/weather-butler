import { NextResponse } from 'next/server'
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const chatMessages = [
  {
    role: 'system',
    content: 'You are a helpful assistant'
  },
  {
    role: 'user',
    content: ''
  }
]


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

  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [],
    // {role: 'user', content: 'message'}
    temperature: 0.7,
  });
  // console.log(completion.data.choices[0].message)


  return NextResponse.json({message: `You sent in ${body.input}`, weather: weatherData})
}


// http://api.openweathermap.org/geo/1.0/direct?
// q = { city name }, { state code }, { country code }
//  & limit={ limit }& appid={API key }


// https://api.openweathermap.org/data/3.0/onecall?
// lat = { lat } & lon={ lon }
// & exclude={ part }& appid={API key }

// api.openweathermap.org/data/2.5/forecast/daily?
// lat = { lat } & lon={ lon }
// & cnt={ cnt }& appid={API key }