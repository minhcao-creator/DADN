import { Container, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchBar({handleSearch}) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event) => {
    setSearchTerm(event.target.value)
    handleSearch(event.target.value)
  };

  return (
    <Container>
      <TextField
        id="search"
        type="search"
        label="Search"
        size="small"
        value={searchTerm}
        onChange={handleChange}
        InputProps={{
          endAdornment: (
            <InputAdornment>
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </Container>
  );
}