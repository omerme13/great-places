import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Map from '../components/screens/Map';
import NewPlaces from '../components/screens/NewPlace';
import PlaceDetails from '../components/screens/PlaceDetails';
import PlacesList from '../components/screens/PlacesList';

import { colors } from '../variables';

const PlacesNavigator = createStackNavigator({
    Map,
    NewPlaces,
    PlaceDetails,
    PlacesList
},
{
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: colors.primary
        },
        headerTintColor: 'white'
    }
});

export default createAppContainer(PlacesNavigator);