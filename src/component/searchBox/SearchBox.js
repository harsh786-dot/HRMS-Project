import { Search } from "lucide-react";
import "./SearchBox.css";

const SearchBox = ({ value, onChange, placeholder = "Search" }) => {
  return (
    <div className="search-box">
      <Search size={40} />

      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default SearchBox;