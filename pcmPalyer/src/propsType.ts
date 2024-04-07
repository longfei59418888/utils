export interface FrameData {
  audio?: AudioContext
  totalTime?: number
}

export interface PcmPlayerOptions {
  encoding: '8bitInt' | '16bitInt' | '32bitInt' | '32bitFloat'
  channels: number
  sampleRate: number
  autoStart?: boolean
  flushingTime: number
  endTimeout?: number
  requestFrame?: (data: FrameData) => void
  endFrame?: (data: FrameData) => void
  startFrame?: (data: FrameData) => void
}
