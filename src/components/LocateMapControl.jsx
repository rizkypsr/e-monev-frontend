import React from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';

const LocateMapControl = () => {
  const map = useMap();

  React.useEffect(() => {
    const locateControl = L.control
      .locate({
        strings: {
          title: 'Lokasi saya',
        },
        keepCurrentZoomLevel: true,
        showPopup: true,
      })
      .addTo(map);

    return () => {
      locateControl.remove();
    };
  }, [map]);

  return null;
};

export default LocateMapControl;
