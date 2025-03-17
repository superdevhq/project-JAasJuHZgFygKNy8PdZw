import { useState, useEffect } from 'react';
import { Bill, BILL_CATEGORIES } from '@/types';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search, X, Tag } from 'lucide-react';
import { Button } from './ui/button';

interface BillSearchProps {
  bills: Bill[];
  onFilteredBillsChange: (filteredBills: Bill[]) => void;
}

export function BillSearch({ bills, onFilteredBillsChange }: BillSearchProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  
  // Get all unique tags from bills
  const allTags = Array.from(
    new Set(
      bills
        .filter(bill => bill.tags && bill.tags.length > 0)
        .flatMap(bill => bill.tags || [])
    )
  );

  // Filter bills based on search term, category, and tags
  useEffect(() => {
    const filtered = bills.filter(bill => {
      // Search term filter (title, description, amount)
      const matchesSearch = searchTerm === '' || 
        bill.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bill.items.some(item => 
          item.description.toLowerCase().includes(searchTerm.toLowerCase())
        ) ||
        bill.totalAmount.toString().includes(searchTerm);
      
      // Category filter
      const matchesCategory = !selectedCategory || bill.category === selectedCategory;
      
      // Tags filter
      const matchesTags = selectedTags.length === 0 || 
        (bill.tags && selectedTags.every(tag => bill.tags?.includes(tag)));
      
      return matchesSearch && matchesCategory && matchesTags;
    });
    
    onFilteredBillsChange(filtered);
  }, [bills, searchTerm, selectedCategory, selectedTags, onFilteredBillsChange]);

  const handleTagSelect = (tag: string) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleTagRemove = (tag: string) => {
    setSelectedTags(selectedTags.filter(t => t !== tag));
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory(null);
    setSelectedTags([]);
  };

  return (
    <div className="space-y-4 mb-6 p-4 border rounded-lg bg-muted/30">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 space-y-2">
          <Label htmlFor="search">Search Bills</Label>
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="search"
              placeholder="Search by title, description or amount..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>
        
        <div className="w-full sm:w-48 space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select 
            value={selectedCategory || 'all'} 
            onValueChange={(value) => setSelectedCategory(value === 'all' ? null : value)}
          >
            <SelectTrigger id="category">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {BILL_CATEGORIES.map(category => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {allTags.length > 0 && (
        <div className="space-y-2">
          <Label className="flex items-center gap-1">
            <Tag className="h-4 w-4" />
            Tags
          </Label>
          <div className="flex flex-wrap gap-2">
            {allTags.map(tag => (
              <Badge 
                key={tag}
                variant={selectedTags.includes(tag) ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => 
                  selectedTags.includes(tag) 
                    ? handleTagRemove(tag) 
                    : handleTagSelect(tag)
                }
              >
                {tag}
                {selectedTags.includes(tag) && (
                  <X className="ml-1 h-3 w-3" />
                )}
              </Badge>
            ))}
          </div>
        </div>
      )}
      
      {(searchTerm || selectedCategory || selectedTags.length > 0) && (
        <div className="flex justify-end">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={clearFilters}
            className="text-muted-foreground"
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
}