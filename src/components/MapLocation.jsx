import React from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import SearchMapControl from './SearchMapControl';
import LocateMapControl from './LocateMapControl';
import SidebarMapControl from './SidebarMapControl';

import 'leaflet.locatecontrol';
import 'leaflet-providers';
import 'leaflet-sidebar';

import 'leaflet/dist/leaflet.css';
import 'leaflet.locatecontrol/dist/L.Control.Locate.min.css';
import 'leaflet-geosearch/dist/geosearch.css';

const position = [-0.8674005, 131.3051903];

const MapResizeHandler = () => {
  const map = useMap();

  React.useEffect(() => {
    const handleResize = () => {
      map.invalidateSize();
    };

    map.invalidateSize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [map]);

  return null;
};

const MapLocation = ({
  onSelectMap,
  showSearchBar = false,
  showSidebar = false,
}) => (
  <>
    <MapContainer center={position} zoom={13} minZoom={3}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        maxZoom={19}
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {!showSidebar && (
        <Marker position={position}>
          <Popup>Sorong City, West Papua, Indonesia</Popup>
        </Marker>
      )}
      <LocateMapControl />
      {showSearchBar && <SearchMapControl />}
      {showSidebar && <SidebarMapControl onSelectMap={onSelectMap} />}

      <MapResizeHandler />
    </MapContainer>

    {showSearchBar && (
      <div id="sidebar">
        <h1>leaflet-sidebar</h1>
      </div>
    )}
  </>
);

export default MapLocation;
