export interface Cart {
  _id?: string;
  name?: string;
  dept?: string;
  price?: number;
  pic?: string;
  idc?: string;
  
}

export interface CartLocalStorage {
  items?: CartItem[];
}

export interface CartItem {
  productId? : string;
  quantity?: number;
}

export interface CartItemDetail {
  product?: any;
  quantity?: number;
  itemId?: string;
  name?: string;
  dept?: string;
  price?: number;
  pic?: string;
}

export interface ItemLocalStorage {
  userId?: string;
  cartList?: any;
  _id?: string;
}

// ? stands for optional
// good to put as it will not create unnecessary errors.