import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import TestData from '@/models/TestData';

export async function GET() {
    await dbConnect();
    try {
        const data = await TestData.find({}).sort({ createdAt: -1 });
        return NextResponse.json({ success: true, data });
    } catch (error) {
        return NextResponse.json({ success: false }, { status: 400 });
    }
}

export async function POST(request: Request) {
    await dbConnect();
    try {
        const body = await request.json();
        const newData = await TestData.create(body);
        return NextResponse.json({ success: true, data: newData }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false, error }, { status: 400 });
    }
}
