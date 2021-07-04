import { request } from "@octokit/request";
const open_weather_app_api_key = await request('GET /repos/{owner}/{repo}/actions/secrets/{secret_name}', {
    owner: 'raphaelchalicarne',
    repo: 'weather-app',
    secret_name: 'OPEN_WEATHER_MAP_API_KEY'
});

$(document).ready(async function () {
    let tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    let tz_array = tz.split('/');
    let city_tz_user = tz_array[1];
    await getWeather(city_tz_user);
});

$('#get_weather').click(async function () {
    let city_name = $('#city_input').val();
    await getWeather(city_name);
});

async function getWeather(city_name) {
    let promise_weather = fetch('https://api.openweathermap.org/data/2.5/find?q=' + city_name + '&units=metric&appid=' + open_weather_app_api_key)
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