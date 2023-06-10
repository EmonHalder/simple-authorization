import {
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import app from "../../firebase/firebase.config"; 
import { AiFillEye } from "react-icons/ai";

const Login = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const emailRef = useRef();
  const auth = getAuth(app);
  const [type, setType] = useState("password");

  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    setError("");
    setSuccess("");
    if (!/(?=.*[A-Z])/.test(password)) {
      // forward slash used korte hobe
      // VALIDATION ADD KORA HOLO
      setError("Please add at least one upper case");
      return;
    } else if (password.length < 6) {
      setError("Please add at least 6 characters");
      return;
    }
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
        if (!loggedUser.emailVerified) {
          alert("Please verified your email. Check your inbox");
        }
        setSuccess("User login successfully");
      })
      .catch((error) => {
        setError(error.message);
      });
    event.target.reset();
  };

  const handleForgetPass = () => {
    const email = emailRef.current.value;
    // input feild e ref usen korte hobe //
    if(!email){
      alert('Please provide your email')
      return;
    }
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert('Please check your email!') 
      })
      .catch((error) => {
        setError(error.message);
      });
  };
 

  const showPass = (event)=>{
    const change = event.target.value;
    if(change==="password"){
      setType("text")
    }
    else{
      setType("password")
    }

  }

   
  return (
    <form onSubmit={handleLogin}>
      <div className="form-group mt-5">
        <input
          type="email"
          name="email"
          className="form-control"
          id="emailInput"
          placeholder="Enter email"
          required
          ref={emailRef}
        />
       
      </div>

      <div className="form-group mt-3">
        <input
          type={type}
          name="password"
          className="form-control"
          placeholder="Enter password"
          required
          
        />
         <button value={type} className="mt-2" onClick={showPass}><AiFillEye/></button>
       
      </div>

      <div className="form-group form-check mt-3">
        <label htmlFor="text">
          <Link>
            <small onClick={handleForgetPass}>Forget password?</small>
          </Link>
        </label>
      </div>

      <button type="submit" className="btn btn-primary mt-2">
        Submit
      </button>
      <p>
        <small className="text-danger">{error}</small>
      </p>
      <p>
        <small className="text-success">{success}</small>
      </p>
      <p>
        <small>
          Are you new for this website? Please
          <Link to="/register">Register</Link>
        </small>
      </p>
    </form>
  );
};

export default Login;
