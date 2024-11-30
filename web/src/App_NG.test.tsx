import {vi} from "vitest";
import {render, screen} from "@testing-library/react";
import * as redux from 'react-redux'
import {Provider} from "react-redux";
import {store} from "./redux/store.ts";
import App from "./App.tsx";
import userEvent from "@testing-library/user-event";

// このテストは失敗する
// dispatchなどのreact-reduxの一部の機能は{configurable: false}が設定されており再定義できない
// つまり直接モックすることが出来ない
// react-reduxのモジュール全体をコピーして新しいオブジェクトに置き換えるとその制約が外れる

describe('App_失敗事例', () => {
  it('Should dispatch in increment action', async () => {
    // これは失敗するよ
    const spyDispatch = vi.fn()
    vi.spyOn(redux, "useDispatch").mockReturnValue(spyDispatch)

    render(
      <Provider store={store}>
        <App />
      </Provider>
    )

    await userEvent.click(screen.getByText('Increment'))

    expect(spyDispatch).toHaveBeenCalled()
  })
})