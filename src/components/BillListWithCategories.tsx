
import { Bill, Participant } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Trash2, Tag } from 'lucide-react';
import { formatDate, formatCurrency } from '@/lib/utils';

interface BillListWithCategoriesProps {
  bills: Bill[];
  participants: Participant[];
  onRemoveBill: (id: string) => void;
  onSelectBill: (bill: Bill) => void;
}

export function BillListWithCategories({ 
  bills, 
  participants, 
  onRemoveBill, 
  onSelectBill 
}: BillListWithCategoriesProps) {
  // Find participant names from IDs
  const getParticipantName = (id: string) => {
    return participants.find(p => p.id === id)?.name || 'Unknown';
  };

  // Get participant list as comma-separated string
  const getParticipantList = (participantIds: string[]) => {
    return participantIds
      .map(id => getParticipantName(id))
      .join(', ');
  };

  return (
    <div className="space-y-4">
      {bills.length === 0 ? (
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-muted-foreground">No bills added yet.</p>
            <p className="text-sm text-muted-foreground mt-1">
              Add a new bill to get started.
            </p>
          </CardContent>
        </Card>
      ) : (
        bills.map(bill => (
          <Card 
            key={bill.id} 
            className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => onSelectBill(bill)}
          >
            <div className="flex flex-col sm:flex-row">
              {bill.category && (
                <div className="w-full sm:w-2 bg-primary" />
              )}
              <CardContent className="p-4 flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-lg">{bill.title}</h3>
                    <div className="flex items-center text-sm text-muted-foreground mt-1">
                      <Calendar className="h-3.5 w-3.5 mr-1" />
                      <span>{formatDate(bill.date)}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">{formatCurrency(bill.totalAmount)}</div>
                    <div className="text-sm text-muted-foreground">
                      {bill.participants.length} {bill.participants.length === 1 ? 'person' : 'people'}
                    </div>
                  </div>
                </div>
                
                <div className="mt-3 flex flex-wrap gap-2">
                  {bill.category && (
                    <Badge variant="outline" className="bg-primary/10">
                      {bill.category}
                    </Badge>
                  )}
                  
                  {bill.tags && bill.tags.length > 0 && (
                    <div className="flex items-center gap-1">
                      <Tag className="h-3 w-3 text-muted-foreground" />
                      {bill.tags.map((tag, index) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="mt-3 text-sm text-muted-foreground truncate">
                  {getParticipantList(bill.participants)}
                </div>
                
                <div className="mt-3 flex justify-end">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveBill(bill.id);
                    }}
                    className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Remove</span>
                  </Button>
                </div>
              </CardContent>
            </div>
          </Card>
        ))
      )}
    </div>
  );
}
