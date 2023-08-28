const geoURL = 'http://api.openweathermap.org/geo/1.0/direct?q='
const weatherURL = 'https://api.openweathermap.org/data/2.5/weather?units=imperial&'
const apiKey = process.env.OPENWEATHER_API_KEY

export async function getGeoData(location) {
  try {
    const geoResponse =
      await fetch(`${geoURL}${location}&appid=${apiKey}`)
    const geoData = await geoResponse.json()
    return geoData
  } catch (error) {
    console.log(error)
    return error
  }
}

export function getLatAndLon(geoObj) {
  const lat = geoObj[0].lat
  const lon = geoObj[0].lon
  return {lat, lon}
}

export async function getWeatherData(lat, lon) {
  try {
    const weatherResponse =
      await fetch(`${weatherURL}lat=${lat}&lon=${lon}&appid=${apiKey}`)
    const weatherData = await weatherResponse.json()
    return weatherData
  } catch (error) {
    console.log(error)
    return error
  }
}