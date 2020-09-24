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

- Uses React-Native width minor object-c and java implementations.
- Uses redux to manage state.
- SQL-lite storage is used to store all data points for offline usage (SEE FUTURE IMPLEMENTATION).
- Firebase is used to store active cases and the users unique device ID (SEE FUTURE IMPLEMENTATION).
- Due to the large amount of data the app may lag on emulated testing. 
- Separate API fetches gather data and spread it out throughout the map.
- Cities and countries are pooled together into clusters based on proximity to one another for better performance when loading.
- Notifications can be sent to users.
- User is forwarded to WHO for more information. 
- User can bookmark a specific city or country. When users click on the bookmark the map is set to the specific location and summary regarding the spread of the virus in that region is shared.
- Projection statistics are provided by using the average global growth rate (SEE FUTURE IMPLEMENTATION).


## Future Implementations

- [ ] Refactor 
- [ ] Run unit tests on node packages added to remove warnings
- [ ] Load balance data based on geographical zones to improve load speed.
- [ ] Connect geographical zones of active cases to users current location to send out notifications when user enters danger zone. 
- [ ] Conduct threat level analysis by using number of active cases in proximity to the user and growth levels of city wide/ country wide growth levels.
- [ ] Notifications are sent out to inform the user of current threat levels.
- [ ] Notifications are sent out to inform users of any important issues regarding the virus.  

- [ ] Store data fetched onto database to perform different computations
    - [ ] Growth rate analysis of historic data
    - [ ] Run Machine algorithm 
        - [ ] Perform sentiment analysis between public news shared and growth rate
        - [ ] Use user location history and active status to predict what users may have been affected by active case.
