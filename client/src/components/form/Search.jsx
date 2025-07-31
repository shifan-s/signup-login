import { useContext } from "react";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SearchContext from "../../context/SearchContext";

const Search = () => {
  const [values, setValues] = useContext(SearchContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!values.keyword.trim()) return; // prevent empty search

    try {
      const { data } = await axios.get(`http://localhost:8080/api/v1/product/search/${values.keyword}`);
      setValues({ ...values, results: data });
      navigate("/search-items");
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex bg-pink-200 rounded-md text-black">
        <input
          type="text"
          placeholder="Search here..."
          className="w-full rounded-md px-6 py-2 bg-pink-200 border-none outline-none"
          value={values.keyword}
          onChange={(e) => setValues({ ...values, keyword: e.target.value })}
        />
        <button type="submit" className="bg-pink-200 pr-2 text-xs rounded-md">
          <SearchIcon />
        </button>
      </form>
    </div>
  );
};

export default Search;
