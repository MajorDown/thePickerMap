import { WebView } from 'react-native-webview';
import { StyleSheet, View, Animated } from 'react-native';
import { PropsWithChildren, useEffect, useRef, useMemo } from 'react';
import { Position, ProductType } from '@/constants/Types';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Colors from '@/constants/Colors';

// -----------------------------------------------------------------------------
// Styles
// -----------------------------------------------------------------------------
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
    position: 'absolute',
    bottom: '50%',
    transform: [{ translateY: 20 }, { translateX: 0 }],
    left: '50%',
    zIndex: 999,
  },
});

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------
export type MarkerType = {
  id: string;
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
  onMarkerClick?: (marker: MarkerType) => void; // <-- nouvelle prop
}>;

/**
 * @description - Composant pour afficher une carte web
 * @param {MarkerType[]} props.markers - Les marqueurs à afficher sur la carte
 * @param {{lat: number, lon: number}} props.initalPosition - La position initiale de la carte
 * @param {(position: Position) => void} [props.onPositionChange] - Callback quand la carte se déplace
 * @param {(marker: MarkerType) => void} [props.onMarkerClick] - Callback quand on clique sur un marqueur
 * @returns {JSX.Element}
 */
const WebMap = (props: WebMapProps): JSX.Element => {
  // ---------------------------------------------------------------------------
  // Animation d'apparition
  // ---------------------------------------------------------------------------
  const animation = useRef(new Animated.Value(0)).current;

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

  // ---------------------------------------------------------------------------
  // Préparation du code HTML Leaflet
  // ---------------------------------------------------------------------------
  const mapHTML = useMemo(() => {
    const markers = props.markers || [];

    return /*html*/ `
      <!DOCTYPE html>
      <html>
        <head>
          <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
          <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
        </head>
        <body style="margin: 0; padding: 0;">
          <div id="map" style="width: 100vw; height: 100vh;"></div>
          
          <script>
            // Initialisation de la carte
            const map = L.map('map').setView(
              [${props.initalPosition.lat}, ${props.initalPosition.lon}],
              19
            );

            // Ajout des tuiles (satellite + labels)
            L.tileLayer(
              'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
              { attribution: '© OpenStreetMap contributors' }
            ).addTo(map);
            
            L.tileLayer(
              'https://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}',
              { attribution: '© OpenStreetMap contributors' }
            ).addTo(map);

            // Création de l'icône pour les marqueurs
            const customIcon = L.icon({
              iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
              iconSize: [45, 60],
              iconAnchor: [19, 55],
              popupAnchor: [0, -55],
            });

            // Liste des marqueurs passés en props
            const markersData = ${JSON.stringify(markers)};

            // Ajout de chaque marqueur
            markersData.forEach((marker) => {
              const leafletMarker = L.marker([marker.lat, marker.lon], { icon: customIcon })
                .addTo(map)
                .bindPopup(marker.name || "");

              // Listener sur le clic du marqueur
              leafletMarker.on('click', () => {
                // On envoie un message à React Native contenant les infos du marker
                window.ReactNativeWebView.postMessage(
                  JSON.stringify({
                    type: 'markerClick',
                    payload: marker
                  })
                );
              });
            });

            // Écoute du moveend pour renvoyer la position courante
            map.on('moveend', () => {
              const center = map.getCenter();
              window.ReactNativeWebView.postMessage(JSON.stringify({
                type: 'positionChange',
                payload: { lat: center.lat, lon: center.lng }
              }));
            });
          </script>
        </body>
      </html>
    `;
  }, [props.initalPosition, props.markers]);

  // ---------------------------------------------------------------------------
  // Rendu du composant
  // ---------------------------------------------------------------------------
  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <WebView
        style={styles.map}
        originWhitelist={['*']}
        source={{ html: mapHTML }}
        javaScriptEnabled={true}
        onMessage={(event) => {
          // On parse le message reçu
          const message = JSON.parse(event.nativeEvent.data);

          // Selon le type de message
          if (message.type === 'positionChange') {
            // Déplacement de la carte
            props.onPositionChange?.(message.payload);
          } else if (message.type === 'markerClick') {
            // Clic sur un marqueur
            props.onMarkerClick?.(message.payload);
          }
        }}
      />

      {/* Optionnel : curseur de position */}
      {props.wantCursor && (
        <View style={styles.locationMarker}>
          <FontAwesome name="mouse-pointer" color={Colors.white} size={32} />
        </View>
      )}
    </Animated.View>
  );
};

export default WebMap;
