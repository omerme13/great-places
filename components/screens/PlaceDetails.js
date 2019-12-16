import React from 'react';
import { View, StyleSheet } from 'react-native';

import StyledText from '../StyledText';

const placeDetails = props => {
    return (
        <View style={styles.screen}>
            <StyledText type="title">The placeDetails Screen</StyledText>
        </View>
    )
}

placeDetails.navigationOptions = {
    headerTitle: 'Place Details'
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default placeDetails;