import React from "react";
import { View, Image, StyleSheet, TouchableNativeFeedback } from "react-native";

import StyledText from "./StyledText";
import { colors } from "../variables";

const placeItem = props => {
    return (
        <TouchableNativeFeedback onPress={props.pressed}>
            <View style={styles.placeItem}>
                <Image style={styles.image} source={{ uri: props.imageUrl }} />
                <View style={styles.info}>
                    <StyledText type="title" style={styles.name}>
                        {props.name}
                    </StyledText>
                    <StyledText type="body" style={styles.address}>
                        {props.address}
                    </StyledText>
                </View>
            </View>
        </TouchableNativeFeedback>
    );
};

const styles = StyleSheet.create({
    placeItem: {
        borderBottomColor: colors.border,
        borderBottomWidth: 1,
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 100,
        borderColor: colors.primary,
        borderWidth: 1,
        marginRight: 20
    },
    info: {
        width: 250,
        alignItems: 'center'    
    },
    name: {

    }
});

export default placeItem;
