import {useDispatch, useSelector} from "react-redux";
import { AppDispatch, RootState } from "./store.ts";
import {decrement, increment} from "./counterSlice.ts";

function App() {
  const value = useSelector<RootState, number>((state) => state.counter.value);
  const dispatch: AppDispatch = useDispatch();

  return (
    <>
      <div>Count:{value}</div>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
    </>
  )
}

export default App
