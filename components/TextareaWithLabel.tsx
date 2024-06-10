import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const TextareaWithLabel = ({ id, label, value, onChange, placeholder, required }) => (
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
