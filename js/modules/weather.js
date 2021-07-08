import { config } from "../const/config.js";
import { countries } from "../const/flag-emojis-by-code.js";
import { getPicture } from "./picture.js";

var open_weather_map_api_key = config.OPEN_WEATHER_MAP_API_KEY;

export async function calculateWeather() {
    let city_name = $('#city_input').val();
    await getWeather(city_name);
};

export async function getWeather(city_name) {
    let promise_weather = fetch('https://api.openweathermap.org/data/2.5/find?q=' + city_name + '&units=metric&appid=' + open_weather_map_api_key)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => data.list[0])
        .then(function (weather_data) {
            console.log(weather_data);

            // Get proper name
            let city_name = weather_data.name;
            let re = /^Arrondissement de/;
            let array_test = city_name.split(re);
            city_name = array_test[array_test.length - 1];

            let country_emoji = countries[weather_data.sys.country].emoji;
            $('#city_name_flag').text(city_name + ' ' + country_emoji);
            let temp = weather_data.main.temp;
            $('#temp_sun').text(temp + '°C');
            let pressure = weather_data.main.pressure;
            $('#pressure').text('Pressure : ' + pressure + ' hPa');
            getPicture(city_name);
            $('#map').show();
        })
        .catch(error => console.log('The city was not found'));
    await promise_weather;
}