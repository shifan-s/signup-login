import React, { useEffect, useState } from 'react';
import AdminMenu from '../../components/AdminMenu';
import { Select } from 'antd';
import { toast } from 'sonner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const { Option } = Select;

const UpdateProduct = () => {
  const [collection, setCollection] = useState("");
  const [collections, setCollections] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState(false);
  const [photo, setPhoto] = useState("");
  const [id, setId] = useState("");

  const params = useParams();   
  const navigate = useNavigate();

  // Get all collection
  const getAllCollection = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/api/v1/collection/getall-product");
      if (data && data.success) {
        toast.success(data.message);
        setCollections(data.collection);
        toast.success("Collections fetched successfully!");
      }
    } catch (error) {
      console.log(error);
      toast.error(`something went wrong getting all collection ${error}`);
    }
  };

  useEffect(() => {
    getAllCollection();
  }, []);

  // Get single product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(`http://localhost:8080/api/v1/product/single-product/${params.slug}`);
      setName(data.product.name);
      setDescription(data.product.description);
      setPrice(data.product.price);
      setQuantity(data.product.quantity);
      setShipping(data.product.shipping);
      setId(data.product._id);
      setCollection(data.product.collection._id);
    } catch (error) {
      console.log(error);
      toast.error(`Something went wrong getting single collection`);
    }
  };

  useEffect(() => {
    getSingleProduct();
  },[]);

  // Update product
  const handleUpdate = async (e) => {
    e.preventDefault();

    // validate fields locallly

if (!name || !description || !price || !quantity || !collection) {
  toast.error("please fill in all required fields");
  return;
}

    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price.toString());
      productData.append("quantity", quantity.toString());
      photo && productData.append("photo", photo);
      productData.append("collection", collection);
       productData.append("shipping", shipping);
      if (photo) { productData.append("photo", photo);
        
      }


      const { data } = await axios.put(`http://localhost:8080/api/v1/product/update-product/${id}, productData`);


      if (data?.success) {
        toast.success("Product updated successfully");
    
        navigate("/dashboard/admin/product");
      } else {
        toast.error(data?.message || "failed to update product");
      }
    } catch (error) {
     console.error(error);
     toast.error("something went wrong");
     
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col md:flex-row">
      <aside className="w-full md:w-1/5 border-b md:border-b-0 md:border-r border-gray-800 p-4 md:p-6 bg-black">
        <AdminMenu />
      </aside>

      <main className="w-full md:w-4/5 p-6 md:p-10">
        <h1 className="text-xl text-cyan-400 font-semibold mb-6">Update Product</h1>

        <form onSubmit={handleUpdate} className="flex flex-col gap-4 w-full max-w-lg">
          <Select
            placeholder="Select a collection"
            value={collection}
            size="large"
            showSearch
            onChange={(value) => setCollection(value)}
            className="text-white"
          >
            {collections &&
              collections.map((item) => (
                <Option key={item._id} value={item._id}>
                  {item.name}
                </Option>
              ))}
          </Select>

          <div>
            <label className="bg-blue-800 text-white px-4 py-2 rounded w-fit cursor-pointer">
              {photo ? photo.name : "Upload Image"}
              <input
                type="file"
                name="photo"
                accept="image/*"
                onChange={(e) => setPhoto(e.target.files[0])}
                hidden
              />
            </label>
          </div>

          {photo ? (
            <div>
              <img
                src={URL.createObjectURL(photo)}
                alt="img_product"
                className="mt-2 w-40 h-40 object-cover rounded border"
              />
            </div>
          ) : (
            <div>
              <img
                src={`http://localhost:8080/api/v1/product/product-photo/${id}`}
                alt="img_product"
                className="h-[200px]"
              />
            </div>
          )}

          <input
            type="text"
            value={name}
            placeholder="Enter Name"
            onChange={(e) => setName(e.target.value)}
            className="p-2 rounded border text-white bg-transparent"
          />

          <textarea
            cols={56}
            rows={3}
            type="text"
            value={description}
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
            className="p-2 rounded border text-white bg-transparent"
          />

          <input
            type="number"
            value={price}
            placeholder="Price"
            onChange={(e) => setPrice(e.target.value)}
            className="p-2 rounded border text-white bg-transparent"
          />

          <input
            type="number"
            value={quantity}
            placeholder="Quantity"
            onChange={(e) => setQuantity(e.target.value)}
            className="p-2 rounded border text-white bg-transparent"
          />

          <Select
            placeholder="Select Shipping"
          value={shipping ? "Yes" : "No"}
            className="text-white"
            size="large"
            showSearch
            onChange={(value) => setShipping(value)}
          >
            <Option value="0">T-shirts</Option>
            <Option value="1">Jeans</Option>
            <Option value="1">Party-Wears</Option>
            <Option value="1">Summer-Wears</Option>
            <Option value="1">Shirts</Option>
            <Option value="1">Over-SizedItmes!!</Option>
          </Select>

          <button
            type="submit"
            className="bg-blue-800 text-white py-2 px-4 rounded w-fit"
          >
            Update Product
          </button>
        </form>
      </main>
    </div>
  );
};
export default UpdateProduct;