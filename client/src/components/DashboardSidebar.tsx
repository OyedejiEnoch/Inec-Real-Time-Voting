"use client"
import React from 'react'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Flag, Home, Map, Settings, User, User2 } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import inecLogo from "@/assets/inecLogo.png"
import { usePathname  } from 'next/navigation'
import { cn } from '@/lib/utils'

const items = [
  {
    title: "Home",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Voters",
    url: "/dashboard/voters",
    icon: User,
  },
  {
    title: "Parties",
    url: "/dashboard/parties",
    icon: Flag,
  },
  {
    title: "Candidates",
    url: "/dashboard/candidates",
    icon: User2,
  },
  {
    title: "Elections",
    url: "/dashboard/elections",
    icon: User2,
  },
  {
    title: "Map",
    url: "/dashboard/map",
    icon: Map,
  },
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: Settings,
  },
]

const DashboardSidebar = () => {
  return (
     <Sidebar>
      <SidebarHeader className='p-6 bg-white'>
       <Image src={inecLogo} alt="" className="object-cover w-[150px]" />
      </SidebarHeader>
      <SidebarContent  className='bg-white'>
        <SidebarGroup >
            <SidebarGroupLabel>Menu</SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu className='flex flex-col gap-3 px-3 mt-3'>
                    {items.map((item) => {
                        const pathName = usePathname ()
                        const isActive  = pathName === item.url

                        return(
                    <SidebarMenuItem key={item.title} className=''>
                        <SidebarMenuButton asChild size={"lg"} className={cn('text-[16px] py-3 bg-gray-50/20', isActive && "bg-[#5CB85C] text-white")}>
                            <Link href={item.url} className='py-3'>
                                <item.icon size={32} />
                                <span>{item.title}</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                        )    
                })}
                </SidebarMenu>
            </SidebarGroupContent>

        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}

export default DashboardSidebar
