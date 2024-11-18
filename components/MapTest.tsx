import MapView, {UrlTile} from 'react-native-maps';

const MapTest = () => {
    return (
        <MapView
            style={{ width: '90%', height: '80%' }}
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
    )
}

export default MapTest;