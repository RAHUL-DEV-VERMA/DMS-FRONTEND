import React, { useEffect } from "react";
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import 'aos/dist/aos.css'; // Importing AOS styles
import AOS from 'aos'; // Importing AOS

const services = [
  {
    title: 'Real-Time Device Tracking',
    description: 'Track all your devices in real-time with precise data on location and status.',
    imgSrc: 'https://img.freepik.com/free-vector/geolocation-flat-composition-with-online-maps-various-gadgets-compass-people-using-online-navigator-vector-illustration_1284-80201.jpg?uid=R174161672&ga=GA1.1.1781477197.1732104842&semt=ais_hybrid'
  },
  {
    title: 'Advanced Analytics',
    description: 'Get detailed insights and reports to help optimize your device management.',
    imgSrc: 'https://img.freepik.com/free-vector/data-analyst-oversees-governs-income-expenses-with-magnifier-financial-management-system-finance-software-it-management-tool-concept_335657-1891.jpg?uid=R174161672&ga=GA1.1.1781477197.1732104842&semt=ais_hybrid',
  },
  {
    title: 'Automated Alerts',
    description: 'Receive automated notifications for any unusual activity or tracking events.',
    imgSrc: 'https://img.freepik.com/free-vector/target-individual-with-laptop-attacked-online-by-user-with-megaphone-internet-shaming-online-harassment-cyber-crime-action-concept_335657-134.jpg?uid=R174161672&ga=GA1.1.1781477197.1732104842&semt=ais_hybrid',
  },
  {
    title: 'Secure Data Access',
    description: 'Your device data is protected with top-tier security to ensure privacy and safety.',
    imgSrc: 'https://img.freepik.com/free-vector/secure-sockets-layer-illustration_23-2149238126.jpg?uid=R174161672&ga=GA1.1.1781477197.1732104842&semt=ais_hybrid',
  },
  {
    title: 'Easy Integration',
    description: 'Seamlessly integrate with your existing infrastructure for a smooth experience.',
    imgSrc: 'https://img.freepik.com/free-vector/hand-drawn-flat-design-devops-illustration_23-2149383352.jpg?uid=R174161672&ga=GA1.1.1781477197.1732104842&semt=ais_hybrid',
  },
  {
    title: 'Customizable Settings',
    description: 'Tailor the system to fit your specific needs with flexible configuration options.',
    imgSrc: 'https://img.freepik.com/free-vector/mini-people-with-gear-machinery_24877-56137.jpg?uid=R174161672&ga=GA1.1.1781477197.1732104842&semt=ais_hybrid',
  }
];

const AboutUs = () => {

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once:true,
      
    });
  }, []);

  return (
    <>
      <Navbar />
      <div className="sm:flex items-center max-w-screen-xl">
        <div className="sm:w-1/2 p-10" data-aos="fade-right">
          <div className="image object-center text-center">
            <img src="https://i.imgur.com/WbQnbas.png" alt="About Us" />
          </div>
        </div>
        <div className="sm:w-1/2 p-5" data-aos="fade-left">
          <div className="text">
            <span className="text-gray-500 border-b-2 border-indigo-600 uppercase">About us</span>
            <h2 className="my-4 font-bold text-3xl sm:text-4xl ">About <span className="text-indigo-600">Device Tracking System</span></h2>
            <p className="text-gray-700">
              In today's fast-paced digital world, keeping track of your devices is more important than ever. Whether it's personal gadgets or valuable business assets, ensuring their safety and knowing their location at all times is crucial. Our Device Tracking System offers an intuitive, real-time tracking solution that puts the power in your hands, ensuring your devices are always within reach and secure.
            </p>
          </div>
        </div>
      </div>

      <section className="py-16 bg-gray-100" data-aos="fade-up">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-semibold text-gray-800 mb-12">Our Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-lg transition transform hover:scale-105 hover:shadow-2xl"
                data-aos="fade-up"
                data-aos-delay={`${index * 200}`} // Delay based on the index for staggered effect
              >
                <img src={service.imgSrc} alt={service.title} className="w-full h-48 object-cover rounded-md mb-6" />
                <h3 className="text-xl font-semibold text-gray-800 mb-4">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default AboutUs;
