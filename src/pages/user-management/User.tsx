
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { FileDown, Plus, Search, Edit, Trash2 } from 'lucide-react';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  access: 'User' | 'Customer' | 'Supplier';
  status: 'active' | 'inactive';
  lastLogin: string;
}

const UserPage = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [accessFilter, setAccessFilter] = useState<string>('all');

  // Dummy data
  const [users] = useState<User[]>([
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@email.com',
      phone: '+62 812-3456-7890',
      access: 'User',
      status: 'active',
      lastLogin: '2024-01-15 10:30:00'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@email.com',
      phone: '+62 813-4567-8901',
      access: 'Customer',
      status: 'active',
      lastLogin: '2024-01-14 15:45:00'
    },
    {
      id: 3,
      name: 'Robert Johnson',
      email: 'robert.johnson@email.com',
      phone: '+62 814-5678-9012',
      access: 'Supplier',
      status: 'inactive',
      lastLogin: '2024-01-10 09:15:00'
    },
    {
      id: 4,
      name: 'Sarah Wilson',
      email: 'sarah.wilson@email.com',
      phone: '+62 815-6789-0123',
      access: 'User',
      status: 'active',
      lastLogin: '2024-01-15 14:20:00'
    },
    {
      id: 5,
      name: 'Michael Brown',
      email: 'michael.brown@email.com',
      phone: '+62 816-7890-1234',
      access: 'Customer',
      status: 'inactive',
      lastLogin: '2024-01-08 11:00:00'
    }
  ]);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    const matchesAccess = accessFilter === 'all' || user.access === accessFilter;
    
    return matchesSearch && matchesStatus && matchesAccess;
  });

  const handleExportExcel = () => {
    console.log('Exporting to Excel...');
    // Implementasi export Excel akan ditambahkan nanti
  };

  const getStatusBadge = (status: string) => {
    return status === 'active' ? (
      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
        {t('active')}
      </Badge>
    ) : (
      <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
        {t('inactive')}
      </Badge>
    );
  };

  const getAccessBadge = (access: string) => {
    const colors = {
      'User': 'bg-blue-100 text-blue-800',
      'Customer': 'bg-purple-100 text-purple-800',
      'Supplier': 'bg-orange-100 text-orange-800'
    };
    
    return (
      <Badge className={`${colors[access as keyof typeof colors]} hover:${colors[access as keyof typeof colors]}`}>
        {access}
      </Badge>
    );
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header Card */}
      <Card className="bg-gradient-to-br from-[#f8fafc] to-[#f1f5f9] shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between bg-gradient-to-r from-[#00aaff] via-[#7b42f1] to-[#ff1a4a] p-6 rounded-t-lg">
          <div>
            <CardTitle className="text-white text-2xl font-bold">{t('userManagement')}</CardTitle>
            <CardDescription className="text-blue-100">{t('manageUsersAndTheirAccess')}</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button 
              onClick={handleExportExcel} 
              className="bg-gradient-to-r from-[#00d4ff] via-[#8a2be2] to-[#ff69b4] text-white hover:opacity-90 px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300"
            >
              <FileDown className="h-4 w-4 mr-2" />
              {t('exportExcel')}
            </Button>
            <Button className="bg-gradient-to-r from-[#00d4ff] via-[#8a2be2] to-[#ff69b4] text-white hover:opacity-90 px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300">
              <Plus className="h-4 w-4 mr-2" />
              {t('addUser')}
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Table Card */}
      <Card className="bg-gradient-to-br from-[#f8fafc] to-[#f1f5f9] shadow-lg">
        <CardContent className="p-6">
          <div className="flex gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4" 
                  style={{
                    background: 'linear-gradient(135deg, #00aaff, #7b42f1)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                />
                <Input
                  placeholder={t('searchUsers')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-2 focus:border-blue-400"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40 border-2 focus:border-blue-400">
                <SelectValue placeholder={t('filterByStatus')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('allStatus')}</SelectItem>
                <SelectItem value="active">{t('active')}</SelectItem>
                <SelectItem value="inactive">{t('inactive')}</SelectItem>
              </SelectContent>
            </Select>
            <Select value={accessFilter} onValueChange={setAccessFilter}>
              <SelectTrigger className="w-40 border-2 focus:border-blue-400">
                <SelectValue placeholder={t('filterByAccess')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('allAccess')}</SelectItem>
                <SelectItem value="User">User</SelectItem>
                <SelectItem value="Customer">Customer</SelectItem>
                <SelectItem value="Supplier">Supplier</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('name')}</TableHead>
                <TableHead>{t('email')}</TableHead>
                <TableHead>{t('phone')}</TableHead>
                <TableHead>{t('access')}</TableHead>
                <TableHead>{t('status')}</TableHead>
                <TableHead>{t('lastLogin')}</TableHead>
                <TableHead className="text-right">{t('actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>{getAccessBadge(user.access)}</TableCell>
                  <TableCell>{getStatusBadge(user.status)}</TableCell>
                  <TableCell>{user.lastLogin}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" className="hover:bg-gradient-to-r hover:from-blue-100 hover:to-purple-100">
                        <Edit className="h-4 w-4" 
                          style={{
                            background: 'linear-gradient(135deg, #00aaff, #7b42f1)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text'
                          }}
                        />
                      </Button>
                      <Button variant="ghost" size="icon" className="hover:bg-gradient-to-r hover:from-red-100 hover:to-pink-100">
                        <Trash2 className="h-4 w-4"
                          style={{
                            background: 'linear-gradient(135deg, #ff1a4a, #ff69b4)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text'
                          }}
                        />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredUsers.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              {t('noUsersFound')}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UserPage;
