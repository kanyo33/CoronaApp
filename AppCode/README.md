## App Setup

Install NPM dependencies within AppCode Folder

```
   npm install 
```
if problems exist:
    - Delete package-lock.json file and run ```npm install``` again

### For Android

```
    npm run android
```
If problems exist:
    - Update to the newest android studio version
    - Delete .idea folder inside android folder
    - Run ``` gradlew clean``` inside android folder run:
    - Delete .iml files inside android main and android/app folder
    - run invalidate and clear cache inside android studio

### For IOS
```
    cd ios && pod install
    cd .. 
    npm run ios
```
if problems exist:
    - remove pod lock file and run pod install again


## Current Implementation

- Uses redux to manage state.
- SQL-lite storage is used to store all data points for offline usage.
- Due to the the large amount of data the app may lag on emulated testing. 
- Separate API fetches are made to gather the data.
- 


## Future Implementations

- [ ] Refactor 
- [ ] Provide Corona News Feed tailored to each country.
- [ ] 
- [ ] Load balance data based on geographical zones to improve load speed.
- [ ] Store data fetched onto database to perform different computations
    - [ ] Growth rate analysis of historic data
    - [ ] Run Machine algorithm 
        - [ ] Perform sentiment analysis between public news shared and growth rate
        - [ ] Use user location history and active status to predict what users may have been affected by active case.
