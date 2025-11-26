

interface StatCardProps {
    title: string;
    value: string;
    color: string;
    status: string;
}

export default function StatCard({ title, value, color, status }: StatCardProps){
    return (
        <div className={`rounded-xl ${color} p-4 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-md dark:shadow-[0_0_10px_rgba(255,255,255,0.05)] transition-colors duration-300`}>
            <h3 className="text-gray-600 dark:text-gray-300 font-semibold">{title}</h3>
            <p className="text-3xl font-bold mt-2 text-gray-600 dark:text-gray-300">{value}</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">{status}</p>
        </div>
    )
}