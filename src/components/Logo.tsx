
import { BookOpen } from "lucide-react";

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-gosip-purple to-gosip-purple-dark flex items-center justify-center">
        <BookOpen className="text-white h-5 w-5" />
      </div>
      <span className="font-bold text-xl gosip-gradient-text">GoSipRead</span>
    </div>
  );
}
