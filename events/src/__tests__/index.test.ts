import { events } from '../index'

describe('utils/events', () => {
  const eventClick = 'click'
  const eventClickTop = 'click.top'
  const eventClickButton = 'click.button'
  const handleClick = jest.fn()
  const handleClick2 = jest.fn()
  const handleClickTop = jest.fn()
  const handleClickTop2 = jest.fn()
  const handleClickButton = jest.fn()
  beforeEach(() => {
    jest.clearAllMocks()
  })
  it('utils/events addListener/on/emit', () => {
    events.addListener(eventClick, handleClick)
    events.on(eventClickTop, handleClickTop)
    events.addListener(eventClickButton, handleClickButton)
    // emit click
    events.emit(eventClick, eventClick)
    expect(handleClick).toHaveBeenCalledWith(eventClick)
    expect(handleClickTop).toHaveBeenCalledWith(eventClick)
    expect(handleClickButton).toHaveBeenCalledWith(eventClick)
    // emit click.top
    events.emit(eventClickTop, eventClick, eventClick)
    expect(handleClick).toBeCalledTimes(1)
    expect(handleClickTop).toHaveBeenCalledWith(eventClick, eventClick)
    expect(handleClickTop).toBeCalledTimes(2)
    expect(handleClickButton).toBeCalledTimes(1)
    // recover click.top
    events.addListener(eventClickTop, handleClickTop2)
    events.emit(eventClick, eventClick)
    expect(handleClick).toBeCalledTimes(2)
    expect(handleClickTop2).toHaveBeenCalledWith(eventClick)
    expect(handleClickTop2).toBeCalledTimes(1)
    expect(handleClickTop).toBeCalledTimes(2)
    expect(handleClickButton).toBeCalledTimes(2)
    // recover click
    events.on(eventClick, handleClick2)
    events.emit(eventClick, eventClick)
    expect(handleClick).toBeCalledTimes(2)
    expect(handleClick2).toBeCalledTimes(1)
    expect(handleClickTop2).toBeCalledTimes(2)
    expect(handleClickTop).toBeCalledTimes(2)
    expect(handleClickButton).toBeCalledTimes(3)
  })

  it('utils/events removeListener/off/emit', () => {
    events.addListener(eventClick, handleClick)
    events.on(eventClickTop, handleClickTop)
    events.addListener(eventClickButton, handleClickButton)
    events.emit(eventClick, eventClick)
    expect(handleClick).toHaveBeenCalledWith(eventClick)
    expect(handleClickTop).toHaveBeenCalledWith(eventClick)
    expect(handleClickTop).toBeCalledTimes(1)
    expect(handleClickButton).toHaveBeenCalledWith(eventClick)
    // removeListener click.top
    events.removeListener(eventClickTop)
    events.emit(eventClick, eventClick)
    expect(handleClick).toBeCalledTimes(2)
    expect(handleClickTop).toBeCalledTimes(1)
    expect(handleClickButton).toBeCalledTimes(2)
    // off click
    events.off(eventClick)
    events.emit(eventClick, eventClick)
    expect(handleClick).toBeCalledTimes(2)
    expect(handleClickTop).toBeCalledTimes(1)
    expect(handleClickButton).toBeCalledTimes(2)
  })

  it('utils/events on/once/emit', () => {
    events.on(eventClick, handleClick)
    events.once(eventClickTop, handleClickTop)
    events.on(eventClickButton, handleClickButton)
    events.emit(eventClick, eventClick)
    expect(handleClick).toHaveBeenCalledWith(eventClick)
    expect(handleClickTop).toHaveBeenCalledWith(eventClick)
    expect(handleClickButton).toHaveBeenCalledWith(eventClick)
    expect(handleClickTop).toBeCalledTimes(1)
    events.emit(eventClick, eventClick)
    expect(handleClick).toBeCalledTimes(2)
    expect(handleClickTop).toBeCalledTimes(1)
    expect(handleClickButton).toBeCalledTimes(2)
    // recover once click
    // recover on click.top
    events.once(eventClick, handleClick2)
    events.on(eventClickTop, handleClickTop2)
    events.emit(eventClick, eventClick)
    expect(handleClick).toBeCalledTimes(2)
    expect(handleClick2).toBeCalledTimes(1)
    expect(handleClickTop).toBeCalledTimes(1)
    expect(handleClickTop2).toBeCalledTimes(1)
    expect(handleClickButton).toBeCalledTimes(3)
    events.emit(eventClick, eventClick)
    expect(handleClick).toBeCalledTimes(2)
    expect(handleClick2).toBeCalledTimes(1)
    expect(handleClickTop).toBeCalledTimes(1)
    expect(handleClickTop2).toBeCalledTimes(2)
    expect(handleClickButton).toBeCalledTimes(4)
  })
})
