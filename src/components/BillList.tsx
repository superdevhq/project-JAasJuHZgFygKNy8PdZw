
import { Bill, Participant } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/lib/utils';
import { Receipt, Trash2, ChevronRight, DollarSign, Users } from 'lucide-react';

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
    <div className="space-y-6">
      {bills.length === 0 ? (
        <Card className="border shadow-sm">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Receipt className="h-12 w-12 text-muted-foreground/40 mb-4" />
            <h3 className="text-xl font-medium mb-2">No bills yet</h3>
            <p className="text-muted-foreground text-center max-w-sm">
              Add your first bill to start tracking expenses and splitting costs with your group
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {bills.map((bill, index) => (
            <div 
              key={bill.id} 
              className="bill-card group animate-in"
              style={{ 
                animationDelay: `${index * 50}ms`,
                animationDuration: "300ms" 
              }}
            >
              <div className="flex items-start p-5">
                <div 
                  className="flex-1 cursor-pointer" 
                  onClick={() => onSelectBill(bill)}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Receipt className="h-4 w-4 text-primary" />
                    <h3 className="font-medium text-lg group-hover:text-primary transition-colors">
                      {bill.title}
                    </h3>
                  </div>
                  
                  <div className="flex flex-wrap gap-x-6 gap-y-2 mt-3 text-sm">
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
                    
                    <div className="text-muted-foreground">
                      {formatDate(bill.date)}
                    </div>
                  </div>
                  
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {bill.participants.slice(0, 3).map(id => (
                      <span key={id} className="participant-tag bg-secondary border-secondary">
                        {getParticipantName(id)}
                      </span>
                    ))}
                    
                    {bill.participants.length > 3 && (
                      <span className="participant-tag bg-secondary border-secondary">
                        +{bill.participants.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-2 ml-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemoveBill(bill.id)}
                    className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Remove</span>
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onSelectBill(bill)}
                    className="h-8 w-8 p-0 text-muted-foreground"
                  >
                    <ChevronRight className="h-4 w-4" />
                    <span className="sr-only">View</span>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
