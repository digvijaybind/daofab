import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";
import Paper from "@material-ui/core/Paper";
import {Button} from "@mui/material";
import {Link} from "react-router-dom";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(id, sender, receiver, totalAmount) {
  return {id, sender, receiver, totalAmount};
}

const rows = [
  createData(1, "ABC", "XYZ", 200),
  createData(2, "XYZ", "MNP", 100),
  createData(3, "XYZ", "MNP", 300),
  createData(4, "ABC", "MNP", 1000),
  createData(5, "XYZ", "ABC", 200),
  createData(1, "ABC", "XYZ", 50),
  createData(1, "MNP", "PQRS", 200),
  createData(7, "ABC", "PQRS", 200),
];

export default function Parent() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(2);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>id</TableCell>
            <TableCell align="right">sender</TableCell>
            <TableCell align="right">receiver</TableCell>
            <TableCell align="right">totalAmount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, index) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="right">{row.sender}</TableCell>
                <TableCell align="right">{row.receiver}</TableCell>
                <TableCell align="right">
                  <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    to={`/child?id=${row.id}`}
                  >
                    {row.totalAmount}{" "}
                  </Button>
                </TableCell>
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
