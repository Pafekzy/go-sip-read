
import { useState } from "react";
import { BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { books, categories } from "@/data/booksData";
import { BookCard } from "@/components/books/BookCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Books() {
  const [currentCategory, setCurrentCategory] = useState(categories[0]);
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 12;
  
  // Get books for current category
  const filteredBooks = books.filter(book => book.category === currentCategory);
  
  // Calculate pagination
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);
  const paginatedBooks = filteredBooks.slice(
    (currentPage - 1) * booksPerPage,
    currentPage * booksPerPage
  );
  
  // Handle page changes
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      // Scroll to top when changing pages
      window.scrollTo(0, 0);
    }
  };
  
  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      // Scroll to top when changing pages
      window.scrollTo(0, 0);
    }
  };
  
  // Reset page when category changes
  const handleCategoryChange = (category: string) => {
    setCurrentCategory(category);
    setCurrentPage(1);
  };
  
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
        
        <Tabs defaultValue={categories[0]} onValueChange={handleCategoryChange} className="mb-8">
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
                Showing {booksPerPage * (currentPage - 1) + 1}-{Math.min(booksPerPage * currentPage, filteredBooks.length)} of {filteredBooks.length} books in this category
              </p>
              
              <ScrollArea className="h-full">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {paginatedBooks.map((book) => (
                    <BookCard key={book.id} book={book} />
                  ))}
                </div>
                
                {/* Pagination controls */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center mt-8 gap-2">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={goToPrevPage} 
                      disabled={currentPage <= 1}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <span className="text-muted-foreground">
                      Page {currentPage} of {totalPages}
                    </span>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={goToNextPage} 
                      disabled={currentPage >= totalPages}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </ScrollArea>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
