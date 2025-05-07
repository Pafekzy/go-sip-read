
import { BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { books } from "@/data/booksData";
import { BookCard } from "@/components/books/BookCard";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Books() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8">
          <BookOpen className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
        
        <h1 className="text-4xl font-bold mb-6 gosip-gradient-text">Books & Articles</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Explore our curated collection of books to enhance your learning journey. Download and read at your own pace.
        </p>
        
        <ScrollArea className="h-full">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {books.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
