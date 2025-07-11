import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from './ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { LinkIcon, LogOut } from 'lucide-react'
import { UrlState } from '@/context'
import useFetch from '@/hooks/useFetch'
import { logout } from '@/db/apiAuth'
import { BarLoader } from 'react-spinners'

const Header = () => {
    const navigate = useNavigate()
    const { user, fetchUser } = UrlState()
    const initials = user?.user_metadata?.name
        ? user.user_metadata.name
            .split(" ")
            .filter(Boolean)
            .map(word => word[0].toUpperCase())
            .join("")
        : "";
    const { loading, fn: fnLogout } = useFetch(logout)
    return (
        <>
            <nav className='py-4 flex justify-between items-center'>
                <Link>
                    <img src="/ziplink_logo.svg" className="h-16" alt='Ziplink logo' />
                </Link>
                <div>
                    {!user ? (<Button onClick={() => navigate('/auth')}>
                        Login
                    </Button>) : (
                        <DropdownMenu>
                            <DropdownMenuTrigger className="w-10 rounded-full overflow-hidden">
                                <Avatar>
                                    <AvatarImage src={user?.user_metadata?.profile_pic} className="object-contain" />
                                    <AvatarFallback>{initials}</AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel>{user?.user_metadata?.name}</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <Link to='/dashboard' className='flex'>
                                        <LinkIcon className='mr-2 h-4 w-4' />
                                        My Links
                                    </Link></DropdownMenuItem>
                                <DropdownMenuItem className="text-red-400">
                                    <LogOut className='mr-2 h-4 w-4' />
                                    <span onClick={() => {
                                        fnLogout().then(() => {
                                            fetchUser()
                                            navigate("/")
                                        })
                                        navigate("/auth")
                                    }}>

                                        Logout
                                    </span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}
                </div>
            </nav>
            {loading && <BarLoader className='mb-4' width={"100%"} color="#36d7b7" />}
        </>

    )
}

export default Header