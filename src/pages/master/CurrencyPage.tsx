
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useColors } from '@/contexts/ColorContext';
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
  ]);

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
    <div className="p-6 space-y-6" style={{ backgroundColor: 'var(--theme-bg-main)' }}>
      {/* Header Card for Currency Data */}
      <Card style={{ backgroundColor: 'var(--theme-card-bg)' }} className="shadow-lg border-0">
        <CardHeader 
          className="flex flex-row items-center justify-between p-6 rounded-t-lg"
          style={{ 
            background: 'var(--theme-card-header-bg)',
            position: 'relative'
          }}
        >
          <div 
            className="absolute inset-0 bg-black/10 rounded-t-lg"
            style={{ 
              background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))' 
            }}
          />
          <CardTitle className="text-white text-2xl font-bold relative z-10">
            Data Mata Uang
          </CardTitle>
          <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-[#00d4ff] via-[#8a2be2] to-[#ff69b4] text-white hover:opacity-90 px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300 relative z-10">
                <Plus className="h-4 w-4 mr-2" />
                Tambah Currency
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Tambah Mata Uang Baru</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="code">Kode Mata Uang</Label>
                  <Input
                    id="code"
                    value={newCurrency.code}
                    onChange={(e) => setNewCurrency({...newCurrency, code: e.target.value})}
                    placeholder="Contoh: USD"
                  />
                </div>
                <div>
                  <Label htmlFor="name">Nama</Label>
                  <Input
                    id="name"
                    value={newCurrency.name}
                    onChange={(e) => setNewCurrency({...newCurrency, name: e.target.value})}
                    placeholder="Contoh: US Dollar"
                  />
                </div>
                <div>
                  <Label htmlFor="symbol">Simbol</Label>
                  <Input
                    id="symbol"
                    value={newCurrency.symbol}
                    onChange={(e) => setNewCurrency({...newCurrency, symbol: e.target.value})}
                    placeholder="Contoh: $"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="default">Mata Uang Default</Label>
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
      <Card style={{ backgroundColor: 'var(--theme-card-bg)' }} className="shadow-lg border-0">
        <CardContent className="p-0">
          <div className="rounded-lg border-0 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Kode</TableHead>
                  <TableHead>Nama</TableHead>
                  <TableHead>Simbol</TableHead>
                  <TableHead>Default</TableHead>
                  <TableHead>Aktif</TableHead>
                  <TableHead>Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCurrencies.map((currency) => (
                  <TableRow key={currency.id}>
                    <TableCell className="font-medium">{currency.code}</TableCell>
                    <TableCell>{currency.name}</TableCell>
                    <TableCell>{currency.symbol}</TableCell>
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
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4" />
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
      <Card style={{ backgroundColor: 'var(--theme-card-bg)' }} className="shadow-lg border-0">
        <CardHeader 
          className="flex flex-row items-center justify-between p-6 rounded-t-lg"
          style={{ 
            background: 'var(--theme-card-header-bg)',
            position: 'relative'
          }}
        >
          <div 
            className="absolute inset-0 bg-black/10 rounded-t-lg"
            style={{ 
              background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))' 
            }}
          />
          <CardTitle className="text-white text-2xl font-bold relative z-10">
            Currency Rate Update BI
          </CardTitle>
          <div className="flex gap-2 relative z-10">
            <Input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-40 bg-white"
            />
            <Button className="bg-gradient-to-r from-[#00d4ff] via-[#8a2be2] to-[#ff69b4] text-white hover:opacity-90 px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300 border-none">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Currency Rate Update BI Table */}
      <Card style={{ backgroundColor: 'var(--theme-card-bg)' }} className="shadow-lg border-0">
        <CardContent className="p-0">
          <div className="rounded-lg border-0 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Currency</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Sell</TableHead>
                  <TableHead>Buy</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Add Currency</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currencyRates.map((rate) => (
                  <TableRow key={rate.id}>
                    <TableCell className="font-medium">{rate.currency}</TableCell>
                    <TableCell>{rate.value.toLocaleString('id-ID')}</TableCell>
                    <TableCell>{rate.sell.toLocaleString('id-ID')}</TableCell>
                    <TableCell>{rate.buy.toLocaleString('id-ID')}</TableCell>
                    <TableCell>{new Date(rate.date).toLocaleDateString('id-ID')}</TableCell>
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
