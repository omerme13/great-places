import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Map from '../components/screens/Map';
import NewPlace from '../components/screens/NewPlace';
import PlaceDetails from '../components/screens/PlaceDetails';
import PlacesList from '../components/screens/PlacesList';

import { colors } from '../variables';

const PlacesNavigator = createStackNavigator({
    PlacesList,
    Map,
    NewPlace,
    PlaceDetails,
},
{
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: colors.primary
        },
        headerTitleStyle: {
            textTransform: 'capitalize'
        },
        headerTintColor: 'white'
    }
});

export default createAppContainer(PlacesNavigator);