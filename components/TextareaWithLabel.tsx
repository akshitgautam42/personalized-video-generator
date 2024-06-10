import React from 'react';
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface TextareaWithLabelProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  required?: boolean;
}

const TextareaWithLabel: React.FC<TextareaWithLabelProps> = ({ 
  id, 
  label, 
  value, 
  onChange, 
  placeholder = "", 
  required = false 
}) => (
  <div className="mb-4">
    <Label htmlFor={id}>{label}</Label>
    <Textarea
      id={id}
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
    />
  </div>
);

export default TextareaWithLabel;
