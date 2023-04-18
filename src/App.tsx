import { useEffect, useRef, useState } from 'react'
import { Render, TheSetCls } from './set'
import VennDiagram from './set/render'
import { objectParser, parserBody, parserData } from './set/parser'

function App() {
  const [d, setD] = useState<parserData[]>([
    { type: "intersection", body: { name: "A", isDifference: false } }
  ])
  console.log(d)
  return <div>

    <VennDiagram width={500} height={500} render={new Render(objectParser(d))} />
    <ul>
      {
        d.map((v, i) => <>
          {i != 0
            ?<li onClick={() => setD(a => {
              a[i].type = a[i].type == "intersection" ? "union" : "intersection"
              return a
            })}>
              {v.type == "intersection" ? "⋂" : "⋃"}
            </li>
            :undefined
          }
          <li
            style={({ textDecoration: v.body.isDifference ? "overline" : "none" })}>
            <input type="text" onChange={(e) => setD(a => {
              a[i].body.name = e.target.value
              return a
            })} />
            <button onClick={() => setD(a => {
              console.log("a")
              a[i].body.isDifference = !a[i].body.isDifference
              return a
            })}>!</button>
          </li>

        </>
        )
      }
      <li>
        <button onClick={() => setD(a => [...a, { type: "intersection", body: { name: "B", isDifference: false } }])}>追加</button>
      </li>
    </ul>
  </div>
}

export default App
