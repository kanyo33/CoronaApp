import {
    CITY_BOOKMARK,
    COUNTRY_BOOKMARK,
    RM_CITY_BOOKMARK,
    RM_COUNTRY_BOOKMARK,
    AFFECTED_AREA,
    UPDATE_DATE
} from './actionTypes';

export const cityBookmark = (title,lat,lon) => {
    return {
        type: CITY_BOOKMARK,
        title: title,
        lat: lat,
        lon: lon
    };
}

export const countryBookmark = (title,lat,lon) => {
    return {
        type: COUNTRY_BOOKMARK,
        title: title,
        lat: lat,
        lon: lon
    };
}

export const rmCityBookmark = (title) => {
    return {
        type: RM_COUNTRY_BOOKMARK,
        title: title,
    };
}

export const rmCountryBookmark = (title) => {
    return {
        type: RM_COUNTRY_BOOKMARK,
        title: title,
    };
}

export const affectedArea = (data) => {
    return {
        type: AFFECTED_AREA,
        affectedArea: data,
    };
}

export const updateDate = () => {
    return {
        type: UPDATE_DATE,
    };
}

export const affectedUpdate = (action) => {
    return (dispatch, getState) => {
        dispatch(updateDate())
        dispatch(affectedArea(action))
    }
}