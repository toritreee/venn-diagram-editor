import { Group, SetType, TheSetCls } from ".";
export type parserBody = { name: string, isDifference: boolean }
export type parserData = { type: "intersection" | "union", body: parserBody}

export function objectParser(obj: parserData[]) {
  if (obj[1] === undefined) return {
    sets: obj[0]?[new TheSetCls(obj[0].body.name,obj[0].body.isDifference?"complement":"intersection")]:[]}
  const gp: Group = {
    sets: [ new TheSetCls(obj[0].body.name,obj[0].body.isDifference? "complement": obj[1].type ) ]
  }
  gp.sets = [...gp.sets, ...(obj.slice(1) as parserData[]).map(v => {
    return new TheSetCls(v.body.name,v.body.isDifference?"complement":v.type)
  })]
  console.log(gp)
  return gp
}
export function textParser(text: string) {
  //text = text.replaceAll(/\!\&|/,)
}