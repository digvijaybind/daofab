import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";
import Paper from "@material-ui/core/Paper";
import {useSearchParams} from "react-router-dom";
import {Typography} from "@material-ui/core";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(id, parentId, paidAmount) {
  return {id, parentId, paidAmount};
}

const rows = [
  createData(1, 1, 10),
  createData(2, 1, 50),
  createData(3, 1, 40),
  createData(4, 2, 100),
  createData(5, 3, 10),
  createData(6, 3, 150),
  createData(7, 3, 100),
  createData(8, 4, 300),
  createData(9, 4, 300),
  createData(10, 4, 300),
  createData(11, 5, 10),
  createData(12, 5, 10),
  createData(13, 5, 10),
  createData(14, 5, 10),
  createData(15, 5, 10),
  createData(16, 6, 125),
];

export default function Child() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(2);
  const [searchParams, setSearchParams] = useSearchParams();
  const [rowList, setRowList] = useState([]);
  let rowId = searchParams.get("id");
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    let filterList = rows?.filter((data) => {
      if (rowId == data.id) {
        return data;
      }
    });
    setRowList(filterList);
  }, [rowId]);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rowList.length - page * rowsPerPage);

  return (
    <TableContainer component={Paper}>
      <Typography variant="h5" color="blue">
        Children table
      </Typography>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>id</TableCell>
            <TableCell align="right">parentId</TableCell>
            <TableCell align="right">paidAmount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rowList
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, index) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="right">{row.parentId}</TableCell>
                <TableCell align="right">{row.paidAmount}</TableCell>
              </TableRow>
            ))}
          {emptyRows > 0 && (
            <TableRow style={{height: 53 * emptyRows}}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
}
