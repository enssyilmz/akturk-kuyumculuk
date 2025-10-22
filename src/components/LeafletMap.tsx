"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

interface MapComponentProps {
  className?: string;
}

export default function MapComponent({ className = "" }: MapComponentProps) {
  const [isClient, setIsClient] = useState(false);
  
  // Aktürk Kuyumculuk - Kemerkaya Mahallesi, Çarşı Han, Ortahisar, Trabzon
  const position: [number, number] = [40.994283, 39.745092];
  const address = "Kemerkaya Mah. Kunduracılar Cad. Çarşı Sok. Çarşı Han Kat:2 Ortahisar / Trabzon";

  useEffect(() => {
    setIsClient(true);
    
    // Leaflet icon fix for Next.js
    if (typeof window !== 'undefined') {
      const defaultIconProto = L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown };
      delete defaultIconProto._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      });
    }
  }, []);

  if (!isClient) {
    return <div className={`w-full h-full ${className} bg-brand-medium-gray whileInView-pulse`} />;
  }

  return (
    <div className={`w-full h-full ${className}`}>
      <MapContainer
        center={position}
        zoom={16}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            <div className="text-center">
              <h3 className="font-semibold text-base mb-1">Aktürk Kuyumculuk</h3>
              <p className="text-xs">{address}</p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}