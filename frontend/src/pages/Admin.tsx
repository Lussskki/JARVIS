import { useState, useEffect } from 'react'
import { fetchStats } from '../services/api.js'
import '../styles/Admin.css'

const Admin = () => {
    const [stats, setStats] = useState<any>(null)
    const [days, setDays] = useState(30)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        fetchStats(days).then(data => { setStats(data); setLoading(false) }).catch(() => setLoading(false))
    }, [days])

    if (loading) return <div className="admin"><div className="admin-loading">LOADING DATA...</div></div>
    if (!stats) return <div className="admin"><div className="admin-loading">NO DATA</div></div>

    const sortedCountries = Object.entries(stats.byCountry).sort((a: any, b: any) => b[1] - a[1])
    const sortedBrowsers = Object.entries(stats.byBrowser).sort((a: any, b: any) => b[1] - a[1])
    const sortedDevices = Object.entries(stats.byDevice).sort((a: any, b: any) => b[1] - a[1])
    const sortedOS = Object.entries(stats.byOS).sort((a: any, b: any) => b[1] - a[1])
    const sortedDays = Object.entries(stats.byDay).sort((a: any, b: any) => a[0].localeCompare(b[0]))

    return (
        <div className="admin">
            <div className="admin-header">
                <div className="admin-title">
                    <span className="admin-logo">J</span>
                    <div>
                        <h1>J.A.R.V.I.S. ANALYTICS</h1>
                        <span>Visitor Dashboard</span>
                    </div>
                </div>
                <div className="admin-filters">
                    {[7, 14, 30, 90].map(d => (
                        <button key={d} className={`admin-filter ${days === d ? 'active' : ''}`} onClick={() => setDays(d)}>
                            {d}D
                        </button>
                    ))}
                </div>
            </div>

            <div className="admin-cards">
                <div className="admin-card">
                    <span className="card-label">TOTAL VISITS</span>
                    <span className="card-value">{stats.total}</span>
                </div>
                <div className="admin-card">
                    <span className="card-label">UNIQUE VISITORS</span>
                    <span className="card-value">{stats.uniqueIPs}</span>
                </div>
                <div className="admin-card">
                    <span className="card-label">TOP COUNTRY</span>
                    <span className="card-value">{sortedCountries[0]?.[0] || 'N/A'}</span>
                </div>
                <div className="admin-card">
                    <span className="card-label">TOP BROWSER</span>
                    <span className="card-value">{sortedBrowsers[0]?.[0] || 'N/A'}</span>
                </div>
            </div>

            <div className="admin-grid">
                <div className="admin-section">
                    <h3>DAILY VISITS</h3>
                    <div className="admin-chart">
                        {sortedDays.map(([day, count]: any) => (
                            <div key={day} className="chart-bar-wrap">
                                <div className="chart-bar" style={{ height: `${Math.max((count / stats.total) * 200, 4)}px` }}>
                                    <span className="chart-count">{count}</span>
                                </div>
                                <span className="chart-label">{day.slice(5)}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="admin-section">
                    <h3>COUNTRIES</h3>
                    <div className="admin-list">
                        {sortedCountries.map(([name, count]: any) => (
                            <div key={name} className="list-item">
                                <span>{name}</span>
                                <div className="list-bar-wrap">
                                    <div className="list-bar" style={{ width: `${(count / stats.total) * 100}%` }}/>
                                </div>
                                <span className="list-count">{count}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="admin-section">
                    <h3>BROWSERS</h3>
                    <div className="admin-list">
                        {sortedBrowsers.map(([name, count]: any) => (
                            <div key={name} className="list-item">
                                <span>{name}</span>
                                <div className="list-bar-wrap">
                                    <div className="list-bar" style={{ width: `${(count / stats.total) * 100}%` }}/>
                                </div>
                                <span className="list-count">{count}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="admin-section">
                    <h3>DEVICES</h3>
                    <div className="admin-list">
                        {sortedDevices.map(([name, count]: any) => (
                            <div key={name} className="list-item">
                                <span>{name}</span>
                                <div className="list-bar-wrap">
                                    <div className="list-bar" style={{ width: `${(count / stats.total) * 100}%` }}/>
                                </div>
                                <span className="list-count">{count}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="admin-section">
                    <h3>OS</h3>
                    <div className="admin-list">
                        {sortedOS.map(([name, count]: any) => (
                            <div key={name} className="list-item">
                                <span>{name}</span>
                                <div className="list-bar-wrap">
                                    <div className="list-bar" style={{ width: `${(count / stats.total) * 100}%` }}/>
                                </div>
                                <span className="list-count">{count}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="admin-section admin-recent">
                <h3>RECENT VISITORS</h3>
                <div className="admin-table">
                    <div className="table-head">
                        <span>TIME</span><span>COUNTRY</span><span>CITY</span><span>BROWSER</span><span>OS</span><span>DEVICE</span>
                    </div>
                    {stats.recent.map((v: any, i: number) => (
                        <div key={i} className="table-row">
                            <span>{new Date(v.timestamp).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                            <span>{v.country}</span>
                            <span>{v.city}</span>
                            <span>{v.browser}</span>
                            <span>{v.os}</span>
                            <span>{v.device}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Admin