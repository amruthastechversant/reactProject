import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login(){
    const Navigate = useNavigate();
    const[error,setError] = useState("");
    const[formData,setFormData] = useState({
        email:"",
        password:""
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        })
    }

    const validateEmail = (email:string)=>{
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return pattern.test(email);
    }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        
        if(!formData.email || !formData.password){
            setError("input fields is empty");
            return;
        }
        
        if(!validateEmail(formData.email)){
            setError("Invalid email format");
            return;
        }
        if(formData.password.length < 3){
            setError("password must atleast have 3 letters");
            return;
        }

        setError("");
        if(formData.email =="amrutha@gmail.com" && formData.password == "123"){
            Navigate("/tsodo")
        }else{
            setError("Invalid credentials");
        }
        
        console.log(formData);
    }

    return(
        <table className = "to-do-table">
            <div className="login-outer-div"> 
                <h1>LOGIN</h1>
                <form onSubmit={handleSubmit}>
                    <tr>
                        <td><label>Email</label></td>
                        <td><input type="text" name="email" value={formData.email} onChange={handleChange}/></td>
                    </tr>
                    <tr>
                        <td><label>Password</label></td>
                        <td><input type="password" name="password" value={formData.password} onChange={handleChange}/></td>
                    </tr>
                    {error && <p className="error">{error}</p>}
                    <tr>
                        <td className="loginButton"><input type="submit" value="Login"/></td>
                    </tr>
                </form>
            </div>
        </table>
    )
}
export default Login