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
        { name: 'Casa Leo Materiales Eléctricos SRL', coords: [-34.6011, -58.4606], info: 'Nicasio Oroño 1902, Capital Federal' },
        { name: 'Paternal SRL', coords: [-34.6065, -58.4712], info: 'Terrero 2280, Capital Federal' },
        { name: 'ELECTRICMEI', coords: [-34.6423, -58.4785], info: 'Corvalán 1550, Capital Federal' },
        { name: 'Procan Materiales Eléctricos SRL', coords: [-34.6345, -58.4567], info: 'Cervantes 1568/70, Capital Federal' },
        { name: 'Electri-Hogar', coords: [-34.6212, -58.4978], info: 'Miranda 5150, CABA' },
        { name: 'Marsili César Gustavo', coords: [-34.6103, -58.5032], info: 'Álvarez Jonte 5489, Capital Federal' },
        { name: 'Electricidad Avellaneda S.A.', coords: [-34.6118, -58.4689], info: 'Av. Gaona 3919, Capital Federal' },
        { name: 'Cobla Electricidad', coords: [-34.6060, -58.4855], info: 'Av. Nazca 2313, Villa del Parque' },
        { name: 'Aquila Daniel Salvador', coords: [-34.6745, -58.4789], info: 'Timoteo Gordillo 4908 esq. Av. Cruz, Lugano' },
        { name: 'Mateo Hnos. S.R.L.', coords: [-34.6340, -58.3732], info: 'Av. Montes de Oca 890, Capital Federal' },
        { name: 'Ayame María Teresa', coords: [-34.6037, -58.3832], info: 'Sarmiento 1176, Capital Federal' },
        { name: 'Distrielectro', coords: [-34.5612, -58.4667], info: 'Vilela 4738, CABA' },
        { name: 'El Rey del Cable', coords: [-34.6415, -58.6762], info: 'Intendente Gnecco 1300, Paso del Rey' },
        { name: 'Floresta Lighting', coords: [-34.6254, -58.4841], info: 'Bermúdez 1053, CABA' },
        { name: 'Fabelec SRL', coords: [-34.6123, -58.3921], info: 'Av. Belgrano 3072, CABA' },
        { name: 'Chaio Juan José y Chaio Viviana Luisa S.H.', coords: [-34.6625, -58.3667], info: 'Alberdi 436, Avellaneda' },
        { name: 'Arnet Iluminación S.R.L.', coords: [-34.6198, -58.4112], info: 'Alberti 2080, CABA' },
        { name: 'Adma Distribuidora', coords: [-34.6095, -58.4203], info: 'Hipólito Yrigoyen 4055, Almagro' },
        { name: 'Accmelec SAS', coords: [-34.6372, -58.4561], info: 'Reservistas Argentinos 284, CABA' },
        { name: 'Progresfull', coords: [-34.6129, -58.478], info: 'Dr. Juan Felipe Aranguren 4465, CABA' },
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