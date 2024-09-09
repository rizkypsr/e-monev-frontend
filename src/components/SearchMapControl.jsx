import React from 'react';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import { useMap } from 'react-leaflet';

const SearchMapControl = () => {
  const map = useMap();

  const provider = new OpenStreetMapProvider();

  const searchControl = new GeoSearchControl({
    provider,
    style: 'bar',
    searchLabel: 'Pencarian',
    showPopup: true,
    retainZoomLevel: false,
    animateZoom: true,
    keepResult: true,
  });

  React.useEffect(() => {
    map.addControl(searchControl);
    return () => map.removeControl(searchControl);
  }, [map]);

  return null;
};

export default SearchMapControl;
