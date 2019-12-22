import React, { useState } from "react";
import * as Font from "expo-font";
import { AppLoading } from "expo";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from 'redux-thunk'

import placeReducer from "./store/reducers/place";
import PlacesNavigator from "./navigation/PlacesNavigator";

import { init } from './helpers/db';

init()
    .then(res => console.log('successfully initialized database'))
    .catch(error => console.log(error));

const rootReducer = combineReducers({
    place: placeReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const fetchFonts = () => {
    return Font.loadAsync({
        "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
        "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf")
    });
};


const app = () => {
    const [isLoaded, setIsLoaded] = useState(false);

    if (!isLoaded) {
        return (
            <AppLoading
                startAsync={fetchFonts}
                onFinish={() => setIsLoaded(true)}
                onError={err => console.log(err)}
            />
        );
    }

    return (
        <Provider store={store}>
            <PlacesNavigator />
        </Provider>
    );
};

export default app;
