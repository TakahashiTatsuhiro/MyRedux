import {Mock, vi} from "vitest"
import {Provider, useDispatch} from "react-redux";
import {render, screen} from "@testing-library/react";
import {store} from "./redux/store.ts";
import App from "./App.tsx";
import userEvent from "@testing-library/user-event";
import counterSlice from "./redux/counterSlice.ts";

// dispatchなどのreact-reduxの一部の機能は{configurable: false}が設定されており再定義できない
// つまり直接モックすることが出来ない
// react-reduxのモジュール全体をコピーして新しいオブジェクトに置き換えるとその制約が外れる

vi.mock("react-redux", async () => {
  const actual = await vi.importActual("react-redux")
  return {
    ...actual,
    useDispatch: vi.fn()
  }
})

describe('App_成功事例', () => {
  const spyDispatch: Mock = vi.fn()

  const spyIncrement = vi.spyOn(counterSlice.actions, "increment")
  const spyDecrement = vi.spyOn(counterSlice.actions, "decrement")
  // 上記のspyOnの書き方なら元の機能を維持したまま呼び出し状況だけを監視する
  // ちなみに.mockReturnValue()をつけてstub機能をつけることもできるが今回は出来なかった。(制約が厳しい？)
  // 今回は spyIncrementとspyDecrementの呼び出しをテストしようとしたが上手くいかなかった
  // モックしたdispatchの中で呼ばれるので、呼び出しが上手く検知できないらしい

  beforeEach(() => {
    (useDispatch as unknown as Mock).mockReturnValue(spyDispatch)
    spyDispatch.mockClear()
    spyIncrement.mockClear()
    spyDecrement.mockClear()
  })


  it('Should dispatch in increment action', async () => {
    const expectedAction = counterSlice.actions.increment()

    render(
      <Provider store={store}>
        <App />
      </Provider>
    )

    await userEvent.click(screen.getByText('Increment'))

    expect(spyDispatch).toHaveBeenCalledWith(expectedAction)
  })

  it('Should dispatch in decrement action', async () => {
    const expectedAction = counterSlice.actions.decrement()
    render(
      <Provider store={store}>
        <App />
      </Provider>
    )

    await userEvent.click(screen.getByText('Decrement'))

    expect(spyDispatch).toHaveBeenCalledWith(expectedAction)
  })
})