
import { Input } from "@/components/ui/input";

interface FormInputProps {
  type: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

export const FormInput = ({ 
  type, 
  name, 
  placeholder, 
  value, 
  onChange, 
  error 
}: FormInputProps) => {
  return (
    <div>
      <Input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`gosip-input ${error ? 'border-red-500' : ''}`}
      />
      {error && (
        <p className="text-xs text-red-500 mt-1">{error}</p>
      )}
    </div>
  );
};
