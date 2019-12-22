import * as FileSystem from 'expo-file-system';

import { insertPlace, fetchPlaces } from '../../helpers/db';

export const ADD_PLACE = 'ADD_PLACE';
export const GET_PLACES = 'GET_PLACES';

export const addPlace = place => {
    return async dispatch => {
        const fileName = place.imageUrl.split('/').pop();
        const newPath = `${FileSystem.documentDirectory}/${fileName}`;
        const { name, address, latitude, longitude } = place;
        let dbResult;

        try {
            await FileSystem.moveAsync({
                from: place.imageUrl,
                to: newPath
            });
            dbResult = await insertPlace(name, newPath, address, latitude, longitude);
            
        } catch (err) {
            throw err;
        }
        
        place.imageUrl = newPath;
        place.id = dbResult.insertId;
        
        dispatch({
            type: ADD_PLACE,
            place
        });
    }
}

export const getPlaces = () => {
    let dbResult;

    return async dispatch => {
        try {
            dbResult = await fetchPlaces();
        } catch (err) {
            throw err;
        }

        dispatch({
            type: GET_PLACES,
            places: dbResult.rows._array
        });
    }
}