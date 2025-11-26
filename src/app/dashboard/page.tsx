'use client'
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Wallet, Smartphone, Tv, Zap, User} from "lucide-react";
import  UserLayout  from "./UserLayout";
import { button, main } from "framer-motion/client";

export default function UserDashboard(){

    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true)
    const token = localStorage.getItem("authToken");

    useEffect(() =>{
        const fetchUser = async () => {
          try {
            const res = await await fetch("/api/me", {
    headers: {
      'Authorization': `Bearer ${token}`
    }
            });
            const data = await res.json();
        if (!data.user){
            router.push("/login");
        } else {
            setUser(data.user);
        }  
        } catch(err){
            router.push("/login");
        } finally {
            setLoading(false)
        }
        };
       fetchUser()
        
    }, [router]);

    if (loading) return <div className="p-6 text-center">Loading...</div>

    return(

        
        <main className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold mb-6">Welcome back, {user?.fullname || "User"}</h1>

            <UserLayout> </UserLayout>
          
            {/* wallet */}

            <section className="bg-white shadow-md rounded-xl p-4 mb-6 flex items-center justify-between">
                <div>
                    <p className="text-gray-500">Wallet Balance</p>
                <h2 className="text-3xl font-bold text-green-600">₦{user?.wallet || "0.00"}</h2>
                </div>

                <Wallet size={40} className="text-green-600"/>
            </section>


            {/* Quick actions */}

            <section className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                <Action icon={<Smartphone /> } label="Buy Data" />
                <Action icon={<Smartphone /> } label="Buy Airtime" />
                <Action icon={<Smartphone /> } label="Cable Tv" />
                <Action icon={<Smartphone /> } label="Electricity" />
            </section>

            {/* Recent Transactions */}
            <section className="bg-white shadow-md rounded-xl p-4">
                <h3>Recent Transaction</h3>
                <ul className="space-y-2">
                    {user?.transactions?.length ? (
                        user.transactions.map((tx: any, i: number) => (
                            <li key={i} className=" flex justify-between text-sm border-b pb-2">
                                <span>{tx.type}</span>
                                <span className={tx.status === "successful" ? "text-green-600" : "text-red-600"}>
                                    ₦{tx.amount}
                                </span>
                            </li>
                        ))
                    ) : (
                        
                            <p className="text-gray-500">No transactions yet</p>
                    
                    )}
                </ul>
            </section>
        </main>
      
    );

    function Action({ icon, label}: { icon: any; label: string }) {
        return(
            <button className="cursor-pointer flex flex-col items-center bg-white shadow-md p-3 rounded-xl hover:bg-green-50 transition">
                <div className="text-green-600">
                </div>
                <span className="text-sm">{label}</span>
            </button>
        )
    }
}