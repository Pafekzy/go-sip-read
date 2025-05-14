
import { useState, useEffect } from "react";
import { BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { books, categories, Book } from "@/data/booksData";
import { BookCard } from "@/components/books/BookCard";
import { BookSearch } from "@/components/books/BookSearch";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Books() {
  const [currentCategory, setCurrentCategory] = useState(categories[0]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const booksPerPage = 12;
  
  // Filter books based on category and search query
  useEffect(() => {
    let result = books.filter(book => book.category === currentCategory);
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(book => 
        book.title.toLowerCase().includes(query) || 
        book.author.toLowerCase().includes(query) ||
        book.description.toLowerCase().includes(query) ||
        (book.tags && book.tags.some(tag => tag.toLowerCase().includes(query)))
      );
    }
    
    setFilteredBooks(result);
    setCurrentPage(1); // Reset to first page on new search or category
  }, [currentCategory, searchQuery]);
  
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

  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };
  
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8">
          <BookOpen className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-4xl font-bold gosip-gradient-text">Books & Articles</h1>
            <p className="text-xl text-muted-foreground">
              Explore our curated collection of books to enhance your learning journey.
            </p>
          </div>
          
          <div className="w-full md:w-1/3 lg:w-1/4">
            <BookSearch onSearch={handleSearch} />
          </div>
        </div>
        
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
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold">{category}</h2>
                <p className="text-muted-foreground">
                  {searchQuery ? (
                    <>Search results: <strong>{filteredBooks.length}</strong> books found</>
                  ) : (
                    <>Showing {filteredBooks.length > 0 ? `${(currentPage - 1) * booksPerPage + 1}-${Math.min(currentPage * booksPerPage, filteredBooks.length)}` : "0"} of {filteredBooks.length} books</>
                  )}
                </p>
              </div>
              
              {filteredBooks.length > 0 ? (
                <>
                  <ScrollArea className="h-full">
                    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-12">
                  <p className="text-lg text-muted-foreground mb-4">No books found matching your search criteria.</p>
                  <Button variant="outline" onClick={() => setSearchQuery("")}>
                    Clear Search
                  </Button>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
