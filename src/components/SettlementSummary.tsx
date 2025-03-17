
import { Settlement, Participant } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, CreditCard, Banknote } from 'lucide-react';

interface SettlementSummaryProps {
  settlements: Settlement[];
  participants: Participant[];
}

export function SettlementSummary({ settlements, participants }: SettlementSummaryProps) {
  // Helper function to get participant name by ID
  const getParticipantName = (id: string) => {
    return participants.find(p => p.id === id)?.name || 'Unknown';
  };

  // Helper function to get participant initial
  const getParticipantInitial = (id: string) => {
    const name = getParticipantName(id);
    return name.charAt(0).toUpperCase();
  };

  return (
    <Card className="overflow-hidden border shadow-sm">
      <CardContent className="p-0">
        <div className="p-4 border-b">
          <span className="font-medium">Settlements</span>
        </div>

        {settlements.length === 0 ? (
          <div className="py-8 text-center">
            <Banknote className="h-10 w-10 mx-auto text-muted-foreground/50 mb-3" />
            <p className="text-muted-foreground">
              No settlements needed
            </p>
            <p className="text-sm text-muted-foreground/70 mt-1 max-w-xs mx-auto">
              Everyone is square! Add bills to see who owes what
            </p>
          </div>
        ) : (
          <div className="divide-y">
            {settlements.map((settlement, index) => (
              <div 
                key={index} 
                className="p-4 hover:bg-muted/50 transition-colors animate-in"
                style={{ 
                  animationDelay: `${index * 50}ms`,
                  animationDuration: "300ms" 
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-destructive/10 text-destructive flex items-center justify-center text-sm font-medium">
                        {getParticipantInitial(settlement.from)}
                      </div>
                      <ArrowRight className="h-4 w-4 mx-1 text-muted-foreground" />
                      <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-medium">
                        {getParticipantInitial(settlement.to)}
                      </div>
                    </div>
                  </div>
                  <div className="font-bold text-lg">
                    ${settlement.amount.toFixed(2)}
                  </div>
                </div>
                
                <div className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">{getParticipantName(settlement.from)}</span>
                  {' '}pays{' '}
                  <span className="font-medium text-foreground">{getParticipantName(settlement.to)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
