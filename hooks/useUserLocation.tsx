import { useState, useEffect } from "react";
import * as Location from "expo-location";
import { Position } from "@/constants/Types";

//jsdoc
/**
 * @returns {Object} - position and error
 */
const useUserLocation = (): { position: Position | null; error: string | null } => {
  const [position, setPosition] = useState<Position | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserLocation = async () => {
        try {
            // Demande de permissions
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                setError("Permission to access location was denied");
                return;
            }

            // Récupérer la position actuelle
            const location = await Location.getCurrentPositionAsync({});
            setPosition({
                lat: location.coords.latitude,
                lon: location.coords.longitude,
            });
        } catch (err) {
            setError("An error occurred while fetching location");
        }
        };

        fetchUserLocation();
    }, []);

    return { position, error };
};

export default useUserLocation;
