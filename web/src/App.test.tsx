import App from "./App.tsx"
import { render, screen } from "@testing-library/react"
import { Provider, useDispatch } from "react-redux"
import userEvent from "@testing-library/user-event"
import counterSlice from "./redux/counterSlice.ts"
import { configureStore } from "@reduxjs/toolkit"
import { Mock, vi } from "vitest"

// useDispatchをモック化する
vi.mock("react-redux", async () => {
  const actual = await vi.importActual("react-redux")
  return {
    ...actual,
    useDispatch: vi.fn(),
  }
})

// 元の機能を維持したまま呼び出し状況だけを監視する。ちなみに.mockReturnValue()をつけてstub機能をつけることもできる。
const spyIncrement = vi.spyOn(counterSlice.actions, "increment")

function createStore() {
  return configureStore({
    reducer: {
      counter: counterSlice.reducer,
    },
  })
}

function renderApp(store: ReturnType<typeof configureStore>) {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  )
}

describe("App", () => {
  const spyDispatch = vi.fn()

  beforeEach(() => {
    (useDispatch as unknown as Mock).mockReset() //モックに関わる全ての設定や呼び出し履歴を消去する
  })

  describe("With real store", () => {
    it("Should render the initial count", () => {
      const store = createStore();
      (useDispatch as unknown as Mock).mockReturnValue(store.dispatch)

      renderApp(store)

      expect(screen.getByText(/Count:0/i)).toBeInTheDocument()
    })

    it("Should increment the count", async () => {
      const store = createStore();
      (useDispatch as unknown as Mock).mockReturnValue(store.dispatch)

      renderApp(store)

      await userEvent.click(screen.getByText("Increment"))

      expect(screen.getByText("Count:1")).toBeInTheDocument()
    })

    it("Should decrement the count", async () => {
      const store = createStore();
      (useDispatch as unknown as Mock).mockReturnValue(store.dispatch)

      renderApp(store)

      await userEvent.click(screen.getByText("Decrement"))

      expect(screen.getByText("Count:-1")).toBeInTheDocument()
    })
  })

  describe("App (With mocked dispatch)", () => {

    beforeEach(() => {
      (useDispatch as unknown as Mock).mockReturnValue(spyDispatch)
      spyDispatch.mockClear()
      spyIncrement.mockClear()
    })

    it("Should dispatch increment action when increment button is clicked", async () => {
      const store = createStore()
      renderApp(store)

      await userEvent.click(screen.getByText("Increment"))

      // dispatchが正しく呼ばれているか確認
      expect(spyDispatch).toHaveBeenCalledTimes(1)
      expect(spyDispatch).toHaveBeenCalledWith({ type: "counter/increment" })
      expect(spyDispatch).toHaveBeenCalledWith(counterSlice.actions.increment())

      // incrementアクション生成関数が呼ばれていることを確認
      expect(spyIncrement).toHaveBeenCalledTimes(1)
    })
  })
})