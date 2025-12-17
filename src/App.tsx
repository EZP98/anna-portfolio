import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useSpring, useMotionValue } from 'framer-motion'

// Portfolio work items - scattered layout like annamills.xyz
const portfolioItems = [
  // Hero cluster - top area (x starts at 40 for padding from sidebar edge)
  { id: 1, x: 40, y: 50, w: 320, h: 240, rotate: -2, z: 10, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=450&fit=crop' },
  { id: 2, x: 380, y: 80, w: 280, h: 380, rotate: 3, z: 12, image: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=500&h=700&fit=crop' },
  { id: 3, x: 680, y: 40, w: 350, h: 260, rotate: -1, z: 11, image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&h=450&fit=crop' },

  // Second row - overlapping
  { id: 4, x: 40, y: 320, w: 260, h: 340, rotate: 2, z: 13, image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=450&h=600&fit=crop' },
  { id: 5, x: 320, y: 480, w: 380, h: 280, rotate: -3, z: 15, image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=700&h=500&fit=crop' },
  { id: 6, x: 720, y: 350, w: 300, h: 400, rotate: 1, z: 14, image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=500&h=700&fit=crop' },

  // Third row
  { id: 7, x: 60, y: 700, w: 340, h: 250, rotate: -2, z: 16, image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&h=450&fit=crop' },
  { id: 8, x: 420, y: 780, w: 280, h: 360, rotate: 4, z: 18, image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=450&h=600&fit=crop' },
  { id: 9, x: 720, y: 760, w: 320, h: 240, rotate: -1, z: 17, image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=600&h=450&fit=crop' },

  // Fourth row
  { id: 10, x: 40, y: 1000, w: 300, h: 380, rotate: 3, z: 19, image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&h=650&fit=crop' },
  { id: 11, x: 360, y: 1100, w: 360, h: 270, rotate: -2, z: 20, image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=650&h=500&fit=crop' },
  { id: 12, x: 740, y: 1050, w: 280, h: 350, rotate: 2, z: 21, image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=450&h=600&fit=crop' },

  // Fifth row
  { id: 13, x: 80, y: 1400, w: 320, h: 240, rotate: -3, z: 22, image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&h=450&fit=crop' },
  { id: 14, x: 420, y: 1420, w: 300, h: 380, rotate: 1, z: 24, image: 'https://images.unsplash.com/photo-1485968579169-19d4acb56a00?w=500&h=650&fit=crop' },
  { id: 15, x: 740, y: 1380, w: 280, h: 300, rotate: -2, z: 23, image: 'https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?w=500&h=550&fit=crop' },
]

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
      }}
      whileDrag={{ cursor: 'grabbing', scale: 1.02, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}
      whileHover={{ scale: 1.01 }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6 }}
      className="select-none rounded-[11px] overflow-hidden shadow-lg"
    >
      <img
        src={item.image}
        alt={`Portfolio item ${item.id}`}
        className="w-full h-full object-cover"
        draggable={false}
      />
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
        className="ml-[320px] relative pl-10 pt-6"
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
