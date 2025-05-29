import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useColors } from '@/contexts/ColorContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Plus, Search, Download, Eye, Edit, Trash2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

// Form validation schema
const supplierSchema = z.object({
  companyName: z.string().min(1, 'Company name is required'),
  contactPerson: z.string().min(1, 'Contact person is required'),
  phone: z.string().min(1, 'Phone is required'),
  email: z.string().email('Invalid email'),
  website: z.string().optional(),
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  province: z.string().min(1, 'Province is required'),
  postalCode: z.string().min(1, 'Postal code is required'),
  country: z.string().min(1, 'Country is required'),
  npwp: z.string().optional(),
  currency: z.string().min(1, 'Currency is required'),
  paymentTerm: z.string().min(1, 'Payment term is required'),
  bankName: z.string().optional(),
  accountName: z.string().optional(),
  accountNumber: z.string().optional(),
  notes: z.string().optional(),
  isActive: z.boolean().default(true),
});

type SupplierFormData = z.infer<typeof supplierSchema>;

interface Supplier {
  id: string;
  code: string;
  companyName: string;
  contactPerson: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  country: string;
  status: 'Active' | 'Inactive';
}

// Dummy data
const dummySuppliers: Supplier[] = [
  {
    id: '1',
    code: 'SUP001',
    companyName: 'PT Maju Jaya Supplier',
    contactPerson: 'Budi Santoso',
    phone: '+62-21-12345678',
    email: 'budi@majujaya.com',
    address: 'Jl. Sudirman No. 123',
    city: 'Jakarta',
    country: 'Indonesia',
    status: 'Active',
  },
  {
    id: '2',
    code: 'SUP002',
    companyName: 'CV Berkah Materials',
    contactPerson: 'Siti Rahayu',
    phone: '+62-21-87654321',
    email: 'siti@berkahmaterials.com',
    address: 'Jl. Gatot Subroto No. 456',
    city: 'Bandung',
    country: 'Indonesia',
    status: 'Active',
  },
  {
    id: '3',
    code: 'SUP003',
    companyName: 'Global Tech Solutions',
    contactPerson: 'John Smith',
    phone: '+1-555-123-4567',
    email: 'john@globaltech.com',
    address: '123 Tech Street',
    city: 'San Francisco',
    country: 'USA',
    status: 'Inactive',
  },
  {
    id: '4',
    code: 'SUP004',
    companyName: 'Asian Trading Co',
    contactPerson: 'Li Wei',
    phone: '+86-21-9876543',
    email: 'liwei@asiantrading.com',
    address: '789 Business Road',
    city: 'Shanghai',
    country: 'China',
    status: 'Active',
  },
  {
    id: '5',
    code: 'SUP005',
    companyName: 'Euro Supplies Ltd',
    contactPerson: 'Marie Dubois',
    phone: '+33-1-23456789',
    email: 'marie@eurosupplies.com',
    address: '456 Commerce Ave',
    city: 'Paris',
    country: 'France',
    status: 'Active',
  },
];

const currencyOptions = [
  { value: 'IDR', label: 'Indonesian Rupiah (IDR)' },
  { value: 'USD', label: 'US Dollar (USD)' },
  { value: 'EUR', label: 'Euro (EUR)' },
  { value: 'SGD', label: 'Singapore Dollar (SGD)' },
];

const paymentTermOptions = [
  { value: 'NET30', label: 'Net 30 Days' },
  { value: 'NET60', label: 'Net 60 Days' },
  { value: 'COD', label: 'Cash on Delivery' },
  { value: 'PREPAID', label: 'Prepaid' },
];

export default function SupplierPage() {
  const { t } = useTranslation();
  const { colors } = useColors();
  const [suppliers, setSuppliers] = useState<Supplier[]>(dummySuppliers);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Form validation schema


  const form = useForm<SupplierFormData>({
    resolver: zodResolver(supplierSchema),
    defaultValues: {
      isActive: true,
      currency: 'IDR',
      paymentTerm: 'NET30',
    },
  });

  const filteredSuppliers = suppliers.filter(supplier =>
    supplier.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.companyName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleExport = () => {
    console.log('Exporting suppliers to Excel...');
  };

  return (
    <div className="p-6 space-y-6">
      {/* Suppliers Table Card */}
      <Card 
        className="shadow-lg border-0"
        style={{
          background: `linear-gradient(135deg, ${colors.gradientStart}15, ${colors.gradientMiddle}15, ${colors.gradientEnd}15)`
        }}
      >
        <CardHeader 
          className="pb-4"
          style={{
            background: `linear-gradient(135deg, ${colors.gradientStart}25, ${colors.gradientMiddle}25)`
          }}
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <CardTitle 
              className="text-2xl font-bold"
              style={{ color: colors.gradientStart }}
            >
              Data Supplier
            </CardTitle>
            <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search by Code or Name"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 md:w-64"
                />
              </div>
              <Button 
                className="flex items-center gap-2 text-white border-0"
                style={{
                  background: `linear-gradient(135deg, ${colors.gradientStart}, ${colors.gradientMiddle})`
                }}
              >
                <Plus className="h-4 w-4" />
                Add Supplier
              </Button>
              <Button 
                variant="outline"
                onClick={handleExport}
                className="flex items-center gap-2"
                style={{
                  borderColor: colors.gradientStart,
                  color: colors.gradientStart
                }}
              >
                <Download className="h-4 w-4" />
                Download Excel
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Supplier Code</TableHead>
                  <TableHead>Company Name</TableHead>
                  <TableHead>Contact Person</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>City</TableHead>
                  <TableHead>Country</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSuppliers.map((supplier) => (
                  <TableRow key={supplier.id}>
                    <TableCell>{supplier.id}</TableCell>
                    <TableCell className="font-medium">{supplier.code}</TableCell>
                    <TableCell>{supplier.companyName}</TableCell>
                    <TableCell>{supplier.contactPerson}</TableCell>
                    <TableCell>{supplier.phone}</TableCell>
                    <TableCell>{supplier.email}</TableCell>
                    <TableCell>{supplier.address}</TableCell>
                    <TableCell>{supplier.city}</TableCell>
                    <TableCell>{supplier.country}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={supplier.status === 'Active' ? 'default' : 'secondary'}
                        style={supplier.status === 'Active' ? {
                          backgroundColor: colors.gradientStart,
                          color: 'white'
                        } : {}}
                      >
                        {supplier.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
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
}
