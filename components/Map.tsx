import MapView, {Marker, UrlTile} from 'react-native-maps';
import { View } from 'react-native';
import { Position } from '@/constants/Types';

type MapProps = {
    initalRegion: Position;
    markers: {
        lat: number;
        lon: number;
        name: string;
        informations: string;
    }[];
};

const Map = (props: MapProps) => {
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
            {props.markers.map((marker, index) => (
                <Marker
                    key={index}
                    coordinate={{
                        latitude: marker.lat,
                        longitude: marker.lon,
                    }}
                    title={marker.name}
                    description={marker.informations}
                />
            ))}
        </MapView>
    </View>)
}

export default Map;