import { format } from "date-fns";

export const COLUMNS = [
  {
    Header: "Дата",
    accessor: "date",
    disableFilters: true,
    sticky: "centre",
    Cell: ({value}) => format(new Date(value), 'dd.MM.yy'),
  },
  {
    Header: "Тип",
    accessor: "type",
    sticky: "centre",
  },
  {
    Header: "Категория",
    accessor: "category",
    sticky: "centre",
  },
  {
    Header: "Коментарий",

    accessor: "comment",
  },
  {
    Header: "Сумма",
    accessor: "amount",
    sticky: "right",
  },
  {
    Header: "Баланс",
    accessor: "balance",
  },
];
