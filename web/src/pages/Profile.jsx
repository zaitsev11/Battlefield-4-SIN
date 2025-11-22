import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'


const StatBox = ({ label, value, subtext, color = "text-white", size = "normal" }) => (
    <div className="flex flex-col justify-center h-full">
        <h3 className="text-bf4-orange/70 text-xs font-bold uppercase tracking-widest mb-1">{label}</h3>
        <p className={`${size === 'large' ? 'text-5xl' : 'text-3xl'} font-bold ${color} tracking-tighter`}>{value}</p>
        {subtext && <p className="text-gray-500 text-xs font-mono mt-1">{subtext}</p>}
    </div>
)

const WeaponCard = ({ weapon, index }) => (
    <div className="flex items-center gap-4 p-3 bg-black/20 border-b border-white/5 hover:bg-white/5 transition-colors">
        <div className="text-bf4-orange font-bold font-mono text-lg w-6">#{index + 1}</div>
        <div className="flex-1">
            <div className="font-bold text-white uppercase tracking-wider">{weapon.weaponName}</div>
            <div className="text-xs text-gray-400 font-mono">{weapon.kills.toLocaleString()} KILLS</div>
        </div>
        <div className="text-right">
            <div className="text-sm font-bold text-bf4-light">{weapon.accuracy}% ACC</div>
            <div className="w-24 h-1 bg-gray-800 mt-1">
                <div className="h-full bg-bf4-orange" style={{ width: `${Math.min(weapon.accuracy * 2, 100)}%` }}></div>
            </div>
        </div>
    </div>
)

const VehicleCard = ({ vehicle }) => (
    <div className="relative group overflow-hidden bg-black/40 border border-white/10 p-4 hover:border-bf4-orange/50 transition-all">
        <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity text-bf4-orange text-xs font-bold">
            VEHICLE
        </div>
        <h4 className="font-bold text-white uppercase mb-2">{vehicle.vehicleName}</h4>
        <div className="flex justify-between items-end">
            <div>
                <div className="text-2xl font-bold text-bf4-light">{vehicle.kills.toLocaleString()}</div>
                <div className="text-xs text-gray-500 font-mono">KILLS</div>
            </div>
            <div className="text-right">
                <div className="text-sm text-gray-400">{vehicle.timeIn}</div>
                <div className="text-xs text-gray-500 font-mono">TIME</div>
            </div>
        </div>
    </div>
)

const ClassCard = ({ classData }) => (
    <div className="bg-black/40 border border-white/10 p-4 hover:border-bf4-orange/30 transition-all">
        <div className="flex items-center justify-between mb-3">
            <h4 className="font-bold text-white uppercase text-sm">{classData.className}</h4>
            <div className="text-xs text-bf4-orange font-bold">{classData.serviceStarAmount} ⭐</div>
        </div>
        <div className="space-y-2">
            <div>
                <div className="text-xl font-bold text-bf4-light">{classData.score.toLocaleString()}</div>
                <div className="text-xs text-gray-500 font-mono">SCORE</div>
            </div>
            <div>
                <div className="text-sm text-gray-400">{classData.timePlayed}</div>
                <div className="text-xs text-gray-500 font-mono">TIME PLAYED</div>
            </div>
            <div className="w-full bg-gray-800 h-1 rounded-full overflow-hidden">
                <div className="h-full bg-bf4-orange" style={{ width: `${classData.serviceStarProgressAmount}%` }}></div>
            </div>
        </div>
    </div>
)

const ProgressCard = ({ label, current, total }) => {
    const percentage = (current / total) * 100
    return (
        <div className="bg-black/40 border border-white/10 p-4">
            <div className="flex justify-between items-center mb-2">
                <div className="text-xs text-gray-400 uppercase tracking-widest">{label}</div>
                <div className="text-sm font-bold text-white">{current}/{total}</div>
            </div>
            <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
                <div className="h-full bg-bf4-orange transition-all" style={{ width: `${percentage}%` }}></div>
            </div>
        </div>
    )
}

function Profile() {
    const { platform, name } = useParams()
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [showAllWeapons, setShowAllWeapons] = useState(false)
    const [history, setHistory] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch FULL data and history
                const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8001'
                const [fullResponse, historyResponse] = await Promise.all([
                    fetch(`${API_URL}/api/player/${platform}/${name}/full`),
                    fetch(`${API_URL}/api/player/${platform}/${name}/history`)
                ])

                if (!fullResponse.ok) throw new Error('Player not found')
                const result = await fullResponse.json()
                setData(result)

                // History might not exist for all players
                if (historyResponse.ok) {
                    const historyData = await historyResponse.json()
                    setHistory(historyData)
                }
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [platform, name])

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-bf4-dark relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/bg.jpg')] bg-cover bg-center opacity-20 blur-sm"></div>
            <div className="relative z-10 flex flex-col items-center">
                <div className="w-24 h-24 border-t-4 border-l-4 border-bf4-orange rounded-full animate-spin mb-6"></div>
                <div className="text-2xl font-bold text-white tracking-[0.5em] animate-pulse">LOADING DATA</div>
            </div>
        </div>
    )

    if (error) return (
        <div className="min-h-screen flex items-center justify-center bg-bf4-dark">
            <div className="text-center max-w-md p-8 border border-red-500/30 bg-red-900/20 backdrop-blur-md">
                <h2 className="text-red-500 text-3xl font-bold mb-4 tracking-tighter">CRITICAL ERROR</h2>
                <p className="text-gray-300 font-mono mb-8">{error}</p>
                <Link to="/" className="px-8 py-3 bg-red-600 hover:bg-red-500 text-white font-bold uppercase tracking-widest transition-colors">
                    ABORT MISSION
                </Link>
            </div>
        </div>
    )

    // Extract data sections
    const stats = data?.userName ? data : (data?.stats || {})
    const weapons = data?.weapons || []
    const vehicles = data?.vehicles || []

    // Sort weapons by kills
    const topWeapons = [...weapons].sort((a, b) => b.kills - a.kills).slice(0, 5)
    const topVehicles = [...vehicles].sort((a, b) => b.kills - a.kills).slice(0, 4)

    return (
        <div className="min-h-screen bg-bf4-dark text-white overflow-x-hidden">
            {/* Background Fixed */}
            <div className="fixed inset-0 bg-[url('/bg.jpg')] bg-cover bg-center opacity-10 pointer-events-none"></div>

            {/* Top Navigation Bar */}
            <div className="sticky top-0 z-50 bg-bf4-dark/90 backdrop-blur-md border-b border-white/10 px-6 py-4 flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <Link to="/" className="text-bf4-orange font-bold text-xl tracking-tighter hover:text-white transition-colors">
                        BF4 STATS
                    </Link>
                    <div className="h-6 w-px bg-white/20"></div>
                    <div className="text-sm font-mono text-gray-400 uppercase">
                        {platform} / {name}
                    </div>
                    <button
                        onClick={() => setShowAllWeapons(true)}
                        className="px-3 py-1 bg-bf4-orange/10 border border-bf4-orange/30 text-bf4-orange text-xs font-bold uppercase tracking-widest hover:bg-bf4-orange/20 transition-colors"
                    >
                        WEAPONS
                    </button>
                </div>
                <Link to="/" className="text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-bf4-orange transition-colors">
                    Change Soldier
                </Link>
            </div>

            <div className="max-w-7xl mx-auto p-6">
                {/* Hero Section */}
                <div className="flex flex-col md:flex-row gap-8 mb-8 animate-fadeIn">
                    {/* Soldier Card */}
                    <div className="w-full md:w-1/3 bg-gradient-to-b from-gray-900 to-black border border-white/10 p-1 relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-full h-1 bg-bf4-orange"></div>
                        <div className="relative z-10 bg-bf4-gray/50 h-full flex flex-col items-center p-8">
                            <img
                                src={stats.avatar}
                                alt={stats.userName}
                                className="w-48 h-48 border-4 border-bf4-dark shadow-2xl mb-6"
                            />
                            <h1 className="text-5xl font-bold text-white tracking-tighter mb-2 text-center">
                                {data?.platoon?.tag && <span className="text-bf4-orange">[{data.platoon.tag}] </span>}
                                {stats.userName}
                            </h1>
                            <div className="flex items-center gap-2 mb-4">
                                <span className="px-3 py-1 bg-bf4-orange text-black font-bold text-sm">RANK {stats.rank}</span>
                                {data?.platoon?.emblem && (
                                    <div className="px-2 py-1 bg-white/10">
                                        <img src={data.platoon.emblem} alt="Platoon Emblem" className="w-16 h-16" />
                                    </div>
                                )}
                            </div>

                            {/* Rank Progress Bar */}
                            {data?.currentRankProgress !== undefined && data?.totalRankProgress && (
                                <div className="w-full max-w-md mb-6">
                                    <div className="flex justify-between text-xs text-gray-400 mb-1">
                                        <span>Rank Progress</span>
                                        <span>{((data.currentRankProgress / data.totalRankProgress) * 100).toFixed(1)}%</span>
                                    </div>
                                    <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-bf4-orange to-yellow-500 transition-all"
                                            style={{ width: `${(data.currentRankProgress / data.totalRankProgress) * 100}%` }}
                                        ></div>
                                    </div>
                                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                                        <span>{data.currentRankProgress.toLocaleString()}</span>
                                        <span>{data.totalRankProgress.toLocaleString()}</span>
                                    </div>
                                </div>
                            )}

                            <div className="w-full grid grid-cols-2 gap-4 border-t border-white/10 pt-6">
                                <div className="text-center">
                                    <div className="text-xs text-gray-500 uppercase tracking-widest">Time Played</div>
                                    <div className="text-xl font-bold text-white">{Math.floor((stats.secondsPlayed || 0) / 3600).toLocaleString()}h</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-xs text-gray-500 uppercase tracking-widest">Score/Min</div>
                                    <div className="text-xl font-bold text-white">{stats.scorePerMinute?.toLocaleString()}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Stats Grid (Bento) */}
                    <div className="w-full md:w-2/3 grid grid-cols-2 md:grid-cols-3 gap-4">
                        {/* K/D - Big Block */}
                        <div className="col-span-2 bg-bf4-gray/40 border border-white/10 p-6 flex items-center justify-between relative group hover:border-bf4-orange/30 transition-colors">
                            <div className="absolute right-0 bottom-0 text-9xl font-bold text-white/5 pointer-events-none -mb-4 -mr-4">K/D</div>
                            <StatBox
                                label="Kill / Death Ratio"
                                value={stats.killDeath}
                                subtext={`${stats.kills.toLocaleString()} Kills / ${stats.deaths.toLocaleString()} Deaths`}
                                size="large"
                                color="text-bf4-orange"
                            />
                            <div className="hidden md:flex w-28 h-28 border-4 border-bf4-orange/20 rounded-full items-center justify-center mr-2">
                                <div className="text-lg font-bold text-bf4-orange">{stats.killDeath}</div>
                            </div>
                        </div>

                        {/* Accuracy */}
                        <div className="bg-bf4-gray/40 border border-white/10 p-6 hover:bg-white/5 transition-colors">
                            <StatBox
                                label="Accuracy"
                                value={stats.accuracy || "0.0%"}
                            />
                        </div>

                        {/* Wins */}
                        <div className="bg-bf4-gray/40 border border-white/10 p-6 hover:bg-white/5 transition-colors">
                            <StatBox label="Wins" value={(stats.wins || 0).toLocaleString()} subtext={`${((stats.wins || 0) / (stats.loses || 1)).toFixed(2)} W/L`} />
                        </div>

                        {/* Headshots */}
                        <div className="bg-bf4-gray/40 border border-white/10 p-6 hover:bg-white/5 transition-colors">
                            <StatBox label="Headshots" value={(stats.headshots || "0%")} />
                        </div>

                        {/* Longest HS */}
                        <div className="bg-bf4-gray/40 border border-white/10 p-6 hover:bg-white/5 transition-colors">
                            <StatBox label="Longest HS" value={`${stats.longestHeadShot || 0}m`} />
                        </div>

                        {/* Skill */}
                        <div className="bg-bf4-gray/40 border border-white/10 p-6 hover:bg-white/5 transition-colors">
                            <StatBox label="Skill" value={stats.skill || 0} />
                        </div>

                        {/* Kill Streak */}
                        <div className="bg-bf4-gray/40 border border-white/10 p-6 hover:bg-white/5 transition-colors">
                            <StatBox label="Kill Streak" value={stats.highestKillStreak || 0} />
                        </div>

                        {/* Quit Rate */}
                        <div className="bg-bf4-gray/40 border border-white/10 p-6 hover:bg-white/5 transition-colors">
                            <StatBox label="Quit Rate" value={stats.quits || "0%"} color="text-red-400" />
                        </div>

                        {/* Best Class */}
                        <div className="bg-bf4-gray/40 border border-white/10 p-6 hover:bg-white/5 transition-colors">
                            <StatBox label="Best Class" value={stats.bestClass || "N/A"} />
                        </div>
                    </div>
                </div>

                {/* Secondary Section: Weapons & Vehicles */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-slideIn" style={{ animationDelay: '0.2s' }}>

                    {/* Top Weapons */}
                    <div className="bg-bf4-gray/30 border border-white/10">
                        <div className="bg-white/5 p-4 border-b border-white/10 flex justify-between items-center">
                            <h3 className="text-xl font-bold text-white tracking-tighter flex items-center gap-2">
                                <span className="w-1 h-6 bg-bf4-orange"></span>
                                TOP WEAPONS
                            </h3>
                            <span className="text-xs font-mono text-gray-500">SORTED BY KILLS</span>
                        </div>
                        <div className="divide-y divide-white/5">
                            {topWeapons.map((w, i) => (
                                <WeaponCard key={i} weapon={w} index={i} />
                            ))}
                        </div>
                    </div>

                    {/* Top Vehicles */}
                    <div className="bg-bf4-gray/30 border border-white/10">
                        <div className="bg-white/5 p-4 border-b border-white/10 flex justify-between items-center">
                            <h3 className="text-xl font-bold text-white tracking-tighter flex items-center gap-2">
                                <span className="w-1 h-6 bg-bf4-orange"></span>
                                TOP VEHICLES
                            </h3>
                            <span className="text-xs font-mono text-gray-500">SORTED BY KILLS</span>
                        </div>
                        <div className="p-4 grid grid-cols-2 gap-4">
                            {topVehicles.map((v, i) => (
                                <VehicleCard key={i} vehicle={v} />
                            ))}
                        </div>
                    </div>

                </div>

                {/* Classes Section */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 animate-slideIn" style={{ animationDelay: '0.3s' }}>
                    <div className="md:col-span-4 bg-white/5 p-4 border-b border-white/10">
                        <h3 className="text-xl font-bold text-white tracking-tighter flex items-center gap-2">
                            <span className="w-1 h-6 bg-bf4-orange"></span>
                            CLASSES
                        </h3>
                    </div>
                    {(data?.classes || []).filter(c => c.className !== "Commander").map((c, i) => (
                        <ClassCard key={i} classData={c} />
                    ))}
                </div>

                {/* Combat & Support Stats */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-slideIn" style={{ animationDelay: '0.4s' }}>
                    {/* Combat Stats */}
                    <div className="bg-bf4-gray/30 border border-white/10">
                        <div className="bg-white/5 p-4 border-b border-white/10">
                            <h3 className="text-xl font-bold text-white tracking-tighter flex items-center gap-2">
                                <span className="w-1 h-6 bg-bf4-orange"></span>
                                COMBAT STATS
                            </h3>
                        </div>
                        <div className="p-6 grid grid-cols-2 gap-4">
                            <StatBox label="Avenger Kills" value={(stats.avengerKills || 0).toLocaleString()} size="normal" />
                            <StatBox label="Savior Kills" value={(stats.saviorKills || 0).toLocaleString()} size="normal" />
                            <StatBox label="Kill Assists" value={(stats.killAssists || 0).toLocaleString()} size="normal" />
                            <StatBox label="Win %" value={stats.winPercent || "0%"} size="normal" color="text-bf4-orange" />
                        </div>
                    </div>

                    {/* Support Stats */}
                    <div className="bg-bf4-gray/30 border border-white/10">
                        <div className="bg-white/5 p-4 border-b border-white/10">
                            <h3 className="text-xl font-bold text-white tracking-tighter flex items-center gap-2">
                                <span className="w-1 h-6 bg-bf4-orange"></span>
                                SUPPORT STATS
                            </h3>
                        </div>
                        <div className="p-6 grid grid-cols-2 gap-4">
                            <StatBox label="Heals" value={(stats.heals || 0).toLocaleString()} size="normal" />
                            <StatBox label="Revives" value={(stats.revives || 0).toLocaleString()} size="normal" />
                            <StatBox label="Repairs" value={(stats.repairs || 0).toLocaleString()} size="normal" />
                            <StatBox label="Resupplies" value={(stats.resupplies || 0).toLocaleString()} size="normal" />
                        </div>
                    </div>
                </div>

                {/* Progress / Achievements */}
                <div className="bg-bf4-gray/30 border border-white/10 animate-slideIn" style={{ animationDelay: '0.5s' }}>
                    <div className="bg-white/5 p-4 border-b border-white/10">
                        <h3 className="text-xl font-bold text-white tracking-tighter flex items-center gap-2">
                            <span className="w-1 h-6 bg-bf4-orange"></span>
                            PROGRESS & ACHIEVEMENTS
                        </h3>
                    </div>
                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {(data?.progress || []).map((p, i) => (
                            <ProgressCard key={i} label={p.progressName} current={p.current} total={p.total} />
                        ))}
                    </div>
                </div>

                {/* Gamemodes Section */}
                <div className="bg-bf4-gray/30 border border-white/10 animate-slideIn" style={{ animationDelay: '0.6s' }}>
                    <div className="bg-white/5 p-4 border-b border-white/10">
                        <h3 className="text-xl font-bold text-white tracking-tighter flex items-center gap-2">
                            <span className="w-1 h-6 bg-bf4-orange"></span>
                            GAMEMODES
                        </h3>
                    </div>
                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {(data?.gamemodes || [])
                            .filter(gm => gm.score > 0)
                            .sort((a, b) => b.score - a.score)
                            .map((gm, i) => {
                                const maxScore = Math.max(...(data?.gamemodes || []).map(g => g.score))
                                const percentage = (gm.score / maxScore) * 100
                                return (
                                    <div key={i} className="bg-black/40 border border-white/10 p-3">
                                        <div className="flex justify-between items-center mb-2">
                                            <div className="text-sm font-bold text-white uppercase">{gm.gamemodeName}</div>
                                            <div className="text-xs text-bf4-orange font-bold">{gm.score.toLocaleString()}</div>
                                        </div>
                                        <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-bf4-orange transition-all"
                                                style={{ width: `${percentage}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                )
                            })}
                    </div>
                </div>

                {/* Weapons Modal */}
                {showAllWeapons && (
                    <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-6">
                        <div className="w-full max-w-6xl max-h-[90vh] bg-bf4-dark border-2 border-bf4-orange/30 flex flex-col">
                            {/* Modal Header */}
                            <div className="bg-bf4-orange/10 border-b border-bf4-orange/30 p-6 flex justify-between items-center">
                                <div>
                                    <h2 className="text-3xl font-bold text-white tracking-tighter flex items-center gap-3">
                                        <span className="w-2 h-8 bg-bf4-orange"></span>
                                        ALL WEAPONS
                                    </h2>
                                    <p className="text-sm text-gray-400 font-mono mt-1">{weapons.length} weapons total</p>
                                </div>
                                <button
                                    onClick={() => setShowAllWeapons(false)}
                                    className="px-6 py-2 bg-red-600/20 border border-red-500/30 text-red-500 font-bold uppercase tracking-widest hover:bg-red-600/30 transition-colors"
                                >
                                    CLOSE
                                </button>
                            </div>

                            {/* Modal Content - Scrollable */}
                            <div className="flex-1 overflow-y-auto p-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {weapons.map((w, i) => (
                                        <WeaponCard key={i} weapon={w} index={i} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Profile
