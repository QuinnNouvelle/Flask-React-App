import { useState } from "react";
import * as React from 'react';
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Rating,
  TextField,
  Typography,
} from "@mui/material";

interface FormValues {
    specs?: string;
    laptop?: string;
    headset?: string;
    review?: number;
}

const reviewName = 'review';

export default function FormSubmitHooks() {
  const [formValues, setFormValues] = useState<FormValues>({});
  const handleTextFieldChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    checked?: boolean
  ) => {
    const { name } = event.target;
    if(!checked) {
        //@ts-ignore still working on the typing
        delete formValues[name]
    } else {
        setFormValues({
            ...formValues,
            [name]: checked,
          });
    }
  };

  const handleRatingChange = (
    value: number | null,
    name: string
  ) => {
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    fetch('/somewhere.html', {
      method: 'POST',
      body: JSON.stringify(formValues),
      headers: {
        'Content-Type': 'application/json'
      },
    })
  }

  return (
    <form>
      <FormGroup
        sx={{
          padding: 2,
          borderRadius: 2,
          border: "1px solid",
          borderColor: "primary.main",
        }}
      >
        <TextField
          sx={{ paddingBottom: 2 }}
          name="specs"
          variant="outlined"
          placeholder="Specs..."
          onChange={handleTextFieldChange}
        />
        <FormLabel component="legend">Product</FormLabel>
        <FormGroup row sx={{ paddingBottom: 2 }} >
          <FormControlLabel
            control={<Checkbox name="laptop" value="laptop" onChange={handleCheckboxChange}/>}
            label="Laptop"
          />
          <FormControlLabel
            control={<Checkbox name="headset" value="headset" onChange={handleCheckboxChange}/>}
            label="Head Set"
          />
        </FormGroup>
        <Typography component="legend">Review</Typography>
        <Rating name={reviewName} sx={{ paddingBottom: 2 }} onChange={(event, value) => handleRatingChange(value, reviewName)}/>
        <Button variant="outlined" onClick={handleSubmit}>Submit</Button>
      </FormGroup>
    </form>
  );
}