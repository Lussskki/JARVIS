import mongoose, { Schema, Document } from 'mongoose'

export interface IVisitor extends Document {
    ip: string
    country: string
    city: string
    device: string
    browser: string
    os: string
    page: string
    referrer: string
    timestamp: Date
}

const VisitorSchema = new Schema<IVisitor>({
    ip: { type: String, default: 'unknown' },
    country: { type: String, default: 'unknown' },
    city: { type: String, default: 'unknown' },
    device: { type: String, default: 'unknown' },
    browser: { type: String, default: 'unknown' },
    os: { type: String, default: 'unknown' },
    page: { type: String, default: '/' },
    referrer: { type: String, default: 'direct' },
    timestamp: { type: Date, default: Date.now }
})

export default mongoose.model<IVisitor>('Visitor', VisitorSchema)