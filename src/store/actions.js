import { Add_To_Cart, Add_Count } from "./mutation-types"

export default {
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      const oldProduct = context.state.cartList.find(item => item.iid === payload.iid);
      if (oldProduct) {
        context.commit(Add_Count, oldProduct);
        resolve('购物车商品数量+1!');
      } else {
        context.commit(Add_To_Cart, payload);
        resolve('添加购物车成功!');
      }

    })
  }
}