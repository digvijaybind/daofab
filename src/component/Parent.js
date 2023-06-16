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
import {Box, Button} from "@mui/material";
import {Link} from "react-router-dom";
import {Typography} from "@material-ui/core";

const useStyles = makeStyles({
  table: {
    margin: "auto",
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
  createData(6, "ABC", "XYZ", 50),
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

  const numAscending = [...rows].sort((a, b) => a.id - b.id);

  return (
    <TableContainer component={Paper}>
      <Typography variant="h5" color="blue">
        Parent table
      </Typography>
      <Table aria-label="simple table" className={classes.table}>
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
      <Box
        component="div"
        flexGrow={1}
        justifyContent="center"
        alignItems="baseline"
      >
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => numAscending}
        >
          sort by Parent id{" "}
        </Button>
      </Box>
    </TableContainer>
  );
}
