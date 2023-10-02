import "./login.scss"
import Button from "@mui/material/Button";
import * as React from 'react'
import { useState } from "react";
import TextField from '@mui/material/TextField';
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Navigate, useNavigate } from "react-router-dom";
import { useThemeContext } from "../../styles/themes/mainTheme/ThemeContextProvider";

// const StyledTextField = styled(TextField)(() => ({
//   input: {
//     color: "white"
//   }
// }));

interface FormValues {
  Email?: string
  Password?: string
}

const inputDefaults = [
  {
    PK_ID: 0,
    required: true,
    id: "filled",
    label: "Email",
    pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
    error: false
  },
  {
    PK_ID: 1,
    id: "filled-password-input",
    label: "Password",
    type: "password",
    autoComplete: "current-password",
    pattern: "^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@#$%^?()~<>&+=!*]).{8,}$",
    error: false
  }
]


const Login = () => {
  const { theme } = useThemeContext()
  const [inputs, setInputs] = useState(inputDefaults)
  const [formValues, setFormValues] = useState<FormValues>({})
  const navigate = useNavigate()

  const handleTextFieldChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const {name, value} = event.target;
    if (name){
      setFormValues({
        ...formValues,
        [name]: value,
      })
    }
  }

  const handleSubmit = async () => {
    const formChecks: boolean[] = [];

    // REGEX validation
    inputs.map((input) => {
      let re = RegExp(input.pattern)
      let inputDiv: HTMLElement = document.getElementById(input.label)
      let inputElement: HTMLInputElement = inputDiv.querySelector('.MuiInputBase-input')
      
      //MuiInputBase-input
      if (re.test(inputElement.value) && (inputElement.value != '')){
        formChecks.push(true)
        console.log(`${input.label} of ${inputElement.value} PASSED Regex test of ${input.pattern}`)
        input.error = false
        return input
      } else {
        formChecks.push(false)
        console.log(`${input.label} of ${inputElement.value} FAILED Regex test of ${input.pattern}`)
        input.error = true
        return input
      }
      
    })

    if (formChecks.every(value => value === true)) {
      const response = await fetch('/userAuthentication', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formValues),
      })
      const data = await response.json()
      const statusCode = await response.status
      if (statusCode === 200) {
        navigate('/overview')
      }
    }
  
  }
  
  console.log(formValues)

  return (
    
    <div className="login_container">
      <div className="login_grid">
        <div className="gridItem">
          <Typography variant="h2">Login</Typography>
        </div>
        {inputs.map((input) => (
          <div className="gridItem" key={input.PK_ID} id={input.label}> 
            <TextField 
              id={input.id}
              name={input.label}
              label={input.label}
              type={input.type}
              autoComplete={input.autoComplete}
              onChange={handleTextFieldChange}
            />
          </div>
        ))}
        <div className="loginButton">
          <Button variant="contained" onClick={handleSubmit} size="large">Login</Button>
        </div>
        
        <div className="gridItem">
          <p> Don't have an account yet? </p>
          <Link to={'/auth/signup'} style={{color: theme.palette.primary.main}}>Sign up</Link> 
        </div>
      </div>
    </div>
    
    
  );
}

export default Login