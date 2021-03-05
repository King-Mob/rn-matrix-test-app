# React Native + Matrix Test App

Just experimenting with [Matrix](https://matrix.org/) on [React Native](https://reactnative.dev/)

# Setup

## React Native Development Environment

[This tutorial](https://reactnative.dev/docs/environment-setup) provided by the React Native team is great. I followed the React Native CLI Quickstart section for Linux and Android.

## Setup the Test App

1. `git clone https://github.com/chaoticcapybara/rn-matrix-test-app.git` (or use SSH)
2. `yarn install` in the top dir of the repo
3. Create Matrix account
    - The easiest way is to install [Element](https://element.io/get-started) and create an account on the [matrix.org](matrix.org) homeserver.
5. Create UserInfo.json
    - find your `baseUrl`, `accessToken` and `userId`. On element:
    ```
    Settings -> Help and About -> Advanced -> Home server for baseUrl
    Settings -> Help and About -> Advanced -> Reveal Access Token for the access token
    Settings -> General for the userId
    ```
    - create UserInfo.js in the root of the repo with the following structure
    ```js
    export default UserInfo = { baseUrl: "https://example.homeserver.com", accessToken: "QRSD12312SFGS568JHZFD9", userId: "@myusername:example.homeserver.com" }
    ```
5. In one terminal: `npx react-native start`
6. In another terminal: `npx react-native run-android` or `npx react-native run-ios`
    - Personally, I use my phone to test. In which case I do:
      - `adb devices` to prompt my phone for developer permissions
      - Copy my phones ID from the `adb` output
      - `npx react-native run-android --deviceId=<copied device ID>`
