import { FC } from 'react'

import { ViewExtendPropsWithPress } from '../hooks/useFlexPropsStyle'
import FlexBox from './flexBox'

export const Row: FC<ViewExtendPropsWithPress> = (props) => (
  <FlexBox defaultStyle={{ flexDirection: 'row' }} {...props} />
)

export default Row
