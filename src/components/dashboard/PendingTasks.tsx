
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';

export function PendingTasks() {
  const { t } = useTranslation();

  const tasks = [
    { 
      task: 'Approve Purchase Order #PO-001', 
      priority: 'High',
      dueDate: '2024-05-25'
    },
    { 
      task: 'Review Inventory Report', 
      priority: 'Medium',
      dueDate: '2024-05-26'
    },
    { 
      task: 'Update Product Pricing', 
      priority: 'Low',
      dueDate: '2024-05-27'
    },
    { 
      task: 'Process Customer Returns', 
      priority: 'High',
      dueDate: '2024-05-25'
    },
  ];

  const getPriorityColor = (priority: string) => {
    const colors = {
      'High': 'bg-red-100 text-red-800',
      'Medium': 'bg-yellow-100 text-yellow-800',
      'Low': 'bg-green-100 text-green-800',
    };
    return colors[priority as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-middle)] bg-clip-text text-transparent">
          {t('pendingTasks')}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {tasks.map((task, index) => (
          <div key={index} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50">
            <Checkbox />
            <div className="flex-1">
              <p className="text-sm font-medium">{task.task}</p>
              <p className="text-xs text-gray-500">Due: {task.dueDate}</p>
            </div>
            <Badge className={getPriorityColor(task.priority)}>
              {task.priority}
            </Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
