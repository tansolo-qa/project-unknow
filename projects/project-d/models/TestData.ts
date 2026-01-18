import mongoose, { Schema, Document } from 'mongoose';

export interface ITestData extends Document {
    scenario: string;
    tags: string[];
    payload: Record<string, any>;
    createdAt: Date;
}

const TestDataSchema: Schema = new Schema({
    scenario: { type: String, required: true },
    tags: { type: [String], default: [] },
    payload: { type: Schema.Types.Mixed, required: true },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.TestData || mongoose.model<ITestData>('TestData', TestDataSchema);
