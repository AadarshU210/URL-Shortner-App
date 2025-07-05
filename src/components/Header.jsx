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

const Header = () => {
    const navigate = useNavigate()
    const user = false;
    return (
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
                               <AvatarImage src="https://github.com/shadcn.png" />
                               <AvatarFallback>AU</AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>Ayush Upadhyay</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <LinkIcon className='mr-2 h-4 w-4' />
                                My Links</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-400">
                                <LogOut className='mr-2 h-4 w-4' />
                                <span>Logout</span>   
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )}
            </div>
        </nav>
    )
}

export default Header