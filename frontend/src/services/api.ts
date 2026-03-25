import { ChatResponse, Message } from '../types'

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

export const fetchSessions = async () => {
    const res = await fetch(`${API_URL}/sessions`)
    if (!res.ok) throw new Error('Failed')
    return res.json()
}

export const fetchSession = async (id: string) => {
    const res = await fetch(`${API_URL}/sessions/${id}`)
    if (!res.ok) throw new Error('Failed')
    return res.json()
}

export const createSession = async (title: string, messages: Message[]) => {
    const res = await fetch(`${API_URL}/sessions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, messages })
    })
    if (!res.ok) throw new Error('Failed')
    return res.json()
}

export const updateSessionAPI = async (id: string, messages: Message[]) => {
    const res = await fetch(`${API_URL}/sessions/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages })
    })
    if (!res.ok) throw new Error('Failed')
    return res.json()
}

export const deleteSessionAPI = async (id: string) => {
    const res = await fetch(`${API_URL}/sessions/${id}`, { method: 'DELETE' })
    if (!res.ok) throw new Error('Failed')
    return res.json()
}

export const trackVisit = async () => {
    try {
        await fetch(`${API_URL}/track`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                page: window.location.pathname,
                referrer: document.referrer || 'direct'
            })
        })
    } catch {}
}

export const fetchStats = async (days: number = 30) => {
    const res = await fetch(`${API_URL}/admin/stats?days=${days}`)
    if (!res.ok) throw new Error('Failed')
    return res.json()
}