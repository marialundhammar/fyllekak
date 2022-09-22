import React, { useState } from 'react'
import Map from '../components/Map'

//just for showing cazpian


const HomePage = () => { 
  const [location, setLocation] = useState()

  

  const getUserLocation = () => {
    if (navigator.geolocation) {
      console.log('yay')
      navigator.geolocation.getCurrentPosition(position => {

        const userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }

        console.log('userLocation ==>', userLocation )

        setLocation(userLocation)
        
      })
      
    } else {
      console.log('nay')
    }
  }

    return(
        <>
        <div className="container mx-auto flex justify-center text-lg">HOMEPAGE</div>
        <button onClick={() => {getUserLocation()}}>User Location</button>
        <div className="flex justify-center">
        <Map userLocation={ location } />
        </div>
      </>
    )
  
}




export default HomePage
