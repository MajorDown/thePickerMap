import { useState, useEffect } from "react";
import * as Location from 'expo-location';
import Map from '@/components/Map';
import PageContainer from '@/components/PageContainer';
import { Position } from "@/constants/Types";

const Markers = [
    {
        lat: 37.78825,
        lon: -122.4324,
        name: "San Francisco",
        informations: "The best city in the world"
    },
    {
        lat: 48.8566,
        lon: 2.3522,
        name: "Paris",
        informations: "The city of love"
    },
    {
        lat: 51.5074,
        lon: -0.1278,
        name: "London",
        informations: "The city of the queen"
    },
    {
        lat: 40.7128,
        lon: -74.0060,
        name: "New York",
        informations: "The city that never sleeps"
    }
];

const Home = (): JSX.Element => {
    const [initial, setInitial] = useState<Position>({ lat: 37.78825, lon: -122.4324 });
    const [positionIsLoaded, setPositionIsLoaded] = useState(false);

    useEffect(() => {
        const fetchUserLocation = async () => {
            // Demande de permissions pour accéder à la position
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.error('Permission to access location was denied');
                return;
            }

            // Obtenir la position actuelle de l'utilisateur
            const location = await Location.getCurrentPositionAsync({});
            setInitial({
                lat: location.coords.latitude,
                lon: location.coords.longitude
            });
        };

        fetchUserLocation();
        setPositionIsLoaded(true);
    }, []);

    return (
        <PageContainer title="Home">
            {positionIsLoaded && <Map 
                markers={Markers} 
                initalRegion={initial} 
            />}
        </PageContainer>
    );
};

export default Home;
