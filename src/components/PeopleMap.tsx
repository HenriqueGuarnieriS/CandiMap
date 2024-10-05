import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { person } from "../mockdata/person";
import Person from "../interfaces/Person";
import { FaSquareInstagram } from "react-icons/fa6";
interface PeopleMapProps {
  onMarkerClick: CallableFunction;
}

function adjustCoordinates(people: Person[]): Person[] {
  const adjustedPeople: Person[] = [];

  // Para armazenar as coordenadas já usadas e evitar sobreposição
  const usedCoordinates = new Map<string, [number, number]>();

  people.forEach((person) => {
    const coordKey = `${person.coordinates[0].toFixed(
      4
    )},${person.coordinates[1].toFixed(4)}`;

    // Verifica se essas coordenadas já foram usadas
    if (usedCoordinates.has(coordKey)) {
      // Desloca as coordenadas em um valor pequeno
      const offset = 0.0005; // Ajuste o tamanho do deslocamento se necessário
      const newCoords: [number, number] = [
        person.coordinates[0] + (Math.random() - 30) * offset,
        person.coordinates[1] + (Math.random() - 30) * offset,
      ];
      adjustedPeople.push({ ...person, coordinates: newCoords });
    } else {
      // Se as coordenadas não foram usadas, as salva
      usedCoordinates.set(coordKey, person.coordinates);
      adjustedPeople.push(person);
    }
  });

  return adjustedPeople;
}
const adjustedPeople = adjustCoordinates(person);

const PeopleMap: React.FC<PeopleMapProps> = ({ onMarkerClick }) => {
  const defaultPosition: [number, number] = [-15.7942, -47.8822]; // Brasília

  const createPersonIcon = (imageUrl: string) => {
    return L.icon({
      iconUrl: imageUrl,
      iconSize: [90, 90],
      iconAnchor: [30, 30],
      popupAnchor: [0, -30],
      className: "rounded-full",
    });
  };

  // Customização do estilo do cluster
  const createClusterCustomIcon = (cluster: any) => {
    return L.divIcon({
      html: `<span>${cluster.getChildCount()}</span>`,
      className:
        "custom-cluster-icon bg-gray-50 border-2 border-blue-400 rounded-full flex justify-center items-center shadow-lg font-bold",
      iconSize: L.point(60, 60, true),
    });
  };

  return (
    <div className="h-full w-full z-49">
      <MapContainer
        center={defaultPosition}
        zoom={5}
        className=" h-full w-full p-4 rounded-lg  z-40"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <MarkerClusterGroup
          iconCreateFunction={createClusterCustomIcon}
          spiderfyDistanceMultiplier={3} // Mantém o espaço extra entre os marcadores
          showCoverageOnHover={false} // Desativa a área de cobertura do cluster ao passar o mouse
          disableClusteringAtZoom={10} // Desativa a clusterização em um nível de zoom maior (opcional)
          maxClusterRadius={20}
        >
          {adjustedPeople.map((person, index) => (
            <Marker
              key={index}
              position={person.coordinates}
              icon={createPersonIcon(person.image)}
              eventHandlers={{
                click: () => {
                  onMarkerClick(person);
                },
              }}
            >
              <Popup>
                <div className="text-center flex flex-col  items-center ">
                  <img
                    src={person.image}
                    alt={person.name}
                    className="w-16 h-16 rounded-full mx-auto object-cover"
                  />
                  <h3 className="mt-2 font-semibold">{person.name}</h3>
                  <p>{person.city}</p>
                  <a
                    href={`https://www.instagram.com/${person.username.replace(
                      "@",
                      ""
                    )}/`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaSquareInstagram className="w-6 h-6 text-neutral-800" />
                  </a>
                </div>
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
};

export default PeopleMap;
