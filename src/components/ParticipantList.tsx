
import { useState } from 'react';
import { Participant } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { X, UserPlus } from 'lucide-react';

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

  const handleAddParticipant = () => {
    if (newParticipantName.trim()) {
      onAddParticipant(newParticipantName.trim());
      setNewParticipantName('');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Participants</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2 mb-4">
          <Input
            placeholder="Add participant name"
            value={newParticipantName}
            onChange={(e) => setNewParticipantName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleAddParticipant();
            }}
            className="flex-1"
          />
          <Button onClick={handleAddParticipant} size="sm">
            <UserPlus className="h-4 w-4 mr-2" />
            Add
          </Button>
        </div>

        {participants.length === 0 ? (
          <p className="text-muted-foreground text-center py-4">
            No participants yet. Add someone to get started!
          </p>
        ) : (
          <div className="space-y-2">
            {participants.map((participant) => (
              <div 
                key={participant.id} 
                className="flex items-center justify-between p-2 rounded-md bg-secondary"
              >
                <span>{participant.name}</span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => onRemoveParticipant(participant.id)}
                  className="h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Remove</span>
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
