import connectDB from "@/lib/mongodb";

(async () => {
    try {
        const conn = await connectDB();
        console.log("Database connected successfully");
        process.exit(0);
    } catch (error) {
        console.error("Database connection failed:", error);
        process.exit(1);
    }
})();
