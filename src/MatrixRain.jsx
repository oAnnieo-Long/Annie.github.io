import { useEffect, useRef } from 'react'

const HEAD_COLORS = ['#44aa44', '#44aaaa', '#4444aa', '#aa4444']
const BODY_COLORS = ['#008844', '#0066aa', '#004488', '#880022']
const FONT_SIZE = 14

function createColumn(height) {
  const length = 3 + Math.floor(Math.random() * 35)
  return {
    y: -Math.random() * height * 2,
    speed: 0.3 + Math.random() * 0.6,
    length,
    chars: Array.from({ length }, () => String(Math.floor(Math.random() * 10))),
    lastUpdate: 0,
    updateInterval: 50 + Math.random() * 100,
  }
}

export default function MatrixRain() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    if (!canvas || !context) {
      return undefined
    }

    let columns = []
    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      const count = Math.floor(canvas.width / FONT_SIZE) + 5
      columns = Array.from({ length: count }, () => createColumn(canvas.height))
    }

    resize()

    let frameId = 0
    const draw = (time) => {
      context.fillStyle = 'rgba(10, 10, 10, 0.08)'
      context.fillRect(0, 0, canvas.width, canvas.height)
      context.font = `${FONT_SIZE}px "JetBrains Mono", monospace`
      context.textAlign = 'center'

      columns.forEach((column, index) => {
        const x = index * FONT_SIZE + FONT_SIZE / 2
        if (time - column.lastUpdate > column.updateInterval) {
          column.chars = column.chars.map((char, charIndex) =>
            charIndex === column.length - 1 || Math.random() < 0.1
              ? String(Math.floor(Math.random() * 10))
              : char,
          )
          column.lastUpdate = time
        }

        column.chars.forEach((char, charIndex) => {
          const y = column.y - (column.length - 1 - charIndex) * FONT_SIZE
          if (y < -FONT_SIZE || y > canvas.height + FONT_SIZE) {
            return
          }
          const isHead = charIndex === column.length - 1
          const palette = Math.floor((time / 1000 + index * 0.1) % 4)
          const color = isHead ? HEAD_COLORS[palette] : BODY_COLORS[palette]
          context.shadowBlur = isHead ? 8 : 0
          context.shadowColor = color
          context.fillStyle = color
          context.globalAlpha = isHead ? 0.4 : 0.08 + (charIndex / column.length) * 0.12
          context.fillText(char, x, y)
        })

        context.globalAlpha = 1
        context.shadowBlur = 0
        column.y += column.speed
        if (column.y - column.length * FONT_SIZE > canvas.height) {
          const next = createColumn(canvas.height)
          next.y = -Math.random() * 200
          columns[index] = next
        }
      })

      frameId = window.requestAnimationFrame(draw)
    }

    frameId = window.requestAnimationFrame(draw)
    window.addEventListener('resize', resize)
    return () => {
      window.cancelAnimationFrame(frameId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="matrix-canvas" aria-hidden="true" />
}
