import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {
    const [name, setName] = useState('')
    const [platform, setPlatform] = useState('pc')
    const navigate = useNavigate()

    const handleSearch = (e) => {
        e.preventDefault()
        if (name) {
            navigate(`/player/${platform}/${name}`)
        }
    }

    return (
        <div className="fixed inset-0 w-full h-full bg-bf4-dark overflow-hidden flex items-center justify-center font-sans">
            {/* Background Image with Parallax-like feel */}
            <div className="absolute inset-0 bg-[url('/bg.jpg')] bg-cover bg-center opacity-40 scale-105"></div>

            {/* Scanline & Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/80 pointer-events-none"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)] pointer-events-none"></div>

            {/* Main Content Container */}
            <div className="relative z-10 w-full max-w-2xl px-6">

                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-7xl md:text-8xl font-bold text-white tracking-tighter mb-2 glitch-text" data-text="BATTLEFIELD 4">
                        BATTLEFIELD 4
                    </h1>
                    <div className="flex items-center justify-center gap-4">
                        <div className="h-px w-12 bg-bf4-orange"></div>
                        <p className="text-bf4-orange font-mono text-sm tracking-[0.4em] uppercase">Stats Intelligence Network</p>
                        <div className="h-px w-12 bg-bf4-orange"></div>
                    </div>
                </div>

                {/* Search Box */}
                <div className="bg-bf4-gray/90 backdrop-blur-xl border border-white/10 p-8 shadow-2xl relative group">
                    {/* Decorative Corners */}
                    <div className="absolute -top-1 -left-1 w-6 h-6 border-t-4 border-l-4 border-bf4-orange"></div>
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-4 border-r-4 border-bf4-orange"></div>

                    <form onSubmit={handleSearch} className="space-y-8">

                        {/* Input Field */}
                        <div className="relative">
                            <label className="block text-xs font-bold text-gray-400 uppercase mb-2 tracking-widest">Soldier Nick</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full bg-black/50 border-b-2 border-gray-600 focus:border-bf4-orange text-white text-2xl p-4 outline-none transition-all font-mono placeholder-gray-700 focus:bg-black/70"
                            />
                            <div className="absolute right-0 bottom-4 text-bf4-orange/50 text-xs font-mono">REQUIRED</div>
                        </div>

                        {/* Platform Select */}
                        <div>
                            <label className="block text-xs font-bold text-gray-400 uppercase mb-3 tracking-widest">Platform</label>
                            <div className="grid grid-cols-3 gap-4">
                                {['pc', 'ps4', 'xboxone'].map((p) => (
                                    <button
                                        key={p}
                                        type="button"
                                        onClick={() => setPlatform(p)}
                                        className={`relative py-4 text-sm font-bold uppercase tracking-wider transition-all duration-200 overflow-hidden group/btn ${platform === p
                                            ? 'text-black'
                                            : 'text-gray-400 hover:text-white bg-black/30'
                                            }`}
                                    >
                                        {/* Active Background */}
                                        <div className={`absolute inset-0 bg-bf4-orange transition-transform duration-200 ${platform === p ? 'translate-y-0' : 'translate-y-full'}`}></div>

                                        {/* Content */}
                                        <span className="relative z-10">{p}</span>

                                        {/* Border for inactive */}
                                        {platform !== p && <div className="absolute inset-0 border border-white/10 group-hover/btn:border-white/30"></div>}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full relative group overflow-hidden bg-transparent py-5 mt-4"
                        >
                            <div className="absolute inset-0 w-full h-full bg-bf4-orange/10 group-hover:bg-bf4-orange/20 transition-colors border border-bf4-orange/50"></div>
                            <div className="absolute inset-0 w-1 bg-bf4-orange group-hover:w-full transition-all duration-300 ease-out opacity-20"></div>

                            <div className="relative flex items-center justify-center gap-3">
                                <span className="text-bf4-orange font-bold text-lg tracking-[0.2em] uppercase group-hover:text-white transition-colors">Initialize Link</span>
                                <div className="w-2 h-2 bg-bf4-orange rotate-45 group-hover:bg-white transition-colors"></div>
                            </div>
                        </button>
                    </form>
                </div>

                {/* Footer Status */}
                <div className="mt-8 flex justify-between items-center text-xs font-mono text-gray-500 border-t border-white/10 pt-4">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span>SYSTEM ONLINE</span>
                    </div>
                    <div>SECURE CONNECTION ESTABLISHED</div>
                </div>
            </div>
        </div>
    )
}

export default Home
