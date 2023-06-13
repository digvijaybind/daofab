import React, {useState} from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import ParentData from "../data/Parent.json";
import {Button} from "@mui/material";

function createData(id, sender, receiver, totalAmount) {
  return {id, sender, receiver, totalAmount};
}

const rows = [
  createData("1", "ABC", "XYZ", 200),
  createData("2", "XYZ", "MNP", 100),
  createData("3", "XYZ", "MNP", 300),
  createData("4", "ABC", "MNP", 1000),
  createData("5", "ABC", "XYZ", 50),
];

export default function Parent1() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(1);
  const [orderBy, setOrderBy] = useState("id");
  const [order, setOrder] = useState("asc");

  const handleSortRequest = (id) => {
    const isAsc = orderBy === id && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(id);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <Paper sx={{width: "100%", overflow: "hidden"}}>
      <TableContainer sx={{maxHeight: 440}}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>id</TableCell>
              <TableCell>sender</TableCell>
              <TableCell>receiver</TableCell>
              <TableCell>totalAmount</TableCell>
            </TableRow>
            {emptyRows > 0 && (
              <TableRow style={{height: 53 * emptyRows}}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" key={row.id}>
                    {ParentData.data.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableRow key={value} align={column.align}>
                          <TableCell
                            active={orderBy === "id"}
                            direction={orderBy === "id" ? order : "asc"}
                            onClick={() => handleSortRequest("id")}
                          >
                            {column.id}
                          </TableCell>
                          <TableCell>{column.sender}</TableCell>
                          <TableCell>{column.receiver}</TableCell>
                          <TableCell>{column.totalAmount}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
          <Button></Button>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[2]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
