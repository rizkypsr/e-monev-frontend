import React from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import SearchMapControl from '../../../components/SearchMapControl';
import LocateMapControl from '../../../components/LocateMapControl';
import SidebarMapControl from '../../../components/SidebarMapControl';

import 'leaflet.locatecontrol';
import 'leaflet-providers';
import 'leaflet-sidebar';

import 'leaflet.locatecontrol/dist/L.Control.Locate.min.css';
import 'leaflet-geosearch/dist/geosearch.css';

const position = [-0.8674005, 131.3051903];

const Location = () => (
  <div className="h-screen">
    <MapContainer center={position} zoom={13}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        maxZoom={19}
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position}>
        <Popup>Sorong City, West Papua, Indonesia</Popup>
      </Marker>
      <LocateMapControl />
      <SearchMapControl />
      <SidebarMapControl />
    </MapContainer>

    <div id="sidebar">
      <h1>leaflet-sidebar</h1>
    </div>
  </div>
);

export default Location;
