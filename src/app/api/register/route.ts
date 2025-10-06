import { NextResponse} from 'next/server';
import bcrypt from 'bcryptjs';
import { User } from '@/models/User';
import { connectDB } from '@/lib/mongodb';

export async function POST(request: Request) {
    try {
        const { name, email, password } = await request.json();


        await connectDB();

        
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ error: 'User already exists' }, { status: 400 });
        }

       
        const hashedPassword = await bcrypt.hash(password, 10);

    
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        return NextResponse.json({ message: 'User registered successfully' }, { status: 201 });
    } catch (error) {
        console.error('Error registering user:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}