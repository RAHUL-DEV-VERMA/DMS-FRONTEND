import React from 'react';
import logo from '../img/logo.png';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="w-full bg-gray-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-12 gap-8 py-14 lg:grid-cols-8">
          {/* Logo and Social Media Section */}
          <div className="mb-0 col-span-full lg:col-span-3 ">
            <Link to="https://pagedone.io/" className="flex justify-center lg:justify-start">
              <img src={logo} className='w-20 text-center' alt="logo" />
            </Link>
            <p className="py-8 text-gray-500 lg:max-w-xs text-center lg:text-left">
              Trusted in more than 100 countries & 5 million customers. Follow us on social media.
            </p>
            <div className="flex mt-4 space-x-4 justify-center lg:justify-start sm:mt-0">
              {/* Social Media Icons */}
              <Link to="#" className="w-8 h-8 rounded-full transition-all duration-500 flex justify-center items-center bg-[#33CCFF] hover:bg-gray-900">
                <svg className="text-white" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <g id="Social Media">
                    <path id="Vector" d="M11.3214 8.93654L16.4919 3.05554H15.2667L10.7772 8.16193L7.1914 3.05554H3.05566L8.47803 10.7773L3.05566 16.9444H4.28097L9.022 11.5519L12.8088 16.9444H16.9446L11.3211 8.93654H11.3214ZM9.64322 10.8453L9.09382 10.0764L4.72246 3.95809H6.60445L10.1322 8.89578L10.6816 9.66469L15.2672 16.0829H13.3852L9.64322 10.8456V10.8453Z" fill="currentColor" />
                  </g>
                </svg>
              </Link>
              <Link to="#" className="relative w-8 h-8 rounded-full transition-all duration-500 flex justify-center items-center bg-[linear-gradient(45deg,#FEE411_6.9%,#FEDB16_10.98%,#FEC125_17.77%,#FE983D_26.42%,#FE5F5E_36.5%,#FE2181_46.24%,#9000DC_85.57%)]  hover:bg-gradient-to-b from-gray-900 to-gray-900">
                <svg className="w-[1.25rem] h-[1.125rem] text-white" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5.63434 7.99747C5.63434 6.69062 6.6941 5.63093 8.00173 5.63093C9.30936 5.63093 10.3697 6.69062 10.3697 7.99747C10.3697 9.30431 9.30936 10.364 8.00173 10.364C6.6941 10.364 5.63434 9.30431 5.63434 7.99747ZM4.35427 7.99747C4.35427 10.0108 5.98723 11.6427 8.00173 11.6427C10.0162 11.6427 11.6492 10.0108 11.6492 7.99747C11.6492 5.98418 10.0162 4.3522 8.00173 4.3522C5.98723 4.3522 4.35427 5.98418 4.35427 7.99747ZM10.9412 4.20766C10.9411 4.37615 10.991 4.54087 11.0846 4.681C11.1783 4.82113 11.3113 4.93037 11.4671 4.99491C11.6228 5.05945 11.7942 5.07639 11.9595 5.04359C12.1249 5.01078 12.2768 4.92971 12.3961 4.81062C12.5153 4.69153 12.5966 4.53977 12.6295 4.37453C12.6625 4.2093 12.6457 4.03801 12.5812 3.88232C12.5168 3.72663 12.4076 3.59354 12.2674 3.49988C12.1273 3.40622 11.9625 3.35619 11.7939 3.35612H11.7936C11.5676 3.35623 11.3509 3.44597 11.1911 3.60563C11.0313 3.76529 10.9414 3.98182 10.9412 4.20766ZM5.132 13.7759C4.43946 13.7444 4.06304 13.6291 3.81289 13.5317C3.48125 13.4027 3.24463 13.249 2.99584 13.0007C2.74705 12.7524 2.59305 12.5161 2.46451 12.1847C2.367 11.9348 2.25164 11.5585 2.22016 10.8664C2.18572 10.1181 2.17885 9.89331 2.17885 7.99752C2.17885 6.10174 2.18629 5.87758 2.22016 5.12866C2.2517 4.43654 2.36791 4.06097 2.46451 3.81035C2.59362 3.47891 2.7474 3.24242 2.99584 2.99379C3.24428 2.74515 3.48068 2.59124 3.81289 2.46278C4.06292 2.36532 4.43946 2.25004 5.132 2.21857C5.88074 2.18416 6.10566 2.17729 8.00173 2.17729C9.89779 2.17729 10.1229 2.18472 10.8723 2.21857C11.5648 2.25009 11.9406 2.36623 12.1914 2.46278C12.5231 2.59124 12.7597 2.74549 13.0085 2.99379C13.2573 3.24208 13.4107 3.47891 13.5398 3.81035C13.6373 4.06023 13.7527 4.43654 13.7841 5.12866C13.8186 5.87758 13.8255 6.10174 13.8255 7.99752C13.8255 9.89331 13.8186 10.1175 13.7841 10.8664C13.7526 11.5585 13.6367 11.9347 13.5398 12.1847C13.4107 12.5161 13.2569 12.7526 13.0085 13.0007C12.76 13.2488 12.5231 13.4027 12.1914 13.5317C11.9414 13.6292 11.5648 13.7444 10.8723 13.7759C10.1229 13.8103 9.89779 13.8167 8.00173 13.8167C6.10566 13.8167 5.88074 13.8103 5.132 13.7759Z" fill="white" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Footer Links */}
          <div className="col-span-12 lg:col-span-5">
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
              <div className="text-gray-700">
                <h3 className="font-medium text-lg leading-6">Company</h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li>
                    <Link to="/about-us" className="text-base hover:text-gray-500">About Us</Link>
                  </li>
                  <li>
                    <Link to="/careers" className="text-base hover:text-gray-500">Careers</Link>
                  </li>
                  <li>
                    <Link to="/news" className="text-base hover:text-gray-500">News</Link>
                  </li>
                  <li>
                    <Link to="/partners" className="text-base hover:text-gray-500">Partners</Link>
                  </li>
                </ul>
              </div>
              <div className="text-gray-700">
                <h3 className="font-medium text-lg leading-6">Help</h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li>
                    <Link to="/support" className="text-base hover:text-gray-500">Customer Support</Link>
                  </li>
                  <li>
                    <Link to="/faq" className="text-base hover:text-gray-500">FAQ</Link>
                  </li>
                  <li>
                    <Link to="/contact" className="text-base hover:text-gray-500">Contact Us</Link>
                  </li>
                </ul>
              </div>

              <div className="text-gray-700">
                <h3 className="font-medium text-lg leading-6">Services</h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li>
                    <Link to="/services" className="text-base hover:text-gray-500">Our Services</Link>
                  </li>
                  <li>
                    <Link to="/pricing" className="text-base hover:text-gray-500">Pricing</Link>
                  </li>
                </ul>
              </div>
              <div className="text-gray-700">
                <h3 className="font-medium text-lg leading-6">Legal</h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li>
                    <Link to="/privacy-policy" className="text-base hover:text-gray-500">Privacy Policy</Link>
                  </li>
                  <li>
                    <Link to="/terms-of-service" className="text-base hover:text-gray-500">Terms of Service</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="py-10 mt-10 border-t border-gray-200">
          <div className="flex justify-center text-center">
            <p className="text-sm text-gray-500">&copy; 2024 Your Company Name. All rights reserved.</p> <span className="font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">Developed by - Jyatiska & Rahul</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
