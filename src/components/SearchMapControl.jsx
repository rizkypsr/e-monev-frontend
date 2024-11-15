import React from 'react';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import { useMap } from 'react-leaflet';

const SearchMapControl = () => {
  const map = useMap();

  const provider = new OpenStreetMapProvider();
  const markerRef = React.useRef(null);

  const searchControl = new GeoSearchControl({
    provider,
    style: 'bar',
    maxMarkers: 1, // optional: number  - default 1
    retainZoomLevel: false, // optional: true|false  - default false
    animateZoom: true, // optional: true|false  - default true
    autoClose: false, // optional: true|false  - default false
    searchLabel: 'Pencarian', // optional: string  - default 'Enter address'
    keepResult: false, // optional: true|false  - default false
    updateMap: true, // optional: true|false  - default true
    showMarker: false, // optional: true|false  - default true
    showPopup: false, // optional: true|false  - default false
    popupFormat: ({ result }) => result.label, // optional: function  - default returns result label,
    resultFormat: ({ result }) => result.label, // optional: function  - default returns result label
    marker: {
      // optional: L.Marker    - default L.Icon.Default
      // icon: new L.Icon.Default(),
      draggable: false,
    }
  });

  React.useEffect(() => {
    map.addControl(searchControl);
    // eslint-disable-next-line no-unused-vars
    map.on('click', async (e) =>
      map.removeLayer(markerRef.current ?? markerRef));
    // return () => map.removeControl(searchControl);
  }, [map]);

  return null;
};

export default SearchMapControl;
