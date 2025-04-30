
import React from "react";
import { Star } from "lucide-react";

interface StarRatingProps {
  quality: string;
  qualityId: number;
  rating: number;
  onRatingChange: (qualityId: number, rating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({ quality, qualityId, rating, onRatingChange }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-2">
      <span className="text-sm font-medium min-w-[200px]">{quality}</span>
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            onClick={() => onRatingChange(qualityId, star)}
            className={`h-5 w-5 cursor-pointer ${
              star <= rating 
                ? "fill-gosip-purple text-gosip-purple" 
                : "text-muted-foreground"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default StarRating;
