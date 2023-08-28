import { NextResponse } from 'next/server'

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