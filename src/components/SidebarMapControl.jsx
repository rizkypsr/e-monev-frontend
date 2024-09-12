import React from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';

const SidebarMapControl = ({ onSelectMap }) => {
  const map = useMap();
  const markerRef = React.useRef(null);

  React.useEffect(() => {
    const sidebar = L.control.sidebar('sidebar', {
      position: 'right',
    });

    map.addControl(sidebar);

    const getMapDetails = async ({ lat = -0.8674005, lng = 131.3051903 }) => {
      if (markerRef.current) {
        map.removeLayer(markerRef.current);
      }

      const marker = L.marker({ lat, lng }).addTo(map);
      markerRef.current = marker;

      const details = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
      ).then((response) => response.json());

      if (details.title !== '404 Not Found') {
        console.log(details);

        onSelectMap(details);
      }

      const address = details.address || {};
      const content = `
              <h1 class="mb-3 font-bold text-lg">Detail</h1>
              <div class="flex flex-col space-y-3">
                <div><strong>Nama:</strong> ${details.name || '-'}</div>
                <div><strong>Negara:</strong> ${address.country || '-'}</div>
                <div><strong>Kota:</strong> ${address.city || '-'}</div>
                <div><strong>Provinsi:</strong> ${address.state || '-'}</div>
                <div><strong>Alamat Lengkap:</strong> ${
                  details.display_name || '-'
                }</div>
                <div><strong>Latitude:</strong> ${lat}</div>
                <div><strong>Longitude:</strong> ${lng}</div>
              </div>
            `;

      sidebar.setContent(content);
      sidebar.show();
    };

    map.on('geosearch/showlocation', async (e) =>
      getMapDetails({ lat: e.location.y, lng: e.location.x })
    );
    map.on('click', async (e) =>
      setTimeout(
        async () => getMapDetails({ lat: e.latlng.lat, lng: e.latlng.lng }),
        500
      )
    );

    return () => {
      map.off('geosearch/showlocation');
      map.off('click');
    };
  }, [map]);

  return null;
};

export default SidebarMapControl;
