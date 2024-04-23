import React from 'react'
import NavBar from './NavBar'
import Footer from './Footer'

const About = () => {
  return (
    <>
        <NavBar/>
        <div className='aboutContainer'>
            <div className='aboutContainer__descriptionContainer'>
                <p>Somos una peluquería dedicada especialmente para vos que estás buscando un cambio de look. La peluquería se encuentra ubicada en la Avenida Casey 1563, ciudad de Coronel Suárez, Pcia de Buenos Aires. El personal se conforma por tres peluqueros, Ayrton Fibiger, Mirko Fibiger y Ale Lambretch en el que cada día brindan la mejor atención hacia sus clientes para que se sientan cómodos y amenos con su corte de pelo. <br/> Marcamos nuestro propio estilo en corte, color y peinado, con personalización en cada servicio, calidad de atención e imagen. Nuestro objetivo es que quienes visiten nuestro salón vivan una experiencia de 360 grados.</p>
            </div>
        </div>
        <Footer/>
    </>
  )
}

export default About