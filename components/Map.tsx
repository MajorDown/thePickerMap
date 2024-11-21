import React, { useState, useRef, useEffect } from 'react';
import MapView, { Marker, UrlTile, Region } from 'react-native-maps';
import { Animated, View, StyleSheet } from 'react-native';
import { PropsWithChildren } from 'react';
import { Position } from '@/constants/Types';

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 400,
        borderRadius: 10,
        overflow: 'hidden',
    },
});

type MarkerType = {
    lat: number;
    lon: number;
    name: string;
    informations: string;
};

type MapProps = PropsWithChildren<{
    markers?: MarkerType[];
    initalPosition: {
        lat: number;
        lon: number;
    };
    onPositionChange?: (position: Position) => void;
}>;

/**
 * Composant Map
 * @param {MarkerType[]} props.markers - Les marqueurs à afficher sur la carte
 * @param {{lat: number, lon: number}} props.initalPosition - La position initiale de la carte
 * @param {(position: Position) => void} [props.onPositionChange] - Fonction appelée lorsque la position de la carte change
 * @returns {JSX.Element}
 */
const Map = (props: MapProps) => {
    const [mapCenter, setMapCenter] = useState({
        lat: props.initalPosition.lat,
        lon: props.initalPosition.lon,
    });

    const animation = useRef(new Animated.Value(0)).current; // Animation value

    // Fonction appelée lorsque la région change sur la MapView
    const handleRegionChangeComplete = (region: Region) => {
        setMapCenter({
            lat: region.latitude,
            lon: region.longitude,
        });
        props.onPositionChange?.({
            lat: region.latitude,
            lon: region.longitude,
        });
    };

    // Démarrer l'animation lors du montage du composant
    useEffect(() => {
        Animated.timing(animation, {
            toValue: 1, // Aller à l'état final
            duration: 1000, // Durée de l'animation
            useNativeDriver: true, // Utilise le pilote natif pour les performances
        }).start();
    }, [animation]);

    const animatedStyle = {
        transform: [
            {
                scale: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 1], // De 0 (invisible) à sa taille normale
                }),
            },
        ],
    };

    return (
        <Animated.View style={[styles.container,animatedStyle]}>
            <MapView
                style={StyleSheet.absoluteFillObject}
                moveOnMarkerPress={false}
                initialRegion={{
                    latitude: props.initalPosition.lat,
                    longitude: props.initalPosition.lon,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005,
                }}
                onRegionChangeComplete={handleRegionChangeComplete}
            >
                <UrlTile
                    urlTemplate="https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                    maximumZ={20}
                />
                {props.markers?.map((marker, index) => (
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
                {/* marker pour debug position */}
                {/* <Marker
                    coordinate={{
                        latitude: mapCenter.lat,
                        longitude: mapCenter.lon,
                    }}
                    title="Position"
                    description="Your current position"
                /> */}
                {props.children}
            </MapView>
        </Animated.View>
    );
};

export default Map;
