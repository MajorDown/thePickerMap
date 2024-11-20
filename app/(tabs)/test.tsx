import React, { useState, useEffect } from "react";
import { View, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

const TestMap = () => {
    const [position, setPosition] = useState<{ lat: number; lon: number } | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            // Demande de permissions pour la géolocalisation
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                setError("Permission to access location was denied.");
                Alert.alert("Error", "Permission to access location was denied.");
                return;
            }

            // Récupération de la position actuelle
            const location = await Location.getCurrentPositionAsync({});
            setPosition({
                lat: location.coords.latitude,
                lon: location.coords.longitude,
            });
        })();
    }, []);

    if (!position) {
        return null; // Chargeur ou fallback pendant que la localisation est récupérée
    }

    return (
        <View style={{ flex: 1 }}>
            <MapView
                style={{ flex: 1 }}
                initialRegion={{
                    latitude: position.lat,
                    longitude: position.lon,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                moveOnMarkerPress={false}
            >
                <Marker
                    coordinate={{
                        latitude: position.lat,
                        longitude: position.lon,
                    }}
                    draggable
                    onDragEnd={(event) => {
                        const { latitude, longitude } = event.nativeEvent.coordinate;
                        console.log("Dragged to:", latitude, longitude);
                        setPosition({ lat: latitude, lon: longitude });
                    }}
                    title="Draggable Marker"
                    description="Drag me!"
                />
            </MapView>
        </View>
    );
};

export default TestMap;
