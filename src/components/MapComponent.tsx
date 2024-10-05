import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import {
  FeatureCollection,
  Geometry,
  GeoJsonProperties,
  Feature,
} from "geojson";

interface MapComponentProps {
  stateGeoJsons: FeatureCollection<Geometry, GeoJsonProperties>[]; // Array de GeoJSONs de diferentes estados
  cityNames: string[]; // Nomes das cidades que precisam de contorno
}

const MapComponent: React.FC<MapComponentProps> = ({
  stateGeoJsons,
  cityNames,
}) => {
  const [cityFeatures, setCityFeatures] = useState<
    Feature<Geometry, GeoJsonProperties>[]
  >([]);
  const defaultPosition: [number, number] = [-15.7942, -47.8822]; // Posição padrão (Brasília)

  useEffect(() => {
    const filteredFeatures: Feature<Geometry, GeoJsonProperties>[] = [];

    // Percorremos os GeoJSONs de todos os estados
    stateGeoJsons.forEach((geoJson) => {
      // Filtramos as features das cidades solicitadas
      const features = geoJson.features.filter((feature) =>
        cityNames.includes(feature.properties?.name)
      );
      // Adicionamos as features encontradas à lista
      filteredFeatures.push(...features);
    });

    // Atualizamos o estado com as features filtradas
    setCityFeatures(filteredFeatures);
  }, [stateGeoJsons, cityNames]);

  const geoJsonStyle = {
    color: "#ff7800",
    weight: 5,
    opacity: 0.65,
  };

  return (
    <MapContainer
      center={defaultPosition}
      zoom={5}
      className="h-[800px] w-[800px] bg-red-500 p-4 rounded-lg"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {cityFeatures.map((feature, index) => (
        <GeoJSON key={index} data={feature} style={geoJsonStyle} />
      ))}
    </MapContainer>
  );
};

export default MapComponent;
