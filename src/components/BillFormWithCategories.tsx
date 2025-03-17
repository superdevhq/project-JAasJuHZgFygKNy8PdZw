
import { useState } from 'react';
import { Bill, BillItem, Participant, Split, BILL_CATEGORIES } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { X, Plus, Receipt, DollarSign, Tag } from 'lucide-react';
import { BillFormTags } from './BillFormTags';

interface BillFormWithCategoriesProps {
  participants: Participant[];
  onAddBill: (bill: Omit<Bill, 'id'>) => void;
}

export function BillFormWithCategories({ participants, onAddBill }: BillFormWithCategoriesProps) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<string | undefined>(undefined);
  const [tags, setTags] = useState<string[]>([]);
  const [items, setItems] = useState<Omit<BillItem, 'id'>[]>([
    { description: '', amount: 0 }
  ]);
  const [selectedParticipants, setSelectedParticipants] = useState<string[]>([]);
  const [splitEvenly, setSplitEvenly] = useState(true);
  const [customSplits, setCustomSplits] = useState<Split[]>([]);

  const totalAmount = items.reduce((sum, item) => sum + (item.amount || 0), 0);

  const handleAddItem = () => {
    setItems([...items, { description: '', amount: 0 }]);
  };

  const handleRemoveItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleItemChange = (index: number, field: keyof BillItem, value: string | number) => {
    const newItems = [...items];
    if (field === 'amount') {
      newItems[index][field] = typeof value === 'string' ? parseFloat(value) || 0 : value;
    } else {
      newItems[index][field] = value as string;
    }
    setItems(newItems);
  };

  const handleParticipantToggle = (participantId: string) => {
    setSelectedParticipants(prev => 
      prev.includes(participantId)
        ? prev.filter(id => id !== participantId)
        : [...prev, participantId]
    );
    
    // Update custom splits when participants change
    if (!selectedParticipants.includes(participantId)) {
      setCustomSplits(prev => [...prev, { participantId, amount: 0 }]);
    } else {
      setCustomSplits(prev => prev.filter(split => split.participantId !== participantId));
    }
  };

  const handleSplitChange = (participantId: string, amount: number) => {
    setCustomSplits(prev => 
      prev.map(split => 
        split.participantId === participantId 
          ? { ...split, amount } 
          : split
      )
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || selectedParticipants.length === 0 || totalAmount <= 0) {
      return;
    }
    
    // Calculate splits
    let splits: Split[];
    
    if (splitEvenly) {
      const amountPerPerson = totalAmount / selectedParticipants.length;
      splits = selectedParticipants.map(participantId => ({
        participantId,
        amount: Math.round(amountPerPerson * 100) / 100 // Round to 2 decimal places
      }));
    } else {
      splits = customSplits;
    }
    
    const billItems: BillItem[] = items.map(item => ({
      ...item,
      id: crypto.randomUUID()
    }));
    
    const newBill: Omit<Bill, 'id'> = {
      title,
      date: new Date(),
      items: billItems,
      participants: selectedParticipants,
      splits,
      totalAmount,
      category,
      tags: tags.length > 0 ? tags : undefined
    };
    
    onAddBill(newBill);
    
    // Reset form
    setTitle('');
    setCategory(undefined);
    setTags([]);
    setItems([{ description: '', amount: 0 }]);
    setSelectedParticipants([]);
    setSplitEvenly(true);
    setCustomSplits([]);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Receipt className="mr-2 h-5 w-5" />
          Add New Bill
        </CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Bill Title</Label>
            <Input
              id="title"
              placeholder="e.g., Dinner at Restaurant"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select 
              value={category} 
              onValueChange={setCategory}
            >
              <SelectTrigger id="category">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {BILL_CATEGORIES.map(cat => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <BillFormTags tags={tags} onChange={setTags} />
          
          <div className="space-y-2">
            <Label>Bill Items</Label>
            {items.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Input
                  placeholder="Item description"
                  value={item.description}
                  onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                  className="flex-1"
                />
                <div className="relative">
                  <DollarSign className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={item.amount || ''}
                    onChange={(e) => handleItemChange(index, 'amount', e.target.value)}
                    className="pl-8 w-24"
                    min="0"
                    step="0.01"
                  />
                </div>
                {items.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveItem(index)}
                    className="h-8 w-8 p-0"
                  >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Remove</span>
                  </Button>
                )}
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleAddItem}
              className="mt-2"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Item
            </Button>
          </div>
          
          {/* ... keep existing code (participants selection, split options) */}
          
          <div className="space-y-2">
            <Label>Participants</Label>
            {participants.length === 0 ? (
              <p className="text-muted-foreground">
                No participants available. Add participants first.
              </p>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                {participants.map((participant) => (
                  <div key={participant.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`participant-${participant.id}`}
                      checked={selectedParticipants.includes(participant.id)}
                      onCheckedChange={() => handleParticipantToggle(participant.id)}
                    />
                    <Label htmlFor={`participant-${participant.id}`}>
                      {participant.name}
                    </Label>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {selectedParticipants.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="split-evenly"
                  checked={splitEvenly}
                  onCheckedChange={(checked) => setSplitEvenly(!!checked)}
                />
                <Label htmlFor="split-evenly">Split evenly</Label>
              </div>
              
              {!splitEvenly && (
                <div className="space-y-2 pt-2">
                  <Label>Custom Split</Label>
                  {selectedParticipants.map((participantId) => {
                    const participant = participants.find(p => p.id === participantId);
                    const split = customSplits.find(s => s.participantId === participantId);
                    
                    return (
                      <div key={participantId} className="flex items-center space-x-2">
                        <Label className="w-24">{participant?.name}</Label>
                        <div className="relative flex-1">
                          <DollarSign className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            type="number"
                            placeholder="0.00"
                            value={split?.amount || ''}
                            onChange={(e) => handleSplitChange(
                              participantId, 
                              parseFloat(e.target.value) || 0
                            )}
                            className="pl-8"
                            min="0"
                            step="0.01"
                          />
                        </div>
                      </div>
                    );
                  })}
                  
                  <div className="flex justify-between pt-2">
                    <span>Total:</span>
                    <span className="font-medium">
                      ${customSplits.reduce((sum, split) => sum + split.amount, 0).toFixed(2)}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>Bill Amount:</span>
                    <span className="font-medium">${totalAmount.toFixed(2)}</span>
                  </div>
                  
                  {Math.abs(
                    customSplits.reduce((sum, split) => sum + split.amount, 0) - totalAmount
                  ) > 0.01 && (
                    <p className="text-destructive text-sm">
                      The split amounts don't match the total bill amount.
                    </p>
                  )}
                </div>
              )}
            </div>
          )}
          
          <div className="flex justify-between pt-2">
            <span className="font-medium">Total Bill Amount:</span>
            <span className="font-bold">${totalAmount.toFixed(2)}</span>
          </div>
        </CardContent>
        
        <CardFooter>
          <Button 
            type="submit" 
            className="w-full"
            disabled={
              !title || 
              selectedParticipants.length === 0 || 
              totalAmount <= 0 ||
              (!splitEvenly && 
                Math.abs(
                  customSplits.reduce((sum, split) => sum + split.amount, 0) - totalAmount
                ) > 0.01)
            }
          >
            Add Bill
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
