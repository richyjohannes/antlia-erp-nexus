
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Download, Plus, Search } from 'lucide-react';

interface Currency {
  id: number;
  code: string;
  name: string;
  symbol: string;
  rate: number;
  status: 'active' | 'inactive';
  createdDate: string;
}

const CurrencyPage = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Dummy data for currencies
  const [currencies] = useState<Currency[]>([
    {
      id: 1,
      code: 'USD',
      name: 'US Dollar',
      symbol: '$',
      rate: 15500,
      status: 'active',
      createdDate: '2024-01-15'
    },
    {
      id: 2,
      code: 'EUR',
      name: 'Euro',
      symbol: '€',
      rate: 16800,
      status: 'active',
      createdDate: '2024-01-16'
    },
    {
      id: 3,
      code: 'GBP',
      name: 'British Pound',
      symbol: '£',
      rate: 19200,
      status: 'active',
      createdDate: '2024-01-17'
    },
    {
      id: 4,
      code: 'JPY',
      name: 'Japanese Yen',
      symbol: '¥',
      rate: 104,
      status: 'active',
      createdDate: '2024-01-18'
    },
    {
      id: 5,
      code: 'SGD',
      name: 'Singapore Dollar',
      symbol: 'S$',
      rate: 11400,
      status: 'inactive',
      createdDate: '2024-01-19'
    },
  ]);

  const filteredCurrencies = currencies.filter(currency => {
    const matchesSearch = currency.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         currency.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || currency.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Currency Management</CardTitle>
          <p className="text-gray-600">Manage currency exchange rates and settings</p>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search currencies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export Excel
            </Button>

            <Button className="flex items-center gap-2 bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-middle)]">
              <Plus className="h-4 w-4" />
              Add Currency
            </Button>
          </div>

          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Currency Code</TableHead>
                  <TableHead>Currency Name</TableHead>
                  <TableHead>Symbol</TableHead>
                  <TableHead>Exchange Rate (IDR)</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCurrencies.length > 0 ? (
                  filteredCurrencies.map((currency) => (
                    <TableRow key={currency.id}>
                      <TableCell className="font-medium">{currency.code}</TableCell>
                      <TableCell>{currency.name}</TableCell>
                      <TableCell>{currency.symbol}</TableCell>
                      <TableCell>{currency.rate.toLocaleString('id-ID')}</TableCell>
                      <TableCell>
                        <Badge
                          variant={currency.status === 'active' ? 'default' : 'secondary'}
                          className={currency.status === 'active' 
                            ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                            : 'bg-red-100 text-red-800 hover:bg-red-200'
                          }
                        >
                          {currency.status === 'active' ? 'Active' : 'Inactive'}
                        </Badge>
                      </TableCell>
                      <TableCell>{new Date(currency.createdDate).toLocaleDateString('id-ID')}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                            Delete
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                      No currencies found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CurrencyPage;
