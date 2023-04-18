import { useEffect, useRef, useState } from 'react'
import { Render, TheSetCls } from './set'

function App() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    ref.current?.getContext("2d") ?.clearRect(0,0,500,500)
    ref.current?.getContext("2d")?.drawImage(new Render(
      {
        sets: [
          new TheSetCls("A", "intersection"),
          new TheSetCls("B", "intersection"),
          new TheSetCls("C", "union"),
          new TheSetCls("D", "complement"),
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
