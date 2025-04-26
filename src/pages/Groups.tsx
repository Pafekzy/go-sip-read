
import { useState } from "react";
import { Link } from "react-router-dom";
import { Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { PrefixGuide } from "@/components/groups/PrefixGuide";
import { SearchBar } from "@/components/groups/SearchBar";
import { CategoryCard } from "@/components/groups/CategoryCard";
import { categories } from "@/data/categories";

export default function Groups() {
  const { user, hasPermission } = useAuth();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [joinedGroups, setJoinedGroups] = useState<string[]>([]);

  // Filter groups based on search query
  const filteredCategories = searchQuery ? 
    categories.map(category => ({
      ...category,
      subcategories: category.subcategories.map(subcategory => ({
        ...subcategory,
        groups: subcategory.groups.filter(group => 
          group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          group.description.toLowerCase().includes(searchQuery.toLowerCase())
        )
      })).filter(subcategory => subcategory.groups.length > 0)
    })).filter(category => category.subcategories.length > 0) 
    : categories;

  const handleJoinGroup = (groupId: string) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to join a group",
        variant: "destructive",
      });
      return;
    }

    if (!joinedGroups.includes(groupId)) {
      setJoinedGroups([...joinedGroups, groupId]);
      toast({
        title: "Success",
        description: "You've joined the group!",
      });
    }
  };

  const handleLeaveGroup = (groupId: string) => {
    if (!hasPermission('subscribed')) {
      toast({
        title: "Subscription Required",
        description: "You need to be a subscribed user to leave a group",
        variant: "destructive",
      });
      return;
    }

    setJoinedGroups(joinedGroups.filter(id => id !== groupId));
    toast({
      title: "Success",
      description: "You've left the group",
    });
  };

  const handleCreateGroup = () => {
    if (!hasPermission('subscribed')) {
      toast({
        title: "Subscription Required",
        description: "You need to be a subscribed user to create a group",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Coming Soon",
      description: "Group creation feature will be available soon",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8">
          <Users className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
        
        <h1 className="text-4xl font-bold mb-6 gosip-gradient-text">Learning Groups</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Join or create learning groups to study together and motivate each other.
        </p>

        <PrefixGuide />
        
        <SearchBar 
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onCreateGroup={handleCreateGroup}
        />
        
        <div className="grid gap-8">
          {filteredCategories.map(category => (
            <CategoryCard
              key={category.id}
              category={category}
              joinedGroups={joinedGroups}
              onJoinGroup={handleJoinGroup}
              onLeaveGroup={handleLeaveGroup}
            />
          ))}

          {filteredCategories.length === 0 && (
            <div className="text-center p-8">
              <p className="text-xl text-muted-foreground">No groups found matching your search.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
