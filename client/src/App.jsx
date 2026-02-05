import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Car, ChevronRight, Menu, X, Filter, User, LogIn, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from './assets/logo.jpg';

const API_URL = 'http://localhost:5000/api';

const Navbar = ({ onSearch }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-black/95 backdrop-blur-md py-4 shadow-xl' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-3 group cursor-pointer">
          <img src={logo} alt="Punto Car" className="h-12 w-auto rounded-xl border border-white/20 group-hover:scale-110 transition-transform shadow-lg shadow-accent/20" />
          <span className="text-white font-black text-2xl tracking-tighter">PUNTO CAR</span>
        </div>
        <div className="hidden lg:flex items-center gap-10 text-white/90 font-semibold uppercase text-sm tracking-widest">
          <a href="#catalog" onClick={() => onSearch('')} className="hover:text-accent transition-colors">Comprar</a>
          <a href="#vender" className="hover:text-accent transition-colors">Vender</a>
          <a href="#finance" className="hover:text-accent transition-colors">Financiación</a>
          <a href="#about" className="hover:text-white transition-colors">Nosotros</a>
        </div>
        <div className="flex items-center gap-6">
          <button className="hidden md:flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-5 py-2 rounded-full border border-white/10 transition-all font-bold text-sm">
            <User size={18} /> Iniciar Sesión
          </button>
          <button className="lg:hidden text-white">
            <Menu size={28} />
          </button>
        </div>
      </div>
    </nav>
  );
};

const FiltersSidebar = ({ filters, setFilters, brands, years }) => {
  return (
    <div className="space-y-10 pr-8">
      <div>
        <h4 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-2 uppercase tracking-tighter">
          <Filter size={18} className="text-accent" /> Filtros
        </h4>
        <div className="space-y-8">
          {/* Brand Filter */}
          <div>
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-4">Marca</label>
            <div className="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
              <button
                onClick={() => setFilters({ ...filters, brand: '' })}
                className={`text-left px-4 py-3 rounded-xl text-sm font-bold transition-all ${!filters.brand ? 'bg-accent text-white shadow-lg shadow-accent/20' : 'bg-white text-slate-600 hover:bg-slate-100'}`}
              >
                Todas las marcas
              </button>
              {brands.map(brand => (
                <button
                  key={brand}
                  onClick={() => setFilters({ ...filters, brand })}
                  className={`text-left px-4 py-3 rounded-xl text-sm font-bold transition-all ${filters.brand === brand ? 'bg-accent text-white shadow-lg shadow-accent/20' : 'bg-white text-slate-600 hover:bg-slate-100'}`}
                >
                  {brand}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-4">Precio (hasta)</label>
            <input
              type="range"
              min="0"
              max="150000"
              step="5000"
              value={filters.maxPrice}
              onChange={(e) => setFilters({ ...filters, maxPrice: parseInt(e.target.value) })}
              className="w-full accent-accent bg-slate-200 h-2 rounded-lg cursor-pointer"
            />
            <span className="text-sm font-black text-slate-900 mt-2 block">${filters.maxPrice.toLocaleString()}</span>
          </div>

          {/* Year Range */}
          <div>
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-4">Año mínimo</label>
            <select
              value={filters.minYear}
              onChange={(e) => setFilters({ ...filters, minYear: parseInt(e.target.value) })}
              className="w-full p-4 bg-white border border-slate-100 rounded-2xl font-bold text-slate-800 shadow-sm focus:ring-2 focus:ring-accent/50 outline-none"
            >
              <option value="2000">Desde todos los años</option>
              {years.map(year => <option key={year} value={year}>{year}</option>)}
            </select>
          </div>
        </div>
      </div>
      <button
        onClick={() => setFilters({ brand: '', maxPrice: 150000, minYear: 2000, search: '' })}
        className="w-full py-4 text-xs font-black text-slate-400 hover:text-accent uppercase tracking-widest transition-colors flex items-center justify-center gap-2 border-t border-slate-100 pt-6"
      >
        <X size={14} /> Limpiar Filtros
      </button>
    </div>
  );
};

const Hero = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState('');

  return (
    <div className="relative h-[90vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-hero-pattern bg-cover bg-center scale-105 active:scale-100 transition-transform duration-1000">
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-slate-50" />
      </div>
      <div className="relative container mx-auto px-6 text-center text-white z-10 pt-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-12 flex justify-center"
        >
          <div className="relative group">
            <div className="absolute inset-0 bg-accent/30 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <img
              src={logo}
              alt="Punto Car Logo"
              className="h-40 md:h-60 w-auto rounded-[2rem] shadow-[0_0_50px_rgba(225,6,0,0.3)] border-2 border-white/10 relative z-10 hover:rotate-2 transition-transform duration-500"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-6xl md:text-8xl font-black mb-8 leading-[0.9] tracking-[ -0.05em]">
            COMPRÁ TU AUTO <br /><span className="text-accent italic">A TU MANERA.</span>
          </h1>
          <p className="text-lg md:text-xl text-white/70 mb-12 font-medium max-w-xl mx-auto uppercase tracking-tighter">
            La mayor selección de usados premium con garantía total.
          </p>

          <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-3xl rounded-[2.5rem] p-2 border border-white/20 shadow-3xl flex flex-col md:flex-row gap-2">
            <div className="flex-1 flex items-center px-8">
              <Search className="text-accent mr-3" size={24} />
              <input
                type="text"
                placeholder="Busca por Marca, Modelo..."
                className="w-full py-6 focus:outline-none text-white placeholder-white/40 bg-transparent font-bold text-lg"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && onSearch(searchValue)}
              />
            </div>
            <button
              onClick={() => onSearch(searchValue)}
              className="bg-accent hover:bg-accent-hover text-white px-12 py-6 rounded-[2rem] font-black text-lg transition-all shadow-xl shadow-accent/20 active:scale-95 flex items-center justify-center gap-3"
            >
              Buscar <ChevronRight size={24} />
            </button>
          </div>
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
    images: JSON.stringify(['https://images.unsplash.com/photo-1621339011221-16089853905c?q=80&w=800&auto=format&fit=crop'])
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
    images: JSON.stringify(['https://images.unsplash.com/photo-1555214107-f2e7c485a488?q=80&w=800&auto=format&fit=crop'])
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
    images: JSON.stringify(['https://images.unsplash.com/photo-1549317661-bd348a54c2b1?q=80&w=800&auto=format&fit=crop'])
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
    images: JSON.stringify(['https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=800&auto=format&fit=crop'])
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
    images: JSON.stringify(['https://images.unsplash.com/photo-1623910543632-159e19d53c3e?q=80&w=800&auto=format&fit=crop'])
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
    images: JSON.stringify(['https://images.unsplash.com/photo-1536700503339-1e4b06520771?q=80&w=800&auto=format&fit=crop'])
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
    images: JSON.stringify(['https://images.unsplash.com/photo-1594508601248-20d755714341?q=80&w=800&auto=format&fit=crop'])
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
    images: JSON.stringify(['https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=800&auto=format&fit=crop'])
  }
];

export default function App() {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    brand: '',
    minYear: 2010,
    maxPrice: 150000,
    search: ''
  });
  const [sort, setSort] = useState('newest');

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get(API_URL + '/cars');
        const data = response.data.length > 0 ? response.data : MOCK_CARS;
        setCars(data);
        setFilteredCars(data);
      } catch (err) {
        setCars(MOCK_CARS);
        setFilteredCars(MOCK_CARS);
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, []);

  useEffect(() => {
    let result = [...cars];

    // Filter by Search
    if (filters.search) {
      const term = filters.search.toLowerCase();
      result = result.filter(c =>
        c.brand.toLowerCase().includes(term) ||
        c.model.toLowerCase().includes(term)
      );
    }

    // Filter by Brand
    if (filters.brand) {
      result = result.filter(c => c.brand === filters.brand);
    }

    // Filter by Year
    result = result.filter(c => c.year >= filters.minYear);

    // Filter by Price
    result = result.filter(c => c.price <= filters.maxPrice);

    // Sort
    if (sort === 'price-asc') result.sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') result.sort((a, b) => b.price - a.price);
    if (sort === 'newest') result.sort((a, b) => b.year - a.year);

    setFilteredCars(result);
  }, [filters, sort, cars]);

  const brands = Array.from(new Set(MOCK_CARS.map(c => c.brand))).sort();
  const years = Array.from(new Set(MOCK_CARS.map(c => c.year))).sort((a, b) => b - a);

  return (
    <div className="min-h-screen bg-slate-50 selection:bg-accent selection:text-white">
      <Navbar onSearch={(search) => setFilters({ ...filters, search })} />
      <Hero onSearch={(search) => setFilters({ ...filters, search })} />

      <main id="catalog" className="container mx-auto px-6 py-24">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar */}
          <aside className="w-full lg:w-72 lg:shrink-0">
            <div className="sticky top-28 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50">
              <FiltersSidebar
                filters={filters}
                setFilters={setFilters}
                brands={brands}
                years={years}
              />
            </div>
          </aside>

          {/* Content */}
          <div className="flex-1">
            <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
              <div>
                <h2 className="text-4xl font-black text-slate-900 leading-tight">Catálogo <span className="text-accent underline decoration-4 decoration-accent/20">Premium</span></h2>
                <p className="text-slate-500 font-bold mt-2 uppercase tracking-widest text-xs">
                  {filteredCars.length} Vehículos Disponibles
                </p>
              </div>
              <div className="flex items-center gap-4 bg-white p-2 rounded-2xl border border-slate-100 shadow-sm">
                <span className="text-xs font-black text-slate-400 uppercase tracking-widest pl-4">Ordenar:</span>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="bg-transparent font-bold text-slate-800 focus:outline-none pr-4 py-2 cursor-pointer"
                >
                  <option value="newest">Más nuevos</option>
                  <option value="price-asc">Menor precio</option>
                  <option value="price-desc">Mayor precio</option>
                </select>
              </div>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="h-96 bg-slate-200 animate-pulse rounded-[2.5rem]" />
                ))}
              </div>
            ) : filteredCars.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {filteredCars.map(car => (
                  <CarCard key={car.id} car={car} />
                ))}
              </div>
            ) : (
              <div className="text-center py-32 bg-white rounded-[3rem] border-2 border-dashed border-slate-200">
                <div className="bg-slate-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search size={40} className="text-slate-300" />
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-2">No encontramos resultados</h3>
                <p className="text-slate-500 mb-8 font-medium">Probá cambiando los filtros o buscando otro modelo.</p>
                <button
                  onClick={() => setFilters({ brand: '', maxPrice: 150000, minYear: 2000, search: '' })}
                  className="btn-accent px-10 py-4"
                >
                  Ver todos los autos
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Sell Section */}
        <section id="vender" className="mt-48 relative rounded-[3.5rem] overflow-hidden bg-primary p-12 md:p-24 shadow-2xl">
          <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?q=80&w=2000')] bg-cover bg-center" />
          <div className="relative z-10 grid md:grid-cols-2 gap-20 items-center">
            <div>
              <span className="bg-accent text-white px-5 py-2 rounded-full text-xs font-black uppercase tracking-[0.2em] mb-8 inline-block shadow-lg shadow-accent/20">Venta rápida</span>
              <h2 className="text-5xl md:text-7xl font-black text-white mb-8 leading-[0.9] tracking-tighter">¿QUERÉS VENDER <br /><span className="text-accent italic">TU AUTO HOY?</span></h2>
              <p className="text-xl text-white/50 mb-12 max-w-lg leading-relaxed font-medium">Cotizamos tu auto en el acto. Pago inmediato, sin riesgos y con toda la transferencia a nuestro cargo.</p>
              <div className="flex flex-col sm:flex-row gap-6">
                <button className="bg-accent hover:bg-accent-hover text-white px-12 py-6 rounded-[2rem] font-black text-lg transition-all shadow-xl shadow-accent/20 active:scale-95">Cotizar ahora</button>
                <button className="bg-white/10 hover:bg-white/20 text-white px-12 py-6 rounded-[2rem] font-bold text-lg backdrop-blur-md transition-all border border-white/10">Ver cómo funciona</button>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white/5 p-8 rounded-[2.5rem] backdrop-blur-xl border border-white/5">
                  <h4 className="text-4xl font-black text-accent mb-2">+5k</h4>
                  <p className="text-sm font-bold text-white/40 uppercase tracking-widest">Autos comprados</p>
                </div>
                <div className="bg-white/5 p-8 rounded-[2.5rem] backdrop-blur-xl border border-white/5 mt-12">
                  <h4 className="text-4xl font-black text-accent mb-2">24h</h4>
                  <p className="text-sm font-bold text-white/40 uppercase tracking-widest">Pago garantizado</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
