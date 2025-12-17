import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useSpring, useMotionValue } from 'framer-motion'

// Portfolio work items - dynamic scattered layout with overlaps and clusters
// x values are relative to paddingLeft (340px from left edge)
// Negative x values will appear under the sidebar
const portfolioItems = [
  // Items extending under sidebar (negative x)
  { id: 1, x: -280, y: 80, w: 200, h: 260, rotate: -4, z: 5, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400' },
  { id: 2, x: -240, y: 400, w: 180, h: 220, rotate: 6, z: 6, image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400' },
  { id: 3, x: -260, y: 700, w: 190, h: 240, rotate: -3, z: 7, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400' },

  // Hero cluster - right of sidebar
  { id: 4, x: 30, y: 20, w: 200, h: 200, rotate: -8, z: 10, image: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=400' },
  { id: 5, x: 200, y: 60, w: 170, h: 220, rotate: 5, z: 14, image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400' },
  { id: 6, x: 340, y: 30, w: 190, h: 180, rotate: -3, z: 12, image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=400' },
  { id: 7, x: 500, y: 80, w: 160, h: 200, rotate: 7, z: 13, image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400' },

  // Second cluster - scattered with overlaps
  { id: 8, x: 60, y: 280, w: 180, h: 240, rotate: 10, z: 16, image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400' },
  { id: 9, x: 220, y: 340, w: 220, h: 180, rotate: -6, z: 18, image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400' },
  { id: 10, x: 410, y: 300, w: 200, h: 260, rotate: 4, z: 17, image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400' },
  { id: 11, x: 580, y: 260, w: 170, h: 220, rotate: -8, z: 15, image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400' },

  // Third cluster - larger images
  { id: 12, x: 40, y: 560, w: 280, h: 280, rotate: -2, z: 20, image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=500' },
  { id: 13, x: 300, y: 600, w: 260, h: 260, rotate: 3, z: 21, image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500' },
  { id: 14, x: 540, y: 540, w: 270, h: 270, rotate: -4, z: 22, image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500' },

  // Fourth cluster - stacked cards effect
  { id: 15, x: 120, y: 900, w: 150, h: 200, rotate: 12, z: 25, image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400' },
  { id: 16, x: 180, y: 920, w: 150, h: 200, rotate: 6, z: 26, image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=400' },
  { id: 17, x: 240, y: 940, w: 150, h: 200, rotate: -3, z: 27, image: 'https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?w=400' },
  { id: 18, x: 300, y: 960, w: 150, h: 200, rotate: -9, z: 28, image: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400' },

  // Fifth cluster - scattered
  { id: 19, x: 500, y: 880, w: 200, h: 250, rotate: 5, z: 23, image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400' },
  { id: 20, x: 680, y: 920, w: 180, h: 220, rotate: -7, z: 24, image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400' },

  // Bottom section - large feature images
  { id: 21, x: 80, y: 1200, w: 300, h: 300, rotate: 0, z: 29, image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=500' },
  { id: 22, x: 360, y: 1220, w: 280, h: 280, rotate: -2, z: 30, image: 'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=500' },
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
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        height: '100vh',
        width: '320px',
        zIndex: 99999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 40px',
      }}
    >
      {/* Name / Logo */}
      <div className="text-center">
        <h1 className="text-[42px] font-black leading-none tracking-tight">
          ANNA<br />MILLS
        </h1>
      </div>

      {/* Spacer */}
      <div className="h-8" />

      {/* Animated Canvas */}
      <motion.div
        className="w-28 h-28 rounded-xl overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #fce4ec 0%, #e8eaf6 50%, #e3f2fd 100%)',
        }}
      >
        <motion.div
          className="w-full h-full flex items-center justify-center"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        >
          <motion.div
            className="w-12 h-12 rounded-full"
            style={{
              background: 'linear-gradient(45deg, #f8bbd9 0%, #b39ddb 100%)',
              opacity: 0.6,
            }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </motion.div>

      {/* Spacer */}
      <div className="h-6" />

      {/* Glitch/Pixel Text */}
      <div className="text-center">
        <div className="text-[10px] font-mono tracking-widest text-black/60" style={{
          fontFamily: 'monospace',
          letterSpacing: '0.15em',
        }}>
          ▓▓ ▓▓▓▓ ▓▓▓<br />
          ▓ ▓▓▓▓▓▓▓<br />
          ▓▓ ▓▓▓ ▓▓▓
        </div>
      </div>

      {/* Spacer */}
      <div className="h-6" />

      {/* Vintage Photo */}
      <motion.div
        className="w-32 h-40 overflow-hidden rounded-lg"
        whileHover={{ scale: 1.05 }}
      >
        <img
          src="https://images.unsplash.com/photo-1518756131217-31eb79b20e8f?w=300&h=400&fit=crop&q=80"
          alt="Vintage portrait"
          className="w-full h-full object-cover"
          style={{ filter: 'grayscale(100%) contrast(1.1)' }}
        />
      </motion.div>

      {/* Spacer */}
      <div className="h-8" />

      {/* Navigation - Horizontal */}
      <nav className="flex items-center gap-6">
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

      {/* Spacer */}
      <div className="h-4" />

      {/* Welcome Text */}
      <p className="text-[11px] text-black/70 text-center leading-relaxed max-w-[200px]">
        Welcome to my website! Do stick around. Scrolling is encouraged here, it makes things happen.
      </p>

      {/* Spacer */}
      <div className="h-4" />

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
        style={{
          position: 'relative',
          minHeight: '100vh',
          overflowX: 'hidden',
        }}
      >
        {/* Progress Bar */}
        <motion.div
          className="fixed top-0 h-0.5 bg-black/20 origin-left"
          style={{ left: '320px', right: 0, scaleX: smoothProgress, zIndex: 40 }}
        />

        {/* Portfolio Items Container */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: contentHeight,
            paddingTop: '40px',
            paddingRight: '40px',
            paddingBottom: '40px',
            paddingLeft: '340px', // 320px sidebar + 20px gap
          }}
        >
          {portfolioItems.map((item) => (
            <DraggableCard key={item.id} item={item} />
          ))}
        </div>

        {/* Footer */}
        <footer
          style={{
            padding: '60px 40px',
            textAlign: 'center',
            borderTop: '1px solid rgba(0,0,0,0.05)',
          }}
        >
          <p style={{ fontSize: '11px', color: 'rgba(0,0,0,0.4)' }}>
            © 2025 Anna Mills. All rights reserved.
          </p>
        </footer>
      </main>

      {/* Back to Top */}
      <BackToTop />
    </div>
  )
}

export default App
