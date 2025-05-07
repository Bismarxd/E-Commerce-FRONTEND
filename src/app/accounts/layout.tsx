import AccountSidebar from "@/components/AccountSidebar";


export default function AccountLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   
        <div className="xl:container px-2 xl:px-4 mx-auto">
            <div className="flex">
                <AccountSidebar/>
                <div className="w-full pb-6">
                    {children}
                </div>
            </div>
        </div>
        
        
  );
}
