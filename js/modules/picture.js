import { config } from "../const/config.js";

export async function getPicture(city_name) {
    let headers = new Headers({'Authorization': 'Basic ' + config.PICTURE_AUTH});
    // headers.set('Authorization', 'Basic ' + config.PICTURE_AUTH);

    city_name = city_name.toLowerCase().trim();
    let query_url = 'https://api.roadgoat.com/api/v2/destinations/auto_complete?q=' + city_name;
    let promise_pic = fetch(query_url, headers)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            let mobile_url = data.photos[0].image.mobile;
            $('html').attr('style', 'background:url(' + mobile_url + ') no-repeat center center fixed; background-size:cover;');
        })
        .catch(error => {
            $('html').attr('style', '');
        });
    await promise_pic;
}