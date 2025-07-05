import React, { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Login from '@/components/Login';
import SignUp from '@/components/Signup';
import { UrlState } from '@/context';

const Auth = () => {

    const [searchParams] = useSearchParams();
    const longlink = searchParams.get("createNew");
    const navigate = useNavigate();

    const {isAuthenticated, loading} = UrlState();

    useEffect(() => {
       if( isAuthenticated && !loading){
          navigate(`/dashboard?${longlink ? `createNew=${longlink}`:""}`);
       }
    }, [isAuthenticated, loading])
    return (
        <div className='mt-20 flex flex-col items-center gap-10'>
            <h1 className='text-5xl font-extrabold'>
                {searchParams.get("createNew") ? "Hold up! Let's login first.." : "Login / Signup"}
            </h1>
            <Tabs defaultValue="Login" className="w-[400px]">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="Login">Login</TabsTrigger>
                    <TabsTrigger value="SignUp">SignUp</TabsTrigger>
                </TabsList>
                <TabsContent value="Login"><Login /></TabsContent>
                <TabsContent value="SignUp"><SignUp /></TabsContent>
            </Tabs>
        </div>
    )
}

export default Auth