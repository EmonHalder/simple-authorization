import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, sendPasswordResetEmail, updateProfile,  } from "firebase/auth";
import app from "../../firebase/firebase.config";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AiFillEye } from "react-icons/ai";

const Register = () => {
  const auth = getAuth(app);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [type, setType] = useState("password");
  const emailRef = useRef();

    const handleRegister=event=>{
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        
        setError("")
        setSuccess('')
        // jehetu password niya condition dibo sehetu password er porei use korte hobe //
        if(!/(?=.*[A-Z])/.test(password)){
          // forward slash used korte hobe 
          setError("Please add at least one upper case")
          return;
        }
        else if (password.length<6){
          setError("Please add at least 6 characters")
          return;
        }

        createUserWithEmailAndPassword(auth, email, password)
        
        .then(result=>{
          const loggedUser = result.user;
          console.log(loggedUser);
          emailVerification(loggedUser)
          updateProfailName(result.user, name)
          resetPassword(result.user)
          setError('');
          setSuccess("User has been created successfully");
        })

        .catch(error=>{
          console.log(error.message);
          setError(error.message);
          setSuccess(''); 
        })

        event.target.reset();

    }

    const emailVerification = (user)=>{
      sendEmailVerification(user)
      .then(result=>{
        console.log(result);
        alert('Please verification your email. Check your inbox.')
      })
    }

    const updateProfailName = (user,name)=>{
        updateProfile( user,{
          displayName: name
        })
        .then(()=>{
          console.log('profail updated');
        })
        .catch(error=>{
          setError(error.message)
        })

    }
    

    const showPass=(event)=>{
      const changeType = event.target.value;
      if(changeType==="password"){
        setType("text")
      }
      else{
        setType("password")
      }
    }

    const resetPassword=()=>{
      const email = emailRef.current.value;
      if(!email){
        alert('Please enter your email')
      }
      sendPasswordResetEmail(auth, email)
      .then(()=>{
        alert('Please check your email')
      })
      .catch(error=>{
        setError(error.message)
      })

    }
     
  return (
    <div>
      <Form onSubmit={handleRegister} className="mt-5">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control type="text" name="name" placeholder="Full name" required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control ref={emailRef} type="email" name="email" placeholder="Enter email" required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control type={type} name="password" placeholder="Password" required />
        </Form.Group>
        <button value={type} onClick={showPass}><AiFillEye/></button>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <p className="text-danger">{error}</p>
      <p className="text-success">{success}</p>
      <p><small>You have already account? Please <Link to="/login">Login</Link></small></p>
      <Link> <small onClick={resetPassword}>forget password?</small></Link>
    </div>
  );
};

export default Register;
