## App Setup

Install NPM dependencies within the AppCode Folder

```
   npm install 
```
If problems exist:
    - Delete package-lock.json file and run ```npm install``` again

### For Android

```
    npm run android
```
If problems exist:
    - Update to the newest android studio version
    - Delete .idea folder inside android folder
    - Run ``` gradlew clean``` inside android folder.
    - Delete .iml files inside android main and android/app folder
    - Run invalidate and clear cache inside android studio

### For IOS
```
    cd ios && pod install
    cd .. 
    npm run ios
```
if problems exist:
    - remove pod lock file inside ios folder and run ```pod install``` again

## Current Implementation

- Uses React-Native with minor objective-c and java additions.
- Uses redux to manage state.
- SQL-lite storage stores all data points for offline usage (SEE FUTURE IMPLEMENTATION).
- Firebase is used to store active cases including location of user and the devices unique ID (SEE FUTURE IMPLEMENTATION).
- Due to the large amount of data, the app may lag on emulated testing. 
- Separate API fetches are used to pool together all corona related data points.
- Cities and countries within proximity to one another are pooled together into clusters for better performance when loading.
- Notifications can be sent to users.
- User is forwarded to WHO for more information. 
- User can bookmark a specific city or country. When the user clicks on the bookmark the map animates to the specific location and the summary regarding the spread of the virus opens.
- Projection statistics are provided by using the average global growth rate (SEE FUTURE IMPLEMENTATION).


## Future Implementations

- [ ] Refactor. 
- [ ] Run unit tests on node packages added to remove warnings.
- [ ] Load balance data based on geographical zones to improve performance.
- [ ] Connect geographical zones of active cases to users current location to send out notifications when user enters a geographical zone where an active case was reported. 
- [ ] Conduct a threat level analysis by using the number of active cases within a certain radius and divide that by the growth levels of the appropriate country.
- [ ] Notifications are sent out to inform the user of current threat levels + ability to opt out.
- [ ] Notifications are sent out to inform users of any important issues regarding the virus + ability to opt out.  
- [ ] Notifications are shared when the user leaves the house to take appropriate measures to safeguard oneself + ability to opt out.
- [ ] Store data fetched onto database to perform different computations
    - [ ] Growth rate analysis of historic data
    - [ ] Run Machine algorithm 
        - [ ] Perform sentiment analysis between public news shared and growth rate of the viral infection to analyze the correlation.
        - [ ] Use the users location history and positive tested statuses shared to predict what users may have been affected.
        - [ ] Develop model of cases that go undetected by cross analyzing shared active cases, historic growth data and location history of users. 
        - [ ] Perform risk analysis of job occupation, time spent in proximity to others and countries growth rate.

## Please Share

If you believe that this repository can be helpful in mitigating and stopping the current viral outbreak than feel free to share, like, offer suggestions and to help in the development of the apps features. The purpose is to attract a community of individuals who are willing to donate a little bit of their time to improve the quality of life for everyone. 