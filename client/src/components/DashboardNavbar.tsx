import React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOut, Settings, User } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

const DashboardNavbar = () => {
  return (
    <div className='w-full border-b border-neutral-500/10 py-6 px-4'>
      <div className='flex items-center justify-end'>

            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent sideOffset={10}>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        <User className='h-[2rem] w-[2rem] mr-2'/>
                        Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Settings className='h-[2rem] w-[2rem] mr-2' />
                        Settings
                    </DropdownMenuItem>
                    <DropdownMenuItem variant="destructive">
                        <LogOut className='h-[2rem] w-[2rem] mr-2' />
                        Logout
                    </DropdownMenuItem>

                </DropdownMenuContent>
            </DropdownMenu>
      </div>
    </div>
  )
}

export default DashboardNavbar
