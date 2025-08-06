import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import DashboardNavbar from "@/components/DashboardNavbar";
import DashboardSidebar from "@/components/DashboardSidebar";


export default function AuthLayout({children}:Readonly<{children: React.ReactNode}>){
    return(
        <SidebarProvider>
        <div className="w-full flex">
            <DashboardSidebar />

            <div className="w-full">
                <DashboardNavbar />
                <div className="px-4">
                    {children}
                </div>
            </div>
        </div>
        </SidebarProvider>
    )
}