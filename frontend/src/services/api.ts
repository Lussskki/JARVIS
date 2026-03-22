import { ChatResponse } from '../types'

const API_URL = '/api'

export const sendMessage = async (message: string): Promise<ChatResponse> => {
    const response = await fetch(`${API_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
    })
    if (!response.ok) throw new Error('Failed')
    return response.json()
}
