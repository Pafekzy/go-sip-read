
import React from 'react';
import PresentnessGame from '@/components/games/PresentnessGame';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const PresentnessGamePage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link to="/">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </div>
      
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center gosip-gradient-text">Practice Presentness</h1>
        <p className="text-muted-foreground text-center mb-8">
          Train your focus and mindfulness with this quick reaction game. Find the target number as fast as you can!
        </p>
        <PresentnessGame />
      </div>
    </div>
  );
};

export default PresentnessGamePage;
