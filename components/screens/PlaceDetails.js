import React from 'react';
import { View, StyleSheet, ScrollView, Image, TouchableNativeFeedback } from 'react-native';
import { useSelector } from 'react-redux';

import StyledText from '../StyledText';
import MapPreview from '../MapPreview';
import Card from '../Card';

import {colors} from '../../variables';

const placeDetails = props => {
    const id = props.navigation.getParam('id');
    const places = useSelector(state => state.place.places);
    const relevantPlace = places.find(place => place.id === id);

    const { address, imageUrl, latitude, longitude } = relevantPlace;

    const pickOnMapHandler = () => {
        props.navigation.navigate('Map', {
            readOnly: true,
            initialLocation: { latitude, longitude } 
        });
    }
    return (
        <ScrollView contentContainerStyle={styles.placeDetails}>
            <Image source={{uri: imageUrl}} style={styles.image} />
            <Card style={styles.mapPreview}>
                <StyledText type="title" style={styles.address}>
                    {address}
                </StyledText>
                <TouchableNativeFeedback 
                    onPress={pickOnMapHandler} 
                    activeOpacity={0.7}
                >
                    <View style={{width: '100%'}}>
                        <MapPreview location={{latitude, longitude}} />
                    </View>
                </TouchableNativeFeedback>    
            </Card>
        </ScrollView>
    )
}

placeDetails.navigationOptions = navData => {
    const name = navData.navigation.getParam('name');

    return {
        headerTitle: name
    }
}

const styles = StyleSheet.create({
    placeDetails: {
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    mapPreview: {
        marginVertical: 20,
        width: "80%",
        height: 300,
        borderColor: colors.border,
        borderWidth: 1,
        marginBottom: 300,
        backgroundColor: 'whitesmoke'
    },
    image: {
        width: '100%',
        height: '40%' 
    },
    address: {
        color: colors.primary,
        margin: 15
    }
});

export default placeDetails;