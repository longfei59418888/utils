import { FC } from 'react'

import { ViewExtendPropsWithPress } from '../hooks/useFlexPropsStyle'
import FlexBox from './flexBox'

export const Column: FC<ViewExtendPropsWithPress> = (props) => (
  <FlexBox {...props} />
)

export default Column
