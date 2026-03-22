import { Request, Response } from 'express'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { jarvisPrompt } from '../prompts/jarvisPrompt.js'

export const chat = async (req: Request, res: Response) => {
    try {
        const client = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string)
        const model = client.getGenerativeModel({
            model: "gemini-2.5-flash",
            systemInstruction: jarvisPrompt,
            generationConfig: {
                maxOutputTokens: 5000
            }
        })

        const message = req.body.message
        const result = await model.generateContent(message)

        res.json({ reply: result.response.text() })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Server error" })
    }
}
