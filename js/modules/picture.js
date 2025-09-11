import { config } from "../const/config.js";

export async function getPicture(city_name) {
    let headers = new Headers({ 'Accept-Version': 'v1' });

    city_name = city_name.toLowerCase().trim();
    let query_url = 'https://api.unsplash.com/search/photos?page=1&per_page=1&orientation=landscape&client_id=' + config.PICTURE_ACCESS_KEY + '&query=' + city_name;
    let promise_pic = fetch(query_url, { headers: headers })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            let city_image = data.results[0].urls;
            let photo_url = window.innerWidth > 1000 ? city_image.full : city_image.regular;
            $('html').attr('style', 'background:url(' + photo_url + ') no-repeat center center fixed; background-size:cover;');
        })
        .catch(error => {
            $('html').attr('style', '');
        });
    await promise_pic;
}