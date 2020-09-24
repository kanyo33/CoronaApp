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
} from "./actionTypes";

export const mapView = (view) => {
    return {
        type: MAP_VIEW,
        mapView: view,
    }
}

export const coronaDetails = (details) => {
    return {
        type: CORONA_DETAILS,
        details: details
    }
}

export const countryCity = (country) => {
    return {
        type: COUNTRY_CITY,
        countryCity: country
    }
}

export const countryData = (data) => {
    return {
        type: COUNTRY_DATA,
        countryData: data
    }
}

export const cityData = (data) => {
    return {
        type: CITY_DATA,
        cityData: data
    }
}

export const worldData = (data) => {
    return {
        type: WORLD_DATA,
        worldData: data
    }
}

export const worldData1 = (data) => {
    return {
        type: WORLD_DATA1,
        worldData1: data
    }
}

export const worldData2 = (data) => {
    return {
        type: WORLD_DATA2,
        worldData2: data
    }
}

export const worldData3 = (data) => {
    return {
        type: WORLD_DATA3,
        worldData3: data
    }
}

export const worldData4 = (data) => {
    return {
        type: WORLD_DATA4,
        worldData4: data
    }
}

export const worldData5 = (data) => {
    return {
        type: WORLD_DATA5,
        worldData5: data
    }
}

export const worldData30 = (data) => {
    return {
        type: WORLD_DATA30,
        worldData30: data
    }
}

export const worldData70 = (data) => {
    return {
        type: WORLD_DATA70,
        worldData70: data
    }
}

export const coronaTested = (data) => {
    return {
        type: CORONA_TESTED,
        coronaTested: data
    }
}

export const locationVisible = (data) => {
    return {
        type: LOCATION_VISIBLE,
        locationVisible: data
    }
}

export const notificationStatus = (data) => {
    return {
        type: NOTIFICATION,
        notification: data
    }
}