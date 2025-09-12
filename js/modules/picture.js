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
            let first_result = data.results[0]
            let city_image = first_result.urls;
            let photo_url = window.innerWidth > 1000 ? city_image.full : city_image.regular;
            $('html').attr('style', 'background:url(' + photo_url + ') no-repeat center center fixed; background-size:cover;');
            $('footer').show();
            $('#picture_author')
                .text(first_result.user.name)
                .attr("href", first_result.user.links.html + "?utm_source=Weather_app&utm_medium=referral");
        })
        .catch(error => {
            $('html').attr('style', '');
            $('footer').hide();
        });
    await promise_pic;
}