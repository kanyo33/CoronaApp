import { createStore, combineReducers, compose, applyMiddleware } from 'redux';

import settingsReducer from './reducers/settings';
import bookmarkReducer from './reducers/bookmark';

import AsyncStorage from '@react-native-community/async-storage';
import { persistStore, persistReducer, purgeStoredState } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage
  }

const rootReducer = combineReducers({
    settings: settingsReducer,
    bookmarks: bookmarkReducer
});

const persistRootReducer = persistReducer(persistConfig, rootReducer);

let composeEnhancers = compose;

if (__DEV__){
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
}

export let store =  createStore(persistRootReducer, applyMiddleware(thunk));
export let persistor = persistStore(store, composeEnhancers());
export let purgeStore = purgeStoredState(persistConfig);