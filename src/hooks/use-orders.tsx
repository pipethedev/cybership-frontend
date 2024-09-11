'use client';

import useSWR from 'swr';
import request from '../lib/request';
import { orders as ordersMock } from "../libs/mock";
import { OrderQueryOptions, OrderResponseType } from '../types';

const useOrders = (options: OrderQueryOptions = { page: 1, size: 30 }) => {
  const { data, error, isLoading } = useSWR<OrderResponseType>(
    `/orders?page=${options.page}&size=${options.size}${options.status ? `&status=${options.status}` : ''}`,
    request.fetch,
    { keepPreviousData: true },
  );

  return {
    orders: data?.data?.orders || ordersMock,
    metadata: data?.data?.metadata,
    isLoading,
    error,
  };
};
export default useOrders;
