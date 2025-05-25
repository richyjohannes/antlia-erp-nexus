
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Warehouse, FileText, Users, Zap, Shield, Star } from 'lucide-react';

export function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Temporary redirect to dashboard regardless of credentials
    navigate('/');
  };

  const features = [
    {
      icon: <Warehouse className="w-6 h-6" />,
      title: "Manajemen Gudang & Persediaan",
      description: "Kelola stok dan inventori dengan mudah"
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Laporan Keuangan & Akuntansi",
      description: "Laporan real-time dan akurat"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "HRD dan Absensi Karyawan",
      description: "Manajemen SDM terintegrasi"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Autopush Order",
      description: "Otomatisasi pemesanan cerdas"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Keamanan Data & Multi-Level Akses",
      description: "Keamanan tingkat enterprise"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Side - Login Form */}
      <div className="lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <Card className="w-full max-w-md shadow-2xl border-0">
          <CardHeader className="text-center pb-8">
            <div className="flex justify-center mb-6">
              <img 
                src="/assets/image/logo.png" 
                alt="Antlia Logo" 
                className="h-16 w-auto"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.nextElementSibling?.classList.remove('hidden');
                }}
              />
              <div className="hidden w-16 h-16 bg-gradient-to-r from-[#05b2fd] via-[#6f42c1] to-[#e17a9] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">A</span>
              </div>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-[#05b2fd] via-[#6f42c1] to-[#e17a9] bg-clip-text text-transparent">
              Welcome to Antlia
            </h1>
            <p className="text-gray-600 mt-2">Masuk ke sistem ERP terdepan</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <Label htmlFor="username" className="text-sm font-medium text-gray-700">
                  Username/Email/Telepon
                </Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="mt-1 h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Masukkan username, email, atau telepon"
                  required
                />
              </div>
              <div>
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Masukkan password"
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full h-12 text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 border-0"
                style={{
                  background: 'linear-gradient(135deg, #05b2fd 0%, #6f42c1 50%, #e17a9 100%)'
                }}
              >
                Masuk ke Antlia
              </Button>
            </form>
            <div className="mt-6 text-center">
              <a href="#" className="text-sm text-blue-600 hover:text-blue-800">
                Lupa password?
              </a>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right Side - Features */}
      <div 
        className="lg:w-1/2 relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #05b2fd 0%, #6f42c1 100%)'
        }}
      >
        {/* Animated Stars */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <Star
              key={i}
              className={`absolute text-white opacity-70 animate-pulse`}
              size={Math.random() * 8 + 4}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${Math.random() * 2 + 2}s`
              }}
            />
          ))}
        </div>

        <div className="relative z-10 p-8 lg:p-12 h-full flex flex-col justify-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-8">
            Kenapa Antlia ERP?
          </h2>
          
          <div className="space-y-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                <div className="flex items-center space-x-4">
                  <div className="text-white">{feature.icon}</div>
                  <div>
                    <h3 className="text-white font-semibold text-lg">
                      {feature.title}
                    </h3>
                    <p className="text-white/80 text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
