
import { useState } from "react";
import { BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { books, categories } from "@/data/booksData";
import { BookCard } from "@/components/books/BookCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Books() {
  const [currentCategory, setCurrentCategory] = useState(categories[0]);
  
  // Get books for current category
  const filteredBooks = books.filter(book => book.category === currentCategory);
  
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
        
        <Tabs defaultValue={categories[0]} onValueChange={setCurrentCategory} className="mb-8">
          <TabsList className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 mb-4">
            {categories.map((category) => (
              <TabsTrigger key={category} value={category} className="whitespace-nowrap">
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {categories.map((category) => (
            <TabsContent key={category} value={category} className="mt-0">
              <h2 className="text-2xl font-semibold mb-4">{category}</h2>
              <p className="text-muted-foreground mb-6">
                Showing {filteredBooks.length} books in this category
              </p>
              
              <ScrollArea className="h-full">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {filteredBooks.map((book) => (
                    <BookCard key={book.id} book={book} />
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
