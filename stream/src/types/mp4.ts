/** track header 信息 */
export interface Tkhd {
  track_id: number
}

/** track 轨道数据 */
export interface Trak {
  tkhd: Tkhd
}

/** 容器元数据 */
export interface Moov {
  traks: Trak[]
}
