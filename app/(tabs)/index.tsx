import {useState} from "react";
import Map from '@/components/Map';
import PageContainer from '@/components/PageContainer';
import { ProductPosition } from "@/constants/Types";


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
]

const Home = ():JSX.Element => {
    const [initial, setInitial] = useState({lat: 37.78825, lon: -122.4324});
    return (<PageContainer title="Home">
        <Map markers={Markers} initial={} />
    </PageContainer>);
}

export default Home;

