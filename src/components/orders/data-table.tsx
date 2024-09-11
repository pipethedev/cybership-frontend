"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { useState } from "react";
import { cn } from "../../libs/cn";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { OrderStatus } from "@/src/enum/order.enum";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const table = useReactTable({
    data: data,
    columns: columns,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      columnFilters,
      columnVisibility,
    },
  });

  return (
    <div className="my-8 relative">
      <div className="flex items-center py-2">
        <div className="space-x-2">
          <Button
            className="capitalize"
            variant={
              table.getColumn("status")?.getFilterValue() === undefined
                ? "default"
                : "outline"
            }
            onClick={() => table.getColumn("status")?.setFilterValue(undefined)}
          >
            All orders
          </Button>
          {Object.values(OrderStatus)
            .map((value) => ({ label: value, value }))
            .map((status) => {
              const isSelected =
                (table.getColumn("status")?.getFilterValue() as string) ===
                status?.value;
              return (
                <Button
                  key={status.value}
                  variant={!isSelected ? "outline" : "default"}
                  onClick={() => {
                    table.getColumn("status")?.setFilterValue(status?.value);
                  }}
                  className="capitalize"
                >
                  {status.label}
                </Button>
              );
            })}
        </div>
        <Input
          placeholder="Search for order by customer name & id "
          value={
            (table.getColumn("customer_name")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("customer_name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm ml-auto"
        />
      </div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              className="h-[45px] hover:bg-transparent"
              key={headerGroup.id}
            >
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody className="border-none">
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className="h-[40px] md:h-[45px] cursor-default"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className={cn("px-3 md:px-4 py-2")}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

export default DataTable;
