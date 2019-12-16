import React from 'react';
import { View, StyleSheet } from 'react-native';

import StyledText from '../StyledText';

const map = props => {
    return (
        <View style={styles.screen}>
            <StyledText type="title">The map Screen</StyledText>
        </View>
    )
}

map.navigationOptions = {
    headerTitle: 'Map'
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default map;