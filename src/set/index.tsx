export interface Element { }
export type SetType = "intersection" | "union" | "complement"

export interface TheSet {
  elements: Element[]
  name: string
  getType: () => SetType
  getCanvasOutline: (size: number) => HTMLCanvasElement
  getCanvasFill: (size: number) => { cv: HTMLCanvasElement, type: SetType }
}

export interface Group {
  sets: TheSet[]
}

export class TheSetCls implements TheSet {
  elements = []
  constructor(public name: string, private type: SetType) { }
  getCanvasOutline(size: number) {
    const canvas = document.createElement("canvas")
    canvas.width = size
    canvas.height = size
    const ctx = canvas.getContext("2d") || (() => { throw new Error("Unknown error") })()
    ctx.strokeStyle = "black"
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.arc(size / 2, size / 2, size / 2, 0 * Math.PI / 180, 360 * Math.PI / 180, false);
    ctx.stroke()
    ctx.textAlign = "center"
    ctx.font = "10px serif"
    ctx.fillText(this.name, size / 2, 10)
    return canvas
  }

  getCanvasFill(size: number) {
    const canvas = document.createElement("canvas")
    canvas.width = size
    canvas.height = size
    const ctx = canvas.getContext("2d") || (() => { throw new Error("Unknown error") })()
    ctx.beginPath()
    ctx.arc(size / 2, size / 2, size / 2, 0 * Math.PI / 180, 360 * Math.PI / 180, false);
    ctx.fillStyle = "red"
    ctx.fill()
    return {
      cv: canvas,
      type: this.type
    }
  }

  getType() {
    return this.type
  }
}
// r = x * pi /180
export class Render {
  canvas: HTMLCanvasElement
  constructor(private group: Group) {
    const canvas = document.createElement("canvas")
    canvas.width = 500
    canvas.height = 500
    const ctx = canvas.getContext("2d") || (() => { throw new Error("Unknown error") })()
    ctx.fillStyle = "red"
    ctx.fillRect(0, 0, 500, 500);
    const sets:TheSet[] = [
      ...group.sets.filter(v => v.getType() == "intersection"),
      ...group.sets.filter(v => v.getType() == "union"),
      ...group.sets.filter(v => v.getType() == "complement")
    ]
    
    sets.forEach((v, i) => {
      const image = v.getCanvasFill(250)
      const r = 360 / group.sets.length * i * Math.PI / 180
      ctx.globalCompositeOperation = image.type == "intersection"
        ? "source-in"
        : image.type == "union"
          ? "source-over"
          : "destination-out"
      ctx.drawImage(image.cv, Math.sin(r) * 100 + 250 - 125, Math.cos(r) * 100 + 250 - 125)
    })


    ctx.globalCompositeOperation = "source-over"
    sets.forEach((v,i)=>{
      const image = v.getCanvasOutline(250)
      const r = 360 / group.sets.length * i * Math.PI / 180
      ctx.drawImage(image, Math.sin(r) * 100 + 250 - 125, Math.cos(r) * 100 + 250 - 125)
    })
    this.canvas = canvas
  }
}

