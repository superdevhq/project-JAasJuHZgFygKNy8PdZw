
import { useState } from 'react';
import { Participant } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { UserPlus, X, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ParticipantListProps {
  participants: Participant[];
  onAddParticipant: (name: string) => void;
  onRemoveParticipant: (id: string) => void;
}

export function ParticipantList({ 
  participants, 
  onAddParticipant, 
  onRemoveParticipant 
}: ParticipantListProps) {
  const [newParticipantName, setNewParticipantName] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleAddParticipant = () => {
    if (newParticipantName.trim()) {
      onAddParticipant(newParticipantName.trim());
      setNewParticipantName('');
      setIsAdding(false);
    }
  };

  return (
    <Card className="overflow-hidden border shadow-sm">
      <CardContent className="p-0">
        {isAdding ? (
          <div className="p-4 bg-secondary/50 animate-in">
            <div className="flex items-center space-x-2">
              <Input
                placeholder="Enter name"
                value={newParticipantName}
                onChange={(e) => setNewParticipantName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleAddParticipant();
                  if (e.key === 'Escape') setIsAdding(false);
                }}
                className="flex-1"
                autoFocus
              />
              <Button onClick={handleAddParticipant} size="sm" className="shrink-0">
                Add
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setIsAdding(false)}
                className="h-8 w-8 p-0 shrink-0"
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Cancel</span>
              </Button>
            </div>
          </div>
        ) : (
          <div className="p-4 border-b flex justify-between items-center">
            <span className="font-medium">Participants ({participants.length})</span>
            <Button 
              onClick={() => setIsAdding(true)} 
              variant="outline" 
              size="sm"
              className="h-8"
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Add Person
            </Button>
          </div>
        )}

        <div className="divide-y">
          {participants.length === 0 ? (
            <div className="py-8 text-center">
              <User className="h-10 w-10 mx-auto text-muted-foreground/50 mb-3" />
              <p className="text-muted-foreground">
                No participants yet
              </p>
              <p className="text-sm text-muted-foreground/70 mt-1 max-w-xs mx-auto">
                Add people to your group to start splitting bills
              </p>
            </div>
          ) : (
            participants.map((participant, index) => (
              <div 
                key={participant.id} 
                className={cn(
                  "flex items-center justify-between p-4 hover:bg-muted/50 transition-colors",
                  index === participants.length - 1 && "animate-in"
                )}
                style={{ 
                  animationDelay: `${index * 50}ms`,
                  animationDuration: "300ms" 
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary/10 text-primary">
                    {participant.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="font-medium">{participant.name}</span>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => onRemoveParticipant(participant.id)}
                  className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Remove</span>
                </Button>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
