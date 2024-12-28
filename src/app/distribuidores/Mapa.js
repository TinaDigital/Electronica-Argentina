"use client"

import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Configurar el icono de marcador rojo
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const MapComponent = () => {
  useEffect(() => {
    // Verificar si estamos en el entorno del cliente
    if (typeof window !== 'undefined') {
      // Crear el mapa
      const map = L.map('map').setView([-34.6037, -58.3816], 5); // Coordenadas de Buenos Aires, Argentina

      // Añadir capa de mapa
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      // Lista de distribuidores con coordenadas
      const distribuidores = [
        { name: 'Distribuidor 1', coords: [-34.6037, -58.3816], info: 'Información del local 1' }, // Buenos Aires
        { name: 'Distribuidor 2', coords: [-31.4201, -64.1888], info: 'Información del local 2' }, // Córdoba
        { name: 'Distribuidor 3', coords: [-32.9472, -60.6505], info: 'Información del local 3' }, // Rosario
        // Agrega más distribuidores aquí
      ];

      // Añadir marcadores al mapa
      distribuidores.forEach(distribuidor => {
        L.marker(distribuidor.coords)
          .addTo(map)
          .bindPopup(`<b>${distribuidor.name}</b><br>${distribuidor.info}`);
      });

      // Limpiar el mapa cuando el componente se desmonte
      return () => {
        if (map) {
          map.remove();
        }
      };
    }
  }, []);

  return <div id="map" style={{ height: '500px', width: '100%' }}></div>;
};

export default MapComponent;