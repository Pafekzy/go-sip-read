
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface ContentCardProps {
  title: string;
  author: string;
  type: "book" | "podcast" | "video";
  progress: number;
  image?: string;
}

export function ContentCard({ title, author, type, progress, image }: ContentCardProps) {
  const typeColors = {
    book: "bg-gosip-soft-blue",
    podcast: "bg-gosip-soft-pink",
    video: "bg-gosip-soft-orange",
  };
  
  const typeText = {
    book: "Book",
    podcast: "Podcast",
    video: "Video",
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="aspect-[3/2] relative overflow-hidden">
        <img
          src={image || "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=500&q=80"}
          alt={title}
          className="w-full h-full object-cover"
        />
        <Badge className={`absolute top-2 right-2 ${typeColors[type]}`}>
          {typeText[type]}
        </Badge>
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg line-clamp-1">{title}</CardTitle>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-sm text-muted-foreground">by {author}</p>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-2">
        <div className="flex justify-between w-full text-xs">
          <span>Progress</span>
          <span>{progress}%</span>
        </div>
        <Progress value={progress} className="h-2 w-full" />
      </CardFooter>
    </Card>
  );
}
