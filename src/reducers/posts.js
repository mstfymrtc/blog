import { FETCH_POSTS, FETCH_POST, DELETE_POST } from "../actions/index";
import _ from "lodash";
export default function(state = {}, action) {
  switch (action.type) {
    case DELETE_POST:
      return _.omit(state, action.payload);
    // omit: look at the state object, if the state object has the key 'id',
    // delete that object.
    case FETCH_POST:
      /*ES5 ES5 ES5 ES5 ES5 ES5 ES5 ES5 ES5 ES5 ES5 */
      // const post = action.payload.data;
      // const newState = { ...state };
      // newState[post.id] = post;
      // return newState;
      /*ES5 ES5 ES5 ES5 ES5 ES5 ES5 ES5 ES5 ES5 ES5 */

      /*ES6 ES6 ES6 ES6 ES6 ES6 ES6 ES6 ES6 ES6 ES6 */
      return { ...state, [action.payload.data.id]: action.payload.data };
    /*ES6 ES6 ES6 ES6 ES6 ES6 ES6 ES6 ES6 ES6 ES6 */

    //TODO: 1
    //eğer indexten postshow'a giderse, elinde zaten state var olacak, yeni açtığı sayfadaki id
    //ilee fetch yapacak ve varolan state'de overwrite yazacak(aynı id li olana)

    //TODO: 2
    //eğer direkt postshow'u açarsa, o id ile olanı çekip state'e kaydedecek.
    case FETCH_POSTS:
      // console.log(action.payload.data); //[POST1,POST2]
      // // {4:POST1,5:POST2}
      return _.mapKeys(action.payload.data, "id");
    default:
      return state;
  }
}
