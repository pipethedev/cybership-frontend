import { columns } from "./columns";
import DataTable from "./data-table";
import useOrders from "../../hooks/use-orders";
import { FadeLoader } from "react-spinners";

const OrdersTable = () => {
  const { orders, isLoading } = useOrders();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <FadeLoader />
      </div>
    );
  }

  return (
    <div className="my-8 relative">
      <DataTable columns={columns} data={orders} />
    </div>
  );
};

export default OrdersTable;
