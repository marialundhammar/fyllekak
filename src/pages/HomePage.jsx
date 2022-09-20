import React from 'react'
import Map from '../components/Map'
import Markers from '../components/Markers'


const HomePage = () => { 

    return(
        <>
        <div className="container mx-auto flex justify-center text-lg">HOMEPAGE </div>
    
        <div className="flex justify-center">
          <Map/>

          <Markers/>
        </div>
      
      </>
    )
  
}




export default HomePage
