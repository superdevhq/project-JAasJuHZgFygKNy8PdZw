
import { Bill, Participant } from '@/types';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/lib/utils';
import { X, Receipt, Calendar, DollarSign, ArrowLeft, Users } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

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
    <Card className="border shadow-sm overflow-hidden animate-in">
      <CardHeader className="bg-muted/30 px-6 py-4 flex flex-row items-center justify-between">
        <Button variant="ghost" size="sm" onClick={onClose} className="gap-1">
          <ArrowLeft className="h-4 w-4" />
          <span>Back to bills</span>
        </Button>
        <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Button>
      </CardHeader>
      
      <CardContent className="p-0">
        <div className="p-6">
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Receipt className="h-6 w-6 text-primary" />
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold mb-1">{bill.title}</h2>
              
              <div className="flex flex-wrap gap-x-6 gap-y-2 mt-2 text-sm">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>{formatDate(bill.date)}</span>
                </div>
                
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <DollarSign className="h-3.5 w-3.5" />
                  <span className="font-medium text-foreground">
                    ${bill.totalAmount.toFixed(2)}
                  </span>
                </div>
                
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Users className="h-3.5 w-3.5" />
                  <span>{bill.participants.length} people</span>
                </div>
              </div>
            </div>
          </div>
          
          <Separator className="my-6" />
          
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-3">BILL ITEMS</h3>
              <div className="space-y-3">
                {bill.items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center p-3 rounded-lg bg-secondary/50">
                    <span>{item.description || 'Unnamed item'}</span>
                    <span className="font-medium">${item.amount.toFixed(2)}</span>
                  </div>
                ))}
                
                <div className="flex justify-between items-center p-3 rounded-lg bg-primary/5 font-medium">
                  <span>Total</span>
                  <span className="font-bold">${bill.totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-3">PARTICIPANTS</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {bill.participants.map((id) => (
                  <div key={id} className="flex items-center gap-2 p-2 rounded-md bg-secondary/50">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-xs text-primary font-medium">
                      {getParticipantName(id).charAt(0).toUpperCase()}
                    </div>
                    <span className="truncate">{getParticipantName(id)}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-3">SPLIT DETAILS</h3>
              <div className="space-y-2">
                {bill.splits.map((split) => (
                  <div key={split.participantId} className="flex justify-between items-center p-3 rounded-lg bg-secondary/50">
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-xs text-primary font-medium">
                        {getParticipantName(split.participantId).charAt(0).toUpperCase()}
                      </div>
                      <span>{getParticipantName(split.participantId)}</span>
                    </div>
                    <span className="font-medium">${split.amount.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
