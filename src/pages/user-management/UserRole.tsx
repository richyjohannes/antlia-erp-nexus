
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
import { Input } from '@/components/ui/input';
import { Plus, Search, Edit, Trash2, Users } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';

interface Permission {
  id: string;
  name: string;
  module: string;
}

interface UserRole {
  id: number;
  name: string;
  description: string;
  permissions: string[];
  userCount: number;
  status: 'active' | 'inactive';
  createdDate: string;
}

const UserRolePage = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');

  // Dummy permissions
  const permissions: Permission[] = [
    { id: 'user_view', name: 'View Users', module: 'User Management' },
    { id: 'user_create', name: 'Create Users', module: 'User Management' },
    { id: 'user_edit', name: 'Edit Users', module: 'User Management' },
    { id: 'user_delete', name: 'Delete Users', module: 'User Management' },
    { id: 'master_data_view', name: 'View Master Data', module: 'Master Data' },
    { id: 'master_data_edit', name: 'Edit Master Data', module: 'Master Data' },
    { id: 'procurement_view', name: 'View Procurement', module: 'Procurement' },
    { id: 'procurement_approve', name: 'Approve Procurement', module: 'Procurement' },
    { id: 'warehouse_view', name: 'View Warehouse', module: 'Warehouse' },
    { id: 'warehouse_manage', name: 'Manage Warehouse', module: 'Warehouse' }
  ];

  // Dummy data
  const [userRoles] = useState<UserRole[]>([
    {
      id: 1,
      name: 'Super Admin',
      description: 'Full access to all system features',
      permissions: permissions.map(p => p.id),
      userCount: 2,
      status: 'active',
      createdDate: '2024-01-01'
    },
    {
      id: 2,
      name: 'Manager',
      description: 'Management level access with approval rights',
      permissions: ['user_view', 'master_data_view', 'master_data_edit', 'procurement_view', 'procurement_approve', 'warehouse_view'],
      userCount: 5,
      status: 'active',
      createdDate: '2024-01-05'
    },
    {
      id: 3,
      name: 'Operator',
      description: 'Basic operational access',
      permissions: ['master_data_view', 'procurement_view', 'warehouse_view', 'warehouse_manage'],
      userCount: 15,
      status: 'active',
      createdDate: '2024-01-10'
    },
    {
      id: 4,
      name: 'Customer Service',
      description: 'Customer facing operations',
      permissions: ['user_view', 'master_data_view'],
      userCount: 8,
      status: 'active',
      createdDate: '2024-01-12'
    },
    {
      id: 5,
      name: 'Viewer',
      description: 'Read-only access to most modules',
      permissions: ['master_data_view', 'procurement_view', 'warehouse_view'],
      userCount: 3,
      status: 'inactive',
      createdDate: '2024-01-08'
    }
  ]);

  const filteredRoles = userRoles.filter(role =>
    role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    role.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  const getPermissionsByModule = (permissionIds: string[]) => {
    const rolePermissions = permissions.filter(p => permissionIds.includes(p.id));
    const modules = [...new Set(rolePermissions.map(p => p.module))];
    return modules.slice(0, 3).join(', ') + (modules.length > 3 ? '...' : '');
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header Card */}
      <Card className="bg-gradient-to-br from-[#f8fafc] to-[#f1f5f9] shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between bg-gradient-to-r from-[#00aaff] via-[#7b42f1] to-[#ff1a4a] p-6 rounded-t-lg">
          <div>
            <CardTitle className="text-white text-2xl font-bold">{t('userRoleManagement')}</CardTitle>
            <CardDescription className="text-blue-100">{t('manageUserRolesAndPermissions')}</CardDescription>
          </div>
          <Button className="bg-gradient-to-r from-[#00d4ff] via-[#8a2be2] to-[#ff69b4] text-white hover:opacity-90 px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300">
            <Plus className="h-4 w-4 mr-2" />
            {t('addRole')}
          </Button>
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
                  placeholder={t('searchRoles')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-2 focus:border-blue-400"
                />
              </div>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('roleName')}</TableHead>
                <TableHead>{t('description')}</TableHead>
                <TableHead>{t('permissions')}</TableHead>
                <TableHead>{t('userCount')}</TableHead>
                <TableHead>{t('status')}</TableHead>
                <TableHead>{t('createdDate')}</TableHead>
                <TableHead className="text-right">{t('actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRoles.map((role) => (
                <TableRow key={role.id}>
                  <TableCell className="font-medium">{role.name}</TableCell>
                  <TableCell className="max-w-xs">
                    <div className="truncate" title={role.description}>
                      {role.description}
                    </div>
                  </TableCell>
                  <TableCell className="max-w-xs">
                    <div className="truncate" title={getPermissionsByModule(role.permissions)}>
                      {getPermissionsByModule(role.permissions)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4"
                        style={{
                          background: 'linear-gradient(135deg, #00aaff, #7b42f1)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text'
                        }}
                      />
                      {role.userCount}
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(role.status)}</TableCell>
                  <TableCell>{role.createdDate}</TableCell>
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

          {filteredRoles.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              {t('noRolesFound')}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Permission Matrix Card */}
      <Card className="bg-gradient-to-br from-[#f8fafc] to-[#f1f5f9] shadow-lg">
        <CardHeader className="bg-gradient-to-r from-[#00aaff] via-[#7b42f1] to-[#ff1a4a] p-6 rounded-t-lg">
          <CardTitle className="text-white">{t('permissionMatrix')}</CardTitle>
          <CardDescription className="text-blue-100">{t('viewPermissionsByModule')}</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {[...new Set(permissions.map(p => p.module))].map(module => (
              <div key={module} className="border-2 border-blue-200 rounded-lg p-4 bg-gradient-to-br from-blue-50 to-purple-50">
                <h4 className="font-semibold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-[#00aaff] to-[#7b42f1]">{module}</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                  {permissions.filter(p => p.module === module).map(permission => (
                    <div key={permission.id} className="flex items-center space-x-2">
                      <Checkbox id={permission.id} disabled />
                      <label htmlFor={permission.id} className="text-sm">
                        {permission.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserRolePage;
