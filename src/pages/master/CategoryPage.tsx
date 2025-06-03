import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  ChevronRight, 
  ChevronDown,
  FolderOpen,
  Folder,
  Tag
} from 'lucide-react';

interface Category {
  id: string;
  name: string;
  description?: string;
  parentId?: string;
  children?: Category[];
  isExpanded?: boolean;
  level: number;
}

const CategoryPage = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([
    {
      id: '1',
      name: 'Electronics',
      description: 'Electronic devices and accessories',
      level: 0,
      isExpanded: true,
      children: [
        {
          id: '1-1',
          name: 'Computers',
          description: 'Desktop and laptop computers',
          parentId: '1',
          level: 1,
          isExpanded: true,
          children: [
            {
              id: '1-1-1',
              name: 'Laptops',
              description: 'Portable computers',
              parentId: '1-1',
              level: 2
            },
            {
              id: '1-1-2',
              name: 'Desktops',
              description: 'Desktop computers',
              parentId: '1-1',
              level: 2
            }
          ]
        },
        {
          id: '1-2',
          name: 'Mobile Phones',
          description: 'Smartphones and accessories',
          parentId: '1',
          level: 1,
          children: [
            {
              id: '1-2-1',
              name: 'Android',
              description: 'Android smartphones',
              parentId: '1-2',
              level: 2
            },
            {
              id: '1-2-2',
              name: 'iOS',
              description: 'Apple iPhones',
              parentId: '1-2',
              level: 2
            }
          ]
        }
      ]
    },
    {
      id: '2',
      name: 'Furniture',
      description: 'Home and office furniture',
      level: 0,
      isExpanded: false,
      children: [
        {
          id: '2-1',
          name: 'Office Furniture',
          description: 'Chairs, desks, and office equipment',
          parentId: '2',
          level: 1
        },
        {
          id: '2-2',
          name: 'Home Furniture',
          description: 'Living room and bedroom furniture',
          parentId: '2',
          level: 1
        }
      ]
    },
    {
      id: '3',
      name: 'Clothing',
      description: 'Apparel and accessories',
      level: 0,
      isExpanded: true,
      children: [
        {
          id: '3-1',
          name: 'Men\'s Clothing',
          description: 'Men\'s apparel',
          parentId: '3',
          level: 1
        },
        {
          id: '3-2',
          name: 'Women\'s Clothing',
          description: 'Women\'s apparel',
          parentId: '3',
          level: 1
        }
      ]
    }
  ]);

  const toggleExpanded = (categoryId: string) => {
    const toggleInTree = (items: Category[]): Category[] => {
      return items.map(item => {
        if (item.id === categoryId) {
          return { ...item, isExpanded: !item.isExpanded };
        }
        if (item.children) {
          return { ...item, children: toggleInTree(item.children) };
        }
        return item;
      });
    };
    setCategories(toggleInTree(categories));
  };

  const renderCategoryIcon = (category: Category) => {
    if (category.children && category.children.length > 0) {
      return category.isExpanded ? (
        <FolderOpen className="h-4 w-4 text-blue-500" />
      ) : (
        <Folder className="h-4 w-4 text-blue-500" />
      );
    }
    return <Tag className="h-4 w-4 text-green-500" />;
  };

  const renderTreeLines = (category: Category, isLast: boolean = false) => {
    const lines = [];
    
    // Vertical line for current level
    if (category.level > 0) {
      lines.push(
        <div
          key={`vertical-${category.level}`}
          className="absolute border-l-2 border-gray-300"
          style={{
            left: `${16 + (category.level - 1) * 24 + 12}px`,
            top: category.level === 1 ? '0px' : '-12px',
            height: isLast ? '24px' : '36px'
          }}
        />
      );
      
      // Horizontal line
      lines.push(
        <div
          key={`horizontal-${category.level}`}
          className="absolute border-t-2 border-gray-300"
          style={{
            left: `${16 + (category.level - 1) * 24 + 12}px`,
            top: '24px',
            width: '12px'
          }}
        />
      );
    }
    
    return lines;
  };

  const renderTreeNode = (category: Category, index: number, siblings: Category[]) => {
    const hasChildren = category.children && category.children.length > 0;
    const indentSize = category.level * 24;
    const isLast = index === siblings.length - 1;

    return (
      <div key={category.id} className="relative">
        {/* Tree connecting lines */}
        {renderTreeLines(category, isLast)}
        
        <div 
          className="relative border-b border-gray-100 bg-white hover:bg-gray-50 transition-colors duration-200"
          style={{ paddingLeft: `${16 + indentSize}px` }}
        >
          <div className="flex items-center justify-between py-2 px-4">
            <div className="flex items-center flex-1 min-w-0">
              {hasChildren && (
                <button
                  onClick={() => toggleExpanded(category.id)}
                  className="mr-2 p-1 hover:bg-gray-200 rounded transition-colors z-10 relative"
                >
                  {category.isExpanded ? (
                    <ChevronDown className="h-4 w-4 text-gray-600" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-gray-600" />
                  )}
                </button>
              )}
              
              {!hasChildren && <div className="w-6 mr-2" />}
              
              <div className="mr-3 z-10 relative">
                {renderCategoryIcon(category)}
              </div>
              
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-gray-900 truncate text-sm">
                  {category.name}
                </h4>
                {category.description && (
                  <p className="text-xs text-gray-500 truncate">
                    {category.description}
                  </p>
                )}
              </div>
              
              <div className="flex items-center gap-2 ml-4">
                <Badge variant="outline" className="text-xs">
                  Level {category.level + 1}
                </Badge>
              </div>
            </div>
            
            <div className="flex items-center gap-2 ml-4">
              <Button
                size="sm"
                variant="ghost"
                className="h-7 w-7 p-0 hover:bg-gradient-to-r hover:from-[#00d4ff] hover:to-[#8a2be2] hover:text-white"
              >
                <Edit2 className="h-3 w-3" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="h-7 w-7 p-0 hover:bg-gradient-to-r hover:from-[#ff1a4a] hover:to-[#ff69b4] hover:text-white"
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
        
        {hasChildren && category.isExpanded && category.children && (
          <div className="relative">
            {/* Vertical line for expanded children */}
            {category.children.length > 0 && (
              <div
                className="absolute border-l-2 border-gray-300"
                style={{
                  left: `${16 + category.level * 24 + 12}px`,
                  top: '0px',
                  height: `${category.children.length * 48}px`
                }}
              />
            )}
            {category.children.map((child, childIndex) => 
              renderTreeNode(child, childIndex, category.children!)
            )}
          </div>
        )}
      </div>
    );
  };

  const flattenCategories = (cats: Category[]): Category[] => {
    let result: Category[] = [];
    cats.forEach(cat => {
      result.push(cat);
      if (cat.children && cat.isExpanded) {
        result = result.concat(flattenCategories(cat.children));
      }
    });
    return result;
  };

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (category.description && category.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header with transparent overlay for logo visibility */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#05b2fd] via-[#6f42c1] to-[#ff1a1a] p-8 text-white shadow-2xl">
        {/* Transparent overlay for better logo visibility */}
        <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px]"></div>
        
        {/* Decorative elements with reduced opacity */}
        <div className="absolute top-0 right-0 -mt-4 -mr-4 h-32 w-32 rounded-full bg-white/5"></div>
        <div className="absolute bottom-0 left-0 -mb-8 -ml-8 h-40 w-40 rounded-full bg-white/3"></div>
        
        {/* Content with relative positioning */}
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-12 w-12 rounded-full bg-white/15 flex items-center justify-center backdrop-blur-sm border border-white/20">
              <Tag className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold drop-shadow-sm">Category Management</h1>
              <p className="text-white/90 mt-1 drop-shadow-sm">Manage your product categories in hierarchical structure</p>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <Card className="bg-gradient-to-br from-[#f8fafc] to-[#f1f5f9] shadow-lg">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-[#00d4ff] via-[#8a2be2] to-[#ff69b4] text-white hover:opacity-90 px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Category
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Category</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <div>
                    <label className="text-sm font-medium">Category Name</label>
                    <Input placeholder="Enter category name" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Description</label>
                    <Input placeholder="Enter description" />
                  </div>
                  <div className="flex gap-2 pt-4">
                    <Button 
                      onClick={() => setIsAddDialogOpen(false)}
                      className="bg-gradient-to-r from-[#00d4ff] via-[#8a2be2] to-[#ff69b4] text-white hover:opacity-90"
                    >
                      Save
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => setIsAddDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>

      {/* Category Tree */}
      <Card className="bg-gradient-to-br from-[#f8fafc] to-[#f1f5f9] shadow-lg">
        <CardHeader className="bg-gradient-to-r from-[#05b2fd] via-[#6f42c1] to-[#ff1a1a] p-6 rounded-t-lg">
          <CardTitle className="text-white flex items-center gap-2">
            <Tag className="h-5 w-5" />
            Category Hierarchy
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="max-h-[600px] overflow-y-auto">
            {filteredCategories.length > 0 ? (
              <div>
                {filteredCategories.map((category, index) => 
                  renderTreeNode(category, index, filteredCategories)
                )}
              </div>
            ) : (
              <div className="p-8 text-center text-gray-500">
                <Tag className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>No categories found</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CategoryPage;
