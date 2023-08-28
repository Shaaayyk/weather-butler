import { NextResponse } from 'next/server'
import { getGeoData, getLatAndLon, getWeatherData } from '../../../utils/weather'
import { initChatMessages } from '../../../utils/messages';

export async function POST(request) {
  // grab the input from the user submitting their location
  const body = await request.json()
  // openWeather needs the lat and lon for the current weather endpoint
  // so we need to first request for that info first using the geo api
  const geoData = await getGeoData(body.input)
  // save lat and lon in an object
  const latAndLon = getLatAndLon(geoData)
  // now we can request the current weather info since we have lat and lon now
  const weatherData = await getWeatherData(latAndLon.lat, latAndLon.lon)
  // the openai request needs info from both objects for the prompt we use
  const completion = await initChatMessages(geoData, weatherData)
  // send response from openai and weather data to the user
  return NextResponse.json({weather: weatherData, messages: completion})
}
