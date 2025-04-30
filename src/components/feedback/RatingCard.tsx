
import React from "react";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent 
} from "@/components/ui/card";
import StarRating from "./StarRating";
import { qualities } from "./constants";

interface RatingCardProps {
  ratings: Record<number, number>;
  onRatingChange: (qualityId: number, score: number) => void;
}

const RatingCard: React.FC<RatingCardProps> = ({ ratings, onRatingChange }) => {
  return (
    <Card className="mb-8 bg-card/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Rate Our App Features</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground mb-6">
          Help us improve by rating these aspects of GoSipRead on a scale of 1-5 stars
        </p>
        <div className="grid gap-4">
          {qualities.map((quality, index) => (
            <StarRating
              key={index}
              quality={quality}
              qualityId={index}
              rating={ratings[index] || 0}
              onRatingChange={onRatingChange}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RatingCard;
