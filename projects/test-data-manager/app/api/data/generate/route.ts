import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import TestData from '@/models/TestData';
import { faker } from '@faker-js/faker';

export async function POST(request: Request) {
    try {
        await connectDB();
        const body = await request.json();
        const count = body.count || 10;
        const type = body.type || 'user'; // Default to 'user'

        // Limit to prevent overloading (e.g. max 1000)
        const safeCount = Math.min(count, 1000);

        const generatedData = [];

        for (let i = 0; i < safeCount; i++) {
            let payload = {};
            let scenario = "";
            let tags = ['auto-generated', 'faker'];

            if (type === 'product') {
                scenario = `Auto-Generated Product ${faker.string.nanoid(4)}`;
                tags.push('product', faker.commerce.department().toLowerCase());
                payload = {
                    name: faker.commerce.productName(),
                    price: faker.commerce.price(),
                    category: faker.commerce.department(),
                    description: faker.commerce.productDescription(),
                    sku: faker.string.alphanumeric(8).toUpperCase(),
                    inStock: faker.datatype.boolean()
                };
            } else {
                // Default User template
                scenario = `Auto-Generated User ${faker.string.nanoid(4)}`;
                tags.push('user', faker.internet.domainWord());
                payload = {
                    firstName: faker.person.firstName(),
                    lastName: faker.person.lastName(),
                    email: faker.internet.email(),
                    job: faker.person.jobTitle(),
                    avatar: faker.image.avatar(),
                    createdAt: faker.date.past()
                };
            }

            generatedData.push({
                scenario,
                tags,
                payload
            });
        }

        await TestData.insertMany(generatedData);

        return NextResponse.json(
            { success: true, message: `Successfully generated ${safeCount} records` },
            { status: 201 }
        );
    } catch (error) {
        console.error("Generation Error:", error);
        return NextResponse.json(
            { success: false, error: 'Failed to generate data' },
            { status: 500 }
        );
    }
}
