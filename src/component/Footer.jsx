import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa"
import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <footer className="bg-[#1CA9C9] text-white pt-12 pb-6 px-4 md:px-10">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10 border-b border-white/30 pb-10">
        
        {/* Logo & Description */}
        <div>
          <h1 className="text-2xl font-bold mb-4">Farm Eco</h1>
          <p className="text-white/80">
            Empowering agriculture through modern tools and seamless renting and shopping.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="font-semibold mb-3 text-lg">Quick Links</h3>
          <ul className="space-y-2 text-white/80">
            <li><Link to="/shop" className="hover:text-white">Shop</Link></li>
            <li><Link to="/rent" className="hover:text-white">Rent</Link></li>
            <li><Link to="/about" className="hover:text-white">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="font-semibold mb-3 text-lg">Contact Us</h3>
          <p className="text-white/80">Email: support@farmeco.com</p>
          <p className="text-white/80 mt-2">Phone: +233 24 000 0000</p>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="font-semibold mb-3 text-lg">Follow Us</h3>
          <div className="flex gap-4">
            <a href="#" className="hover:text-gray-100"><FaFacebookF /></a>
            <a href="#" className="hover:text-gray-100"><FaTwitter /></a>
            <a href="#" className="hover:text-gray-100"><FaInstagram /></a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-white/70 mt-6">
        © {new Date().getFullYear()} Farm Eco. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
