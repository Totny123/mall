import { Add_To_Cart, Add_Count } from "./mutation-types"

export default {
  [Add_Count](state, payload) {
    payload.count++;
  },
  [Add_To_Cart](state, payload) {
    payload.checked = true;
    payload.count = 1;
    state.cartList.push(payload);
  }
}