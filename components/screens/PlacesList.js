import React, { useEffect } from "react";
import { StyleSheet, FlatList } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";

import HeaderButton from "../HeaderButton";
import PlaceItem from '../PlaceItem';

import { getPlaces } from '../../store/actions/place';


const placesList = props => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPlaces());
    }, [])


    const places = useSelector(state => state.place.places);

    const renderPlaceItem = itemData => {
        const { id, name, address, imageUrl } = itemData.item;
            
        return (
            <PlaceItem
                name={name}
                address={address}
                imageUrl={imageUrl}
                pressed={() => {
                    props.navigation.navigate('PlaceDetails', {id, name})
                }}
            />
        )
    };

    return (
        <FlatList
            data={places}
            renderItem={renderPlaceItem}
            keyExtractor={item => String(item.id)}
        />
    );
};

placesList.navigationOptions = navData => {
    
    return {
        headerTitle: "Places List",
        headerRight: (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title="Add Place"
                    iconName="md-add"
                    onPress={() => navData.navigation.navigate("NewPlace")}
                />
            </HeaderButtons>
        )
    };
};

export default placesList;
