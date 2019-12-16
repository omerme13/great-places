import React from 'react';
import { View, StyleSheet } from 'react-native';

import StyledText from '../StyledText';

const placesList = props => {
    return (
        <View style={styles.screen}>
            <StyledText type="title">The placesList Screen</StyledText>
        </View>
    )
}

placesList.navigationOptions = {
    headerTitle: 'Places List'
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default placesList;