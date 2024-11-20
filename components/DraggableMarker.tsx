import React from 'react';
import { Marker, MarkerDragStartEndEvent } from 'react-native-maps';

type DraggableMarkerProps = {
    initialPosition: {
        lat: number;
        lon: number;
    };
    onDragEnd: (position: { lat: number; lon: number }) => void;
    onDragStart: (position: { lat: number; lon: number }) => void;
    name: string;
    informations: string;
};

/**
 * DraggableMarker component
 * @param {DraggableMarkerProps} props
 * @returns {JSX.Element}
 */
const DraggableMarker = (props: DraggableMarkerProps): JSX.Element => {
    const [position, setPosition] = React.useState(props.initialPosition);

    const handleDragStart = (event: MarkerDragStartEndEvent) => {
        const { latitude, longitude } = event.nativeEvent.coordinate;
        const newPosition = { lat: latitude, lon: longitude };
        setPosition(newPosition);
    }

    const handleDragEnd = (event: MarkerDragStartEndEvent) => {
        const { latitude, longitude } = event.nativeEvent.coordinate;
        const newPosition = { lat: latitude, lon: longitude };
        setPosition(newPosition);

        if (props.onDragEnd) {
            props.onDragEnd(newPosition);
        }
    };

    return (
        <Marker
            coordinate={{
                latitude: position.lat,
                longitude: position.lon,
            }}
            draggable={true}
            onDragStart={(event) => handleDragStart(event)}
            onDragEnd={(event) => handleDragEnd(event)}
            title={props.name}
            description={props.informations}
        />
    );
};

export default DraggableMarker;
