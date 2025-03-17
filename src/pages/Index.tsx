
import { useState } from 'react';
import { Bill } from '@/types';
import { useBills } from '@/hooks/useBills';
import { ParticipantList } from '@/components/ParticipantList';
import { BillForm } from '@/components/BillForm';
import { BillList } from '@/components/BillList';
import { BillDetails } from '@/components/BillDetails';
import { SettlementSummary } from '@/components/SettlementSummary';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Index = () => {
  const { 
    bills, 
    participants, 
    addParticipant, 
    removeParticipant, 
    addBill, 
    removeBill,
    calculateSettlements
  } = useBills();
  
  const [selectedBill, setSelectedBill] = useState<Bill | null>(null);
  const settlements = calculateSettlements();

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary text-primary-foreground py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">SplitWise</h1>
          <p className="text-primary-foreground/80">Split bills easily with friends</p>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1 space-y-6">
            <ParticipantList 
              participants={participants}
              onAddParticipant={addParticipant}
              onRemoveParticipant={removeParticipant}
            />
            
            <SettlementSummary 
              settlements={settlements}
              participants={participants}
            />
          </div>
          
          <div className="md:col-span-2">
            <Tabs defaultValue="bills">
              <TabsList className="mb-4">
                <TabsTrigger value="bills">Bills</TabsTrigger>
                <TabsTrigger value="add">Add New Bill</TabsTrigger>
              </TabsList>
              
              <TabsContent value="bills">
                {selectedBill ? (
                  <BillDetails 
                    bill={selectedBill}
                    participants={participants}
                    onClose={() => setSelectedBill(null)}
                  />
                ) : (
                  <BillList 
                    bills={bills}
                    participants={participants}
                    onRemoveBill={removeBill}
                    onSelectBill={setSelectedBill}
                  />
                )}
              </TabsContent>
              
              <TabsContent value="add">
                <BillForm 
                  participants={participants}
                  onAddBill={addBill}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <footer className="bg-muted py-6 mt-12">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>SplitWise - Split bills with friends without the hassle</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
