import React, { useState } from "react";
import { toast } from "react-toastify";
import { BACKEND_URL } from "../../config";

const AddProduct = () => {
  const [image, setImage] = useState(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [offerPrice, setOfferPrice] = useState("");

  // Handle Single Image Upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImage({
        file,
        previewUrl: URL.createObjectURL(file),
      });
    }
  };

  // Submit Product
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("price", price);
      formData.append("offerPrice", offerPrice);

      if (image?.file) {
        formData.append("image", image.file);
      }

      const response = await fetch(
        `${BACKEND_URL}/api/products/add`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (data.success) {
        toast.success("Product Added Successfully");

        setImage(null);
        setName("");
        setDescription("");
        setCategory("");
        setPrice("");
        setOfferPrice("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="py-6 flex flex-col justify-between bg-[#fafbfc] min-h-screen">
      <div className="bg-white p-6 md:p-10 rounded-xl border border-[#e2e8f0] shadow-sm max-w-2xl w-full box-border mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-[#0f172a] tracking-tight m-0 mb-1">
            Add New Product
          </h2>

          <p className="text-xs text-[#64748b] m-0">
            Publish raw catalog data instantly.
          </p>
        </div>

        <form onSubmit={handleFormSubmit} className="space-y-6">

          {/* Single Image Upload */}
          <div>
            <p className="text-sm font-semibold text-[#334155] m-0 mb-2">
              Product Image
            </p>

            <div className="flex items-center gap-4">
              <label htmlFor="imageUpload" className="group relative">

                <input
                  accept="image/*"
                  type="file"
                  id="imageUpload"
                  hidden
                  onChange={handleImageChange}
                />

                <div className="w-24 h-24 rounded-lg border-2 border-dashed border-[#cbd5e1] flex items-center justify-center bg-[#f8fafc] overflow-hidden cursor-pointer transition-all group-hover:border-[#1a8a50] group-hover:bg-white relative">

                  {image ? (
                    <img
                      className="w-full h-full object-cover"
                      src={image.previewUrl}
                      alt="Preview"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-center p-1">

                      <span className="text-lg text-[#94a3b8] group-hover:text-[#1a8a50] transition-colors">
                        +
                      </span>

                      <span className="text-[10px] text-[#94a3b8] font-mono tracking-tighter uppercase group-hover:text-[#1a8a50] transition-colors">
                        Upload
                      </span>

                    </div>
                  )}
                </div>
              </label>
            </div>
          </div>

          {/* Product Name */}
          <div className="flex flex-col gap-1.5 w-full">
            <label
              className="text-sm font-semibold text-[#334155]"
              htmlFor="product-name"
            >
              Product Name
            </label>

            <input
              id="product-name"
              type="text"
              placeholder="e.g., Organic Banana"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="outline-none py-2.5 px-3.5 rounded-lg border border-[#e2e8f0] bg-[#f8fafc] text-sm text-[#0f172a] font-medium placeholder-[#94a3b8] transition-all focus:bg-white focus:border-[#1a8a50] focus:shadow-[0_0_0_3px_rgba(26,138,80,0.06)] w-full box-border"
              required
            />
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1.5 w-full">
            <label
              className="text-sm font-semibold text-[#334155]"
              htmlFor="product-description"
            >
              Product Description
            </label>

            <textarea
              id="product-description"
              rows={4}
              placeholder="Enter product details..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="outline-none py-2.5 px-3.5 rounded-lg border border-[#e2e8f0] bg-[#f8fafc] text-sm text-[#0f172a] font-medium placeholder-[#94a3b8] transition-all focus:bg-white focus:border-[#1a8a50] focus:shadow-[0_0_0_3px_rgba(26,138,80,0.06)] resize-none w-full box-border"
            />
          </div>

          {/* Category */}
          <div className="flex flex-col gap-1.5 w-full">
            <label
              className="text-sm font-semibold text-[#334155]"
              htmlFor="category"
            >
              Category
            </label>

            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="outline-none py-2.5 px-3.5 rounded-lg border border-[#e2e8f0] bg-[#f8fafc] text-sm text-[#0f172a] font-medium transition-all focus:bg-white focus:border-[#1a8a50] focus:shadow-[0_0_0_3px_rgba(26,138,80,0.06)] w-full box-border cursor-pointer appearance-none"
              required
            >
              <option value="" disabled>
                Select Category
              </option>

              <option value="Fruit">Fruit</option>
              <option value="Vegetable">Vegetable</option>
            </select>
          </div>

          {/* Prices */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">

            <div className="flex flex-col gap-1.5">
              <label
                className="text-sm font-semibold text-[#334155]"
                htmlFor="product-price"
              >
                Product Price (₹)
              </label>

              <input
                id="product-price"
                type="number"
                placeholder="0"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="outline-none py-2.5 px-3.5 rounded-lg border border-[#e2e8f0] bg-[#f8fafc] text-sm text-[#0f172a] font-medium placeholder-[#94a3b8] transition-all focus:bg-white focus:border-[#1a8a50] focus:shadow-[0_0_0_3px_rgba(26,138,80,0.06)] w-full box-border"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                className="text-sm font-semibold text-[#334155]"
                htmlFor="offer-price"
              >
                Offer Price (₹)
              </label>

              <input
                id="offer-price"
                type="number"
                placeholder="0"
                value={offerPrice}
                onChange={(e) => setOfferPrice(e.target.value)}
                className="outline-none py-2.5 px-3.5 rounded-lg border border-[#e2e8f0] bg-[#f8fafc] text-sm text-[#0f172a] font-medium placeholder-[#94a3b8] transition-all focus:bg-white focus:border-[#1a8a50] focus:shadow-[0_0_0_3px_rgba(26,138,80,0.06)] w-full box-border"
              />
            </div>

          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="px-8 py-3 bg-[#1a8a50] text-white text-xs font-bold tracking-wider uppercase rounded-lg border-none cursor-pointer shadow-sm hover:bg-[#15703f] hover:shadow-md active:scale-[0.98] transition-all duration-150 w-full sm:w-auto"
            >
              Add Product
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddProduct;