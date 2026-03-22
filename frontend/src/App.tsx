import { useState, useRef, useEffect } from 'react'
import ChatMessage from './components/ChatMessage'
import ChatInput from './components/ChatInput'
import VoiceChat from './components/VoiceChat'
import Sidebar, { ChatSession } from './components/Sidebar'
import { sendMessage } from './services/api'
import { Message } from './types'
import { translations, Lang } from './i18n/translations'
import './styles/App.css'

const STORAGE_KEY = 'jarvis-sessions'

const loadSessions = (): { sessions: ChatSession[], chats: Record<string, Message[]> } => {
    try {
        const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
        const sessions = (data.sessions || []).map((s: ChatSession) => ({ ...s, timestamp: new Date(s.timestamp) }))
        const chats: Record<string, Message[]> = {}
        for (const key in data.chats) {
            chats[key] = data.chats[key].map((m: Message) => ({ ...m, timestamp: new Date(m.timestamp) }))
        }
        return { sessions, chats }
    } catch { return { sessions: [], chats: {} } }
}

const saveSessions = (sessions: ChatSession[], chats: Record<string, Message[]>) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ sessions, chats }))
}

const App = () => {
    const [sessions, setSessions] = useState<ChatSession[]>([])
    const [chats, setChats] = useState<Record<string, Message[]>>({})
    const [activeId, setActiveId] = useState<string | null>(null)
    const [messages, setMessages] = useState<Message[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [isSpeaking, setIsSpeaking] = useState(false)
    const [showVoice, setShowVoice] = useState(false)
    const [showSidebar, setShowSidebar] = useState(false)
    const [lang, setLang] = useState<Lang>('ka')
    const endRef = useRef<HTMLDivElement>(null)
    const t = translations[lang]

    useEffect(() => {
        const data = loadSessions()
        setSessions(data.sessions)
        setChats(data.chats)
    }, [])

    useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages])

    useEffect(() => {
        if (activeId && messages.length > 0) {
            const newChats = { ...chats, [activeId]: messages }
            setChats(newChats)
            const newSessions = sessions.map(s =>
                s.id === activeId ? { ...s, preview: messages[messages.length - 1].content.substring(0, 60) } : s
            )
            setSessions(newSessions)
            saveSessions(newSessions, newChats)
        }
    }, [messages])

    const speakText = (text: string) => {
        if (!('speechSynthesis' in window)) return
        window.speechSynthesis.cancel()
        const u = new SpeechSynthesisUtterance(text)
        u.lang = lang === 'ka' ? 'ka-GE' : 'en-US'; u.rate = 0.95
        u.onstart = () => setIsSpeaking(true)
        u.onend = () => setIsSpeaking(false)
        u.onerror = () => setIsSpeaking(false)
        window.speechSynthesis.speak(u)
    }

    const stopSpeak = () => { window.speechSynthesis?.cancel(); setIsSpeaking(false) }

    const send = async (content: string) => {
        let currentId = activeId
        if (!currentId) {
            currentId = Date.now().toString()
            const newSession: ChatSession = {
                id: currentId,
                title: content.substring(0, 40),
                timestamp: new Date(),
                preview: content.substring(0, 60)
            }
            setSessions(prev => [newSession, ...prev])
            setActiveId(currentId)
        }

        const userMsg: Message = { id: Date.now().toString(), role: 'user', content, timestamp: new Date() }
        setMessages(prev => [...prev, userMsg]); setIsLoading(true)
        try {
            const d = await sendMessage(content)
            setMessages(prev => [...prev, { id: (Date.now()+1).toString(), role: 'assistant', content: d.reply, timestamp: new Date() }])
        } catch {
            setMessages(prev => [...prev, { id: (Date.now()+1).toString(), role: 'assistant', content: t.serverError, timestamp: new Date() }])
        } finally { setIsLoading(false) }
    }

    const newChat = () => {
        setActiveId(null)
        setMessages([])
        setShowSidebar(false)
    }

    const selectChat = (id: string) => {
        setActiveId(id)
        setMessages(chats[id] || [])
        setShowSidebar(false)
    }

    const deleteChat = (id: string) => {
        const newSessions = sessions.filter(s => s.id !== id)
        const newChats = { ...chats }
        delete newChats[id]
        setSessions(newSessions)
        setChats(newChats)
        saveSessions(newSessions, newChats)
        if (activeId === id) { setActiveId(null); setMessages([]) }
    }

    const back = () => { stopSpeak(); newChat() }

    return (
        <div className="app">
            <Sidebar
                sessions={sessions}
                activeId={activeId}
                onSelect={selectChat}
                onNew={newChat}
                onDelete={deleteChat}
                isOpen={showSidebar}
                onToggle={() => setShowSidebar(false)}
                t={t}
            />

            <header className="app-header">
                <div className="header-left">
                    <button className="menu-btn" onClick={() => setShowSidebar(!showSidebar)}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
                    </button>
                    {messages.length > 0 && (
                        <button className="back-btn" onClick={back}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5"/><path d="M12 19L5 12L12 5"/></svg>
                        </button>
                    )}
                    <div className="logo">
                        <span className="logo-mark">J</span>
                        <div className="logo-label"><h1>{t.title}</h1><span>{t.subtitle}</span></div>
                    </div>
                </div>
                <div className="header-right">
                    <button className="lang-btn" onClick={() => setLang(lang === 'ka' ? 'en' : 'ka')}>
                        {lang === 'ka' ? 'EN' : 'KA'}
                    </button>
                    <button className="voice-toggle" onClick={() => setShowVoice(true)}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/></svg>
                        <span>{t.dialogue}</span>
                    </button>
                    {isSpeaking && (
                        <button className="stop-btn" onClick={stopSpeak}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="6" width="12" height="12" rx="1"/></svg>
                        </button>
                    )}
                    <div className={`status-pill ${isLoading ? 'thinking' : isSpeaking ? 'speaking' : ''}`}>
                        <span className="dot"/><span className="label">{isLoading ? t.thinking : isSpeaking ? t.speaking : t.online}</span>
                    </div>
                </div>
            </header>

            <main className="chat-area">
                {messages.length === 0 ? (
                    <div className="welcome">
                        <div className="welcome-mark">J</div>
                        <h2>{t.welcome}</h2>
                        <p>{t.welcomeText}</p>
                        <div className="suggestions">
                            <button className="sug-card" onClick={() => send(t.sug1)}>
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
                                <span>{t.sug1}</span>
                            </button>
                            <button className="sug-card" onClick={() => send(t.sug2)}>
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 7V4h16v3"/><path d="M9 20h6"/><path d="M12 4v16"/></svg>
                                <span>{t.sug2}</span>
                            </button>
                            <button className="sug-card" onClick={() => send(t.sug3)}>
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
                                <span>{t.sug3}</span>
                            </button>
                            <button className="sug-card" onClick={() => send(t.sug4)}>
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
                                <span>{t.sug4}</span>
                            </button>
                        </div>
                        <button className="welcome-voice" onClick={() => setShowVoice(true)}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/></svg>
                            <span>{t.voiceStart}</span>
                        </button>
                    </div>
                ) : (
                    <div className="messages">
                        {messages.map(m => <ChatMessage key={m.id} message={m} onSpeak={speakText} isSpeaking={isSpeaking} t={t}/>)}
                        {isLoading && (
                            <div className="typing-row">
                                <div className="av av--bot" style={{width:28,height:28,borderRadius:'50%',border:'1px solid var(--accent)',background:'transparent',color:'var(--accent-bright)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:10,fontWeight:700,fontFamily:'var(--font-display)'}}>J</div>
                                <div className="thinking-text">{t.thinking}...</div>
                            </div>
                        )}
                        <div ref={endRef}/>
                    </div>
                )}
            </main>

            <ChatInput onSend={send} isLoading={isLoading} t={t}/>
            {showVoice && <VoiceChat onClose={() => setShowVoice(false)} t={t} lang={lang}/>}
        </div>
    )
}

export default App