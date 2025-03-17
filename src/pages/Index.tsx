import { useState } from 'react';
import { Bill } from '@/types';
import { useBills } from '@/hooks/useBills';
import { ParticipantList } from '@/components/ParticipantList';
import { BillForm } from '@/components/BillForm';
import { BillList } from '@/components/BillList';
import { BillDetails } from '@/components/BillDetails';
import { SettlementSummary } from '@/components/SettlementSummary';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DollarSign, Receipt, Users, Calculator } from 'lucide-react';

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
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b bg-background py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold">SplitWise</h1>
          </div>
          <p className="text-muted-foreground text-lg max-w-md">
            Split bills easily with friends and keep track of who owes what
          </p>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-8">
            <div className="sticky top-8">
              <div className="space-y-8">
                <div className="animate-in">
                  <div className="flex items-center gap-2 mb-4">
                    <Users className="h-5 w-5 text-primary" />
                    <h2 className="text-2xl font-semibold">Group Members</h2>
                  </div>
                  <ParticipantList 
                    participants={participants}
                    onAddParticipant={addParticipant}
                    onRemoveParticipant={removeParticipant}
                  />
                </div>
                
                <div className="animate-in" style={{ animationDelay: "100ms" }}>
                  <div className="flex items-center gap-2 mb-4">
                    <Calculator className="h-5 w-5 text-primary" />
                    <h2 className="text-2xl font-semibold">Settlements</h2>
                  </div>
                  <SettlementSummary 
                    settlements={settlements}
                    participants={participants}
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-2 animate-in" style={{ animationDelay: "200ms" }}>
            <Tabs defaultValue="bills" className="w-full">
              <div className="flex items-center gap-2 mb-6">
                <Receipt className="h-5 w-5 text-primary" />
                <h2 className="text-2xl font-semibold">Manage Bills</h2>
              </div>
              
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="bills" className="text-base py-3">
                  View Bills
                </TabsTrigger>
                <TabsTrigger value="add" className="text-base py-3">
                  Add New Bill
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="bills" className="mt-0">
                {selectedBill ? (
                  <div className="animate-in">
                    <BillDetails 
                      bill={selectedBill}
                      participants={participants}
                      onClose={() => setSelectedBill(null)}
                    />
                  </div>
                ) : (
                  <BillList 
                    bills={bills}
                    participants={participants}
                    onRemoveBill={removeBill}
                    onSelectBill={setSelectedBill}
                  />
                )}
              </TabsContent>
              
              <TabsContent value="add" className="mt-0">
                <BillForm 
                  participants={participants}
                  onAddBill={addBill}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <footer className="border-t bg-muted/50 py-6 mt-12">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-primary" />
            <span className="font-medium">SplitWise</span>
          </div>
          <p className="text-muted-foreground text-sm">
            Split bills with friends without the hassle
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;