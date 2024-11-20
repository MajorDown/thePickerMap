import MapView, {Marker, UrlTile} from 'react-native-maps';
import { View } from 'react-native';
import { Position } from '@/constants/Types';
import { PropsWithChildren, ReactNode } from 'react';

type MapProps = PropsWithChildren<{
    markers: {
        lat: number;
        lon: number;
        name: string;
        informations: string;
    }[];
    initalRegion: Position;
}>

const Map = (props: MapProps) => {
    return (<View style={{ 
        width: '100%', 
        height: '100%', 
        borderRadius: 10, 
        overflow: 'hidden' 
    }}>
        <MapView
            style={{ width: '100%', height: '100%'}}
            moveOnMarkerPress={false}
            onPanDrag={() => {}}
            initialRegion={{
                latitude: props.initalRegion.lat,
                longitude: props.initalRegion.lon,
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
            {props.children}
        </MapView>
    </View>)
}

export default Map;