import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reducers from "./reducers";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import PostsIndex from "./components/posts-index";
import PostsNew from "./components/posts-new";
import PostsShow from "./components/posts-show";

import ReduxPromise from "redux-promise";

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <div>
        <Switch>
          {/* //TODO:most specific routes higher! */}
          <Route path="/posts/new" component={PostsNew} />
          <Route path="/posts/:id" component={PostsShow} />
          <Route path="/" component={PostsIndex} />
          {/* <Route path="/posts" component={PostsIndex} /> */}
          {/* bir üst satırdaki gibi olsaydı da yine react-router sorunlu çalışacaktı.
          slash'ı görünce direkt zaten eşleşti deyip ona göre çalışıyor */}
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>,
  document.querySelector(".container")
);
