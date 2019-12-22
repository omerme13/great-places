import React, { useState } from 'react';
import { View, ScrollView, TextInput, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';

import StyledButton from '../StyledButton';
import ImagePicker from '../ImagePicker';
import LocationPicker from '../LocationPicker';

import Place from '../../models/place';
import { addPlace } from '../../store/actions/place';
import { colors } from '../../variables';

const newPlace = props => {
    const [name, setName] = useState();
    const [imageUri, setImageUri] = useState('');
    const [pickedLocation, setPickedLocation] = useState();

    const dispatch = useDispatch();
    const selectedLocation = props.navigation.getParam('selectedLocation');

    const convertToAddress = async (lat, lng) => {
        const res = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=7a212875072d4d58bf207fc9a7c1d6b9`);
        if (!res.ok) {
            throw new Error('Something went wrong')
        }

        const resData = await res.json();
        return resData.results[0].formatted;
    }

    const onTakeImageHandler = uri => setImageUri(uri);

    const changeTextHandler = text => setName(text);

    const savePlaceHandler = async () => {
        const address = await convertToAddress(
            pickedLocation.latitude,
            pickedLocation.longitude
        );
        
        const newPlace = new Place(
            'id',
            name,
            address,
            imageUri,
            pickedLocation.latitude,
            pickedLocation.longitude,
        );

        dispatch(addPlace(newPlace));
        props.navigation.goBack();
    };

    const onLocationPickedHandler = location => {
        setPickedLocation(location);
    }

    return (
        <ScrollView>
            <View style={styles.newPlace}>
                <TextInput
                    placeholder="Name"
                    style={styles.textInput}
                    onChangeText={changeTextHandler}
                />
                <ImagePicker onTakeImage={onTakeImageHandler} />
                <LocationPicker 
                    navigation={props.navigation} 
                    onLocationPicked={onLocationPickedHandler}
                    mapSelectedLocation={selectedLocation}
                />
                <StyledButton 
                    title="save place"
                    onPress={savePlaceHandler}
                    style={{marginBottom: 25}}
                    background={colors.secondary}

                />
            </View>
        </ScrollView>
    )
}

newPlace.navigationOptions = {
    headerTitle: 'New Place'
}

const styles = StyleSheet.create({
    newPlace: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textInput: {
        borderBottomWidth: 1,
        borderColor: '#ccc',
        marginTop: 15,
        marginBottom: 25,
        width: '60%',
        paddingHorizontal: 5,
        paddingVertical :10,
        fontFamily: 'open-sans',
        fontSize: 18
    }
});

export default newPlace;