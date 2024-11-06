/* eslint-disable no-shadow */
/* eslint-disable arrow-body-style */
import React from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import L from 'leaflet';
import SearchMapControl from './SearchMapControl';
import LocateMapControl from './LocateMapControl';
import SidebarMapControl from './SidebarMapControl';

import 'leaflet.locatecontrol';
import 'leaflet-providers';
import 'leaflet-sidebar';

import 'leaflet/dist/leaflet.css';
import 'leaflet.locatecontrol/dist/L.Control.Locate.min.css';
import 'leaflet-geosearch/dist/geosearch.css';

// import './style.css';



const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;


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

/**
 * @param {object} param0
 * @param {any} param0.onsSelectMap
 * @param {boolean} param0.showSearchBar
 * @param {boolean} param0.showSidebar
 * @param {Array<object>} param0.data
 * @returns {React.Component}
 */
const MapLocation = ({
  onSelectMap,
  showSearchBar = false,
  showSidebar = false,
  data = []
}) => {

  /**
   * @param {string} v
   * @returns {number}
   */
  const safeParseLonLat = (v) => {
    const result = parseFloat(v ?? position[0])
    return Number.isNaN(result) ? position[0] : result
  }

  // eslint-disable-next-line no-var
  var parsedLocs = [];
  // eslint-disable-next-line no-var
  var parsedLocsName = [];

  return (
    <>
      <MapContainer preferCanvas={!L.Browser.svg && !L.Browser.vml} center={position} zoom={13} minZoom={3}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={19}
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {/* {!showSidebar && (
          <Marker position={position}>
            <Popup>Sorong City, West Papua, Indonesia</Popup>
          </Marker>
        )} */}
        {Array.from(data).map((e) => {
          const currentPos = [
            safeParseLonLat(e.activity_location.lat),
            safeParseLonLat(e.activity_location.lon)];
          const stringifiedCurrentPos = currentPos.join(',');
          const FilterLocs = parsedLocs.filter((e) => e === stringifiedCurrentPos);
          const displayResult = (<Marker key={Math.random()} position={currentPos}>
            <Popup>{
              FilterLocs.length !== 0 ?
                (() => {
                  const result =
                    `${e.activity_location.display_name ?? e.activity_location.name ?? "?"},
                     Total ${FilterLocs.length} lokasi yang sama,
                     Aktivitas: ${parsedLocsName.join(',\n')}`
                  parsedLocsName = [...parsedLocsName, e.activity_name]
                  return result
                })() :
                `Aktivitas: ${e.activity_name},
                 Lokasi: ${e.activity_location.display_name ?? e.activity_location.name ?? ""}`}</Popup>
          </Marker>);
          parsedLocs = [currentPos.join(','), ...parsedLocs]
          return displayResult;
        })}
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
}

export default MapLocation;
