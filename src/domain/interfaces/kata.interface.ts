export enum kataLevels {
  BASIC = 'BASIC',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH'
}

export interface IKata {
  name: string
  description: string
  levels: kataLevels
  tries: number
  stars: number
  creator: string // id of the user
  participants: string[]
  solution: string
}
