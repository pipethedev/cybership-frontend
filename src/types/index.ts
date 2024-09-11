import { OrderStatus } from "../enum/order.enum";


export type OrderQueryOptions = {
  page?: number;
  size?: number;
  status?: OrderStatus;
}

export type OrderType = {
  status: OrderStatus;
  id: string;
  customer_name: string;
  created_at: string;
  updated_at: string;
}

export type OrderPagination = {
  currentPage: number;
  hasNextPage: boolean;
  totalPages: number;
  hasPreviousPage: boolean;
}

export type OrderResponseType = {
  data: {
      orders?: OrderType[];
      metadata?: OrderPagination;
  };
  message: string;
  success: boolean;
}