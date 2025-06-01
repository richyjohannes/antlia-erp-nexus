
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
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { FileDown, Plus, Search, Edit, Trash2, Eye, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  access: 'User' | 'Customer' | 'Supplier';
  status: 'active' | 'inactive';
  lastLogin: string;
  avatar?: string;
  customerId?: string;
  supplierId?: string;
}

const UserPage = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [accessFilter, setAccessFilter] = useState<string>('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>('');

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    access: 'User' as 'User' | 'Customer' | 'Supplier',
    status: 'active' as 'active' | 'inactive',
    customerId: '',
    supplierId: '',
    avatar: ''
  });

  // Dummy data with additional fields
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@email.com',
      phone: '+62 812-3456-7890',
      access: 'User',
      status: 'active',
      lastLogin: '2024-01-15 10:30:00',
      avatar: ''
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@email.com',
      phone: '+62 813-4567-8901',
      access: 'Customer',
      status: 'active',
      lastLogin: '2024-01-14 15:45:00',
      customerId: 'CUST001',
      avatar: ''
    },
    {
      id: 3,
      name: 'Robert Johnson',
      email: 'robert.johnson@email.com',
      phone: '+62 814-5678-9012',
      access: 'Supplier',
      status: 'inactive',
      lastLogin: '2024-01-10 09:15:00',
      supplierId: 'SUPP001',
      avatar: ''
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
    toast({
      title: "Export Started",
      description: "Excel export is being prepared...",
    });
  };

  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setAvatarPreview(result);
        setFormData(prev => ({ ...prev, avatar: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAccessChange = (value: 'User' | 'Customer' | 'Supplier') => {
    setFormData(prev => ({
      ...prev,
      access: value,
      customerId: value === 'Customer' ? prev.customerId : '',
      supplierId: value === 'Supplier' ? prev.supplierId : ''
    }));
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      password: '',
      access: 'User',
      status: 'active',
      customerId: '',
      supplierId: '',
      avatar: ''
    });
    setAvatarPreview('');
    setEditingUser(null);
  };

  const handleSave = () => {
    if (editingUser) {
      // Update existing user
      setUsers(prev => prev.map(user => 
        user.id === editingUser.id 
          ? { 
              ...user, 
              name: formData.name,
              email: formData.email,
              access: formData.access,
              status: formData.status,
              customerId: formData.customerId,
              supplierId: formData.supplierId,
              avatar: formData.avatar
            }
          : user
      ));
      toast({
        title: "User Updated",
        description: "User has been successfully updated.",
      });
    } else {
      // Add new user
      const newUser: User = {
        id: Math.max(...users.map(u => u.id)) + 1,
        name: formData.name,
        email: formData.email,
        phone: '',
        access: formData.access,
        status: formData.status,
        lastLogin: new Date().toISOString().slice(0, 19).replace('T', ' '),
        customerId: formData.customerId,
        supplierId: formData.supplierId,
        avatar: formData.avatar
      };
      setUsers(prev => [...prev, newUser]);
      toast({
        title: "User Added",
        description: "New user has been successfully added.",
      });
    }
    setIsDialogOpen(false);
    resetForm();
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      password: '',
      access: user.access,
      status: user.status,
      customerId: user.customerId || '',
      supplierId: user.supplierId || '',
      avatar: user.avatar || ''
    });
    setAvatarPreview(user.avatar || '');
    setIsDialogOpen(true);
  };

  const handleDelete = (userId: number) => {
    setUsers(prev => prev.filter(user => user.id !== userId));
    toast({
      title: "User Deleted",
      description: "User has been successfully deleted.",
    });
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
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button 
                  onClick={resetForm}
                  className="bg-gradient-to-r from-[#00d4ff] via-[#8a2be2] to-[#ff69b4] text-white hover:opacity-90 px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add New User
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle 
                    className="text-xl font-bold"
                    style={{
                      background: 'linear-gradient(135deg, #00aaff, #7b42f1)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}
                  >
                    {editingUser ? 'Edit User' : 'Add New User'}
                  </DialogTitle>
                  <DialogDescription>
                    {editingUser ? 'Update user information below.' : 'Fill in the information below to add a new user.'}
                  </DialogDescription>
                </DialogHeader>

                <div className="grid gap-6 py-4">
                  {/* Avatar Upload */}
                  <div className="flex flex-col items-center gap-4">
                    <Avatar className="w-20 h-20 border-2 border-gray-200">
                      <AvatarImage src={avatarPreview || formData.avatar} />
                      <AvatarFallback 
                        className="text-lg font-bold text-white"
                        style={{
                          background: 'linear-gradient(135deg, #00aaff, #7b42f1)'
                        }}
                      >
                        {formData.name.split(' ').map(n => n[0]).join('') || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <input
                        id="avatar-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleAvatarUpload}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => document.getElementById('avatar-upload')?.click()}
                        className="border-2"
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Avatar
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="border-2 focus:border-blue-400"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="border-2 focus:border-blue-400"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      className="border-2 focus:border-blue-400"
                      placeholder={editingUser ? "Leave empty to keep current password" : "Enter password"}
                    />
                  </div>

                  <div>
                    <Label htmlFor="access">Access Level</Label>
                    <Select value={formData.access} onValueChange={handleAccessChange}>
                      <SelectTrigger className="border-2 focus:border-blue-400">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="User">User</SelectItem>
                        <SelectItem value="Customer">Customer</SelectItem>
                        <SelectItem value="Supplier">Supplier</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {formData.access === 'Customer' && (
                    <div>
                      <Label htmlFor="customerId">Customer ID</Label>
                      <Input
                        id="customerId"
                        value={formData.customerId}
                        onChange={(e) => handleInputChange('customerId', e.target.value)}
                        className="border-2 focus:border-blue-400"
                        placeholder="Enter Customer ID"
                      />
                    </div>
                  )}

                  {formData.access === 'Supplier' && (
                    <div>
                      <Label htmlFor="supplierId">Supplier ID</Label>
                      <Input
                        id="supplierId"
                        value={formData.supplierId}
                        onChange={(e) => handleInputChange('supplierId', e.target.value)}
                        className="border-2 focus:border-blue-400"
                        placeholder="Enter Supplier ID"
                      />
                    </div>
                  )}

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="status"
                      checked={formData.status === 'active'}
                      onCheckedChange={(checked) => handleInputChange('status', checked ? 'active' : 'inactive')}
                      className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-[#00aaff] data-[state=checked]:to-[#7b42f1]"
                    />
                    <Label htmlFor="status">Active Status</Label>
                  </div>
                </div>

                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                    className="border-2"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSave}
                    className="bg-gradient-to-r from-[#00d4ff] via-[#8a2be2] to-[#ff69b4] text-white hover:opacity-90 px-6 py-2 rounded-full shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    {editingUser ? 'Update User' : 'Add User'}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
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
                <TableHead>ID</TableHead>
                <TableHead>Avatar</TableHead>
                <TableHead>{t('name')}</TableHead>
                <TableHead>{t('email')}</TableHead>
                <TableHead>{t('access')}</TableHead>
                <TableHead>{t('status')}</TableHead>
                <TableHead>{t('lastLogin')}</TableHead>
                <TableHead className="text-right">{t('actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.id}</TableCell>
                  <TableCell>
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback 
                        className="text-xs font-bold text-white"
                        style={{
                          background: 'linear-gradient(135deg, #00aaff, #7b42f1)'
                        }}
                      >
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{getAccessBadge(user.access)}</TableCell>
                  <TableCell>{getStatusBadge(user.status)}</TableCell>
                  <TableCell>{user.lastLogin}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" className="hover:bg-gradient-to-r hover:from-blue-100 hover:to-purple-100">
                        <Eye className="h-4 w-4" 
                          style={{
                            background: 'linear-gradient(135deg, #00aaff, #7b42f1)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text'
                          }}
                        />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="hover:bg-gradient-to-r hover:from-blue-100 hover:to-purple-100"
                        onClick={() => handleEdit(user)}
                      >
                        <Edit className="h-4 w-4" 
                          style={{
                            background: 'linear-gradient(135deg, #00aaff, #7b42f1)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text'
                          }}
                        />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="hover:bg-gradient-to-r hover:from-red-100 hover:to-pink-100"
                        onClick={() => handleDelete(user.id)}
                      >
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
