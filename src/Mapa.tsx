
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useState, useEffect, useRef } from 'react';

// Fix íconos Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Componente interno para manejar los eventos del mapa (clic) y mover el mapa
const MapEventsHandler = ({ setPosition, geocodificar }) => {
  // useMap Hook para acceder a la instancia del mapa
  const map = useMap(); // Obtiene la instancia del mapa

  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setPosition([lat, lng]);
      geocodificar(lat, lng);
      // Opcional: mover el mapa al punto clicado si no está ya centrado
      map.setView([lat, lng], map.getZoom());
    },
  });
  return null;
};

// Nuevo componente para controlar el centro del mapa dinámicamente
const ChangeView = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    // Si la posición cambia, el mapa se moverá y su zoom se ajustará si es necesario
    map.setView(center, zoom);
  }, [center, zoom, map]); // Dependencias: center, zoom y la instancia del mapa
  return null;
}


// Componente principal del mapa
const MapaSimple = ({ setDireccion, setReferencias, setNumeroEncontrado }) => {
  const [position, setPosition] = useState([-12.131723, -76.980243]); // Posición inicial por defecto (Lima)
  const [localDireccion, setLocalDireccion] = useState('');
  const [localReferencias, setLocalReferencias] = useState('');
  const [localNumeroEncontrado, setLocalNumeroEncontrado] = useState(true);
  const [searchInput, setSearchInput] = useState(''); // Nuevo estado para el input de búsqueda

  // Ya no necesitamos mapRef si vamos a usar ChangeView o el `center` prop directamente
  // const mapRef = useRef(null); // Esta referencia ya no es estrictamente necesaria para mover el mapa por búsqueda

  // Función para geocodificación inversa (coordenadas a dirección)
  const geocodificarInversa = async (lat, lon) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&addressdetails=1`
      );
      const data = await res.json();
      const addr = data?.address;

      if (addr) {
        const calle = addr.road || addr.pedestrian || addr.cycleway || addr.footway || addr.path || 'Calle desconocida';
        const numero = addr.house_number || addr.building_number || addr.house || '';

        const barrio = addr.suburb || addr.neighbourhood || addr.village || '';
        const distrito = addr.city_district || addr.county || addr.town || addr.city || '';
        const codigoPostal = addr.postcode || '';

        let direccionFormateada = calle;
        let numFound = true;

        if (numero) {
          direccionFormateada += ` ${numero}`;
          numFound = true;
        } else {
          numFound = false;
        }
        if (barrio) direccionFormateada += `, ${barrio}`;
        if (distrito) direccionFormateada += `, ${distrito}`;
        if (codigoPostal) direccionFormateada += `, ${codigoPostal}`;

        setLocalDireccion(direccionFormateada);
        setLocalNumeroEncontrado(numFound);

        // Actualizar estados del componente padre
        setDireccion(direccionFormateada);
        setNumeroEncontrado(numFound);

      } else {
        setLocalDireccion('Dirección no encontrada');
        setLocalNumeroEncontrado(true);
        setDireccion('Dirección no encontrada');
        setNumeroEncontrado(true);
      }
      setLocalReferencias('');
      setReferencias('');
    } catch (error) {
      console.error('Error al obtener dirección (geocodificación inversa):', error);
      setLocalDireccion('Error al obtener dirección');
      setLocalNumeroEncontrado(true);
      setDireccion('Error al obtener dirección');
      setNumeroEncontrado(true);
      setLocalReferencias('');
      setReferencias('');
    }
  };

  // Función para geocodificación directa (texto a coordenadas)
  const buscarDireccionEnMapa = async () => {
    if (!searchInput.trim()) {
      alert('Por favor, ingresa una dirección para buscar.');
      return;
    }

    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(searchInput)}, Lima, Peru&format=json&limit=1&countrycodes=pe`
      ); // Añadimos "Lima, Peru" para mejorar la precisión de la búsqueda
      const data = await res.json();

      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        const newPosition = [parseFloat(lat), parseFloat(lon)];
        setPosition(newPosition); // ¡Esto ya mueve el marcador y, con ChangeView, el mapa!

        // Ya no necesitamos esta línea si usamos el componente ChangeView
        // if (mapRef.current) {
        //   mapRef.current.setView(newPosition, mapRef.current.getZoom());
        // }

        // Realiza geocodificación inversa para obtener la dirección formateada
        geocodificarInversa(newPosition[0], newPosition[1]);
        setLocalReferencias(''); // Limpia las referencias al buscar una nueva dirección
        setReferencias(''); // Limpia las referencias en el padre
      } else {
        alert('No se encontraron resultados para la dirección ingresada. Intenta ser más específico (ej. "Av. Arequipa 123, Miraflores, Lima").');
        setLocalDireccion('Dirección no encontrada');
        setDireccion('');
        setLocalNumeroEncontrado(true);
        setNumeroEncontrado(true);
        setLocalReferencias('');
        setReferencias('');
      }
    } catch (error) {
      console.error('Error al buscar dirección:', error);
      alert('Hubo un error al buscar la dirección. Inténtalo de nuevo.');
      setLocalDireccion('Error al buscar dirección');
      setDireccion('');
      setLocalNumeroEncontrado(true);
      setNumeroEncontrado(true);
      setLocalReferencias('');
      setReferencias('');
    }
  };

  // Efecto para geocodificar la posición inicial cuando el componente se monta
  useEffect(() => {
    geocodificarInversa(position[0], position[1]);
  }, []); // El array vacío asegura que se ejecute solo una vez al montar

  return (
    <div>
      <div className="mb-4">
        <label htmlFor="searchAddress" className="block text-gray-700 text-sm font-bold mb-2">
          Buscar dirección:
        </label>
        <div className="flex gap-2">
          <input
            id="searchAddress"
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault(); // Prevenir el envío del formulario si está dentro de uno
                buscarDireccionEnMapa();
              }
            }}
            placeholder="Ej: Av. Arequipa 123, Miraflores"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <button
            type="button"
            onClick={buscarDireccionEnMapa}
            className="px-4 py-2 bg-[#B73852] text-white rounded-md hover:bg-[#a02e45] transition-colors duration-300"
          >
            Buscar
          </button>
        </div>
      </div>

      <div style={{ height: '400px', width: '100%', marginBottom: '1rem' }}>
        <MapContainer center={position} zoom={16} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>Ubicación seleccionada</Popup>
          </Marker>
          <MapEventsHandler setPosition={setPosition} geocodificar={geocodificarInversa} />
          {/* Este componente asegurará que la vista del mapa se actualice cuando 'position' cambie */}
          <ChangeView center={position} zoom={16} />
        </MapContainer>
      </div>

      <label className="block text-gray-700 text-sm font-bold mb-2">Dirección obtenida:</label>
      <input
        type="text"
        value={localDireccion}
        readOnly
        placeholder="Dirección automática del mapa"
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
      />

      <label className="block text-gray-700 text-sm font-bold mb-2">
        Referencias adicionales (ej: Color de casa, entre calles, etc):
      </label>
      <input
        type="text"
        value={localReferencias}
        onChange={(e) => {
          setLocalReferencias(e.target.value);
          setReferencias(e.target.value);
        }}
        placeholder="Agrega detalles para que el motorizado llegue mejor"
        disabled={localNumeroEncontrado}
        className={`
          shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline
          ${localNumeroEncontrado ? 'bg-gray-100 cursor-not-allowed' : ''}
        `}
      />
      {!localNumeroEncontrado && (
        <p className="text-xs text-red-500 mt-1">
          *Por favor, agrega una referencia detallada, ya que no se encontró número de calle para esta ubicación.
        </p>
      )}
    </div>
  );
};

export default MapaSimple;