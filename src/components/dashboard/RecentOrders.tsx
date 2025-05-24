
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

export function RecentOrders() {
  const { t } = useTranslation();

  const orders = [
    {
      orderNo: 'ORD-001',
      date: '2024-05-24',
      customer: 'PT. ABC Indonesia',
      amount: 'Rp 15,500,000',
      status: 'Completed',
    },
    {
      orderNo: 'ORD-002',
      date: '2024-05-24',
      customer: 'CV. XYZ Trading',
      amount: 'Rp 8,750,000',
      status: 'Processing',
    },
    {
      orderNo: 'ORD-003',
      date: '2024-05-23',
      customer: 'PT. Global Corp',
      amount: 'Rp 22,300,000',
      status: 'Pending',
    },
    {
      orderNo: 'ORD-004',
      date: '2024-05-23',
      customer: 'UD. Maju Jaya',
      amount: 'Rp 12,100,000',
      status: 'Completed',
    },
  ];

  const getStatusBadge = (status: string) => {
    const variants = {
      'Completed': 'bg-green-100 text-green-800',
      'Processing': 'bg-blue-100 text-blue-800',
      'Pending': 'bg-yellow-100 text-yellow-800',
    };
    return variants[status as keyof typeof variants] || 'bg-gray-100 text-gray-800';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-middle)] bg-clip-text text-transparent">
          {t('recentOrders')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('orderNo')}</TableHead>
              <TableHead>{t('date')}</TableHead>
              <TableHead>{t('customer')}</TableHead>
              <TableHead>{t('amount')}</TableHead>
              <TableHead>{t('status')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.orderNo}>
                <TableCell className="font-medium">{order.orderNo}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell className="font-semibold">{order.amount}</TableCell>
                <TableCell>
                  <Badge className={getStatusBadge(order.status)}>
                    {order.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
