import { config } from "../const/config.js";
import { formatCityName, formatCelcius } from "./format.js";
import { getPicture } from "./picture.js";

var OPEN_WEATHER_MAP_API_KEY = config.OPEN_WEATHER_MAP_API_KEY;

export async function calculateWeather() {
    let city_name = $('#city_input').val();
    await getWeather(city_name);
};

export async function getWeather(city_name) {
    let request_url = 'https://api.openweathermap.org/data/2.5/find?q=' + city_name + '&units=metric&appid=' + OPEN_WEATHER_MAP_API_KEY;

    let promise_weather = fetch(request_url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => data.list[0])
        .then(function (weather_data) {
            let city_name = getWeatherCityName(weather_data);
            let country_code = weather_data.sys.country;
            $('#city_name_flag').text(formatCityName(city_name, country_code));

            let temp = weather_data.main.temp;
            $('#temp_sun').text(formatCelcius(temp));

            let pressure = weather_data.main.pressure;
            $('#pressure').text('Pressure : ' + pressure + ' hPa');

            let weather_main = weather_data.weather[0].main;
            $('#weather_main').text(weather_main);

            let weather_icon_id = weather_data.weather[0].icon;
            let weather_icon_src = '../../assets/weather-icons/' + weather_icon_id + '.png';
            let weather_description = weather_data.weather[0].description;
            $('#weather_icon').attr({ src: weather_icon_src, alt: weather_description });

            getPicture(city_name);
            $('#map, #weather').removeClass('invisible');
        })
        .catch(error => console.log('The city was not found'));
    await promise_weather;
}

function getWeatherCityName(weather_data) {
    let city_name = weather_data.name;
    let re = /^Arrondissement de/;
    let array_test = city_name.split(re);
    return array_test[array_test.length - 1];
}