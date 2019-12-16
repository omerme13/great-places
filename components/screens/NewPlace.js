import React from 'react';
import { View, StyleSheet } from 'react-native';

import StyledText from '../StyledText';

const newPlaces = props => {
    return (
        <View style={styles.screen}>
            <StyledText type="title">The newPlaces Screen</StyledText>
        </View>
    )
}

newPlaces.navigationOptions = {
    headerTitle: 'New Places'
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default newPlaces;