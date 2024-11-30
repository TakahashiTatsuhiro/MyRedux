import App from "./App.tsx"
import { render, screen } from "@testing-library/react"
import { Provider} from "react-redux"
import userEvent from "@testing-library/user-event"
import counterSlice from "./redux/counterSlice.ts"
import { configureStore } from "@reduxjs/toolkit"

function renderApp() {
  const store = configureStore({
    reducer: {
      counter: counterSlice.reducer,
    },
  })
  render(
    <Provider store={store}>
      <App />
    </Provider>
  )
}

describe("App", () => {
  it("Should render the initial count", () => {
    renderApp()

    expect(screen.getByText(/Count:0/i)).toBeInTheDocument()
  })

  it("Should increment the count", async () => {
    renderApp()

    await userEvent.click(screen.getByText("Increment"))

    expect(screen.getByText("Count:1")).toBeInTheDocument()
  })

  it("Should decrement the count", async () => {
    renderApp()

    await userEvent.click(screen.getByText("Decrement"))

    expect(screen.getByText("Count:-1")).toBeInTheDocument()
  })
})