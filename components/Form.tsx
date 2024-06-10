import TextareaWithLabel from "@/components/TextareaWithLabel";
import { Button } from "@/components/ui/button";

const Form = ({
  handleSubmit,
  companyInfo,
  setCompanyInfo,
  productInfo,
  setProductInfo,
  targetGroup,
  setTargetGroup,
}) => (
  <form
    onSubmit={handleSubmit}
    className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
  >
    <TextareaWithLabel
      id="company-info"
      label="Company Information"
      value={companyInfo}
      onChange={(e) => setCompanyInfo(e.target.value)}
      placeholder="Tell us about your company..."
      required
    />
    <TextareaWithLabel
      id="product-info"
      label="Product Information"
      value={productInfo}
      onChange={(e) => setProductInfo(e.target.value)}
      placeholder="Describe your product or service..."
      required
    />
    <TextareaWithLabel
      id="target-group"
      label="Target Group Profile"
      value={targetGroup}
      onChange={(e) => setTargetGroup(e.target.value)}
      placeholder="Who are you trying to reach?"
      required
    />
    <div className="flex items-center justify-between">
      <Button
        type="submit"
        className="bg-gray-700 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded"
      >
        Generate Video
      </Button>
    </div>
  </form>
);

export default Form;
