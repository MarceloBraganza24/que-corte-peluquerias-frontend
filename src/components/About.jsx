import React, { useContext, useEffect, useState } from 'react'
import NavBar from './NavBar'
import Footer from './Footer'
import HMenu from './HMenu';
import { Link } from 'react-router-dom'
import LogOut from './LogOut';
import {IsLoggedContext} from '../context/IsLoggedContext';
import {OpenModalContext} from '../context/OpenModalContext'; 

const About = () => {
  const {isLoggedIn, login, logout} = useContext(IsLoggedContext);
  const [user, setUser] = useState('');
  const {menuOptionsModal,handleMenuOptionsModal} = useContext(OpenModalContext);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    menuOptionsModal&&handleMenuOptionsModal(false);
    const getCookie = (name) => {
      const cookieName = name + "=";
      const decodedCookie = decodeURIComponent(document.cookie);
      const cookieArray = decodedCookie.split(';');
      for (let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i];
        while (cookie.charAt(0) === ' ') {
          cookie = cookie.substring(1);
        }
        if (cookie.indexOf(cookieName) === 0) {
          return cookie.substring(cookieName.length, cookie.length);
        }
      }
      return "";
    };
    const cookieValue = getCookie('TokenJWT');
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/sessions/current?cookie=${cookieValue}`)
        const data = await response.json();
        if(data.error === 'jwt expired') {
          logout();
          window.location.href = '/login';
        } else {
          const user = data.data
          if(user) {
            setUser(user)
          }
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchData();
    if(cookieValue) {
      login()
    } else {
      logout()
    }
  }, []);

  return (
    <>
        <NavBar/>
        {
          isLoggedIn && (user.role=='admin' || user.role=='premium')?
          <>
            <HMenu/>
            <div className='aboutContainer'>
              <div className='aboutContainer__descriptionContainer'>
                <p>Somos una peluquería dedicada especialmente para vos que estás buscando un cambio de look. La peluquería se encuentra ubicada en la Avenida Casey 1664, ciudad de Coronel Suárez, Pcia de Buenos Aires. El personal se conforma por tres peluqueros, Ayrton Fibiger, Mirko Fibiger y Ale Lambretch en el que cada día brindan la mejor atención hacia sus clientes para que se sientan cómodos y amenos con su corte de pelo. <br/> Marcamos nuestro propio estilo en corte, color y peinado, con personalización en cada servicio, calidad de atención e imagen. Nuestro objetivo es que quienes visiten nuestro salón vivan una experiencia de 360 grados.</p>
              </div>
            </div>
            <LogOut/>
          </>
          : isLoggedIn?
          <>
            <HMenu/>
            <div className='aboutContainer'>
              <div className='aboutContainer__descriptionContainer'>
                <p>Somos una peluquería dedicada especialmente para vos que estás buscando un cambio de look. La peluquería se encuentra ubicada en la Avenida Casey 1664, ciudad de Coronel Suárez, Pcia de Buenos Aires. El personal se conforma por tres peluqueros, Ayrton Fibiger, Mirko Fibiger y Ale Lambretch en el que cada día brindan la mejor atención hacia sus clientes para que se sientan cómodos y amenos con su corte de pelo. <br/> Marcamos nuestro propio estilo en corte, color y peinado, con personalización en cada servicio, calidad de atención e imagen. Nuestro objetivo es que quienes visiten nuestro salón vivan una experiencia de 360 grados.</p>
              </div>
            </div>
            <LogOut/>
          </>
          :
          <>
            <div className='warningLogin'>
              <p className='warningLogin__prop'>Si aún no has iniciado sesión, <Link to={"/login"} className='warningLogin__link'>has click aquí</Link></p>
            </div>
            <div className='aboutContainer'>
              <div className='aboutContainer__descriptionContainerIsNotLogin'>
                <p>Somos una peluquería dedicada especialmente para vos que estás buscando un cambio de look. La peluquería se encuentra ubicada en la Avenida Casey 1664, ciudad de Coronel Suárez, Pcia de Buenos Aires. El personal se conforma por tres peluqueros, Ayrton Fibiger, Mirko Fibiger y Ale Lambretch en el que cada día brindan la mejor atención hacia sus clientes para que se sientan cómodos y amenos con su corte de pelo. <br/> Marcamos nuestro propio estilo en corte, color y peinado, con personalización en cada servicio, calidad de atención e imagen. Nuestro objetivo es que quienes visiten nuestro salón vivan una experiencia de 360 grados.</p>
              </div>
            </div>
          </>
        }
        <Footer/>
    </>
  )
}

export default About