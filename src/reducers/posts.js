import { FETCH_POSTS } from "../actions/index";
import _ from "lodash";
export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_POSTS:
      // console.log(action.payload.data); //[POST1,POST2]
      // // {4:POST}
      return _.mapKeys(action.payload.data, "id");
    default:
      return state;
  }
}
