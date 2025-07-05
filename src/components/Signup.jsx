import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { BeatLoader } from "react-spinners"
import { useEffect, useState } from "react"
import * as Yup from 'yup'
import Error from "./error"
import useFetch from "@/hooks/useFetch"
import { signup } from "@/db/apiAuth"
import { useNavigate, useSearchParams } from "react-router-dom"
import { UrlState } from "@/context"

const SignUp = () => {
    const [errors, setErrors] = useState([])
    const [ formData, setFormData] = useState({
        name:"",
        email:"",
        password:"",
        profile_pic:null
    })

    const navigate = useNavigate();
    let [searchParams] = useSearchParams();
    const longlink = searchParams.get("createNew");

    const handleInputChange = (e) => {

        const { name, value, Files } = e.target

        setFormData((prevState) => ({
            ...prevState,
            [name]:Files ? Files[0]: value,
        }))

    }
    
    const{data, error, loading, fn: fnSignUp} = useFetch(signup, formData);
    const {fetchUser} = UrlState();

    useEffect(() => {
        if(error === null && data){
            navigate(`/dashboard?${longlink ? `createNew=${longlink}`:""}`);
           fetchUser()
        }


    },[error, loading])
    const handleSignUp = async() => {
        setErrors([])
        try {
           const schema = Yup.object().shape({
            name: Yup.string().required("Name is required"),
            email:Yup.string().email("Invalid Email").required("Email is Required"),
            password:Yup.string().min(6, "Password must be at least 6 characters").required("Password is Required"),
            profile_pic: Yup.mixed().required("Profile picture is required")
           })

           await schema.validate(formData, {abortEarly: false})
           // api call
           await fnSignUp()
        }catch(e){
           const newErrors = {};

           e?.inner?.forEach((err) => {
            newErrors[err.path] = err.message;
           })

           setErrors(newErrors);
        }
    }
    return (
    <Card>
      <CardHeader>
        <CardTitle>SignUp</CardTitle>
        <CardDescription>
          Create a new account if you haven't already
        </CardDescription>
        {error && <Error message={error.message} />}
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1">
          <Input
            name="name"
            type="text"
            placeholder="Enter your Name"
            onChange={handleInputChange}
          />
        </div>
        {errors.name && <Error message={errors.name} />}
        <div className="space-y-1">
          <Input
            name="email"
            type="email"
            placeholder="Enter Email"
            onChange={handleInputChange}
          />
        </div>
        {errors.email && <Error message={errors.email} />}
        <div className="space-y-1">
          <Input
            name="password"
            type="password"
            placeholder="Enter Password"
            onChange={handleInputChange}
          />
        </div>
        {errors.password && <Error message={errors.password} />}
        <div className="space-y-1">
          <Input
            name="profile_pic"
            type="file"
            accept="image/*"
            onChange={handleInputChange}
          />
        </div>
        {errors.profile_pic && <Error message={errors.profile_pic} />}
      </CardContent>
      <CardFooter>
        <Button onClick={handleSignUp}>
          {loading ? <BeatLoader size={10} color="#36d7b7" /> : "Create Account"}
        </Button>
      </CardFooter>
    </Card>
  );
}

export default SignUp