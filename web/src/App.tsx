import {useDispatch, useSelector} from "react-redux";
import { AppDispatch, RootState } from "./redux/store.ts";
import {decrement, increment} from "./redux/counterSlice.ts";

function App() {
  const value = useSelector<RootState, number>((state) => state.counter.value)
  const dispatch: AppDispatch = useDispatch()

  const handleIncrement = () => {
    dispatch(increment())
  }

  function handleDecrement() {
    return dispatch(decrement());
  }

  return (
    <>
      <div>Count:{value}</div>
      <button onClick={handleIncrement}>Increment</button>
      <button onClick={handleDecrement}>Decrement</button>
    </>
  )
}

export default App
