
import { Bill, Participant } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/lib/utils';
import { Receipt, Trash2 } from 'lucide-react';

interface BillListProps {
  bills: Bill[];
  participants: Participant[];
  onRemoveBill: (id: string) => void;
  onSelectBill: (bill: Bill) => void;
}

export function BillList({ 
  bills, 
  participants, 
  onRemoveBill, 
  onSelectBill 
}: BillListProps) {
  // Helper function to get participant name by ID
  const getParticipantName = (id: string) => {
    return participants.find(p => p.id === id)?.name || 'Unknown';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Bills</CardTitle>
      </CardHeader>
      <CardContent>
        {bills.length === 0 ? (
          <p className="text-muted-foreground text-center py-4">
            No bills yet. Add a bill to get started!
          </p>
        ) : (
          <div className="space-y-4">
            {bills.map((bill) => (
              <div 
                key={bill.id} 
                className="border rounded-lg p-4 hover:bg-secondary/50 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div 
                    className="flex-1 cursor-pointer" 
                    onClick={() => onSelectBill(bill)}
                  >
                    <div className="flex items-center">
                      <Receipt className="h-4 w-4 mr-2 text-primary" />
                      <h3 className="font-medium">{bill.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(bill.date)}
                    </p>
                    <p className="font-medium mt-1">
                      ${bill.totalAmount.toFixed(2)}
                    </p>
                    <div className="mt-2">
                      <p className="text-sm text-muted-foreground">
                        Participants: {bill.participants.map(id => getParticipantName(id)).join(', ')}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemoveBill(bill.id)}
                    className="h-8 w-8 p-0 ml-2"
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                    <span className="sr-only">Remove</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
