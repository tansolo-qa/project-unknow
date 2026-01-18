import { NextResponse } from 'next/server';
import { connectDB } from '../../../../lib/db';
import TestData from '../../../../models/TestData';
import { faker } from '@faker-js/faker';

export async function POST(request: Request) {
    try {
        await connectDB();
        const body = await request.json();
        const count = body.count || 10;

        // Limit to prevent overloading (e.g. max 1000)
        const safeCount = Math.min(count, 1000);

        const generatedData = [];

        for (let i = 0; i < safeCount; i++) {
            generatedData.push({
                scenarioName: `Auto-Generated User ${faker.string.nanoid(4)}`,
                tags: ['auto-generated', 'faker', faker.internet.domainWord()],
                payload: {
                    firstName: faker.person.firstName(),
                    lastName: faker.person.lastName(),
                    email: faker.internet.email(),
                    job: faker.person.jobTitle(),
                    avatar: faker.image.avatar(),
                    createdAt: faker.date.past()
                }
            });
        }

        await TestData.insertMany(generatedData);

        return NextResponse.json(
            { success: true, message: `Successfully generated ${safeCount} records` },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json(
            { success: false, error: 'Failed to generate data' },
            { status: 500 }
        );
    }
}
