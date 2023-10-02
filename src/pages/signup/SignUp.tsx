import "./signup.scss"
import { useState, useEffect } from "react";
import * as React from 'react';
import { Navigate, useNavigate } from "react-router-dom";
import {
  BackdropProps,
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
    Username?: string
    Email?: string
    Password?: string
    ConfirmPassword?: string
}

const defaults = [
  {
    PK_ID: 0,
    helperText: "Must be between 4-32 alphanumeric characters."
  },
  {
    PK_ID: 1,
    helperText: "Must Be a Valid Email"
  },
  {
    PK_ID: 2,
    helperText: "Must Be 8-32 chars, at least one [A-Z], [a-z], and [@#$%^()<>&+=!*]"
  },
  {
    PK_ID: 3,
    helperText: "Passwords must match"
  }
]

const inputsValues = [
  {
    PK_ID: 0,
    id: "filled-required",
    required: true,
    label: "Username",
    name: "Username",
    helperText: defaults[0].helperText,
    pattern: "^[a-zA-Z0-9]{4,32}$",
    error: false
  },
  {
    PK_ID: 1,
    id: "filled-required",
    required: true,
    label: "Email",
    name: "Email",
    helperText: defaults[1].helperText,
    color: "primary",
    pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
    error: false
  },
  {
    PK_ID: 2,
    id: "filled-password",
    required: true,
    label: "Password",
    name: "Password",
    type: "password",
    pattern: "^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@#$%^?()~<>&+=!*]).{8,}$",
    helperText: defaults[2].helperText,
    error: false
  },
  {
    PK_ID: 3,
    id: "filled-password",
    required: true,
    label: "Confirm Password",
    name: "ConfirmPassword",
    helperText: defaults[3].helperText,
    pattern: "",
    type: "password",
    error: false
  },
]
const inputsDefault = [...inputsValues]

const SignUp = () => {
  const [formValues, setFormValues] = useState<FormValues>({})
  const [render, reRender] = useState(false)
  const [inputs, setInputs] = useState(inputsValues)
  const [buttonClicked, setButtonClicked] = useState(false)
  const navigate = useNavigate()

  console.log(`Button Clicked ${buttonClicked}`)


  const handleTextFieldChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const {name, value} = event.target;
    if (name){
      setFormValues({
        ...formValues,
        [name]: value,
      })
      // console.log(name, value)
      // console.log(formValues)
    if (buttonClicked) {
      setInputs(inputs.map((input) => {
        if (name == input.name){
          let re = RegExp(input.pattern)
          let inputDiv: HTMLElement = document.getElementById(input.name)
          let inputElement: HTMLInputElement = inputDiv.querySelector('.MuiInputBase-input')
          let helperText: HTMLElement = inputDiv.querySelector(".MuiFormHelperText-root")
          console.log(input)
          console.log(inputsDefault)
          //MuiInputBase-input
          if (re.test(inputElement.value) && (inputElement.value != '')){
            input.error = false
            helperText.style.display = "none" 
            helperText.innerHTML = defaults[input.PK_ID].helperText
            console.log(`${input.helperText}`)
            return input
          } else {
            input.error = true
            helperText.style.display = "flex" 
            helperText.innerHTML = defaults[input.PK_ID].helperText
            console.log(`${input.helperText}`)
            return input
          }
        }
        return input
        
      }))
    }
  }
  };



  const handleSubmit = async () => {
    const formChecks: boolean[] = [];
    inputs[3].pattern = formValues.Password

    inputs.map((input) => {
      let re = RegExp(input.pattern)
      let inputDiv: HTMLElement = document.getElementById(input.name)
      let inputElement: HTMLInputElement = inputDiv.querySelector('.MuiInputBase-input')
      let helperText: HTMLElement = inputDiv.querySelector(".MuiFormHelperText-root")
      //MuiInputBase-input
      if (re.test(inputElement.value) && (inputElement.value != '')){
        formChecks.push(true)
        console.log(`${input.name} of ${inputElement.value} PASSED Regex test of ${input.pattern}`)
        input.error = false
        helperText.style.display = "none" 
        return input
      } else {
        formChecks.push(false)
        console.log(input.name + " of "+ inputElement.value + " FAILED Regex test of:" + input.pattern)
        input.error = true
        helperText.style.display = "flex" 
        return input
      }
      
    })

    setButtonClicked(true)
    //This is my submit action
    if (formChecks.every(value => value === true)) {
      const response = await fetch('/createNewUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formValues),
      })
      const data = await response.json()
      const statusCode = await response.status
      if (statusCode== 409) {
        setInputs(inputs.map((input) => {
          if (input.name === "Email") {
            input.error = true
            input.helperText = data['message']
            let inputDiv: HTMLElement = document.getElementById(input.name)
            let helperText: HTMLElement = inputDiv.querySelector(".MuiFormHelperText-root")
            helperText.style.display = "flex" 
          }
          return input
        }))
        console.log(data)
      } else if (statusCode == 201) {
        navigate('/signup/success')
      }
    } else {
      console.log("Your form is invalid")
    }
  }


  return (
    <div className="login_container">
      <div className="login_grid">
        <div className="gridItem">
          <Typography variant="h2">Sign Up</Typography>
        </div>
        {inputs.map((input) => (
          <div className="gridItem" key={input.PK_ID} id={input.name}>
            <TextField 
              required={input.required}
              error={input.error}
              fullWidth
              id={input.id}
              label={input.label}
              name={input.name}
              type={input.type}
              helperText={input.helperText}
              variant="filled"
              onChange={handleTextFieldChange}
              sx={{
                '& .MuiFormHelperText-root': {
                  display: "none",
                  justifyContent: "center",
                }
              }}
              />
          </div>
        ))}
        <div className="loginButton">
          <Button variant="contained" onClick={handleSubmit} size="large">Create Account</Button>
        </div>
      </div>
    </div>
  )
}

export default SignUp