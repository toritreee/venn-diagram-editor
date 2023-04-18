import { useEffect, useRef, useState } from 'react'
import { Render, TheSetCls } from './set'

function App() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    ref.current?.getContext("2d")?.drawImage(new Render(
      {
        sets: [
          new TheSetCls("A","none"),
        ]
      }
    ).canvas,0,0)
  }, [ref])
  return (
    <div>
      <canvas ref={ref} width={500} height={500}></canvas>
    </div>
  )
}

export default App
