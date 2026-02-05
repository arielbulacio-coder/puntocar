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
      <div className="relative h-64 overflow-hidden">
        <img
          src={images[0]}
          alt={car.model}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=800&auto=format&fit=crop'; }}
        />
        <div className="absolute top-4 left-4 bg-accent text-white px-3 py-1 rounded-lg text-sm font-bold shadow-lg">
          {car.year}
        </div>
        <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-lg text-xs font-medium">
          {car.status === 'sold' ? 'VENDIDO' : 'DISPONIBLE'}
        </div>
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-xl font-bold text-slate-900">{car.brand}</h3>
            <p className="text-slate-500 font-medium">{car.model}</p>
          </div>
          <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded-md text-xs font-bold ring-1 ring-slate-200">
            {car.transmission}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-slate-300" />
            {car.mileage.toLocaleString()} km
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-slate-300" />
            {car.fuel || 'Nafta'}
          </div>
        </div>

        <div className="flex justify-between items-center pt-4 border-t border-slate-50">
          <div>
            <span className="text-xs text-slate-400 block uppercase tracking-wider font-bold">Precio</span>
            <span className="text-2xl font-black text-slate-900">${car.price.toLocaleString()}</span>
          </div>
          <button className="p-4 bg-primary text-white hover:bg-accent rounded-2xl transition-all shadow-lg active:scale-90">
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
    model: 'Corolla 1.8 Segmento G Exclusive',
    year: 2022,
    price: 25900,
    mileage: 15400,
    transmission: 'Automático',
    fuel: 'Nafta',
    images: JSON.stringify(['https://images.unsplash.com/photo-1593714604578-d9e41b00c6c6?q=80&w=800&auto=format&fit=crop'])
  },
  {
    id: 2,
    brand: 'BMW',
    model: 'Series 3 320i Sport-Line Plus',
    year: 2022,
    price: 39800,
    mileage: 12100,
    transmission: 'Automático',
    fuel: 'Nafta',
    images: JSON.stringify(['https://images.unsplash.com/photo-1556139930-c23fa4a4f934?q=80&w=800&auto=format&fit=crop'])
  },
  {
    id: 3,
    brand: 'Ford',
    model: 'Mustang GT V8 Premium Performance',
    year: 2020,
    price: 45000,
    mileage: 20500,
    transmission: 'Automático',
    fuel: 'Nafta',
    images: JSON.stringify(['https://images.unsplash.com/photo-1584345604481-0304e76993a4?q=80&w=800&auto=format&fit=crop'])
  },
  {
    id: 4,
    brand: 'Volkswagen',
    model: 'Golf GTI Performance Pack',
    year: 2023,
    price: 32500,
    mileage: 5200,
    transmission: 'DSG Automático',
    fuel: 'Nafta',
    images: JSON.stringify(['https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?q=80&w=800&auto=format&fit=crop'])
  },
  {
    id: 5,
    brand: 'Audi',
    model: 'Q5 45 TFSI Quattro S-Line',
    year: 2021,
    price: 43200,
    mileage: 28000,
    transmission: 'Automático',
    fuel: 'Híbrido',
    images: JSON.stringify(['https://images.unsplash.com/photo-1541443131876-44b03de101c5?q=80&w=800&auto=format&fit=crop'])
  },
  {
    id: 6,
    brand: 'Mercedes-Benz',
    model: 'Clase C 200 Avantgarde Night Pack',
    year: 2023,
    price: 51200,
    mileage: 3500,
    transmission: 'Automático',
    fuel: 'Electrificado',
    images: JSON.stringify(['https://images.unsplash.com/photo-1622336496253-199651525547?q=80&w=800&auto=format&fit=crop'])
  },
  {
    id: 7,
    brand: 'Porsche',
    model: '911 Carrera S Turbo Look',
    year: 2019,
    price: 125000,
    mileage: 12000,
    transmission: 'PDK Automático',
    fuel: 'Nafta',
    images: JSON.stringify(['https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800&auto=format&fit=crop'])
  },
  {
    id: 8,
    brand: 'Land Rover',
    model: 'Range Rover Sport Dynamic',
    year: 2022,
    price: 89000,
    mileage: 8500,
    transmission: '4x4 Automático',
    fuel: 'Diesel',
    images: JSON.stringify(['https://images.unsplash.com/photo-1606148332159-00109cc99da5?q=80&w=800&auto=format&fit=crop'])
  },
  {
    id: 9,
    brand: 'Jeep',
    model: 'Wrangler Rubicon Unlimited',
    year: 2021,
    price: 65000,
    mileage: 18000,
    transmission: 'Manual 4x4',
    fuel: 'Nafta',
    images: JSON.stringify(['https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=800&auto=format&fit=crop'])
  },
  {
    id: 10,
    brand: 'Tesla',
    model: 'Model 3 Long Range',
    year: 2023,
    price: 42000,
    mileage: 1200,
    transmission: 'Direct Drive',
    fuel: 'Eléctrico',
    images: JSON.stringify(['https://images.unsplash.com/photo-1545641203-7d072a14e3b2?q=80&w=800&auto=format&fit=crop'])
  },
  {
    id: 11,
    brand: 'Honda',
    model: 'Civic Type R Limited Edition',
    year: 2021,
    price: 38900,
    mileage: 9400,
    transmission: 'Manual',
    fuel: 'Nafta',
    images: JSON.stringify(['https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=800&auto=format&fit=crop'])
  },
  {
    id: 12,
    brand: 'Chevrolet',
    model: 'Camaro SS V8 Muscle',
    year: 2022,
    price: 48500,
    mileage: 4200,
    transmission: 'Automático',
    fuel: 'Nafta',
    images: JSON.stringify(['https://images.unsplash.com/photo-1514316454349-750a7fd3da3a?q=80&w=800&auto=format&fit=crop'])
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
