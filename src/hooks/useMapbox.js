import {useRef,useState, useEffect, useCallback}  from 'react'
import mapboxgl from 'mapbox-gl'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
const axios = require("axios");

mapboxgl.accessToken = 'pk.eyJ1Ijoid2FsZXRhIiwiYSI6ImNreGV6ZHdpbzF5Y2sycXBmb2Q4cXAwOTIifQ.n2IlnUqJNEEfDHk6qPNsoQ';
const baseUrl = "https://back-calistenia.herokuapp.com/api/parque";


export const useMapbox = (puntoInicial) => {
    
    const mapaDiv = useRef()
    const setRef = useCallback((node) => {
            mapaDiv.current = node;
    },[])

    //referencia a los marcadores
    const marcadores = useRef({});

    const [data, setData] = useState([]);
  

    const mapa = useRef()
    const [coords, setCoords] = useState(puntoInicial)

  

      useEffect(() => {
        const peticionGet = async () => {
    
            await axios.get(baseUrl)
              .then((response) => {
              
                setData(response.data);
              })
              .catch((error) => {
                console.log(error);
              });
          };
        peticionGet();
      }, []);
      

    //funcion agregar marcadores
    /*
    const agregarMarcador = useCallback((ev) => {
        const {lng, lat} = ev.lngLat;
            const marker = new mapboxgl.Marker();
            

            marker
            .setLngLat([lng, lat])
            .addTo(mapa.current)
            .setDraggable(true)

         

            //escuchar movimientos del marcador
            marker.on('dragend', ({target}) => {
                const {id} = target;
                const {lng, lat} = target.getLngLat();
                //emitir cambios
                console.log(lng, lat)
                
            })
    },[])
*/
    useEffect(() => {
        var map = new mapboxgl.Map({
            container: mapaDiv.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [puntoInicial.lng, puntoInicial.lat],
            zoom: puntoInicial.zoom
        });
        map.addControl(new mapboxgl.NavigationControl());
        
        map.addControl(
            new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            mapboxgl: mapboxgl
            })
        );

        data.forEach((park) => {
            const marker = new mapboxgl.Marker()
        .setLngLat([parseFloat(park.longitud),parseFloat(park.latitud)])
        .addTo(map);
        })
        

        mapa.current = map;
    },[])

    //cuando se mueve el mapa
    useEffect(() => {
        mapa.current?.on('move', () => {
            const {lng, lat} = mapa.current.getCenter();
            setCoords({
                lng: lng.toFixed(6),
                lat: lat.toFixed(6),
                zoom: mapa.current.getZoom().toFixed(2)
            })
        })
    },[])

    //agregar marcadores
    /*
    useEffect(() => {
        mapa.current?.on('click', agregarMarcador);
       
    }, [agregarMarcador])
*/
    return{
        coords,
        setRef,
        marcadores
    }
}
