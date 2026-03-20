'use client';

import React from 'react';
import { 
  ShoppingBag, 
  ExternalLink, 
  Clock, 
  Cpu, 
  Globe, 
  Zap, 
  ChevronRight, 
  Layers 
} from 'lucide-react';

interface Product {
  id: string;
  title: string;
  description: string;
  type: 'Software' | 'Hardware';
  status: 'Live' | 'Waitlist';
  link: string;
  tags: string[];
}

const products: Product[] = [
  {
    id: 'base-01',
    title: 'BASE Platform',
    description: 'The ultimate Business & Academic Support Ecosystem. A centralized hub for project management, technical education, and creative resources.',
    type: 'Software',
    status: 'Live',
    link: 'https://base-lake.vercel.app/',
    tags: []
  },
  {
    id: 'sw-01',
    title: 'Britext AI',
    description: 'An intelligent literary platform designed for seamless content creation and semantic analysis for modern publishers.',
    type: 'Software',
    status: 'Waitlist',
    link: 'https://waitlist.inanst.com/britext', // Replace with your actual waitlist URLs
    tags: ['AI', 'Literary']
  },
  {
    id: 'sw-02',
    title: 'AgroStore Hub',
    description: 'Digital infrastructure for sustainable agriculture storage solutions, tracking perishables in real-time to reduce post-harvest loss.',
    type: 'Software',
    status: 'Waitlist',
    link: 'https://waitlist.inanst.com/agrostore',
    tags: ['SDG 2', 'Sustainability']
  },
  {
    id: 'sw-03',
    title: 'Tidefi Core',
    description: 'A simplified financial market interface built to bridge the gap between complex stock analysis and everyday investors.',
    type: 'Software',
    status: 'Waitlist',
    link: 'https://waitlist.inanst.com/tidefi',
    tags: ['Fintech', 'Analysis']
  },
  {
    id: 'hw-01',
    title: 'Inanst Node-1',
    description: 'Edge computing hardware designed for secure, localized data processing for small-to-medium business hubs.',
    type: 'Hardware',
    status: 'Waitlist',
    link: 'https://waitlist.inanst.com/node1',
    tags: ['Edge', 'Infrastructure']
  },
  {
    id: 'hw-02',
    title: 'Smart Silo Sensor',
    description: 'IoT-enabled hardware for monitoring grain moisture and temperature, integrated directly with AgroStore Hub.',
    type: 'Hardware',
    status: 'Waitlist',
    link: 'https://waitlist.inanst.com/silo-sensor',
    tags: ['IoT', 'Hardware']
  }
];

export default function ProductsPage() {
  return (
    <div className="space-y-12 pb-20 animate-in fade-in duration-700">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-100 pb-10">
        <div className="max-w-2xl">
          <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full mb-4">
            <ShoppingBag size={16} />
            <span className="text-[10px] font-black uppercase tracking-widest">Inanst Portfolio</span>
          </div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">Products & Innovation</h1>
          <p className="text-gray-500 mt-4 leading-relaxed">
            Explore our curated digital assets, creative tools, and upcoming hardware offerings.
          </p>
        </div>
        
        <div className="hidden lg:block bg-gray-50 border border-gray-100 p-6 rounded-[2rem]">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Total Assets</p>
            <p className="text-2xl font-black text-gray-900">{products.length} Units</p>
        </div>
      </div>

      {/* Live Platforms Section */}
      <section>
        <div className="flex items-center space-x-2 mb-8">
          <Zap className="text-amber-500" size={20} />
          <h2 className="text-xl font-black text-gray-900 tracking-tight uppercase">Live Now</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.filter(p => p.status === 'Live').map((product) => (
            <a 
              key={product.id}
              href={product.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-white border border-gray-200 rounded-[2.5rem] p-8 hover:border-blue-600 hover:shadow-2xl hover:shadow-blue-100 transition-all duration-500"
            >
              <div className="absolute top-0 right-0 p-6">
                <ExternalLink className="text-gray-300 group-hover:text-blue-600 transition-colors" size={20} />
              </div>
              <div className="p-4 bg-blue-600 rounded-2xl inline-block mb-6 shadow-lg shadow-blue-200 group-hover:scale-110 transition-transform">
                <Globe className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-3">{product.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed mb-4">{product.description}</p>
              <div className="mt-auto flex items-center text-blue-600 text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                Launch Application <ChevronRight size={14} className="ml-1 translate-x-0 group-hover:translate-x-1 transition-transform" />
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Waitlist Section */}
      <section>
        <div className="flex items-center space-x-2 mb-8">
          <Clock className="text-blue-600" size={20} />
          <h2 className="text-xl font-black text-gray-900 tracking-tight uppercase">Strategic Roadmap</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.filter(p => p.status === 'Waitlist').map((product) => (
            <a 
              key={product.id}
              href={product.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col bg-white border border-gray-100 rounded-[2.5rem] p-8 hover:border-gray-900 hover:shadow-xl hover:shadow-gray-100 transition-all duration-300 group"
            >
              <div className="flex justify-between items-start mb-6">
                <div className={`p-4 rounded-2xl ${product.type === 'Hardware' ? 'bg-purple-50 text-purple-600' : 'bg-blue-50 text-blue-600'}`}>
                  {product.type === 'Hardware' ? <Cpu size={24} /> : <Layers size={24} />}
                </div>
                <span className="bg-gray-100 text-gray-500 text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest group-hover:bg-gray-900 group-hover:text-white transition-colors">
                  Waitlist
                </span>
              </div>
              
              <div className="flex-grow">
                <h4 className="text-lg font-black text-gray-900 group-hover:text-blue-600 transition-colors">{product.title}</h4>
                <p className="text-sm text-gray-500 mt-3 leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div className="mt-6 flex items-center text-gray-400 text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                Request Early Access <ChevronRight size={14} className="ml-1 translate-x-0 group-hover:translate-x-1 transition-transform" />
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}