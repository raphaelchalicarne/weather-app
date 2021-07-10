export async function getPicture(city_name) {
    city_name = city_name.toLowerCase().trim();
    let promise_pic = fetch('https://api.teleport.org/api/urban_areas/slug:' + city_name + '/images/')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(function (data) {
            let mobile_url = data.photos[0].image.mobile;
            $('html').attr('style', 'background:url(' + mobile_url + ') no-repeat center center fixed; background-size:cover;');
        })
        .catch(error => {
            $('html').attr('style', '');
        });
    await promise_pic;
}