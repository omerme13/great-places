import * as actions from '../actions/place';

const initialState = {
    places: []
};

const placeReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.ADD_PLACE:
            return {
                ...state,
                places: state.places.concat(action.place)
            }
        
        case actions.GET_PLACES:
            return {
                ...state,
                places: action.places
            }
        
        default: return state;
    }
}

export default placeReducer;