"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Wrench, Droplet, Zap, Wind, Settings, Gauge, Battery, Shield, Phone, Mail, MapPin, ChevronRight, Facebook, Instagram, Twitter, Home, List, BookOpen, Clock, User, Calendar } from 'lucide-react';

const PedroGarage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [visibleSections, setVisibleSections] = useState(new Set());

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.05,
      rootMargin: '0px 0px -50px 0px'
    };

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setVisibleSections(prev => new Set([...prev, entry.target.dataset.section]));
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    // Delay untuk memastikan DOM sudah ready
    const timeoutId = setTimeout(() => {
      const sections = document.querySelectorAll('[data-section]');
      sections.forEach(section => observer.observe(section));
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, [currentPage]);

  const navigateToPage = (page) => {
    setCurrentPage(page);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Reset visible sections kemudian trigger ulang setelah render
    setVisibleSections(new Set());
    setTimeout(() => {
      const sections = document.querySelectorAll('[data-section]');
      const newVisible = new Set();
      sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
          newVisible.add(section.dataset.section);
        }
      });
      setVisibleSections(newVisible);
    }, 150);
  };

  const services = [
    { 
      icon: Wrench, 
      title: 'Service Motor', 
      desc: 'Perawatan lengkap untuk performa optimal motor Anda',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80'
    },
    { 
      icon: Droplet, 
      title: 'Ganti Oli', 
      desc: 'Penggantian oli mesin berkualitas untuk ketahanan maksimal',
      image: 'https://images.unsplash.com/photo-1615906655593-ad0386982a0f?w=800&q=80'
    },
    { 
      icon: Zap, 
      title: 'Ganti Module Writing', 
      desc: 'Perbaikan dan penggantian sistem kelistrikan motor',
      image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80'
    },
    { 
      icon: Wind, 
      title: 'Tune Up Mesin', 
      desc: 'Optimalisasi performa mesin untuk akselerasi lebih responsif',
      image: 'https://images.unsplash.com/photo-1625047509168-a7026f36de04?w=800&q=80'
    },
    { 
      icon: Settings, 
      title: 'Ganti Kampas Rem', 
      desc: 'Penggantian kampas rem untuk keamanan berkendara',
      image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&q=80'
    },
    { 
      icon: Gauge, 
      title: 'Setting Karburator', 
      desc: 'Penyetelan karburator untuk konsumsi BBM efisien',
      image: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800&q=80'
    },
    { 
      icon: Battery, 
      title: 'Ganti Aki', 
      desc: 'Penggantian aki motor dengan garansi resmi',
      image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&q=80'
    },
    { 
      icon: Shield, 
      title: 'Cuci Motor Premium', 
      desc: 'Pencucian motor dengan detailing lengkap dan waxing',
      image: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=800&q=80'
    },
  ];

  const blogPosts = [
    {
      id: 1,
      title: '5 Tips Merawat Motor Agar Tetap Prima',
      excerpt: 'Pelajari cara merawat motor Anda dengan baik agar performa tetap optimal dan usia pakai lebih panjang.',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
      author: 'Admin Pedro',
      date: '15 Januari 2024',
      readTime: '5 menit',
      category: 'Perawatan'
    },
    {
      id: 2,
      title: 'Kapan Waktu Tepat Ganti Oli Motor?',
      excerpt: 'Mengetahui waktu yang tepat untuk mengganti oli motor sangat penting untuk menjaga kesehatan mesin.',
      image: 'https://images.unsplash.com/photo-1615906655593-ad0386982a0f?w=800&q=80',
      author: 'Admin Pedro',
      date: '12 Januari 2024',
      readTime: '4 menit',
      category: 'Tips & Trik'
    },
    {
      id: 3,
      title: 'Tanda-Tanda Kampas Rem Harus Diganti',
      excerpt: 'Kenali tanda-tanda kampas rem yang sudah aus untuk keselamatan berkendara Anda.',
      image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&q=80',
      author: 'Admin Pedro',
      date: '10 Januari 2024',
      readTime: '6 menit',
      category: 'Keamanan'
    },
    {
      id: 4,
      title: 'Cara Merawat Aki Motor Agar Awet',
      excerpt: 'Tips praktis merawat aki motor agar tidak mudah tekor dan lebih tahan lama.',
      image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&q=80',
      author: 'Admin Pedro',
      date: '8 Januari 2024',
      readTime: '5 menit',
      category: 'Perawatan'
    },
    {
      id: 5,
      title: 'Pentingnya Tune Up Mesin Secara Berkala',
      excerpt: 'Tune up mesin berkala dapat meningkatkan performa dan efisiensi bahan bakar motor Anda.',
      image: 'https://images.unsplash.com/photo-1625047509168-a7026f36de04?w=800&q=80',
      author: 'Admin Pedro',
      date: '5 Januari 2024',
      readTime: '7 menit',
      category: 'Tips & Trik'
    },
    {
      id: 6,
      title: 'Cara Mencuci Motor yang Benar',
      excerpt: 'Teknik mencuci motor yang tepat agar cat tetap mengkilap dan tidak merusak komponen.',
      image: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=800&q=80',
      author: 'Admin Pedro',
      date: '3 Januari 2024',
      readTime: '4 menit',
      category: 'Perawatan'
    }
  ];

  const renderHomePage = () => (
    <>
      {/* Hero Section */}
      <section 
        className={`relative min-h-screen flex items-center justify-center overflow-hidden z-10 transition-all duration-700 ${
          visibleSections.has('hero') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
        data-section="hero"
      >
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="animate-fade-in">
            <div className="mb-8">
              <div className="inline-block p-6 bg-yellow-500/10 rounded-2xl border-2 border-yellow-500/30 backdrop-blur-sm shadow-2xl">
                <Wrench className="w-20 h-20 md:w-24 md:h-24 text-yellow-500 mx-auto" />
              </div>
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 drop-shadow-2xl">
              <span className="text-yellow-500">Pedro</span> Garage
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto drop-shadow-lg">
              Bengkel Motor Terpercaya Sejak 2010
            </p>
            <button
              onClick={() => navigateToPage('services')}
              className="group bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-10 py-5 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl inline-flex items-center space-x-2"
            >
              <span>Lihat Layanan Kami</span>
              <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section 
        className={`relative py-20 md:py-32 z-10 transition-all duration-700 delay-100 ${
          visibleSections.has('about') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
        data-section="about"
      >
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-black/60 backdrop-blur-sm p-8 md:p-16 rounded-2xl shadow-2xl border border-yellow-500/20">
            <div className="text-center mb-12">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
                Tentang <span className="text-yellow-500">Pedro Garage</span>
              </h2>
              <div className="w-24 h-1 bg-yellow-500 mx-auto mb-8" />
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 text-gray-300 text-lg leading-relaxed">
              <div>
                <p className="mb-6">
                  Pedro Garage adalah bengkel motor profesional yang telah melayani ribuan pelanggan sejak tahun 2010. Kami berkomitmen memberikan pelayanan terbaik dengan teknisi berpengalaman dan peralatan modern.
                </p>
                <p>
                  Dengan pengalaman lebih dari 13 tahun, kami memahami setiap kebutuhan kendaraan Anda. Dari perawatan rutin hingga perbaikan besar, kami siap melayani dengan sepenuh hati.
                </p>
              </div>
              <div>
                <p className="mb-6">
                  Kepercayaan pelanggan adalah prioritas utama kami. Setiap pekerjaan dilakukan dengan teliti dan menggunakan suku cadang original untuk menjamin kualitas dan ketahanan.
                </p>
                <div className="grid grid-cols-2 gap-4 mt-8">
                  <div className="bg-yellow-500/10 p-4 rounded-lg border border-yellow-500/30">
                    <div className="text-3xl font-bold text-yellow-500 mb-2">13+</div>
                    <div className="text-sm text-gray-400">Tahun Pengalaman</div>
                  </div>
                  <div className="bg-yellow-500/10 p-4 rounded-lg border border-yellow-500/30">
                    <div className="text-3xl font-bold text-yellow-500 mb-2">5000+</div>
                    <div className="text-sm text-gray-400">Pelanggan Puas</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview Section */}
      <section 
        className={`relative py-20 md:py-32 z-10 transition-all duration-700 delay-150 ${
          visibleSections.has('services-preview') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
        data-section="services-preview"
      >
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
              Layanan <span className="text-yellow-500">Kami</span>
            </h2>
            <div className="w-24 h-1 bg-yellow-500 mx-auto mb-8" />
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Berbagai layanan profesional untuk kendaraan Anda
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {services.slice(0, 4).map((service, index) => (
              <div
                key={index}
                className="group relative bg-zinc-900/80 backdrop-blur-sm rounded-xl overflow-hidden shadow-2xl border border-yellow-500/20 hover:border-yellow-500/50 transition-all duration-500 transform hover:-translate-y-2"
                style={{
                  transitionDelay: `${index * 100}ms`
                }}
              >
                <div className="aspect-video overflow-hidden bg-zinc-800">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="p-6">
                  <div className="bg-yellow-500 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <service.icon className="w-6 h-6 text-black" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {service.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={() => navigateToPage('services')}
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-xl inline-flex items-center space-x-2"
            >
              <span>Lihat Semua Layanan</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section 
        className={`relative py-20 md:py-32 z-10 transition-all duration-700 delay-200 ${
          visibleSections.has('contact') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
        data-section="contact"
      >
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
              Hubungi <span className="text-yellow-500">Kami</span>
            </h2>
            <div className="w-24 h-1 bg-yellow-500 mx-auto" />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Phone, title: 'Telepon', value: '+62 812-3456-7890', link: 'tel:+6281234567890' },
              { icon: Mail, title: 'Email', value: 'info@pedrogarage.com', link: 'mailto:info@pedrogarage.com' },
              { icon: MapPin, title: 'Alamat', value: 'Jl Karang Rejo No29, Gendongan, Tingkir, Kota Salatiga, Jawa Tengah', link: 'https://maps.google.com/?q=-7.3396264,110.5066352' },
            ].map((contact, index) => (
              <a
                key={index}
                href={contact.link}
                className="bg-zinc-900/80 backdrop-blur-sm p-8 rounded-xl text-center border border-yellow-500/20 hover:border-yellow-500/50 transition-all duration-500 transform hover:-translate-y-2 shadow-2xl"
                style={{
                  transitionDelay: `${index * 100}ms`
                }}
              >
                <contact.icon className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">{contact.title}</h3>
                <p className="text-gray-400">{contact.value}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Location Map Section */}
      <section 
        className={`relative py-20 md:py-32 z-10 transition-all duration-700 delay-300 ${
          visibleSections.has('location') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
        data-section="location"
      >
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
              Lokasi <span className="text-yellow-500">Kami</span>
            </h2>
            <div className="w-24 h-1 bg-yellow-500 mx-auto mb-8" />
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Kunjungi bengkel kami untuk layanan terbaik
            </p>
          </div>

          <div className="bg-zinc-900/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-2xl border border-yellow-500/20">
            <div className="aspect-video w-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3956.8!2d110.5066352!3d-7.3396264!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwMjAnMjIuNyJTIDExMMKwMzAnMjMuOSJF!5e0!3m2!1sen!2sid!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </div>
            <div className="p-8 bg-zinc-900/60">
              <div className="flex items-start space-x-4">
                <MapPin className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Pedro Garage</h3>
                  <p className="text-gray-400 mb-4">
                    Jl Karang Rejo No29, Gendongan, Tingkir<br />
                    Kota Salatiga, Jawa Tengah
                  </p>
                  <a
                    href="https://maps.google.com/?q=-7.3396264,110.5066352"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
                  >
                    <MapPin className="w-5 h-5" />
                    <span>Buka di Google Maps</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );

  const renderServicesPage = () => (
    <section 
      className={`relative min-h-screen py-32 z-10 transition-all duration-700 ${
        visibleSections.has('all-services') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      data-section="all-services"
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
            Semua <span className="text-yellow-500">Layanan</span>
          </h1>
          <div className="w-24 h-1 bg-yellow-500 mx-auto mb-8" />
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Layanan lengkap untuk semua kebutuhan motor Anda
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative bg-zinc-900/80 backdrop-blur-sm rounded-xl overflow-hidden shadow-2xl border border-yellow-500/20 hover:border-yellow-500/50 transition-all duration-500 transform hover:-translate-y-2"
              style={{
                transitionDelay: `${index * 100}ms`
              }}
            >
              <div className="aspect-video overflow-hidden bg-zinc-800">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="p-6">
                <div className="bg-yellow-500 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <service.icon className="w-6 h-6 text-black" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {service.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  const renderBlogPage = () => (
    <section 
      className={`relative min-h-screen py-32 z-10 transition-all duration-700 ${
        visibleSections.has('blog') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      data-section="blog"
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
            <span className="text-yellow-500">Blog</span> & Tips
          </h1>
          <div className="w-24 h-1 bg-yellow-500 mx-auto mb-8" />
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Tips dan informasi seputar perawatan motor
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <article
              key={post.id}
              className="group bg-zinc-900/80 backdrop-blur-sm rounded-xl overflow-hidden shadow-2xl border border-yellow-500/20 hover:border-yellow-500/50 transition-all duration-500 transform hover:-translate-y-2"
              style={{
                transitionDelay: `${index * 100}ms`
              }}
            >
              <div className="aspect-video overflow-hidden bg-zinc-800">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <span className="px-3 py-1 bg-yellow-500/20 text-yellow-500 text-xs font-semibold rounded-full border border-yellow-500/30">
                    {post.category}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-yellow-500 transition-colors duration-300">
                  {post.title}
                </h3>
                
                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between text-gray-500 text-xs border-t border-yellow-500/10 pt-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <User className="w-4 h-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{post.date}</span>
                  </div>
                </div>
                
                <button className="mt-4 w-full bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-500 font-semibold px-4 py-2 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 group border border-yellow-500/20 hover:border-yellow-500/40">
                  <span>Baca Selengkapnya</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );

  return (
    <div className="min-h-screen bg-black relative">
      {/* Fixed Grid Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div 
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 215, 0, 0.25) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 215, 0, 0.25) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            boxShadow: 'inset 0 0 100px rgba(0, 0, 0, 0.8)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/30" />
      </div>
      
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-black/95 backdrop-blur-md shadow-2xl border-b border-yellow-500/20' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <button 
              onClick={() => navigateToPage('home')}
              className="flex items-center space-x-3 group"
            >
              <Wrench className="w-8 h-8 text-yellow-500 group-hover:rotate-12 transition-transform duration-300" />
              <span className="text-2xl font-bold text-white">
                Pedro <span className="text-yellow-500">Garage</span>
              </span>
            </button>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              {[
                { id: 'home', label: 'Beranda', icon: Home },
                { id: 'services', label: 'Layanan', icon: List },
                { id: 'blog', label: 'Blog', icon: BookOpen }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => navigateToPage(item.id)}
                  className={`flex items-center space-x-2 font-medium transition-colors duration-300 ${
                    currentPage === item.id ? 'text-yellow-500' : 'text-gray-300 hover:text-yellow-500'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-yellow-500"
            >
              {isMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-black/98 backdrop-blur-md border-t border-yellow-500/20">
            <div className="px-4 py-6 space-y-4">
              {[
                { id: 'home', label: 'Beranda', icon: Home },
                { id: 'services', label: 'Layanan', icon: List },
                { id: 'blog', label: 'Blog', icon: BookOpen }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => navigateToPage(item.id)}
                  className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg transition-all duration-300 ${
                    currentPage === item.id 
                      ? 'bg-yellow-500/20 text-yellow-500' 
                      : 'text-gray-300 hover:bg-yellow-500/10'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Page Content */}
      {currentPage === 'home' && renderHomePage()}
      {currentPage === 'services' && renderServicesPage()}
      {currentPage === 'blog' && renderBlogPage()}

      {/* Footer */}
      <footer className="relative bg-zinc-950 text-white py-12 border-t border-yellow-500/20 z-10">
        <div className="absolute inset-0 opacity-5">
          <div 
            style={{
              backgroundImage: `
                linear-gradient(rgba(255, 215, 0, 0.2) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255, 215, 0, 0.2) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px'
            }}
            className="w-full h-full"
          />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            <div className="flex items-center space-x-3">
              <Wrench className="w-7 h-7 text-yellow-500" />
              <span className="text-xl font-bold">Pedro <span className="text-yellow-500">Garage</span></span>
            </div>
            
            <div className="flex space-x-6">
              <a href="#" className="hover:text-yellow-500 transition-colors duration-300">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-yellow-500 transition-colors duration-300">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-yellow-500 transition-colors duration-300">
                <Twitter className="w-6 h-6" />
              </a>
            </div>
            
            <p className="text-gray-400 text-sm">
              © 2024 Pedro Garage. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }

        html {
          scroll-behavior: smooth;
        }

        * {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
};

export default PedroGarage;