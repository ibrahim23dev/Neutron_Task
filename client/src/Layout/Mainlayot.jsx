import React,{useEffect} from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import AOS from 'aos';
function MainLayout() {
  
  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);
  return (
    <div>
      <Header  />
      <Outlet />
      <Footer />
    </div>
  );
}

export default MainLayout;