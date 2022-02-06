import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSortBy, useTable, usePagination } from "react-table";
import Media from "react-media";
import { COLUMNS } from "./columns";
import { AiOutlineUp, AiOutlineDown } from "react-icons/ai";
import { nanoid } from "nanoid";
import {
  transactionsOperations,
  transactionsSelectors,
} from "../../redux/transactions";

import { HomeTabMobile } from "./HomeTabMobile";
import ModalAddTransaction from "../ModalAddTransaction";
import NoTransaction from "../NoTransaction";
import Loader from '../Loader'

import "./homeTab.scss";

const HomeTab = () => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useSelector(transactionsSelectors.getTransactions);
  const totalPages = useSelector(transactionsSelectors.getTotalPages);
  const isLoading = useSelector(transactionsSelectors.getIsLoading);

  const dispatch = useDispatch();
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state: { pageIndex, pageSize }, 
    pageCount,
    gotoPage,
    prepareRow,
    setPageSize,
  } = useTable(
    {
      columns,
      data,
      initialState: {pageIndex: 0, pageSize: 5},
      manualPagination: true,
      autoResetPage: false,
      pageCount: totalPages,
    },
    useSortBy,
    usePagination
  );

  useEffect(() => {
    dispatch(transactionsOperations.fetchTransactions({page: pageIndex + 1, limit: pageSize}));
  }, [dispatch, pageIndex, pageSize]);
  
  return ( isLoading ? <Loader /> : (
    <>
      {data.length > 0 ? (
        <>
          <Media
            queries={{
              mobile: "(min-width: 768px)",
            }}
          >
            {({ mobile }) => (
              <div className="HomeTab">
                {!mobile ? (
                  <HomeTabMobile />
                ) : (
                  <>
                  <table className="HomeTab-secondary" {...getTableProps()}>
                    <thead className="HomeTab__header">
                      {headerGroups.map((headerGroup) => (
                        <tr
                          key={() => {
                            nanoid();
                          }}
                          {...headerGroup.getHeaderGroupProps()}
                        >
                          {headerGroup.headers.map((column) => (
                            <th
                              key={() => {
                                nanoid();
                              }}
                              className="HomeTab-column-header"
                              {...column.getHeaderProps(
                                column.getSortByToggleProps()
                              )}
                            >
                              {column.render("Header")}
                              <span>
                                {column.isSorted ? (
                                  column.isSortedDesc ? (
                                    <AiOutlineDown />
                                  ) : (
                                    <AiOutlineUp />
                                  )
                                ) : (
                                  ""
                                )}
                              </span>
                            </th>
                          ))}
                        </tr>
                      ))}
                    </thead>

                    <tbody {...getTableBodyProps()}>
                      {page.map((row) => {
                        prepareRow(row);
                        return (
                          <tr
                            className="Home-color"
                            key={() => {
                              nanoid();
                            }}
                            {...row.getRowProps()}
                          >
                            {row.cells.map((cell) => {
                              return (
                                <td
                                  key={() => {
                                    nanoid();
                                  }}
                                  className={
                                    row.values.type === "+"
                                      ? `${"HomeTab-column"}  ${"green"}`
                                      : `${"HomeTab-column"}  ${"red"}`
                                  }
                                  {...cell.getCellProps()}
                                >
                                  {cell.render("Cell")}
                                </td>
                              );
                            })}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>

                  <div>
                    <span>
                      Page{' '}
                      <strong>
                        {pageIndex + 1} of {pageOptions.length}
                      </strong>{' '}
                    </span>
                    <span>
                      | Go to page: {' '}
                      <input type="number" defaultValue={pageIndex + 1} min="1" max={pageCount}
                      onChange={e => {
                        const pageNumber = e.target.value ? Number(e.target.value) -1 : 0;
                        gotoPage(pageNumber);
                      }}
                      style={{width: '50px'}} />
                    </span>
                    <select value={pageSize} onChange={e => setPageSize(Number(e.target.value))}>
                      {[5, 10, 15].map(pageSize => (<option key={pageSize} value={pageSize}>
                        Show {pageSize}
                        </option>))}
                      </select>
                    <button type="button" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>{'<<'}</button>
                    <button type="button" onClick={() => previousPage()} disabled={!canPreviousPage}>Previous</button>{' '}
                    <button type="button" onClick={() => nextPage()} disabled={!canNextPage}>Next</button>
                    <button type="button" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>{'>>'}</button>
                  </div>
                  </>
                )}
                
              

              
              </div>
            )}
          </Media>
        </>
      ) : (
        <NoTransaction />
      )}
      <ModalAddTransaction />{" "}
    </>
  ));
};

export default HomeTab;
