"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Users = {
    _id:string,
    firstName:string,
    lastName:string;
    email: string;
    phone:string;
    state:string
    hasVoted:boolean
}

export const columns: ColumnDef<Users>[] = [
    {
    accessorKey: "firstName",
    header: "First Name",
  },
    {
    accessorKey: "lastName",
    header: "Last Name",
  },
  {
    accessorKey: "email",
    header: ({column})=>{
      return (
         <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    }
  },

  {
    accessorKey: "state",
    header: "State",
  },
  {
    accessorKey: "hasVoted",
    header: "Has Voted",
  },
  {
    id: "actions",
    cell: ({row})=>{
      const user = row.original

      return(
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
                  onClick={() => navigator.clipboard.writeText(user._id)}
                >
                  Copy Voter ID
              </DropdownMenuItem>
               <DropdownMenuSeparator />
                <DropdownMenuItem>View Voter</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }
]