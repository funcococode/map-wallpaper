"use client";
import { GoogleMap, useJsApiLoader,Autocomplete } from '@react-google-maps/api';
import {useEffect, useState} from 'react'
const containerStyle = {
  width: '100%',
  height: '700px'
};

const placesLibrary = ['places'];
export default function GoogleMaps() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyBpvj8u-N4uAhjfFSNUf-uVG969CLolgLk",
    libraries: placesLibrary 
  })

  const [map, setMap] = useState(null)
  const [zoom, setZoom] = useState(20);
  const [openInfoWindow, setOpenInfoWindow] = useState(false);
  const [lat, setLat] = useState(24.560160);
  const [lng, setLng] = useState(80.830330);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [center, setCenter] = useState({
    lat: lat,
    lng: lng
  })

  useEffect(() => {
    setCenter({
      lat: lat,
      lng: lng
    }) 
  },[lat, lng])


  function setLatLng(e){
    setLat(e?.latLng?.lat());
    setLng(e?.latLng?.lng())
  }

  function onLoad(autocomplete){
    setSelectedPlace(autocomplete);
  }

  function onPlaceChanged(){
    if(selectedPlace){
      const place = selectedPlace.getPlace();
      console.log(place)
      setLat(place?.geometry?.location?.lat())
      setLng(place?.geometry?.location?.lng())
    }
  }

  return isLoaded ? (
    <div className='p-10 px-24 flex flex-col justify-around items-center h-screen'>
      <div className='w-1/2 '>
        <label className='text-gray-400'>Enter your location</label>
        <Autocomplete className='w-full' onPlaceChanged={onPlaceChanged} onLoad={onLoad}>
          <input type='text' placeholder='' className='w-full border-2 outline-none focus:border-teal-500 p-3 text-lg my-5 rounded'/>
        </Autocomplete>
      </div>
      <div className='shadow-lg rounded-xl w-full overflow-hidden'>
        <GoogleMap
          options={{mapId:'5b8993706d5e24cc', controlSize: 30, disableDefaultUI:true}}
          mapContainerStyle={containerStyle}
          center={center}
          zoom={zoom}
          onClick={(e) => setLatLng(e)}
          mapTypeId='terrain'
        >
        </GoogleMap>
      </div>
    </div>
  ) : <></>
}
