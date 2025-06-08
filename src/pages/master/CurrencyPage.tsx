
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useColors } from '@/contexts/ColorContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Search, Download, Edit, Trash2, RefreshCw } from 'lucide-react';

interface Currency {
  id: number;
  code: string;
  name: string;
  symbol: string;
  isDefault: boolean;
  isActive: boolean;
}

interface CurrencyRate {
  id: number;
  currency: string;
  value: number;
  sell: number;
  buy: number;
  date: string;
}

const CurrencyPage = () => {
  const { t } = useTranslation();
  const { colors } = useColors();
  const { isDark } = useTheme();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState('2024-01-15');
  const [searchTerm, setSearchTerm] = useState('');

  // Dummy data for currencies
  const [currencies, setCurrencies] = useState<Currency[]>([
    { id: 1, code: 'IDR', name: 'Indonesian Rupiah', symbol: 'Rp', isDefault: true, isActive: true },
    { id: 2, code: 'USD', name: 'US Dollar', symbol: '$', isDefault: false, isActive: true },
    { id: 3, code: 'EUR', name: 'Euro', symbol: '€', isDefault: false, isActive: true },
    { id: 4, code: 'SGD', name: 'Singapore Dollar', symbol: 'S$', isDefault: false, isActive: false },
  ]);

  // Dummy data for currency rates
  const [currencyRates] = useState<CurrencyRate[]>([
    { id: 1, currency: 'USD', value: 15500, sell: 15550, buy: 15450, date: '2024-01-15' },
    { id: 2, currency: 'EUR', value: 16800, sell: 16850, buy: 16750, date: '2024-01-15' },
    { id: 3, currency: 'SGD', value: 11400, sell: 11450, buy: 11350, date: '2024-01-15' },
    { id: 4, currency: 'JPY', value: 104, sell: 106, buy: 102, date: '2024-01-15' },
  ];

  const [newCurrency, setNewCurrency] = useState({
    code: '',
    name: '',
    symbol: '',
    isDefault: false
  });

  const filteredCurrencies = currencies.filter(currency =>
    currency.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    currency.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddCurrency = () => {
    const newId = Math.max(...currencies.map(c => c.id)) + 1;
    setCurrencies([...currencies, {
      id: newId,
      ...newCurrency,
      isActive: true
    }]);
    setNewCurrency({ code: '', name: '', symbol: '', isDefault: false });
    setIsAddModalOpen(false);
  };

  const toggleCurrencyStatus = (id: number) => {
    setCurrencies(currencies.map(currency =>
      currency.id === id ? { ...currency, isActive: !currency.isActive } : currency
    ));
  };

  return (
    <div 
      className="p-6 space-y-6 min-h-screen"
      style={{ 
        backgroundColor: 'var(--theme-bg-main)',
        color: 'var(--theme-text-primary)'
      }}
    >
      {/* Header Card for Currency Data */}
      <Card 
        className="shadow-lg border-0"
        style={{ backgroundColor: 'var(--theme-card-bg)' }}
      >
        <CardHeader 
          className="flex flex-row items-center justify-between p-6 rounded-t-lg"
          style={{ background: 'var(--theme-card-header-bg)' }}
        >
          <CardTitle className="text-white text-2xl font-bold">
            Data Mata Uang
          </CardTitle>
          <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-[#00d4ff] via-[#8a2be2] to-[#ff69b4] text-white hover:opacity-90 px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300">
                <Plus className="h-4 w-4 mr-2" />
                Tambah Currency
              </Button>
            </DialogTrigger>
            <DialogContent 
              className="border-0"
              style={{ 
                backgroundColor: 'var(--theme-card-bg)',
                color: 'var(--theme-text-primary)'
              }}
            >
              <DialogHeader>
                <DialogTitle 
                  style={{ color: 'var(--theme-text-primary)' }}
                >
                  Tambah Mata Uang Baru
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="code" style={{ color: 'var(--theme-text-primary)' }}>
                    Kode Mata Uang
                  </Label>
                  <Input
                    id="code"
                    value={newCurrency.code}
                    onChange={(e) => setNewCurrency({...newCurrency, code: e.target.value})}
                    placeholder="Contoh: USD"
                    className="border-0"
                    style={{ 
                      backgroundColor: isDark ? '#334155' : '#f1f5f9',
                      color: 'var(--theme-text-primary)'
                    }}
                  />
                </div>
                <div>
                  <Label htmlFor="name" style={{ color: 'var(--theme-text-primary)' }}>
                    Nama
                  </Label>
                  <Input
                    id="name"
                    value={newCurrency.name}
                    onChange={(e) => setNewCurrency({...newCurrency, name: e.target.value})}
                    placeholder="Contoh: US Dollar"
                    className="border-0"
                    style={{ 
                      backgroundColor: isDark ? '#334155' : '#f1f5f9',
                      color: 'var(--theme-text-primary)'
                    }}
                  />
                </div>
                <div>
                  <Label htmlFor="symbol" style={{ color: 'var(--theme-text-primary)' }}>
                    Simbol
                  </Label>
                  <Input
                    id="symbol"
                    value={newCurrency.symbol}
                    onChange={(e) => setNewCurrency({...newCurrency, symbol: e.target.value})}
                    placeholder="Contoh: $"
                    className="border-0"
                    style={{ 
                      backgroundColor: isDark ? '#334155' : '#f1f5f9',
                      color: 'var(--theme-text-primary)'
                    }}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="default" style={{ color: 'var(--theme-text-primary)' }}>
                    Mata Uang Default
                  </Label>
                  <Switch
                    id="default"
                    checked={newCurrency.isDefault}
                    onCheckedChange={(checked) => setNewCurrency({...newCurrency, isDefault: checked})}
                  />
                </div>
                <div className="flex gap-2 pt-4">
                  <Button onClick={handleAddCurrency} className="flex-1">Simpan</Button>
                  <Button variant="outline" onClick={() => setIsAddModalOpen(false)} className="flex-1">
                    Batal
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </CardHeader>
      </Card>

      {/* Currency Data Table */}
      <Card 
        className="shadow-lg border-0"
        style={{ backgroundColor: 'var(--theme-card-bg)' }}
      >
        <CardContent className="p-0">
          <div className="rounded-lg border-0 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead style={{ color: 'var(--theme-text-primary)' }}>Kode</TableHead>
                  <TableHead style={{ color: 'var(--theme-text-primary)' }}>Nama</TableHead>
                  <TableHead style={{ color: 'var(--theme-text-primary)' }}>Simbol</TableHead>
                  <TableHead style={{ color: 'var(--theme-text-primary)' }}>Default</TableHead>
                  <TableHead style={{ color: 'var(--theme-text-primary)' }}>Aktif</TableHead>
                  <TableHead style={{ color: 'var(--theme-text-primary)' }}>Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCurrencies.map((currency) => (
                  <TableRow key={currency.id}>
                    <TableCell 
                      className="font-medium" 
                      style={{ color: 'var(--theme-text-primary)' }}
                    >
                      {currency.code}
                    </TableCell>
                    <TableCell style={{ color: 'var(--theme-text-primary)' }}>
                      {currency.name}
                    </TableCell>
                    <TableCell style={{ color: 'var(--theme-text-primary)' }}>
                      {currency.symbol}
                    </TableCell>
                    <TableCell>
                      {currency.isDefault && (
                        <Badge className="bg-gradient-to-r from-[#00aaff] to-[#7b42f1] text-white">
                          Default
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <Switch
                        checked={currency.isActive}
                        onCheckedChange={() => toggleCurrencyStatus(currency.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" style={{ color: 'var(--theme-text-primary)' }} />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4" style={{ color: 'var(--theme-text-primary)' }} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Header Card for Currency Rate Update BI */}
      <Card 
        className="shadow-lg border-0"
        style={{ backgroundColor: 'var(--theme-card-bg)' }}
      >
        <CardHeader 
          className="flex flex-row items-center justify-between p-6 rounded-t-lg"
          style={{ background: 'var(--theme-card-header-bg)' }}
        >
          <CardTitle className="text-white text-2xl font-bold">
            Currency Rate Update BI
          </CardTitle>
          <div className="flex gap-2">
            <Input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-40 bg-white border-0"
            />
            <Button className="bg-gradient-to-r from-[#00d4ff] via-[#8a2be2] to-[#ff69b4] text-white hover:opacity-90 px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300 border-none">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Currency Rate Update BI Table */}
      <Card 
        className="shadow-lg border-0"
        style={{ backgroundColor: 'var(--theme-card-bg)' }}
      >
        <CardContent className="p-0">
          <div className="rounded-lg border-0 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead style={{ color: 'var(--theme-text-primary)' }}>Currency</TableHead>
                  <TableHead style={{ color: 'var(--theme-text-primary)' }}>Value</TableHead>
                  <TableHead style={{ color: 'var(--theme-text-primary)' }}>Sell</TableHead>
                  <TableHead style={{ color: 'var(--theme-text-primary)' }}>Buy</TableHead>
                  <TableHead style={{ color: 'var(--theme-text-primary)' }}>Date</TableHead>
                  <TableHead style={{ color: 'var(--theme-text-primary)' }}>Add Currency</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currencyRates.map((rate) => (
                  <TableRow key={rate.id}>
                    <TableCell 
                      className="font-medium" 
                      style={{ color: 'var(--theme-text-primary)' }}
                    >
                      {rate.currency}
                    </TableCell>
                    <TableCell style={{ color: 'var(--theme-text-primary)' }}>
                      {rate.value.toLocaleString('id-ID')}
                    </TableCell>
                    <TableCell style={{ color: 'var(--theme-text-primary)' }}>
                      {rate.sell.toLocaleString('id-ID')}
                    </TableCell>
                    <TableCell style={{ color: 'var(--theme-text-primary)' }}>
                      {rate.buy.toLocaleString('id-ID')}
                    </TableCell>
                    <TableCell style={{ color: 'var(--theme-text-primary)' }}>
                      {new Date(rate.date).toLocaleDateString('id-ID')}
                    </TableCell>
                    <TableCell>
                      <Button 
                        size="sm"
                        className="bg-gradient-to-r from-[#00d4ff] via-[#8a2be2] to-[#ff69b4] text-white hover:opacity-90 rounded-full shadow-md hover:shadow-lg transition-all duration-300 border-none"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CurrencyPage;
