import { Request, Response } from 'express'
import Visitor from '../models/Visitor.js'

const parseUA = (ua: string) => {
    let browser = 'unknown', os = 'unknown', device = 'desktop'

    if (/Chrome/.test(ua) && !/Edge|OPR/.test(ua)) browser = 'Chrome'
    else if (/Firefox/.test(ua)) browser = 'Firefox'
    else if (/Safari/.test(ua) && !/Chrome/.test(ua)) browser = 'Safari'
    else if (/Edge/.test(ua)) browser = 'Edge'
    else if (/OPR/.test(ua)) browser = 'Opera'
    else if (/Brave/.test(ua)) browser = 'Brave'

    if (/Windows/.test(ua)) os = 'Windows'
    else if (/Mac/.test(ua)) os = 'macOS'
    else if (/Linux/.test(ua)) os = 'Linux'
    else if (/Android/.test(ua)) os = 'Android'
    else if (/iPhone|iPad/.test(ua)) os = 'iOS'

    if (/Mobile|Android|iPhone/.test(ua)) device = 'mobile'
    else if (/Tablet|iPad/.test(ua)) device = 'tablet'

    return { browser, os, device }
}

export const trackVisitor = async (req: Request, res: Response) => {
    try {
        const ua = req.headers['user-agent'] || ''
        const { browser, os, device } = parseUA(ua)
        const ip = (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() || req.ip || 'unknown'

        let country = 'unknown', city = 'unknown'
        try {
            const geo = await fetch(`http://ip-api.com/json/${ip}?fields=country,city`)
            const data = await geo.json()
            if (data.country) country = data.country
            if (data.city) city = data.city
        } catch {}

        const visitor = await Visitor.create({
            ip, country, city, device, browser, os,
            page: req.body.page || '/',
            referrer: req.body.referrer || 'direct'
        })

        res.status(201).json({ tracked: true })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Tracking error' })
    }
}

export const getStats = async (req: Request, res: Response) => {
    try {
        const { days = '30' } = req.query
        const since = new Date()
        since.setDate(since.getDate() - Number(days))

        const visitors = await Visitor.find({ timestamp: { $gte: since } }).sort({ timestamp: -1 })

        const total = visitors.length
        const uniqueIPs = new Set(visitors.map(v => v.ip)).size

        const byCountry: Record<string, number> = {}
        const byBrowser: Record<string, number> = {}
        const byDevice: Record<string, number> = {}
        const byOS: Record<string, number> = {}
        const byDay: Record<string, number> = {}

        visitors.forEach(v => {
            byCountry[v.country] = (byCountry[v.country] || 0) + 1
            byBrowser[v.browser] = (byBrowser[v.browser] || 0) + 1
            byDevice[v.device] = (byDevice[v.device] || 0) + 1
            byOS[v.os] = (byOS[v.os] || 0) + 1
            const day = v.timestamp.toISOString().split('T')[0]
            byDay[day] = (byDay[day] || 0) + 1
        })

        res.json({
            total, uniqueIPs, byCountry, byBrowser, byDevice, byOS, byDay,
            recent: visitors.slice(0, 50)
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Stats error' })
    }
}