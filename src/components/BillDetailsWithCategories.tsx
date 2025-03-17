
import { Bill, Participant } from '@/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Calendar, DollarSign, Tag } from 'lucide-react';
import { formatDate } from '@/lib/utils';

interface BillDetailsWithCategoriesProps {
  bill: Bill;
  participants: Participant[];
  onClose: () => void;
}

export function BillDetailsWithCategories({ 
  bill, 
  participants, 
  onClose 
}: BillDetailsWithCategoriesProps) {
  // Find participant names from IDs
  const getParticipantName = (id: string) => {
    return participants.find(p => p.id === id)?.name || 'Unknown';
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onClose}
            className="h-8 w-8 p-0 mr-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Button>
          <CardTitle className="text-xl">{bill.title}</CardTitle>
        </div>
        <div className="flex items-center text-sm text-muted-foreground mt-1">
          <Calendar className="h-3.5 w-3.5 mr-1" />
          <span>{formatDate(bill.date)}</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {bill.category && (
          <div>
            <h3 className="text-sm font-medium mb-1">Category</h3>
            <Badge variant="outline" className="bg-primary/10">
              {bill.category}
            </Badge>
          </div>
        )}
        
        {bill.tags && bill.tags.length > 0 && (
          <div>
            <h3 className="text-sm font-medium mb-1 flex items-center">
              <Tag className="h-3.5 w-3.5 mr-1" />
              Tags
            </h3>
            <div className="flex flex-wrap gap-1">
              {bill.tags.map(tag => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}
        
        <div>
          <h3 className="text-sm font-medium mb-2">Items</h3>
          <div className="space-y-2">
            {bill.items.map((item, index) => (
              <div key={index} className="flex justify-between text-sm">
                <span>{item.description || `Item ${index + 1}`}</span>
                <span className="font-medium">${item.amount.toFixed(2)}</span>
              </div>
            ))}
            <div className="flex justify-between pt-2 border-t">
              <span className="font-medium">Total</span>
              <span className="font-bold">${bill.totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-medium mb-2">Participants</h3>
          <div className="space-y-1">
            {bill.participants.map(participantId => (
              <div key={participantId} className="text-sm">
                {getParticipantName(participantId)}
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-medium mb-2">Split Details</h3>
          <div className="space-y-2">
            {bill.splits.map((split, index) => (
              <div key={index} className="flex justify-between text-sm">
                <span>{getParticipantName(split.participantId)}</span>
                <span className="font-medium">${split.amount.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          variant="outline" 
          className="w-full"
          onClick={onClose}
        >
          Close
        </Button>
      </CardFooter>
    </Card>
  );
}
