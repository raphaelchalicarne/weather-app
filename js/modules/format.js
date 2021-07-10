import { countries } from "../const/flag-emojis-by-code.js";

export function formatCityName(city_name, country_code) {
    let country_emoji = countries[country_code].emoji;
    return city_name + ' ' + country_emoji
}

export function formatCelcius(temperature) {
    return (temperature).toLocaleString('en-EN', {
        style: 'unit',
        unit: 'celsius',
        maximumFractionDigits: 0
    })
}