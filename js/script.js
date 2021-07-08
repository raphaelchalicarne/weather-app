import { getWeather } from "./modules/weather.js";

$(document).ready(async function () {
    let tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    let tz_array = tz.split('/');
    let city_tz_user = tz_array[1];
    await getWeather(city_tz_user);
});

$('#get_weather').click(calculateWeather);
$('#city_input').keypress((e) => {
    if (e.keyCode == 13) { calculateWeather() }
});

async function calculateWeather() {
    let city_name = $('#city_input').val();
    await getWeather(city_name);
};