
import { SequenceType } from "../../utils/numberPatterns";

interface NumberSequenceProps {
  numbers: number[];
  type: SequenceType;
  result: "correct" | "incorrect" | null;
}

export const NumberSequence = ({ numbers, type, result }: NumberSequenceProps) => {
  return (
    <div className="flex items-center justify-center space-x-4">
      {numbers.map((number, index) => (
        <div 
          key={index}
          className={`
            w-12 h-12 flex items-center justify-center 
            rounded-md border-2 font-bold text-xl
            ${index === numbers.length - 1 ? 'bg-accent' : 'bg-muted'}
            transition-all duration-300 hover:scale-110
          `}
        >
          {number}
        </div>
      ))}
      
      <div 
        className={`
          w-12 h-12 flex items-center justify-center 
          rounded-md border-2 border-dashed font-bold text-xl
          ${result === "correct" 
            ? "border-green-500 bg-green-100/30 dark:bg-green-950/30 animate-pulse" 
            : result === "incorrect" 
              ? "border-red-500 bg-red-100/30 dark:bg-red-950/30 animate-pulse"
              : "border-border"}
          transition-all duration-300
        `}
      >
        ?
      </div>
    </div>
  );
};
