import { useRef, useEffect } from "react"
import { Render, TheSetCls } from "."

export default function VennDiagram({width,height,render}: {width: number,height: number, render: Render}) {

  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    ref.current?.getContext("2d")?.clearRect(0, 0, width, height)
    ref.current?.getContext("2d")?.drawImage(render.canvas, 0, 0)
  }, [JSON.stringify(render)])
  return (
    <div>
      <canvas ref={ref} width={width} height={height}></canvas>
    </div>
  )
}