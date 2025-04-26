
import { Code, Database, Layers } from "lucide-react";

export function PrefixGuide() {
  return (
    <div className="bg-card rounded-lg p-4 mb-8 animate-fade-in overflow-visible">
      <h2 
        className="font-semibold mb-2 leading-relaxed overflow-visible" 
        style={{ 
          lineHeight: 1.3, 
          paddingBottom: '0.25rem' 
        }}
      >
        Group Prefix Guide:
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex items-center gap-2">
          <Code className="h-4 w-4 text-blue-500" />
          <span className="leading-relaxed"><strong>FED-</strong>: Front-End Developer Groups</span>
        </div>
        <div className="flex items-center gap-2">
          <Database className="h-4 w-4 text-green-500" />
          <span className="leading-relaxed"><strong>BED-</strong>: Back-End Developer Groups</span>
        </div>
        <div className="flex items-center gap-2">
          <Layers className="h-4 w-4 text-purple-500" />
          <span className="leading-relaxed"><strong>FSD-</strong>: Full Stack Developer Groups</span>
        </div>
      </div>
    </div>
  );
}
