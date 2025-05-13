
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, BookOpen } from "lucide-react";
import { Book } from "@/data/booksData";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface BookCardProps {
  book: Book;
}

export function BookCard({ book }: BookCardProps) {
  const [currentImage, setCurrentImage] = useState(book.coverImage);
  
  // Image swapping effect for the Five Dysfunctions book
  useEffect(() => {
    // Only apply image swapping to the Five Dysfunctions book
    if (book.title === "The Five Dysfunctions of a Team") {
      const interval = setInterval(() => {
        setCurrentImage(prev => 
          prev === book.coverImage ? book.alternateImage || book.coverImage : book.coverImage
        );
      }, 5000); // Swap every 5 seconds
      
      return () => clearInterval(interval);
    }
  }, [book.title, book.coverImage, book.alternateImage]);

  const handleDownload = () => {
    window.open(book.pdfUrl, "_blank");
  };

  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <div className="p-4 pb-0">
        <AspectRatio ratio={2/3} className="overflow-hidden rounded-md">
          <img 
            src={currentImage} 
            alt={`${book.title} cover`}
            className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
          />
        </AspectRatio>
      </div>
      <CardContent className="p-4 flex-1">
        <h3 className="font-semibold text-lg mb-1">{book.title}</h3>
        <p className="text-sm text-muted-foreground mb-2">{book.author}</p>
        <p className="text-sm text-muted-foreground line-clamp-3">{book.description}</p>
        {book.tags && (
          <div className="flex flex-wrap gap-1 mt-2">
            {book.tags.map((tag) => (
              <span 
                key={tag} 
                className="text-xs bg-secondary px-2 py-0.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button 
          onClick={handleDownload}
          className="w-full bg-gradient-to-r from-gosip-purple to-gosip-purple-dark hover:opacity-90"
        >
          <Download className="mr-2 h-4 w-4" />
          Download Book
        </Button>
      </CardFooter>
    </Card>
  );
}
