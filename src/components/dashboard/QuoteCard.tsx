
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

interface QuoteCardProps {
  text: string;
  author: string;
}

export function QuoteCard({ text, author }: QuoteCardProps) {
  return (
    <Card className="bg-gradient-to-br from-gosip-purple/10 to-gosip-purple-dark/10 border-0">
      <CardContent className="pt-6">
        <div className="flex flex-col gap-4">
          <Quote className="h-6 w-6 text-gosip-purple-dark opacity-70" />
          <p className="text-lg font-medium italic">{text}</p>
          <p className="text-right text-sm text-muted-foreground">— {author}</p>
        </div>
      </CardContent>
    </Card>
  );
}
