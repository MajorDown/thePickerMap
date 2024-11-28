import { WebView } from 'react-native-webview';
import { StyleSheet, View, Animated } from 'react-native';
import { PropsWithChildren, useEffect, useRef, useState } from 'react';
import { Position, ProductType } from '@/constants/Types';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Colors from '@/constants/Colors';

const styles = StyleSheet.create({
    container: {
        marginTop: 5,
        marginBottom: 5,
        width: '100%',
        height: 350,
        borderRadius: 10,
        overflow: 'hidden',
        position: 'relative',
    },
    map: {
        width: '100%',
        height: '100%',
    },
    locationMarker: {
        position: "absolute",
        bottom: "50%",
        transform: [{ translateY: 20 }, { translateX: 0 }],
        left: "50%",
        zIndex: 999,
    },
});

type MarkerType = {
    lat: number;
    lon: number;
    name: string;
    informations: string;
    type: ProductType;
};

type WebMapProps = PropsWithChildren<{
    wantCursor?: boolean;
    markers?: MarkerType[];
    initalPosition: {
        lat: number;
        lon: number;
    };
    onPositionChange?: (position: Position) => void;
}>;

const WebMap = (props: WebMapProps): JSX.Element => {
    const [mapCenter, setMapCenter] = useState({
        lat: props.initalPosition.lat,
        lon: props.initalPosition.lon,
    });

    const animation = useRef(new Animated.Value(0)).current;

    // Handle messages from the WebView
    const handleMessage = (event: any) => {
        const message = JSON.parse(event.nativeEvent.data);
        if (message.type === 'positionChange') {
            const { lat, lon } = message.payload;
            setMapCenter({ lat, lon });
            props.onPositionChange?.({ lat, lon });
        }
    };

    useEffect(() => {
        Animated.timing(animation, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, [animation]);

    const animatedStyle = {
        transform: [
            {
                scale: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 1],
                }),
            },
        ],
    };

    const mapHTML = /*html*/ `
        <!DOCTYPE html>
        <html>
            <head>
                <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
                <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
            </head>
            <body style="margin: 0; padding: 0;">
                <div id="map" style="width: 100vw; height: 100vh;"></div>
                <script>
                    const map = L.map('map').setView([${mapCenter.lat}, ${mapCenter.lon}], 19);
                    L.tileLayer("https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
                        attribution: '&copy; OpenStreetMap contributors',
                    }).addTo(map);
                    
                    const markers = ${JSON.stringify(props.markers || [])};
                    markers.forEach(marker => {
                        L.marker([marker.lat, marker.lon])
                        .addTo(map)
                        .bindPopup(marker.name || "");
                    });

                    // Listen for map movements and send the new position to React Native
                    map.on('moveend', () => {
                        const center = map.getCenter();
                        const position = { lat: center.lat, lon: center.lng };
                        window.ReactNativeWebView.postMessage(JSON.stringify({
                            type: 'positionChange',
                            payload: position
                        }));
                    });
                </script>
            </body>
        </html>
    `;

    return (
        <Animated.View style={[styles.container, animatedStyle]}>
            <WebView
                style={styles.map}
                originWhitelist={['*']}
                source={{ html: mapHTML }}
                javaScriptEnabled={true}
                onMessage={handleMessage}
            />
            {props.wantCursor && <View style={styles.locationMarker}>
                <FontAwesome name="mouse-pointer" color={Colors.white} size={32} />
            </View>}
        </Animated.View>
    );
};

export default WebMap;
