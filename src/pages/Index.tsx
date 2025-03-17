
import { useState } from 'react';
import { Bill } from '@/types';
import { useBills } from '@/hooks/useBills';
import { ParticipantList } from '@/components/ParticipantList';
import { BillForm } from '@/components/BillForm';
import { BillDetails } from '@/components/BillDetails';
import { SettlementSummary } from '@/components/SettlementSummary';
import { BillListWithSearch } from '@/components/BillListWithSearch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DollarSign, Receipt, Users, Calculator } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

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
    <header className="border-b bg-background py-6 shadow-sm">
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
        <div className="lg:col-span-1">
          <div className="sticky top-8 space-y-8">
            <Card className="shadow-sm border overflow-hidden">
              <CardHeader className="bg-muted/30 pb-3">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-semibold">Group Members</h2>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <ParticipantList 
                  participants={participants}
                  onAddParticipant={addParticipant}
                  onRemoveParticipant={removeParticipant}
                />
              </CardContent>
            </Card>
            
            <Card className="shadow-sm border overflow-hidden">
              <CardHeader className="bg-muted/30 pb-3">
                <div className="flex items-center gap-2">
                  <Calculator className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-semibold">Settlements</h2>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <SettlementSummary 
                  settlements={settlements}
                  participants={participants}
                />
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="lg:col-span-2">
          <Card className="shadow-sm border overflow-hidden">
            <CardHeader className="bg-muted/30 pb-3">
              <div className="flex items-center gap-2">
                <Receipt className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold">Manage Bills</h2>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="bills" className="w-full">
                <TabsList className="w-full mb-6 h-12 bg-muted/50 p-1 rounded-lg">
                  <TabsTrigger 
                    value="bills" 
                    className="flex-1 h-10 rounded-md data-[state=active]:bg-background data-[state=active]:shadow"
                  >
                    View Bills
                  </TabsTrigger>
                  <TabsTrigger 
                    value="add" 
                    className="flex-1 h-10 rounded-md data-[state=active]:bg-background data-[state=active]:shadow"
                  >
                    Add New Bill
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="bills" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
                  {selectedBill ? (
                    <div className="animate-in">
                      <BillDetails 
                        bill={selectedBill}
                        participants={participants}
                        onClose={() => setSelectedBill(null)}
                      />
                    </div>
                  ) : (
                    <BillListWithSearch 
                      bills={bills}
                      participants={participants}
                      onRemoveBill={removeBill}
                      onSelectBill={setSelectedBill}
                    />
                  )}
                </TabsContent>
                
                <TabsContent value="add" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
                  <BillForm 
                    participants={participants}
                    onAddBill={addBill}
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
    
    <footer className="border-t bg-muted/50 py-6 mt-12 shadow-inner">
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
