import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Banner from '../components/Banner';
import axios from 'axios';
import { toast } from 'sonner';
import { Checkbox, Radio } from 'antd';
import Prices from '../Data/data';
import { useContext } from 'react';
import CartContext from '../context/CartContext';


const Home = () => {
  const [products, setProducts] = useState([]);
const [collections,setCollections] = useState([]);
const [checked,setChecked] = useState([]);
const [radio,setRadio] = useState([]);
const [totalProducts,setTotalProducts] = useState(0);
const [page,setPage] = useState(1);
const [loading,setLoading] = useState(false)
const [Cart,setCart] = useContext (CartContext)
  // Get all collection
  const getAllCollection = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/api/v1/collection/get-allcollection");
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
    getTotal()
  }, []);


  // getAllProducts

  const getAllProducts = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(`http://localhost:8080/api/v1/product/product-list/${page}`);
      setLoading(false)
      if (data.success) {
        setProducts(data.products);
       console.log(products);
       
      }
    } catch (error) {
      setLoading(false)
      console.log(error);
      toast.error(`Something went wrong get all products ${error}`);
    }
  };

  useEffect(() => {
    if (!checked.length || !radio.length) {
       getAllProducts()
    }
   
  }, [checked.length,radio.length]);



// Handle filter by collection

const handleFilter = (value,id)=>{

  // save all the checked items in a variable

  let all = [...checked]

  // check the recieved value and push it to the all []

  if(value){
    all.push(id)
  }else{

    // filter
    
    all = all.filter((item)=>item !==id)
  }
 setChecked(all)
}

const filterProduct = async ()=>{
  try{
    const {data} = await axios.post("http://localhost:8080/api/v1/product/product-filters",{checked,radio})
     if (data.success) {
        setProducts(data?.products);
        toast.success("Products filtered successfully");
      }

  }catch(error){
    console.log(`Error while filtering product ${error}`);
    
  }
}
  useEffect(() => {
  if (checked.length || radio.length) filterProduct()
  }, [checked,radio]);


// getTotal Count

const getTotal = async () =>{
  try{
    const { data } = await axios.get("http://localhost:8080/api/v1/product/product-count");
    setTotalProducts(data?.totalProducts);
  } catch (error) {
console.log(error);

  }
}

// load more

const loadMore= async () => {
  try {
    // show loading indicator (like spinner)
    setLoading(true);
    // API call to get products of current `page`
    const {data} = await axios.get(`http://localhost:8080/api/v1/product/product-list/${page}`);
    //  Hide loading indicator
    setLoading(false)
    // Add new  products  to existing ones
    setProducts([...products, ...data.products]);
  }catch (error) {
    console.log(error);
    setLoading(false);
    
  }
}



useEffect(() => {
  if (page === 1) return; // Prevent refetching page 1 again
  loadMore();
}, [page]);


  return (
<div className="min-h-screen bg-pink-100 text-black">
  <Banner />

  <section className="max-w-7xl mx-auto px-4 py-16">
    <h1 className="text-5xl font-extrabold text-center mb-4">Discover the Latest Trends</h1>
    <p className="text-xl text-gray-600 text-center mb-8 max-w-2xl mx-auto">
      Shop the freshest fashion, beauty, and lifestyle collections from your favorite brands — all in one place.
    </p>
    <div className="text-center">
      <Link
        to="/signup"
        className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full text-lg font-medium shadow-md transition"
      >
        Get Started
      </Link>
    </div>
  </section>

  <section className="max-w-7xl mx-auto px-4 pb-20">
    <div className="grid md:grid-cols-4 gap-8">
      
      {/* Left Sidebar: Filters */}

      <aside className="bg-white p-5 rounded-xl shadow-md">

        {/* Filter by Collections */}

        <h2 className="text-xl font-semibold text-gray-800 mb-4">Filter by Collections</h2>
        <ul className="space-y-3 mb-6">
          {collections.map((item) => (
            <li
              key={item._id}
              className="flex items-center bg-pink-100 hover:bg-pink-200 px-4 py-2 rounded-md transition"
            >
              <Checkbox
                onChange={(e) => handleFilter(e.target.checked, item._id)}
                className="mr-2"
              >
                {item.name}
              </Checkbox>
            </li>
          ))}
        </ul>

        {/* Filter by Price */}
    <h2 className="text-xl font-semibold text-gray-800 mb-4">Filter by Price</h2>

   <Radio.Group onChange={(e) =>setRadio(e.target.value)} className="flex flex-col space-y-3">
  {Prices.map((item) => (
    <Radio key={item._id} value={item.array} className="text-sm text-gray-700">
      {item.name}
    </Radio>
  ))}
   </Radio.Group>

{/* {JSON.stringify(radio,null,4)} */}
<div className="mt-6 text-center">
  <button
    onClick={() => window.location.reload()}
    className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg text-sm font-medium shadow transition duration-200"
  >
    Reload Products
  </button>
</div>

      </aside>

      {/* Right Content: Products */}
      <main className="md:col-span-3">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Latest Products</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition"
            >
              <img
                src={`http://localhost:8080/api/v1/product/product-photo/${item._id}`}
                alt={item.name}
                className="w-full aspect-[4/5] object-cover rounded-t-xl"
              />
              <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{item.name}</h3>
                <p className="text-sm text-gray-600 mb-2 line-clamp-2">{item.description}</p>
                <p className="text-md font-bold text-gray-800 mb-4">₹{item.price}</p>
                <div className="flex gap-3">
                  <Link
                    to={``}
                    className="flex-1 text-center bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-md text-sm"
                  >
                    More Details
                  </Link>
                  <button onClick={()=> ([...Cart,item])} value={[]} className="flex-1 bg-pink-600 hover:bg-pink-700 text-white py-2 rounded-md text-sm">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
       <div className="mt-12 text-center">
  <p className="text-sm text-gray-600 mb-4">
    Total Products: <span className="font-semibold">{totalProducts}</span>
  </p>

  <div>
    {products && products.length < totalProducts && (
      <button
        onClick={(e) => {
          e.preventDefault();
          setPage(page + 1);
        }}
        className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full text-sm font-medium shadow-md transition duration-300"
      >
        {loading ? "Loading..." : "Load more"}
      </button>
    )}
  </div>
</div>  
      </main>
    </div>
  </section>
</div>

  );
};

export default Home;




