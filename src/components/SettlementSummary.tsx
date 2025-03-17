
import { Settlement, Participant } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, CreditCard } from 'lucide-react';

interface SettlementSummaryProps {
  settlements: Settlement[];
  participants: Participant[];
}

export function SettlementSummary({ settlements, participants }: SettlementSummaryProps) {
  // Helper function to get participant name by ID
  const getParticipantName = (id: string) => {
    return participants.find(p => p.id === id)?.name || 'Unknown';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl flex items-center">
          <CreditCard className="mr-2 h-5 w-5" />
          Settlements
        </CardTitle>
      </CardHeader>
      <CardContent>
        {settlements.length === 0 ? (
          <p className="text-muted-foreground text-center py-4">
            No settlements needed. Everyone is square!
          </p>
        ) : (
          <div className="space-y-3">
            {settlements.map((settlement, index) => (
              <div 
                key={index} 
                className="flex items-center justify-between p-3 rounded-lg bg-secondary"
              >
                <div className="flex items-center space-x-2 flex-1">
                  <span className="font-medium">{getParticipantName(settlement.from)}</span>
                  <ArrowRight className="h-4 w-4 text-primary" />
                  <span className="font-medium">{getParticipantName(settlement.to)}</span>
                </div>
                <span className="font-bold">${settlement.amount.toFixed(2)}</span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
