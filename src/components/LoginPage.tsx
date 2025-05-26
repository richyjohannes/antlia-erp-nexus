
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Warehouse, FileText, Users, Zap, Shield, Star, ChevronLeft, ChevronRight } from 'lucide-react';

export function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showInfo, setShowInfo] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Temporary redirect to dashboard regardless of credentials
    navigate('/dashboard');
  };

  const features = [
    {
      icon: <Warehouse className="w-6 h-6" />,
      title: "Manajemen Gudang",
      description: "Kelola inventori dan distribusi dengan efisien"
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Laporan Keuangan",
      description: "Analisis keuangan lengkap dan real-time"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "HRD & Absensi",
      description: "Manajemen karyawan dan kehadiran"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Pemesanan Otomatis",
      description: "Sistem otomatis untuk efisiensi maksimal"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Keamanan Data",
      description: "Perlindungan data tingkat enterprise"
    }
  ];

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        background: 'linear-gradient(135deg, #05b2fd 0%, #6f42c1 50%, #cb4848 100%)'
      }}
    >
      {/* Animated Stars Background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(100)].map((_, i) => (
          <Star
            key={i}
            className={`absolute text-white opacity-30 animate-pulse`}
            size={Math.random() * 6 + 2}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${Math.random() * 2 + 2}s`
            }}
          />
        ))}
      </div>

      {/* Main Container */}
      <Card className="relative z-10 w-full max-w-6xl overflow-hidden shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
        <div className="flex min-h-[600px]">
          {/* Mobile Navigation Buttons */}
          <div className="lg:hidden absolute top-4 left-4 z-20 flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowInfo(false)}
              className={`${!showInfo ? 'bg-white/20' : ''} text-gray-600`}
            >
              <ChevronLeft className="w-4 h-4" />
              Masuk
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowInfo(true)}
              className={`${showInfo ? 'bg-white/20' : ''} text-gray-600`}
            >
              Info
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Left Side - Login Form */}
          <div className={`w-full lg:w-1/2 flex items-center justify-center p-8 ${showInfo ? 'hidden lg:flex' : 'flex'}`}>
            <div className="w-full max-w-md">
              <div className="text-center mb-8">
                <div className="flex justify-center mb-6">
                  <img 
                    src="/assets/image/logo.png" 
                    alt="Antlia Logo" 
                    className="h-20 w-auto"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      target.nextElementSibling?.classList.remove('hidden');
                    }}
                  />
                  <div className="hidden w-20 h-20 rounded-xl flex items-center justify-center"
                    style={{
                      background: 'linear-gradient(135deg, #05b2fd 0%, #6f42c1 50%, #cb4848 100%)'
                    }}
                  >
                    <span className="text-white font-bold text-2xl">A</span>
                  </div>
                </div>
                <h1 className="text-4xl font-bold mb-2"
                  style={{
                    background: 'linear-gradient(135deg, #05b2fd 0%, #6f42c1 50%, #cb4848 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                >
                  Selamat Datang di Antlia
                </h1>
                <p className="text-gray-600 text-lg">Masuk ke Sistem ERP</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <Label htmlFor="username" className="text-sm font-semibold text-gray-700 mb-2 block">
                    Username, Email, atau Telepon
                  </Label>
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="h-12 border-2 border-gray-200 focus:border-transparent focus:ring-2 focus:ring-offset-2 rounded-xl text-lg focus:ring-blue-400"
                    placeholder="Masukkan username, email, atau telepon"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="password" className="text-sm font-semibold text-gray-700 mb-2 block">
                    Kata Sandi
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 border-2 border-gray-200 focus:border-transparent focus:ring-2 focus:ring-offset-2 rounded-xl text-lg focus:ring-blue-400"
                    placeholder="Masukkan kata sandi"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full h-14 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border-0 transform hover:scale-[1.02]"
                  style={{
                    background: 'linear-gradient(135deg, #05b2fd 0%, #6f42c1 50%, #cb4848 100%)'
                  }}
                >
                  Masuk ke Antlia
                </Button>
              </form>
              
              <div className="mt-8 text-center">
                <a href="#" className="text-sm font-medium hover:underline"
                  style={{
                    background: 'linear-gradient(135deg, #05b2fd 0%, #6f42c1 50%, #cb4848 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                >
                  Lupa Kata Sandi?
                </a>
              </div>
            </div>
          </div>

          {/* Right Side - Features Info */}
          <div 
            className={`w-full lg:w-1/2 relative overflow-hidden ${!showInfo ? 'hidden lg:block' : 'block'}`}
            style={{
              background: 'linear-gradient(135deg, #05b2fd 0%, #6f42c1 50%, #cb4848 100%)'
            }}
          >
            {/* Animated Stars */}
            <div className="absolute inset-0">
              {[...Array(30)].map((_, i) => (
                <Star
                  key={i}
                  className={`absolute text-white opacity-50 animate-pulse`}
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
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-8 text-center lg:text-left">
                Mengapa Memilih Antlia ERP?
              </h2>
              
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="bg-white/15 backdrop-blur-sm rounded-xl p-4 border border-white/30 hover:bg-white/25 transition-all duration-300 transform hover:scale-[1.02]"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="text-white p-2 rounded-lg bg-white/20">
                        {feature.icon}
                      </div>
                      <div>
                        <h3 className="text-white font-bold text-lg">
                          {feature.title}
                        </h3>
                        <p className="text-white/90 text-sm">
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
      </Card>
    </div>
  );
}
