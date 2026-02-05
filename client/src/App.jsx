import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Car, ChevronRight, Menu, X, Filter, User, LogIn, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from './assets/logo.jpg';

const API_URL = 'http://localhost:5000/api';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-black/90 backdrop-blur-md py-4' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img src={logo} alt="Punto Car" className="h-10 w-auto rounded border border-white/20" />
          <span className="text-white font-bold text-2xl tracking-tighter">PUNTO CAR</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-white/80 font-medium">
          <a href="#" className="hover:text-white transition-colors">Comprar</a>
          <a href="#" className="hover:text-white transition-colors">Vender</a>
          <a href="#" className="hover:text-white transition-colors">Financiación</a>
          <a href="#" className="hover:text-white transition-colors">Nosotros</a>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-white p-2 hover:bg-white/10 rounded-full transition-all">
            <User size={20} />
          </button>
          <button className="md:hidden text-white">
            <Menu size={24} />
          </button>
        </div>
      </div>
    </nav>
  );
};

const Hero = () => {
  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-hero-pattern bg-cover bg-center">
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />
      </div>
      <div className="relative container mx-auto px-6 text-center text-white z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8 flex justify-center"
        >
          <div className="relative group">
            <div className="absolute inset-0 bg-accent/30 rounded-full blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <img
              src={logo}
              alt="Punto Car Logo"
              className="h-32 md:h-48 w-auto rounded-2xl shadow-2xl border-4 border-white/10 relative z-10 hover:scale-105 transition-transform duration-300"
            />
          </div>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold mb-6 tracking-tight"
        >
          El auto de tus sueños, <br /><span className="text-accent">al mejor precio.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl md:text-2xl text-white/80 mb-12 max-w-2xl mx-auto"
        >
          Compra y vende autos usados con la confianza y garantía de Punto Car.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-4xl mx-auto bg-white rounded-2xl p-2 shadow-2xl flex flex-col md:flex-row gap-2"
        >
          <div className="flex-1 flex items-center px-4 border-b md:border-b-0 md:border-r border-slate-100">
            <Search className="text-slate-400 mr-2" size={20} />
            <input type="text" placeholder="Buscá marca, modelo o año..." className="w-full py-4 focus:outline-none text-slate-800" />
          </div>
          <button className="btn-accent rounded-xl flex items-center justify-center gap-2">
            Ver catálogo <ChevronRight size={20} />
          </button>
        </motion.div>
      </div>
    </div>
  );
};

const CarCard = ({ car }) => {
  const images = JSON.parse(car.images || '[]');
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="bg-white rounded-3xl overflow-hidden shadow-lg border border-slate-100 group"
    >
      <div className="relative h-56 overflow-hidden">
        <img src={images[0]} alt={car.model} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
        <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-lg text-sm font-semibold">
          {car.year}
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-slate-900 mb-1">{car.brand} {car.model}</h3>
        <p className="text-slate-500 mb-4">{car.mileage.toLocaleString()} km • {car.transmission}</p>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-black text-slate-900">${car.price.toLocaleString()}</span>
          <button className="p-3 bg-slate-50 hover:bg-accent hover:text-white rounded-2xl transition-all">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const Footer = () => (
  <footer className="bg-black text-white py-20">
    <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
      <div className="col-span-1 md:col-span-1">
        <div className="flex items-center gap-2 mb-6">
          <img src={logo} alt="Punto Car" className="h-10 w-auto rounded" />
          <span className="font-bold text-2xl tracking-tighter">PUNTO CAR</span>
        </div>
        <p className="text-white/60">Líderes en compra y venta de autos usados en Argentina. Tecnología y confianza de punta a punta.</p>
      </div>
      <div>
        <h4 className="font-bold mb-6 text-lg">Comprar</h4>
        <ul className="space-y-4 text-white/60">
          <li><a href="#" className="hover:text-white transition-colors">Ver catálogo</a></li>
          <li><a href="#" className="hover:text-white transition-colors">Cómo comprar</a></li>
          <li><a href="#" className="hover:text-white transition-colors">Financiación</a></li>
          <li><a href="#" className="hover:text-white transition-colors">Garantía Kavak</a></li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold mb-6 text-lg">Vender</h4>
        <ul className="space-y-4 text-white/60">
          <li><a href="#" className="hover:text-white transition-colors">Cotizar mi auto</a></li>
          <li><a href="#" className="hover:text-white transition-colors">Cómo vender</a></li>
          <li><a href="#" className="hover:text-white transition-colors">Sedes</a></li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold mb-6 text-lg">Contacto</h4>
        <p className="text-white/60 mb-4">info@puntocar.com</p>
        <p className="text-white/60">0800-PUNTO-CAR</p>
      </div>
    </div>
    <div className="container mx-auto px-6 mt-20 pt-8 border-t border-white/10 text-center text-white/40 text-sm">
      © 2024 Punto Car. Inspirado en la excelencia.
    </div>
  </footer>
);

const MOCK_CARS = [
  {
    id: 1,
    brand: 'Toyota',
    model: 'Corolla',
    year: 2022,
    price: 25000,
    mileage: 15000,
    transmission: 'Automatic',
    images: JSON.stringify(['https://images.unsplash.com/photo-1621339011221-16089853905c?q=80&w=1000&auto=format&fit=crop'])
  },
  {
    id: 2,
    brand: 'BMW',
    model: 'Series 3',
    year: 2022,
    price: 38000,
    mileage: 12000,
    transmission: 'Automatic',
    images: JSON.stringify(['https://images.unsplash.com/photo-1555214107-f2e7c485a488?q=80&w=1000&auto=format&fit=crop'])
  },
  {
    id: 3,
    brand: 'Ford',
    model: 'Mustang',
    year: 2020,
    price: 45000,
    mileage: 20000,
    transmission: 'Automatic',
    images: JSON.stringify(['https://images.unsplash.com/photo-1584345604481-0304e76993a4?q=80&w=1000&auto=format&fit=crop'])
  }
];

export default function App() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get(API_URL + '/cars');
        setCars(response.data.length > 0 ? response.data : MOCK_CARS);
      } catch (err) {
        console.warn('API not reachable, using mock data');
        setCars(MOCK_CARS);
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <Hero />

      <main className="container mx-auto px-6 py-20">
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="text-accent font-bold tracking-widest uppercase text-sm">Nuestra selección</span>
            <h2 className="text-4xl font-black text-slate-900 mt-2">Autos Destacados</h2>
          </div>
          <button className="flex items-center gap-2 font-bold text-accent hover:underline">
            Ver todos <ChevronRight size={16} />
          </button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-80 bg-slate-200 animate-pulse rounded-3xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cars.map(car => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        )}

        <section className="mt-40 bg-black rounded-[3rem] p-12 md:p-20 relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 text-white">
              <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight">¿Querés vender <br />tu auto hoy?</h2>
              <p className="text-xl text-white/60 mb-12 max-w-lg">Obtené una cotización al instante y vendé tu auto en menos de 24 horas. Sin vueltas, sin riesgos.</p>
              <button className="btn-accent px-10 py-5 text-lg">Cotizar ahora</button>
            </div>
            <div className="flex-1">
              <img src="https://images.unsplash.com/photo-1549317661-bd348a54c2b1?q=80&w=1000&auto=format&fit=crop" alt="Vender auto" className="rounded-3xl shadow-2xl skew-y-3" />
            </div>
          </div>
          <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-accent/20 rounded-full blur-[100px]" />
        </section>
      </main>

      <Footer />
    </div>
  );
}
