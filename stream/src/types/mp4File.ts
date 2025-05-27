import { Tkhd, Trak } from './mp4'

export interface FragmentedTrack {
  id: Tkhd['track_id']
  user: any
  trak: Trak
  nextSample: number
  segmentStream: any
  nb_samples: number
  rapAlignement: boolean
}

export interface ExtractedTrack {
  id: Tkhd['track_id']
  user: any
  trak: Trak
  nextSample: number
  nb_samples: number
  samples: []
}


export interface ParsingMdat{
  size:number
  start:number
}
