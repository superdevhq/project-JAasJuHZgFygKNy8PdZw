
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DollarSign, Users, Calculator, Receipt, ArrowRight, Check, Sparkles, Clock, Shield } from 'lucide-react';

const Landing = () => {
  const [activeTab, setActiveTab] = useState('features');

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <header className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background z-0"></div>
        
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 py-20 relative z-10">
          <nav className="flex justify-between items-center mb-16">
            <div className="flex items-center gap-2">
              <DollarSign className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold">SplitWise</span>
            </div>
            <Link to="/app">
              <Button variant="outline" className="font-medium">
                Go to App
              </Button>
            </Link>
          </nav>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
                Split bills <span className="text-primary">effortlessly</span> with friends
              </h1>
              <p className="text-xl text-muted-foreground max-w-md">
                Keep track of shared expenses and balances with housemates, trips, groups, friends, and family.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link to="/app">
                  <Button size="lg" className="gap-2 w-full sm:w-auto">
                    Get Started <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="gap-2 w-full sm:w-auto">
                  Learn More
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-primary/40 rounded-xl blur"></div>
              <Card className="relative border border-border/40 shadow-xl bg-background/95 backdrop-blur">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Receipt className="h-5 w-5 text-primary" />
                    <h3 className="text-xl font-semibold">Recent Bills</h3>
                  </div>
                  
                  <div className="space-y-4">
                    {[
                      { title: 'Dinner at Olive Garden', amount: 89.50, date: 'Yesterday', participants: 4 },
                      { title: 'Groceries', amount: 124.35, date: 'May 15', participants: 3 },
                      { title: 'Movie Night', amount: 48.00, date: 'May 10', participants: 5 }
                    ].map((bill, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted/80 transition-colors">
                        <div>
                          <h4 className="font-medium">{bill.title}</h4>
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <Users className="h-3 w-3" /> {bill.participants} people • {bill.date}
                          </p>
                        </div>
                        <p className="text-lg font-semibold">${bill.amount.toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose SplitWise?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The easiest way to share expenses with friends and family
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Calculator className="h-10 w-10 text-primary" />,
                title: 'Smart Calculations',
                description: 'Automatically calculate who owes what with precise splitting algorithms'
              },
              {
                icon: <Users className="h-10 w-10 text-primary" />,
                title: 'Group Management',
                description: 'Create groups for roommates, trips, or events to organize expenses'
              },
              {
                icon: <Receipt className="h-10 w-10 text-primary" />,
                title: 'Bill Categories',
                description: 'Categorize and tag expenses to keep everything organized'
              }
            ].map((feature, index) => (
              <Card key={index} className="border-border/40 bg-background">
                <CardContent className="pt-6">
                  <div className="rounded-full w-16 h-16 flex items-center justify-center bg-primary/10 mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Split expenses in three simple steps
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                step: 1,
                title: 'Add your expenses',
                description: 'Enter bills and expenses as they occur',
                icon: <Receipt className="h-8 w-8" />
              },
              {
                step: 2,
                title: 'Split the costs',
                description: 'Divide bills among group members',
                icon: <Users className="h-8 w-8" />
              },
              {
                step: 3,
                title: 'Settle up',
                description: 'See who owes what and settle debts',
                icon: <Calculator className="h-8 w-8" />
              }
            ].map((step, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="relative mb-6">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    {step.icon}
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                    {step.step}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials & FAQ Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <Tabs 
            defaultValue="features" 
            value={activeTab}
            onValueChange={setActiveTab}
            className="max-w-4xl mx-auto"
          >
            <div className="flex justify-center mb-8">
              <TabsList className="h-12 bg-muted/50 p-1 rounded-lg">
                <TabsTrigger 
                  value="features" 
                  className="flex-1 h-10 px-8 rounded-md data-[state=active]:bg-background data-[state=active]:shadow"
                >
                  Features
                </TabsTrigger>
                <TabsTrigger 
                  value="testimonials" 
                  className="flex-1 h-10 px-8 rounded-md data-[state=active]:bg-background data-[state=active]:shadow"
                >
                  Testimonials
                </TabsTrigger>
                <TabsTrigger 
                  value="faq" 
                  className="flex-1 h-10 px-8 rounded-md data-[state=active]:bg-background data-[state=active]:shadow"
                >
                  FAQ
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="features" className="focus-visible:outline-none focus-visible:ring-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { icon: <Check className="h-5 w-5 text-primary" />, text: 'Split bills evenly or with custom amounts' },
                  { icon: <Check className="h-5 w-5 text-primary" />, text: 'Track balances between friends' },
                  { icon: <Check className="h-5 w-5 text-primary" />, text: 'Categorize expenses for better organization' },
                  { icon: <Check className="h-5 w-5 text-primary" />, text: 'Add tags to quickly find related expenses' },
                  { icon: <Check className="h-5 w-5 text-primary" />, text: 'Search and filter your expense history' },
                  { icon: <Check className="h-5 w-5 text-primary" />, text: 'Calculate optimal settlement plans' },
                  { icon: <Check className="h-5 w-5 text-primary" />, text: 'Manage multiple groups simultaneously' },
                  { icon: <Check className="h-5 w-5 text-primary" />, text: 'Simple and intuitive user interface' }
                ].map((feature, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-background">
                    <div className="rounded-full p-1 bg-primary/10 flex-shrink-0">
                      {feature.icon}
                    </div>
                    <p className="font-medium">{feature.text}</p>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="testimonials" className="focus-visible:outline-none focus-visible:ring-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    quote: "SplitWise has made sharing expenses with my roommates so much easier. No more awkward money conversations!",
                    author: "Sarah K.",
                    role: "Student"
                  },
                  {
                    quote: "We used this for our group vacation and it was a game changer. Everyone knew exactly what they owed.",
                    author: "Michael T.",
                    role: "Software Engineer"
                  },
                  {
                    quote: "The settlement calculations save so much time. It's like having a personal accountant for our shared expenses.",
                    author: "Jessica L.",
                    role: "Accountant"
                  },
                  {
                    quote: "Clean interface, easy to use, and it just works. Exactly what we needed for our shared apartment.",
                    author: "David R.",
                    role: "Designer"
                  }
                ].map((testimonial, index) => (
                  <Card key={index} className="bg-background border-border/40">
                    <CardContent className="pt-6">
                      <div className="flex flex-col gap-4">
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Sparkles key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                          ))}
                        </div>
                        <p className="italic text-muted-foreground">"{testimonial.quote}"</p>
                        <div>
                          <p className="font-semibold">{testimonial.author}</p>
                          <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="faq" className="focus-visible:outline-none focus-visible:ring-0">
              <div className="space-y-6">
                {[
                  {
                    question: "Is SplitWise free to use?",
                    answer: "Yes, SplitWise is completely free to use for all basic features. We believe in providing a useful tool that everyone can access."
                  },
                  {
                    question: "Can I split bills unevenly?",
                    answer: "Absolutely! You can split bills evenly among all participants or specify custom amounts for each person based on their actual consumption or preference."
                  },
                  {
                    question: "How are settlements calculated?",
                    answer: "Our algorithm calculates the minimum number of transactions needed to settle all debts within the group, making it as efficient as possible for everyone to pay what they owe."
                  },
                  {
                    question: "Can I categorize my expenses?",
                    answer: "Yes, you can assign categories and tags to each expense, making it easy to organize and filter your bills by type, event, or any other criteria."
                  }
                ].map((faq, index) => (
                  <div key={index} className="bg-background rounded-lg p-6 border border-border/40">
                    <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to simplify expense sharing?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Join thousands of users who have made splitting bills stress-free
          </p>
          <Link to="/app">
            <Button size="lg" className="gap-2">
              Get Started Now <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/50 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <DollarSign className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">SplitWise</span>
              </div>
              <p className="text-muted-foreground">
                Split bills with friends without the hassle
              </p>
            </div>
            
            {[
              {
                title: "Product",
                links: ["Features", "Pricing", "Testimonials", "FAQ"]
              },
              {
                title: "Resources",
                links: ["Help Center", "Blog", "Guides", "Support"]
              },
              {
                title: "Company",
                links: ["About Us", "Careers", "Contact", "Privacy Policy"]
              }
            ].map((column, index) => (
              <div key={index} className="space-y-4">
                <h3 className="font-semibold">{column.title}</h3>
                <ul className="space-y-2">
                  {column.links.map((link, i) => (
                    <li key={i}>
                      <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="border-t border-border/40 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} SplitWise. All rights reserved.
            </p>
            <div className="flex gap-6">
              {[Clock, Shield, Sparkles].map((Icon, index) => (
                <a key={index} href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
