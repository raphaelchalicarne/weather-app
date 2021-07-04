var config = {
  OPEN_WEATHER_MAP_API_KEY: await octokit.request('GET /repos/{owner}/{repo}/actions/secrets/{secret_name}', {
    owner: 'raphaelchalicarne',
    repo: 'weather-app',
    secret_name: 'OPEN_WEATHER_MAP_API_KEY'
  })
}