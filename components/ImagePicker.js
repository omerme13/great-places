import React, { useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import StyledButton from './StyledButton';
import StyledText from './StyledText';
import { colors } from '../variables';

const imagePicker = props => {
    const [uri, setUri] = useState('');

    const takeImageHandler = async () => {
        const image = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [16, 9],
            quality: 0.5
        });

        setUri(image.uri);
        props.onTakeImage(image.uri);
    };

    return (
        <View style={styles.imagePicker}>
            <View style={styles.imagePreview}>
                {uri
                    ? <Image style={styles.image} source={{uri}} />
                    :  (
                            <>
                                <StyledText>No image is picked yet</StyledText>
                                <StyledButton 
                                    title="Take image"
                                    onPress={takeImageHandler}
                                />
                            </>
                        )               
                }
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    imagePicker: {
        alignItems: 'center',
        width: '80%',
        marginBottom: 25
    },
    imagePreview: {
        width: '100%',
        height: 250,
        marginBottom: 10,
        justifyContent: 'space-around',
        alignItems: 'center',
        borderColor: colors.border,
        borderWidth: 3,
        borderRadius: 10,
        overflow: 'hidden'
    },
    image: {
        width: '100%',
        height: '100%'
    }
});

export default imagePicker;