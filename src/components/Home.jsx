import React, { useContext, useEffect, useState } from 'react'
import LogOut from './LogOut'
import NavBar from './NavBar'
import Footer from './Footer'
import { Link } from 'react-router-dom'
import {IsLoggedContext} from '../context/IsLoggedContext';

const Home = () => {
  const {isLoggedIn, login, logout} = useContext(IsLoggedContext);

  useEffect(() => {
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
    if(cookieValue) {
      login()
    } else {
      logout()
    }
    //mountHome(cookieValue);
    
  }, []);

  /* const mountHome = (cookie) => {
    if(cookie) {
      login()
    } else {
      logout()
    }
  } */

  return (
    <>
      
      <NavBar/>
      {
        !isLoggedIn ?
          <>
            <div className='warningLogin'>
              <p className='warningLogin__prop'>Si aún no has iniciado sesión, <Link to={"/login"} className='warningLogin__link'>has click aquí</Link></p>
            </div>
            <div className='carouselContainer'>
                <div className='carouselContainer__prop'>
                  <div id="carouselExample" class="carousel slide">
                    <div class="carousel-inner">
                      <div class="carousel-item active">
                        <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgSdUFKVYNY53CjKf0nLmTwbQ-dZXoQS8XTFTs3UrGahlxeVHfV55_6Gyst0KPZ-0IekJFoloB1nKSC3zigdrkn17OKhPj3bjAlSkRzDPJwBarWxR7UJ6wyVJQOadr4SnDGqWYrUoTw_zSjee9dNx6U8KfsLehe1H3ZrlOe3r076KPjGkltSV-2jiqSoRQ/s1080/qcp-foto1-index.jpg" class="d-block w-100" alt="imagenPeluqueria"/>
                      </div>
                      <div class="carousel-item">
                        <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg-wPmCzpWT0YtUFJFGjFAXB3EEmHHgE_zN7JlGlHWf3HwtWsIf8y5RkypO2W16g-ewSoWKa4chyphenhyphenju0t2xIPr0i9S5BVCjaCOd2d32uzfZZIW9-OpY2WEcqCojgw2Gd2lrztDDsZwCbexCZfKVP4YU9ueSlRzsiNza_uNvKXsph3pkCFB286xUEXaKzdOU/s1080/qcp-foto2-index.jpg" class="d-block w-100" alt="imagenPeluqueria"/>
                      </div>
                      <div class="carousel-item">
                        <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiov1rawMC-kLrgKQq9cjlRBxVpHge4FZDl7iQyGBmLYT0lnHSqvms_gH-7qkonLJLcG5u3oA_t45dPSxjpB2y1R-0059CwkboR5KA3LOrrWUB8CRpNLMtUB0Q-T-MmMo98jqo5yC4o1Tw-vqK8I4c0e6SHNHUybi3sSCJNWC8HQwNsjHrKosFiTuZFWDQ/s1078/qcp-foto4-index.jpg" class="d-block w-100" alt="imagenPeluqueria"/>
                      </div>
                    </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                      <span class="carousel-control-next-icon" aria-hidden="true"></span>
                      <span class="visually-hidden">Next</span>
                    </button>
                  </div>
                </div>
              </div> 
          </> 
        : 
        <>
          <div className='carouselContainerIsLoggedIn'>
            <div className='carouselContainer__prop'>
              <div id="carouselExample" class="carousel slide">
                <div class="carousel-inner">
                  <div class="carousel-item active">
                    <img src="./src/assets/foto1-index.jpg" class="d-block w-100" alt="imagenPeluqueria"/>
                  </div>
                  <div class="carousel-item">
                    <img src="./src/assets/foto2-index.jpg" class="d-block w-100" alt="imagenPeluqueria"/>
                  </div>
                  <div class="carousel-item">
                    <img src="./src/assets/foto4-index.jpg" class="d-block w-100" alt="imagenPeluqueria"/>
                  </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                  <span class="carousel-control-next-icon" aria-hidden="true"></span>
                  <span class="visually-hidden">Next</span>
                </button>
              </div>
            </div>
          </div>
          <LogOut/>
        </>
      }
      <Footer/>
    </>
  )
}

export default Home