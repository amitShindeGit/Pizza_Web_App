import  React, {memo, useEffect, useState} from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import AddIcon from "@mui/icons-material/Add";
import { v4 as uuidv4 } from 'uuid';
import Checkbox from '@mui/material/Checkbox';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import { useDispatch, useSelector } from 'react-redux';




const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};


const BasicModal = ({pizzaId, size, toppings}) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [pizzaSize, setPizzaSize] = useState("Regular");
  const [pizzaToppings, setPizzaToppings] = useState([]);
  
  const sizeSelectHandler = (event) => {
    setPizzaSize(event.target.value);
    
  }

  
  const toppingSelectHandler = (event) => {
    //if exists then delete 
    if(!toppings[0].isRadio){
    if(pizzaToppings.length > 0){

     if(pizzaToppings.includes(event.target.value)){
      const index = pizzaToppings.indexOf(event.target.value);
      const temp = [...pizzaToppings];
      temp.splice(index, 1);
      setPizzaToppings(temp);
     }else{
      setPizzaToppings(prevState => [...prevState, event.target.value]);
     }
    }else{
      setPizzaToppings(prevState => [...prevState, event.target.value]);
    }  
    
  } else{
    setPizzaToppings(event.target.value);
  } 
  }
  
  const addAddOnsHandler = () => {
  
    dispatch({ type: "ADD_ADD_ONS", payload: [{pizzaId: pizzaId, pizzaSize:  pizzaSize , pizzaToppings: pizzaToppings }]});
    setOpen(false);
    setPizzaSize('Regular');  //back to default state
    setPizzaToppings([]);
  }


  return (
    <div >
      <AddIcon onClick={handleOpen} /> <span  onClick={handleOpen} style={{ cursor: 'pointer' }} >TOPPINGS ?</span>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        
      >
        <Box sx={style}>
        {/* //Size */}
          <Typography sx={{color: 'green'}} id="modal-modal-title" variant="h6" component="h2">
            SIZE:{" "}
          </Typography>
            {
              <>
                {size.map((item) => !item.isRadio ?  item.items.map(item2 =>  <Checkbox onClick={sizeSelectHandler}  sx={{ margin: 1 }} variant="outlined">{Object.values(item2).toString()}</Checkbox>) 
                : 
                <FormControl >
                  <RadioGroup
                    row
                    defaultValue="Regular"
                  >
               {( item.items.map(item2 =>  
                  <FormControlLabel value={Object.values(item2).toString()}  control={<Radio   onClick={sizeSelectHandler} />} label={Object.values(item2).toString()} />
                 ))}
                 </RadioGroup>
                  </FormControl>
                  )}   
              </>
            }

            {/* //Toppings */}
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ mt: 2, color: 'green' }}>TOPPINGS: </Typography>
             {
              <>
              
                {toppings.map((item) => !item.isRadio ?  <><FormGroup > {item.items.map(item2 =>  
                <FormControlLabel value={Object.values(item2).toString()} control={<Checkbox onClick={toppingSelectHandler}  />} label={Object.values(item2).toString()} />)}</FormGroup><Button sx={{marginLeft: 20}} onClick={addAddOnsHandler} color="success">ADD</Button></>

                 :
                  
                  <FormControl >
                  <RadioGroup
                  >
                  {(item.items.map(item2 =>  
                  <FormControlLabel value={Object.values(item2).toString()}   control={<Radio onClick={toppingSelectHandler}  />} label={Object.values(item2).toString()} />
                 
                  ))}</RadioGroup><Button sx={{marginLeft: 20}} onClick={addAddOnsHandler} color="success">ADD</Button>
                  </FormControl>
                  )}
              </>
            }

        </Box>
      </Modal>
    </div>
  );
}

export default BasicModal;
