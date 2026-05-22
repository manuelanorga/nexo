import { useState, useRef, useEffect } from 'react'

export default function Tooltip({ text }) {
  const [visible, setVisible] = useState(false)
  const [position, setPosition] = useState('top')
  const ref = useRef(null)

  useEffect(() => {
    if (visible && ref.current) {
      const rect = ref.current.getBoundingClientRect()
      setPosition(rect.top < 120 ? 'bottom' : 'top')
    }
  }, [visible])

  return (
    <div ref={ref} style={{ position: 'relative', display: 'inline-flex' }}>
      <span
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        onClick={() => setVisible(!visible)}
        style={{
          width: '16px', height: '16px', borderRadius: '50%',
          background: visible ? '#0E4D92' : 'rgba(14,77,146,0.1)',
          color: visible ? '#fff' : '#6B8BAE',
          fontSize: '10px', fontWeight: 700, cursor: 'pointer',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0, userSelect: 'none', transition: 'all .15s'
        }}
      >i</span>

      {visible && (
        <div style={{
          position: 'absolute',
          ...(position === 'top'
            ? { bottom: '22px' }
            : { top: '22px' }
          ),
          left: '50%', transform: 'translateX(-50%)',
          zIndex: 999,
          background: '#0B1F3A', color: '#fff',
          fontSize: '11px', lineHeight: 1.6,
          padding: '10px 14px', borderRadius: '10px',
          width: '220px', textAlign: 'left',
          boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
          pointerEvents: 'none'
        }}>
          {text}
          <div style={{
            position: 'absolute',
            ...(position === 'top'
              ? { top: '100%', borderTop: '6px solid #0B1F3A', borderBottom: 'none' }
              : { bottom: '100%', borderBottom: '6px solid #0B1F3A', borderTop: 'none' }
            ),
            left: '50%', transform: 'translateX(-50%)',
            width: 0, height: 0,
            borderLeft: '6px solid transparent',
            borderRight: '6px solid transparent',
          }} />
        </div>
      )}
    </div>
  )
}
