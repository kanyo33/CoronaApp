import {
    MAP_VIEW, 
    CORONA_DETAILS,
    COUNTRY_CITY,
    COUNTRY_DATA,
    CITY_DATA,
    WORLD_DATA,
    WORLD_DATA1,
    WORLD_DATA2,
    WORLD_DATA3,
    WORLD_DATA4,
    WORLD_DATA5,
    WORLD_DATA30,
    WORLD_DATA70,
    CORONA_TESTED,
    LOCATION_VISIBLE,
    NOTIFICATION
} from '../actions/actionTypes';

const initialState = {
    mapView: 0,
    coronaDetails: [],
    countryCity: 'country',
    countryData:[],
    cityData:[],
    worldData:[],
    worldData1:[],
    worldData2:[],
    worldData3:[],
    worldData4:[],
    worldData5:[],
    worldData30:[],
    worldData70:[],
    coronaTested: false,
    locationVisible: false,
    notification: true
}; 

const reducer = (state = initialState, action) => {
    switch(action.type){
        case CORONA_DETAILS:
            return {
                ...state,
                coronaDetails: action.coronaDetails
            }
        case MAP_VIEW:
            return {
                ...state,
                mapView: action.mapView
            };
        case COUNTRY_CITY:
            return {
                ...state,
                countryCity: action.countryCity
            }
            case COUNTRY_DATA:
            return {
                ...state,
                countryData: action.countryData
            }
            case CITY_DATA:
            return {
                ...state,
                cityData: action.cityData
            }
        case WORLD_DATA:
            return {
                ...state,
                worldData: action.worldData
            }
        case WORLD_DATA1:
            return {
                ...state,
                worldData1: action.worldData1
            }
        case WORLD_DATA2:
            return {
                ...state,
                worldData2: action.worldData2
            }
        case WORLD_DATA3:
            return {
                ...state,
                worldData3: action.worldData3
            }
        case WORLD_DATA4:
            return {
                ...state,
                worldData4: action.worldData4
            }
        case WORLD_DATA5:
            return {
                ...state,
                worldData5: action.worldData5
            }
        case WORLD_DATA30:
            return {
                ...state,
                worldData30: action.worldData30
            }
        case WORLD_DATA70:
            return {
                ...state,
                worldData70: action.worldData70
            }
        case CORONA_TESTED:
            return {
                ...state,
                coronaTested: action.coronaTested
            }
        case LOCATION_VISIBLE:
            return {
                ...state,
                locationVisible: action.locationVisible
            }
        case NOTIFICATION:
            return {
                ...state,
                notification: action.notification
            }
        default:
            return state;
    }
};

export default reducer;