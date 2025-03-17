
import { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Receipt } from 'lucide-react';

interface Bill {
  title: string;
  amount: number;
  date: string;
  participants: number;
}

interface AnimatedBillsCardProps {
  bills: Bill[];
}

const AnimatedBillsCard = ({ bills }: AnimatedBillsCardProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isAnimating, setIsAnimating] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const pointerRef = useRef<HTMLDivElement>(null);
  const billRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Reset animation when window resizes
  useEffect(() => {
    const handleResize = () => {
      setIsAnimating(false);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Animation timeline
  useEffect(() => {
    if (!isAnimating) {
      const timer = setTimeout(() => {
        setIsAnimating(true);
        animatePointer();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isAnimating]);

  const animatePointer = async () => {
    if (!containerRef.current || !cardRef.current) return;
    
    // Get container position for relative positioning
    const containerRect = containerRef.current.getBoundingClientRect();
    
    // Start position (left of the card)
    setMousePosition({ 
      x: 20, 
      y: containerRect.height / 2 
    });
    
    // Animate to card title
    await animateTo(
      100,
      40,
      1000
    );
    
    // Animate to each bill item
    for (let i = 0; i < bills.length; i++) {
      if (!billRefs.current[i]) continue;
      
      const billRect = billRefs.current[i]!.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();
      
      // Calculate position relative to container
      const relativeX = billRect.left - containerRect.left + (billRect.width / 2);
      const relativeY = billRect.top - containerRect.top + (billRect.height / 2);
      
      await animateTo(relativeX, relativeY, 800);
      setActiveIndex(i);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setActiveIndex(null);
    }
    
    // Move out of the card
    await animateTo(
      containerRect.width - 20,
      containerRect.height - 20,
      1000
    );
    
    // Reset and repeat
    setIsAnimating(false);
  };
  
  const animateTo = (x: number, y: number, duration: number): Promise<void> => {
    return new Promise(resolve => {
      const startX = mousePosition.x;
      const startY = mousePosition.y;
      const startTime = Date.now();
      
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth movement
        const easeOutCubic = (t: number): number => {
          return 1 - Math.pow(1 - t, 3);
        };
        
        const easedProgress = easeOutCubic(progress);
        
        setMousePosition({
          x: startX + (x - startX) * easedProgress,
          y: startY + (y - startY) * easedProgress
        });
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          resolve();
        }
      };
      
      requestAnimationFrame(animate);
    });
  };

  return (
    <div ref={containerRef} className="relative">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-primary/40 rounded-xl blur"></div>
      <Card 
        ref={cardRef} 
        className="relative border border-border/40 shadow-xl bg-background/95 backdrop-blur overflow-hidden"
      >
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Receipt className="h-5 w-5 text-primary" />
            <h3 className="text-xl font-semibold">Recent Bills</h3>
          </div>
          
          <div className="space-y-4">
            {bills.map((bill, index) => (
              <div 
                key={index} 
                ref={el => billRefs.current[index] = el}
                className={`
                  flex items-center justify-between p-3 rounded-lg 
                  transition-all duration-300 ease-in-out
                  ${activeIndex === index 
                    ? 'bg-primary/20 scale-105 shadow-md' 
                    : 'bg-muted/50 hover:bg-muted/80'}
                `}
              >
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
      
      {/* Animated mouse pointer */}
      <div 
        ref={pointerRef}
        className="absolute w-8 h-8 pointer-events-none z-20"
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
          transform: 'translate(-50%, -50%)',
          transition: 'opacity 0.3s ease-in-out',
          opacity: isAnimating ? 1 : 0
        }}
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path 
            d="M7 2L18 13L13 14.5L16 20.5L13 22L10 15L4 19L7 2Z" 
            fill="white" 
            stroke="black" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
        
        {/* Ripple effect when active */}
        {activeIndex !== null && (
          <div className="absolute inset-0 animate-ping rounded-full bg-primary/30"></div>
        )}
      </div>
    </div>
  );
};

export default AnimatedBillsCard;
