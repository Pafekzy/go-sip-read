
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import type { Category } from "@/types/groups";

type CategoryCardProps = {
  category: Category;
  joinedGroups: string[];
  onJoinGroup: (groupId: string) => void;
  onLeaveGroup: (groupId: string) => void;
};

export function CategoryCard({ category, joinedGroups, onJoinGroup, onLeaveGroup }: CategoryCardProps) {
  const { user, hasPermission } = useAuth();
  const { toast } = useToast();

  return (
    <Card key={category.id} className="gosip-card overflow-hidden">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          {category.icon}
          {category.name}
        </CardTitle>
        <CardDescription className="text-base">
          {category.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {category.subcategories.map(subcategory => (
            <AccordionItem key={subcategory.id} value={subcategory.id}>
              <AccordionTrigger className="text-lg font-medium">
                {subcategory.name} ({subcategory.groups.length})
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid gap-4 mt-2">
                  {subcategory.groups.map(group => (
                    <div key={group.id} className="border rounded-md p-4 bg-card/50">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-semibold">{group.name}</h4>
                          <p className="text-muted-foreground text-sm">{group.description}</p>
                          <p className="text-xs mt-1">Members: {group.memberCount}</p>
                        </div>
                        <div>
                          {joinedGroups.includes(group.id) ? (
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => onLeaveGroup(group.id)}
                            >
                              Leave Group
                            </Button>
                          ) : (
                            <Button 
                              size="sm" 
                              className="bg-gosip-purple hover:bg-gosip-purple-dark"
                              onClick={() => onJoinGroup(group.id)}
                            >
                              Join Group
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}
