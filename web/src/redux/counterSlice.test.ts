import counterSlice, {decrement, increment} from "./counterSlice.ts";

describe('counterSlice', () => {
  const INITIAL_STATE = { value: 0 }

  it('should return the initial state', () => {
    const initialState = counterSlice.getInitialState()
    expect(initialState).toEqual(INITIAL_STATE)
  })

  it('should increment', () => {
    const state = counterSlice.reducer(INITIAL_STATE, increment())
    expect(state).toEqual({value: 1})
  })

  it('should decrement', () => {
    const state = counterSlice.reducer(INITIAL_STATE, decrement())
    expect(state).toEqual({value: -1})
  })
})