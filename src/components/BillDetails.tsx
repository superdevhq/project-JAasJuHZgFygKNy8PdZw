
import { Bill, Participant } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/lib/utils';
import { X, Receipt, DollarSign } from 'lucide-react';

interface BillDetailsProps {
  bill: Bill;
  participants: Participant[];
  onClose: () => void;
}

export function BillDetails({ bill, participants, onClose }: BillDetailsProps) {
  // Helper function to get participant name by ID
  const getParticipantName = (id: string) => {
    return participants.find(p => p.id === id)?.name || 'Unknown';
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl flex items-center">
          <Receipt className="mr-2 h-5 w-5" />
          {bill.title}
        </CardTitle>
        <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">Date</p>
            <p>{formatDate(bill.date)}</p>
          </div>
          
          <div>
            <p className="text-sm text-muted-foreground mb-2">Items</p>
            <div className="space-y-2">
              {bill.items.map((item) => (
                <div key={item.id} className="flex justify-between items-center">
                  <span>{item.description || 'Unnamed item'}</span>
                  <span>${item.amount.toFixed(2)}</span>
                </div>
              ))}
              <div className="flex justify-between items-center pt-2 border-t">
                <span className="font-medium">Total</span>
                <span className="font-bold">${bill.totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>
          
          <div>
            <p className="text-sm text-muted-foreground mb-2">Participants</p>
            <div className="flex flex-wrap gap-2">
              {bill.participants.map((id) => (
                <div key={id} className="bg-secondary px-2 py-1 rounded-md text-sm">
                  {getParticipantName(id)}
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <p className="text-sm text-muted-foreground mb-2">Split</p>
            <div className="space-y-2">
              {bill.splits.map((split) => (
                <div key={split.participantId} className="flex justify-between items-center">
                  <span>{getParticipantName(split.participantId)}</span>
                  <span>${split.amount.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
