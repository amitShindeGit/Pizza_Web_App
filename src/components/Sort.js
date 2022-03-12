import { useDispatch } from "react-redux";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const Sort = ({ sortName }) => {
  const [age, setAge] = React.useState("");

  const dispatch = useDispatch();

  const sortAscHandler = () => {
    dispatch({ type: "SORT_ASC_BY_PRICE" });
  };

  const sortDescHandler = () => {
    dispatch({ type: "SORT_DESC_BY_PRICE" });
  };

  const sortRatingAscHandler = () => {
    dispatch({ type: "SORT_ASC_BY_RATING" });
  };

  const sortRatingDescHandler = () => {
    dispatch({ type: "SORT_DESC_BY_RATING" });
  };

  const showAll = () => {
    dispatch({ type: "SHOW_ALL_PIZZAS" })
  }

  const showVeg = () => {
    dispatch({ type: "SORT_BY_VEG" })
  }

  const showNonVeg = () => {
    dispatch({ type: "SORT_BY_NONVEG" })
  }

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <Box
      sx={{ width: 1 / 4, marginTop: 3, display: "inline-block", padding: 1 }}
    >
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{sortName}</InputLabel>
        {sortName === 'Price' || sortName === 'Rating' ?
         ( <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem onClick={sortName === 'Price' ? sortAscHandler : sortRatingAscHandler} value={10}>ASCENDING</MenuItem>
          <MenuItem onClick={sortName === 'Price' ? sortDescHandler : sortRatingDescHandler} value={20}>DESCENDING</MenuItem>
        </Select>)
        :
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem onClick={showAll} value={10}>ALL</MenuItem>
          <MenuItem onClick={showVeg} value={20}>VEG</MenuItem>
          <MenuItem onClick={showNonVeg} value={30}>NON-VEG</MenuItem>

        </Select>}
      </FormControl>
    </Box>
  );
};

export default Sort;
