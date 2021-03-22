import React, { useState, useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { Typography, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import axios from "axios";
import Skeleton from "@material-ui/lab/Skeleton";
import TablePagination from "@material-ui/core/TablePagination";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#666",
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  root: {
    margin: "60px 0",
  },
  link: {
    textDecoration: "none",
    color: "#fff",
  },
  navigation: {
    float: "right",
  },
  button: {
    marginLeft: 10,
  },
  top: {
    margin: " 0  0  15px 0",
  },
  pagination: {
    marginTop: 10,
    float: "right",
  },
});

const KycList = () => {
  const classes = useStyles();
  const [kyc, setKyc] = useState([]);
  const [loading, setLoading] = useState(false);

  const getKyc = async () => {
    setLoading(true);
    let response = await axios({
      url: "/kycdocuments/",
      method: "get",
    });
    // axios.get('/kycdocuments/').then((response) => {
    //   setKyc(response.data.data);
    // })
    console.log("data", response.data.data);
    setKyc(response.data.data);
    setLoading(false);
  };

  useEffect(() => {
    getKyc();
  }, []);

  return (
    <Container maxWidth="lg">
      <Grid container className={classes.root}>
        <Grid item md={12}>
          <div className={classes.top}>
            <div className={classes.navigation}>
              <Button
                variant="contained"
                size="small"
                color="primary"
                className={classes.button}
              >
                <Link to="/create-kyc" className={classes.link}>
                  Create KYC
                </Link>
              </Button>
              <Button
                variant="contained"
                size="small"
                color="primary"
                className={classes.button}
              >
                <Link to="/" className={classes.link}>
                  Back to Home
                </Link>
              </Button>
            </div>
            <Typography variant="h4">KYC list</Typography>
          </div>

          <TableContainer component={Paper}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <StyledTableCell>selfie</StyledTableCell>
                  <StyledTableCell>document</StyledTableCell>
                  <StyledTableCell>document type</StyledTableCell>
                  <StyledTableCell>Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {kyc.map((row) => (
                  <StyledTableRow key={row.id}>
                    <StyledTableCell>
                      <img src={row.selfie} width="100" alt="" />
                    </StyledTableCell>
                    <StyledTableCell>
                      {" "}
                      <img src={row.document} width="100" alt="" />{" "}
                    </StyledTableCell>
                    <StyledTableCell>{row.document_type}</StyledTableCell>
                    <StyledTableCell>
                      
                      {row.is_verified ? (
                        <Button
                          variant="outlined"
                          color="primary"
                          size="small"
                          startIcon={<CheckCircleIcon />}
                        >
                          Varified
                        </Button>
                      ) : (
                        <Link to={`/verify-kyc/${row.id}`}>
                          <Button
                            variant="outlined"
                            size="small"
                            color="secondary"
                          >
                            Varify now
                          </Button>
                        </Link>
                      )}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <div className={classes.pagination}></div>

          {loading ? (
            <div>
              <Table style={{ marginBottom: 10 }}>
                <tr>
                  <td>
                    <Skeleton variant="text" height={200} />
                  </td>
                </tr>
                <tr>
                  <td>
                    <Skeleton variant="text" height={200} />
                  </td>
                </tr>
                <tr>
                  <td>
                    <Skeleton variant="text" height={200} />
                  </td>
                </tr>
                <tr>
                  <td>
                    <Skeleton variant="text" height={200} />
                  </td>
                </tr>
              </Table>
            </div>
          ) : null}
        </Grid>
      </Grid>
    </Container>
  );
};

export default KycList;
