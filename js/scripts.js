var api_key = config.API_KEY;

async function getWeather(city_name) {
    let promise_weather = fetch('https://api.openweathermap.org/data/2.5/find?q=' + city_name + '&units=metric&appid=' + api_key)
        .then(response => response.json())
        .then(data => data.list[0])
        .then(function (weather_data) {
            console.log(weather_data);
            let city_name = weather_data.name;
            let country_emoji = countries[weather_data.sys.country].emoji;
            $('#city_name_flag').text(city_name + ' ' + country_emoji);
            let temp = weather_data.main.temp;
            $('#temp_sun').text(temp + '°C');
            let pressure = weather_data.main.pressure;
            $('#pressure').text(pressure + ' hPa');
            $('#map').show();
        });
    await promise_weather;
}

$('#get_weather').click(async function () {
    let city_name = $('#city_input').val();
    await getWeather(city_name);
});