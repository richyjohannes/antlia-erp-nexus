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
import { Plus, Search, Download, Edit, Trash2, Eye, Users, UserCheck, UserX } from 'lucide-react';

interface Customer {
  id: number;
  code: string;
  name: string;
  email: string;
  type: string;
  customerType: string;
  status: 'Active' | 'Inactive';
}

const CustomerPage = () => {
  const { t } = useTranslation();
  const { colors } = useColors();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Dummy data for customers
  const [customers, setCustomers] = useState<Customer[]>([
    { id: 1, code: 'CUST001', name: 'PT Maju Jaya', email: 'info@majujaya.com', type: 'Corporate', customerType: 'Premium', status: 'Active' },
    { id: 2, code: 'CUST002', name: 'CV Berkah', email: 'berkah@email.com', type: 'Corporate', customerType: 'Regular', status: 'Active' },
    { id: 3, code: 'CUST003', name: 'John Doe', email: 'john@email.com', type: 'Individual', customerType: 'Regular', status: 'Inactive' },
    { id: 4, code: 'CUST004', name: 'PT Tech Solutions', email: 'tech@solutions.com', type: 'Corporate', customerType: 'Premium', status: 'Active' },
    { id: 5, code: 'CUST005', name: 'Jane Smith', email: 'jane@email.com', type: 'Individual', customerType: 'Regular', status: 'Active' },
  ]);

  const totalCustomers = customers.length;
  const activeCustomers = customers.filter(c => c.status === 'Active').length;
  const inactiveCustomers = customers.filter(c => c.status === 'Inactive').length;

  const filteredCustomers = customers.filter(customer =>
    customer.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleCustomerStatus = (id: number) => {
    setCustomers(customers.map(customer =>
      customer.id === id 
        ? { ...customer, status: customer.status === 'Active' ? 'Inactive' : 'Active' }
        : customer
    ));
  };

  return (
    <div className="p-6 space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-[#f8fafc] to-[#f1f5f9] shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Customer</p>
                <p className="text-3xl font-bold text-[#00aaff]">
                  {totalCustomers}
                </p>
              </div>
              <Users className="h-12 w-12 text-[#00aaff]" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-[#f8fafc] to-[#f1f5f9] shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Customer Active</p>
                <p className="text-3xl font-bold text-green-600">
                  {activeCustomers}
                </p>
              </div>
              <UserCheck className="h-12 w-12 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-[#f8fafc] to-[#f1f5f9] shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Customer Inactive</p>
                <p className="text-3xl font-bold text-red-600">
                  {inactiveCustomers}
                </p>
              </div>
              <UserX className="h-12 w-12 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Header Card */}
      <Card className="bg-gradient-to-br from-[#f8fafc] to-[#f1f5f9] shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between bg-gradient-to-r from-[#00aaff] via-[#7b42f1] to-[#ff1a4a] p-6 rounded-t-lg">
          <CardTitle className="text-white text-2xl font-bold">
            Data Pelanggan
          </CardTitle>
          <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 md:w-64 bg-white"
              />
            </div>
            <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-[#00d4ff] via-[#8a2be2] to-[#ff69b4] text-white hover:opacity-90 px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Customer
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Tambah Customer Baru</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="customerName">Nama Customer</Label>
                    <Input id="customerName" placeholder="Masukkan nama customer" />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="Masukkan email" />
                  </div>
                  <div>
                    <Label htmlFor="type">Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="corporate">Corporate</SelectItem>
                        <SelectItem value="individual">Individual</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="customerType">Customer Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih customer type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="premium">Premium</SelectItem>
                        <SelectItem value="regular">Regular</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex gap-2 pt-4">
                    <Button className="flex-1">Simpan</Button>
                    <Button variant="outline" onClick={() => setIsAddModalOpen(false)} className="flex-1">
                      Batal
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            <Button 
              variant="outline"
              className="bg-gradient-to-r from-[#00d4ff] via-[#8a2be2] to-[#ff69b4] text-white hover:opacity-90 px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300 border-none"
            >
              <Download className="h-4 w-4 mr-2" />
              Export Excel
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Table Card */}
      <Card className="bg-gradient-to-br from-[#f8fafc] to-[#f1f5f9] shadow-lg">
        <CardContent className="p-0">
          <div className="rounded-lg border-0 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>No</TableHead>
                  <TableHead>Customer Code</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Customer Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.map((customer, index) => (
                  <TableRow key={customer.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell className="font-medium">{customer.code}</TableCell>
                    <TableCell>{customer.name}</TableCell>
                    <TableCell>{customer.email}</TableCell>
                    <TableCell>{customer.type}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={customer.customerType === 'Premium' ? 'default' : 'secondary'}
                        className={customer.customerType === 'Premium' ? 'bg-gradient-to-r from-[#00aaff] to-[#7b42f1] text-white' : ''}
                      >
                        {customer.customerType}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Switch
                        checked={customer.status === 'Active'}
                        onCheckedChange={() => toggleCustomerStatus(customer.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
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
    </div>
  );
};

export default CustomerPage;
