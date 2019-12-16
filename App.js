import React, { useState } from "react";
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

import PlacesNavigator from './navigation/PlacesNavigator';

const fetchFonts = () => {
    return Font.loadAsync({
        'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
        'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
    });
}

const app = () => {
    const [isLoaded, setIsLoaded] = useState(false);

    if (!isLoaded) {
        return (
            <AppLoading 
                startAsync={fetchFonts} 
                onFinish={() => setIsLoaded(true)} 
                onError={err => console.log(err)}
            />
        )
    }
    
    return <PlacesNavigator />
}

export default app;
