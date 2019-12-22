import React, { useState, useEffect, useCallback } from 'react';
import { Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../HeaderButton";

const map = props => {
    const initialLocation = props.navigation.getParam('initialLocation');
    const readOnly = props.navigation.getParam('readOnly');

    const [selectedLocation, setSelectedLocation] = useState(initialLocation);

    const region = {
        latitude: selectedLocation ? selectedLocation.latitude : 37.78,
        longitude: selectedLocation ? selectedLocation.longitude : -122.43,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    }

    const selectLocationHandler = e => {
        if (readOnly) {
            return;
        }

        const { latitude, longitude } = e.nativeEvent.coordinate;
        setSelectedLocation({ latitude, longitude });
    }

    const saveLocationHandler = useCallback(() => {
        if (!selectedLocation) {
            Alert.alert(
                'Could not save', 'Please choose a location', [{text: 'OK'}]
            );
            return;
        }

        props.navigation.navigate('NewPlace', {selectedLocation});
    }, [selectedLocation])

    useEffect(() => {
        props.navigation.setParams({ saveLocation: saveLocationHandler })
    }, [saveLocationHandler])
    
    let markerCoordinates;

    if (selectedLocation) {
        const {longitude, latitude} = selectedLocation;
        markerCoordinates = {longitude, latitude};
    }

    return (
        <MapView 
            region={region} 
            style={{flex: 1}} 
            onPress={selectLocationHandler} 
        >
            {markerCoordinates &&            
                <Marker
                    title="picked location"
                    coordinate={markerCoordinates}
                >
                </Marker>
            }
        </MapView>
    )
}

map.navigationOptions = navData => {
    const readOnly = navData.navigation.getParam('readOnly');
    if (readOnly) {
        return;
    }

    const saveLocation = navData.navigation.getParam('saveLocation');

    return {
        headerTitle: 'Map',
        headerRight: (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title="Save location"
                    iconName="md-save"
                    onPress={saveLocation}
                />
            </HeaderButtons>
        )
    };
};

export default map;