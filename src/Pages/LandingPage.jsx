import React, { useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import Aboutimg from '../img/Aboutimg.png';
import img from '../img/hero.png';
import Real from '../img/Real.jpg'
import Multi from '../img/multi.jpg'


import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

const LandingPage = () => {
  useEffect(() => {
    // Initialize AOS with customized options
    AOS.init({
      duration: 1000, // duration of animation
      easing: 'ease-in-out', // easing function
      once: true, // trigger animation only once
      mirror: true, // allows the animation to be triggered on scroll up as well
    });

    // Add scroll event listener to refresh AOS
    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop > lastScrollTop) {
        // Scrolling down
        AOS.refresh(); // Refresh AOS so that scroll animations can trigger again
      } else {
        // Scrolling up
        AOS.refresh(); // Refresh AOS when scrolling up
      }
      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // Prevent negative scrolling
    });

    return () => {
      window.removeEventListener('scroll', () => {});
    };
  }, []);

  return (
    <>
      <Navbar />
      <div className="relative bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-600 text-white">
  {/* Content Container */}
  <div className="container mx-auto px-4 py-16  flex flex-col-reverse md:flex-row items-center">
    {/* Text Content */}
    <div className="flex-1 flex flex-col items-start text-center md:text-left ">
  
    <h1 className="lg:text-6xl   font-bold mb-4 sm:mb-2c sm:text-4xl md:mb-6 absolute top-0 left-0 w-full sm:relative sm:top-2px sm:left-auto">
  Real-Time Tracking, <br />
  <span className="text-yellow-300">Secure Your Devices</span>
</h1>


      
      {/* Hide Paragraph on Mobile View */}
      <p className="text-lg hidden sm:block leading-relaxed mb-8">
        Stay connected to your devices with real-time monitoring, location
        history, geofencing, and smart alerts.
      </p>

      {/* Buttons - Stack on Mobile View */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4 mt-8 sm:mt-0">
        <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3 px-6 sm:py-4 sm:px-8 rounded-full shadow-lg focus:outline-none transform transition hover:scale-105 duration-300 ease-in-out">
          Log in
        </button>

        <button className="ml-4 bg-transparent border-2 border-white text-white hover:bg-white hover:text-teal-500 font-bold py-3 px-6 sm:py-4 sm:px-8 rounded-full shadow-lg focus:outline-none transform transition hover:scale-105 duration-300 ease-in-out">
          Learn More
        </button>
      </div>
    </div>

    {/* Image Section */}
    <div
      className="flex-1 w-full flex justify-center  sm:mb-2 md:mb-0 "
      data-aos="fade-left"
    >
      <img
        className="w-full h-full md:w-5/5 lg:w-5/5 rounded-lg z-10"
        src={img}
        alt="Device Tracking"
      />
    </div>
  </div>

  {/* SVG Background Wave */}
  <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
    <svg
      viewBox="0 0 1200 120"
      xmlns="http://www.w3.org/2000/svg"
      className="relative block w-full h-40 animate-wave"
      preserveAspectRatio="none"
    >
      <path
        d="M0,49C150,150,300,0,450,25C600,50,750,150,900,75C1050,0,1200,49,1200,49V120H0Z"
        fill="#FFFFFF"
        opacity="0.25"
      ></path>
      <path
        d="M0,99C150,50,300,120,450,80C600,40,750,50,900,99C1050,150,1200,99,1200,99V120H0Z"
        fill="#FFFFFF"
        opacity="0.5"
      ></path>
      <path
        d="M0,120C150,90,300,100,450,90C600,80,750,110,900,100C1050,90,1200,120,1200,120V120H0Z"
        fill="#FFFFFF"
      ></path>
    </svg>
  </div>
</div>


      {/* Start */}
<section className="bg-gradient-to-r from-blue-50 via-white to-blue-50 py-12 sm:py-16">
  <div className="container max-w-5xl mx-auto px-6" data-aos="fade-up">
    <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-6">
      Why Choose Our Device Tracking System?
    </h2>
    <div className="w-full mb-8">
      <div className="h-1 mx-auto gradient w-40 opacity-50 rounded"></div>
    </div>
    <div className="flex flex-wrap items-center">
      {/* Real-Time Updates */}
      <div className="w-full sm:w-1/2 p-6" data-aos="fade-right">
        <h3 className="text-2xl sm:text-3xl font-semibold text-blue-800 mb-4">
          Real-Time Location Updates
        </h3>
        <p className="text-gray-600 leading-relaxed text-base sm:text-lg mb-6">
          Never lose sight of what matters most. With our advanced tracking system, you’ll know the exact location of your devices at any moment. Stay informed with instant notifications and intuitive tracking tools designed for your convenience. Whether managing personal gadgets or business assets, staying connected has never been easier.
        </p>
      </div>
      <div className="w-full sm:w-1/2 p-6" data-aos="fade-left">
        <img src={Real} alt="Location Updates" className="rounded-lg " />
      </div>
    </div>

    <div className="flex flex-wrap items-center mt-12">
      {/* Multi-Device Support */}
      <div className="w-full sm:w-1/2 p-6" data-aos="fade-right">
        <img src={Multi} alt="Seamless" className="rounded-lg " />
      </div>
      <div className="w-full sm:w-1/2 p-6" data-aos="fade-left">
        <h3 className="text-2xl sm:text-3xl font-semibold text-blue-800 mb-4">
          Seamless Multi-Device Support
        </h3>
        <p className="text-gray-600 leading-relaxed text-base sm:text-lg mb-6">
          Track all your devices effortlessly with our seamless multi-device support. From smartphones to laptops, all your devices can be tracked in one place. Manage everything with ease and never worry about losing your gadgets again.
        </p>
      </div>
    </div>
  </div>
</section>

{/* About Us Section */}
<section className="relative py-16 lg:py-24 bg-gradient-to-br from-gray-100 to-gray-300">
  <div className="container mx-auto px-6">
    <div className="flex flex-wrap items-center">
      {/* About Us Image */}
      <div className="w-full lg:w-1/2 mb-8 lg:mb-0" data-aos="fade-up">
        <img className="rounded-lg " src={Aboutimg} alt="About Us" />
      </div>
      {/* About Us Content */}
      <div className="w-full lg:w-1/2" data-aos="fade-left">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6">
          About Us
        </h2>
        <p className="text-lg text-gray-600 leading-relaxed mb-6">
          We’re dedicated to providing the best device tracking solutions to ensure that your important items are always within reach. With cutting-edge technology and a user-friendly interface, we offer peace of mind by keeping you connected to your devices, whether for business or personal use.
        </p>
        <Link
          to="/aboutus"
          className="inline-block px-6 py-3 bg-blue-600 text-white text-lg rounded-full shadow-md hover:bg-blue-700 transition duration-300"
        >
          Learn More
        </Link>
      </div>
    </div>
  </div>
</section>



      <Footer />
    </>
  );
};

export default LandingPage;
