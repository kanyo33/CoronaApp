import {
    CITY_BOOKMARK,
    COUNTRY_BOOKMARK,
    RM_CITY_BOOKMARK,
    RM_COUNTRY_BOOKMARK,
    UPDATE_DATE,
    AFFECTED_AREA
} from '../actions/actionTypes';

const initialState = {
    cityBookmark: [],
    countryBookmark: [],
    affectedArea: [],
    updateDate: new Date('04/31/2010')
}; 

const reducer = (state = initialState, action) => {
    switch(action.type){
        case CITY_BOOKMARK:
            return {
                ...state,
                cityBookmark: state.cityBookmark.concat({
                    title: action.title,
                    lat: action.lat,
                    lon: action.lon
                })
            }
        case COUNTRY_BOOKMARK:
            return {
                ...state,
                countryBookmark: state.countryBookmark.concat({
                    title: action.title,
                    lat: action.lat,
                    lon: action.lon
                })
            };
        case  RM_CITY_BOOKMARK:
            return {
                ...state,
                cityBookmark: state.cityBookmark.filter(title => {
                    return title.title !== action.title}),
            }
        case  RM_COUNTRY_BOOKMARK:
            return {
                ...state,
                countryBookmark: state.countryBookmark.filter(title => {
                    return title.title !== action.title}),
            }
            case AFFECTED_AREA:
            return {
                ...state,
                affectedArea: action.affectedArea
            }
        case UPDATE_DATE:
            return {
                ...state,
                updateDate: new Date()
            }
        default:
            return state;
    }
};

export default reducer;