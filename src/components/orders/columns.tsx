import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Badge } from "../ui/badge";
import { Checkbox } from "../ui/checkbox";
import { OrderType } from "@/src/types";

export const columns: ColumnDef<OrderType>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    header: () => <h4 className="text-left">Order</h4>,
    accessorKey: "id",
    cell: ({ row }) => {
      const orderId: string = row.getValue("id");
      const orderUpdatedAt: string = format(
        row.original.updated_at,
        "MMM dd, yy h:mma"
      );

      return (
        <div className="space-y-1">
          <p className="font-medium">Order ID: {orderId}</p>
          <p>Updated - {orderUpdatedAt}</p>
        </div>
      );
    },
  },
  {
    header: () => <h4 className="text-left">Customer</h4>,
    accessorKey: "customer_name",
  },
  {
    header: () => <h4 className="text-left">Created</h4>,
    accessorKey: "created_at",
    cell: ({ row }) => {
      const orderCreatedAt: string = format(
        row.getValue("created_at"),
        "MMM dd, yy h:mma"
      );

      return <p className="font-medium">{orderCreatedAt}</p>;
    },
  },
  {
    header: () => <h4 className="text-left">Status</h4>,
    accessorKey: "status",
    cell: ({ row }) => {
      const orderStatus: string = row.getValue("status");

      return (
        <Badge
          variant={
            orderStatus.toLowerCase() as "pending" | "cancelled" | "completed"
          }
        >
          {orderStatus}
        </Badge>
      );
    },
  },
];
