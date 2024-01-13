# SatelliteTracker

[![CodeQL](https://github.com/shiroinekotfs/SatelliteTracker/actions/workflows/codeql.yml/badge.svg)](https://github.com/shiroinekotfs/SatelliteTracker/actions/workflows/codeql.yml)

Satellite Tracker - visualization and pass prediction.

## Features

- Calculate position and orbit of satellites from TLE
- Set groundstation through geolocation or pick on map
- Calculate passes for a set groundstation
- Local browser notifications for passes
- Serverless architecture
- Works offline as Progressive Web App (PWA)

## Development

### Setup

Initialize submodules and install npm build dependencies:

```shell
git submodule update --init
npm ci
```

### Run

- `npm run start` for the dev server
- `npm run build` to build the application (output in `dist` folder)
- `npm run serve` to build the application and serve with static webserver
- `npm run update-tle` to retrieve the latest satellite TLEs from NORAD

## License

This project is licensed under the MIT License - see `LICENSE` file for details.

## Acknowledgements

Inspired by a visualization developed for the [MOVE-II CubeSat project](https://www.move2space.de) by Jonathan, Marco and Flo.
