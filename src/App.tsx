import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useSpring, useMotionValue } from 'framer-motion'

// Portfolio work items - graphic design pieces
const portfolioItems = [
  // Row 1
  { id: 1, x: 420, y: 50, w: 450, h: 380, rotate: 0, z: 10, bg: '#ffffff', content: 'typography' },
  { id: 2, x: 920, y: 30, w: 280, h: 250, rotate: 0, z: 11, bg: '#1a1a1a', content: 'poster-green' },
  { id: 3, x: 920, y: 320, w: 300, h: 280, rotate: 0, z: 12, bg: '#e8e8e8', content: 'script' },
  // Row 2
  { id: 4, x: 450, y: 480, w: 420, h: 350, rotate: 0, z: 13, bg: '#4a5d3e', content: 'organic' },
  { id: 5, x: 900, y: 550, w: 280, h: 320, rotate: 3, z: 14, bg: '#fce4ec', content: 'blocky' },
  // Row 3
  { id: 6, x: 420, y: 880, w: 380, h: 320, rotate: -2, z: 15, bg: '#fff8e1', content: 'collage' },
  { id: 7, x: 830, y: 900, w: 350, h: 350, rotate: 0, z: 16, bg: '#1a1a1a', content: 'neon' },
  // Row 4
  { id: 8, x: 450, y: 1250, w: 400, h: 300, rotate: 2, z: 17, bg: '#e3f2fd', content: 'minimal' },
  { id: 9, x: 880, y: 1280, w: 320, h: 280, rotate: -3, z: 18, bg: '#f3e5f5', content: 'abstract' },
  // Row 5
  { id: 10, x: 420, y: 1600, w: 450, h: 380, rotate: 0, z: 19, bg: '#ffffff', content: 'editorial' },
  { id: 11, x: 900, y: 1650, w: 300, h: 300, rotate: 4, z: 20, bg: '#ffebee', content: 'branding' },
]

// Custom Typography Art Component
function TypographyArt({ type }: { type: string }) {
  switch (type) {
    case 'typography':
      return (
        <div className="w-full h-full flex items-center justify-center p-8">
          <svg viewBox="0 0 400 300" className="w-full h-full">
            {/* Hope World style spiraling typography */}
            <text x="50" y="80" fontSize="48" fontFamily="serif" fontStyle="italic" fill="#1a1a1a">
              <tspan>H</tspan>
              <tspan dx="-5" dy="10">o</tspan>
              <tspan dx="-8" dy="-5">p</tspan>
              <tspan dx="-5" dy="8">e</tspan>
            </text>
            <path d="M180,60 Q220,30 260,60 T340,60" stroke="#1a1a1a" strokeWidth="3" fill="none" />
            <circle cx="200" cy="120" r="30" stroke="#1a1a1a" strokeWidth="2" fill="none" />
            <path d="M200,90 A30,30 0 1,1 200,150 A30,30 0 1,1 200,90" stroke="#1a1a1a" strokeWidth="2" fill="none" />
            <text x="100" y="200" fontSize="56" fontFamily="serif" fontStyle="italic" fill="#1a1a1a">World</text>
            <circle cx="320" cy="180" r="25" stroke="#1a1a1a" strokeWidth="2" fill="none" />
            <path d="M320,155 A25,25 0 1,1 320,205" stroke="#1a1a1a" strokeWidth="2" fill="none" />
          </svg>
        </div>
      )
    case 'poster-green':
      return (
        <div className="w-full h-full relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-600 to-green-900" />
          <div className="absolute inset-0" style={{
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,255,0,0.1) 10px, rgba(0,255,0,0.1) 20px)',
          }} />
          <div className="absolute bottom-4 right-4 text-white text-xs font-mono">CRACK</div>
        </div>
      )
    case 'script':
      return (
        <div className="w-full h-full flex items-center justify-center">
          <svg viewBox="0 0 200 150" className="w-3/4 h-3/4">
            <text x="20" y="90" fontSize="36" fontFamily="cursive" fill="#1a1a1a" style={{ fontStyle: 'italic' }}>
              Style
            </text>
            {/* Dotted decoration */}
            {[...Array(20)].map((_, i) => (
              <circle key={i} cx={30 + (i % 10) * 15} cy={110 + Math.floor(i / 10) * 15} r="2" fill="#1a1a1a" />
            ))}
          </svg>
        </div>
      )
    case 'organic':
      return (
        <div className="w-full h-full flex items-center justify-center p-8">
          <svg viewBox="0 0 300 200" className="w-full h-full">
            <path d="M50,100 Q80,50 120,80 T180,60 T240,100 T280,80" stroke="#d4c9a8" strokeWidth="4" fill="none" />
            <path d="M40,140 Q100,100 150,130 T250,120" stroke="#d4c9a8" strokeWidth="3" fill="none" />
            <text x="60" y="180" fontSize="24" fontFamily="serif" fill="#d4c9a8" opacity="0.8">organic</text>
          </svg>
        </div>
      )
    case 'blocky':
      return (
        <div className="w-full h-full flex items-center justify-center p-6">
          <div className="text-5xl font-black text-red-400" style={{ fontFamily: 'Impact, sans-serif', letterSpacing: '-0.05em' }}>
            JOY
          </div>
        </div>
      )
    case 'collage':
      return (
        <div className="w-full h-full relative overflow-hidden">
          <div className="absolute top-4 left-4 w-20 h-20 bg-orange-200 rounded-full" />
          <div className="absolute bottom-8 right-8 w-32 h-16 bg-blue-200 rotate-12" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl font-serif">collage</div>
        </div>
      )
    case 'neon':
      return (
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500">
            NEON
          </div>
        </div>
      )
    case 'minimal':
      return (
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-24 h-24 border-2 border-black rounded-full" />
        </div>
      )
    case 'abstract':
      return (
        <div className="w-full h-full relative overflow-hidden p-6">
          <div className="absolute top-6 left-6 w-16 h-16 border-4 border-purple-400 rounded-full" />
          <div className="absolute bottom-6 right-6 w-20 h-20 bg-purple-200" />
          <div className="absolute top-1/2 left-1/2 w-12 h-24 bg-purple-300 -rotate-45" />
        </div>
      )
    case 'editorial':
      return (
        <div className="w-full h-full flex flex-col items-center justify-center gap-4 p-8">
          <div className="text-6xl font-serif font-light tracking-widest">A</div>
          <div className="w-32 h-0.5 bg-black" />
          <div className="text-xs tracking-[0.3em] uppercase">Editorial</div>
        </div>
      )
    case 'branding':
      return (
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-3xl font-black tracking-tighter">BRAND</div>
        </div>
      )
    default:
      return <div className="w-full h-full bg-gray-200" />
  }
}

// Draggable Portfolio Card
function DraggableCard({ item }: { item: typeof portfolioItems[0] }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const [isDragging, setIsDragging] = useState(false)

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragElastic={0.1}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => setIsDragging(false)}
      style={{
        x,
        y,
        position: 'absolute',
        left: item.x,
        top: item.y,
        width: item.w,
        height: item.h,
        rotate: item.rotate,
        zIndex: isDragging ? 1000 : item.z,
        cursor: 'grab',
        backgroundColor: item.bg,
      }}
      whileDrag={{ cursor: 'grabbing', scale: 1.02, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}
      whileHover={{ scale: 1.01 }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6 }}
      className="select-none rounded-xl overflow-hidden shadow-lg"
    >
      <TypographyArt type={item.content} />
    </motion.div>
  )
}

// Sidebar Navigation
function Sidebar() {
  const [activeSection, setActiveSection] = useState('work')

  return (
    <motion.aside
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed left-0 top-0 h-screen w-[320px] bg-white z-[9999] flex flex-col items-center py-12 px-8 shadow-[4px_0_20px_rgba(0,0,0,0.05)]"
    >
      {/* Name / Logo */}
      <div className="mb-6 text-center">
        <h1 className="text-[42px] font-black leading-none tracking-tight">
          ANNA<br />MILLS
        </h1>
      </div>

      {/* Glitch/Pixel Text */}
      <div className="mb-8 text-center">
        <div className="text-[11px] font-mono tracking-widest text-black/70" style={{
          fontFamily: 'monospace',
          letterSpacing: '0.2em',
        }}>
          ▓▓ ▓▓▓▓ ▓▓▓ ▓▓▓ ▓▓<br />
          ▓ ▓▓▓▓▓▓▓<br />
          ▓▓ ▓▓▓ ▓▓▓ ▓▓▓<br />
          ▓▓▓ ▓▓▓▓▓▓ ▓
        </div>
      </div>

      {/* Vintage Photo */}
      <motion.div
        className="w-36 h-44 mb-8 overflow-hidden"
        whileHover={{ scale: 1.05 }}
      >
        <img
          src="https://images.unsplash.com/photo-1518756131217-31eb79b20e8f?w=300&h=400&fit=crop&q=80"
          alt="Vintage portrait"
          className="w-full h-full object-cover grayscale"
          style={{ filter: 'grayscale(100%) contrast(1.1)' }}
        />
      </motion.div>

      {/* Navigation - Horizontal */}
      <nav className="flex items-center gap-6 mb-6">
        {['ABOUT', 'WORK', 'CONTACT'].map((item) => (
          <motion.a
            key={item}
            href={`#${item.toLowerCase()}`}
            onClick={() => setActiveSection(item.toLowerCase())}
            className={`text-[11px] font-medium tracking-wider transition-colors ${
              activeSection === item.toLowerCase()
                ? 'text-black'
                : 'text-black/50 hover:text-black'
            }`}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            {item}
          </motion.a>
        ))}
      </nav>

      {/* Welcome Text */}
      <p className="text-[11px] text-black/70 text-center leading-relaxed max-w-[200px] mb-8">
        Welcome to my website! Do stick around. Scrolling is encouraged here, it makes things happen.
      </p>

      {/* Play Link */}
      <motion.a
        href="#play"
        className="text-[11px] font-medium tracking-wider text-black hover:text-black/60 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        PLAY!
      </motion.a>
    </motion.aside>
  )
}

// Back to Top Button
function BackToTop() {
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 500)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: showButton ? 1 : 0,
        scale: showButton ? 1 : 0.8,
        pointerEvents: showButton ? 'auto' : 'none'
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 w-10 h-10 bg-black/5 hover:bg-black/10 rounded-full flex items-center justify-center z-50 transition-colors"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M18 15l-6-6-6 6" />
      </svg>
    </motion.button>
  )
}

// Main App
function App() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  // Calculate content height based on items
  const maxY = Math.max(...portfolioItems.map(item => item.y + item.h))
  const contentHeight = maxY + 300

  return (
    <div className="min-h-screen bg-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <main
        ref={containerRef}
        className="ml-[320px] relative"
        style={{ height: contentHeight }}
      >
        {/* Progress Bar */}
        <motion.div
          className="fixed top-0 left-[320px] right-0 h-0.5 bg-black/20 z-40 origin-left"
          style={{ scaleX: smoothProgress }}
        />

        {/* Portfolio Items */}
        <div className="relative" style={{ width: '100%', height: contentHeight }}>
          {portfolioItems.map((item) => (
            <DraggableCard key={item.id} item={item} />
          ))}
        </div>
      </main>

      {/* Back to Top */}
      <BackToTop />
    </div>
  )
}

export default App
