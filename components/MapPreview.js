import React from 'react';
import { Image, StyleSheet } from 'react-native';

const mapPreview = props => {
    const imageUrl = `https://static-maps.yandex.ru/1.x/?lang=en_US&size=450,450&ll=${props.location.longitude},${props.location.latitude}&spn=${0.016457},${0.00619}&l=map`;

    return <Image source={{uri: imageUrl}} style={styles.mapPreview} />
}

const styles = StyleSheet.create({
    mapPreview: {
        width: '100%',
        height: '100%'
    }
})
export default mapPreview;