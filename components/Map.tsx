import React, { useState } from 'react';
import MapView, { Marker, UrlTile, Region } from 'react-native-maps';
import { View } from 'react-native';
import { PropsWithChildren } from 'react';

type MarkerType = {
    lat: number;
    lon: number;
    name: string;
    informations: string;
};

type MapProps = PropsWithChildren<{
    markers: MarkerType[];
    initalRegion: {
        lat: number;
        lon: number;
    };
}>;

const Map = (props: MapProps) => {
    const [mapCenter, setMapCenter] = useState({
        lat: props.initalRegion.lat,
        lon: props.initalRegion.lon,
    });

    // Fonction appelée lorsque la région change sur la MapView
    const handleRegionChangeComplete = (region: Region) => {
        setMapCenter({
            lat: region.latitude,
            lon: region.longitude,
        });
    };

    return (
        <View
            style={{
                width: '100%',
                height: '100%',
                borderRadius: 10,
                overflow: 'hidden',
            }}
        >
            <MapView
                style={{ width: '100%', height: '100%' }}
                moveOnMarkerPress={false}
                initialRegion={{
                    latitude: props.initalRegion.lat,
                    longitude: props.initalRegion.lon,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005,
                }}
                onRegionChangeComplete={handleRegionChangeComplete}
            >
                <UrlTile
                    urlTemplate="https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                    maximumZ={20}
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
        </View>
    );
};

export default Map;
