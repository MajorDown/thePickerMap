import MapView, {UrlTile} from 'react-native-maps';
import { View } from 'react-native';

const MapTest = () => {
    return (<View style={{ width: '100%', height: '100%', borderRadius: 10, overflow: 'hidden' }}>
        <MapView
            style={{ width: '100%', height: '100%'}}
            initialRegion={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}
        >
            <UrlTile 
                urlTemplate="https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                maximumZ={19}
            />

        </MapView>
    </View>)
}

export default MapTest;