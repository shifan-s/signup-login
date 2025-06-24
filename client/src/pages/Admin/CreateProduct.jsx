import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Select } from "antd";

const { Option } = Select;

const CreateProduct = () => {
  const [collections, setCollections] = useState([]);
  const [collectionId, setCollectionId] = useState("");
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");

  // Fetch all collections
  const getAllCollections = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/api/v1/collection/get-allcollection");
      if (data.success) {
        setCollections(data.collection);
        toast.success("Collection fetched successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error(`Something went wrong while fetching collections: ${error.message}`);
    }
  };

  useEffect(() => {
    getAllCollections();
  }, []);

  return (
    <div className="flex justify-center p-6">
      <form className="flex flex-col gap-4 w-full max-w-lg bg-gray-800 p-6 rounded-lg text-white">
        {/* Collection Dropdown */}
        <Select
          placeholder="Select a collection"
          onChange={(value) => setCollectionId(value)}
          className="w-full"
        >
          {collections.map((item) => (
            <Option key={item._id} value={item._id}>
              {item.name}
            </Option>
          ))}
        </Select>

        {/* Image Upload Placeholder */}
        <button
          type="button"
          className="bg-blue-700 hover:bg-blue-600 px-4 py-2 rounded shadow"
        >
          Upload Image
        </button>

        {/* Product Name */}
        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          placeholder="Enter product name"
          className="p-2 rounded border bg-black border-gray-600"
        />

        {/* Description */}
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="p-2 rounded border bg-black border-gray-600"
        />

        {/* Price */}
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
          className="p-2 rounded border bg-black border-gray-600"
        />

        {/* Quantity */}
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="Quantity"
          className="p-2 rounded border bg-black border-gray-600"
        />

        {/* Shipping */}
        <select
          value={shipping}
          onChange={(e) => setShipping(e.target.value)}
          className="p-2 rounded border bg-black border-gray-600"
        >
          <option value="">Select Shipping</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-yellow-400 hover:bg-yellow-300 text-black py-2 px-4 rounded w-fit self-start"
        >
          Create Product
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;
