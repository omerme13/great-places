import React, { useState, useEffect } from "react";
import { View, StyleSheet, Alert, TouchableNativeFeedback } from "react-native";
import * as Location from "expo-location";
import * as Permissions from 'expo-permissions';

import StyledButton from "./StyledButton";
import StyledText from "./StyledText";
import Spinner from "./Spinner";
import MapPreview from './MapPreview';

import { colors } from "../variables";

const locationPicker = props => {
    const [pickedLocation, setPickedLocation] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const { mapSelectedLocation } = props;

    useEffect(() => {
        if (mapSelectedLocation) {
            setPickedLocation(mapSelectedLocation);
            props.onLocationPicked(mapSelectedLocation);
        }

    }, [mapSelectedLocation])

    const verifyPermissions = async () => {
        const result = await Permissions.askAsync(Permissions.LOCATION);

        if (result.status !== 'granted') {
            Alert.alert(
                'Insufficient permissions',
                'You need to grant location permission for this action',
                [{text: 'OK'}]
            )
            return false;
        }
        return true;
    }

    const getLocationHandler = async () => {
        const hasPermission = await verifyPermissions();
        if (!hasPermission) {
            return;
        }
        
        try {
            setIsLoading(true);

            const location = await Location.getCurrentPositionAsync({
                timeout: 5000,
                enableHighAccuracy: true
            });
            const { latitude, longitude } = location.coords;

            setPickedLocation({ latitude, longitude });
            props.onLocationPicked({ latitude, longitude });

        } catch (err) {
            setIsLoading(false);
            Alert.alert(
                "Could not fetch location",
                "Please pick a location on the map or try again later",
                [{ text: "OK" }]
            );

            throw err;
        }

        setIsLoading(false);
    };

    const pickOnMapHandler = () => {
        props.navigation.navigate('Map', {initialLocation: pickedLocation});
    };
    

    return (
        <View style={styles.locationPicker}>
            <TouchableNativeFeedback 
                onPress={pickOnMapHandler} 
                activeOpacity={0.7}
            >
                <View style={styles.mapPreview}>
                    {pickedLocation
                        ? <MapPreview location={pickedLocation} />
                        : isLoading 
                            ? <Spinner />
                            : <StyledText>No location chosen yet</StyledText>
                    }
                </View>
            </TouchableNativeFeedback>
            <View style={styles.btnContainer}>
                <StyledButton
                    title="your location"
                    onPress={getLocationHandler}
                    style={styles.btn}
                />
                <StyledButton
                    title="pick on map"
                    onPress={pickOnMapHandler}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    locationPicker: {
        alignItems: "center",
        width: "80%",
        marginBottom: 25
    },
    mapPreview: {
        marginBottom: 20,
        width: "100%",
        height: 200,
        borderColor: colors.border,
        borderWidth: 1,
        justifyContent: "space-around",
        alignItems: "center"

    },
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%'
    }
});

export default locationPicker;
