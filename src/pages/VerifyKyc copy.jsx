import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { Typography, Button, TextField } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import RefreshIcon from "@material-ui/icons/Refresh";
import Delete from "@material-ui/icons/Delete";

import { Link } from "react-router-dom";

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
  wrapper: {
    display: "flex",
  },
  fieldWrapper: {
    marginLeft: 20,
    width: "100%",
  },
  input: {
    width: "90%",
  },
  radio: {
    float: "left",
    marginRight: 20,
    marginTop: 25,
  },
  canvas: {
    border: "1px solid #ddd",
    marginTop: 7,
  },
});

const KycList = () => {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [id, setId] = useState("");
  const [value, setValue] = useState("");

  const initCanvas = () => {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    const boxes = [
      {
        left: 157,
        top: 107,
        width: 160,
        height: 35,
        text: "Monir",
        conf: 28,
        bgColor: "red",
        id: "1",
      },
      {
        left: 157,
        top: 207,
        width: 160,
        height: 35,
        text: "Ahammed",
        conf: 28,
        bgColor: "pink",
        id: "1",
      },
      {
        left: 321,
        top: 119,
        width: 26,
        height: 23,
        text: "01-02-2021",
        conf: 49,
        bgColor: "green",
        id: "2",
      },
      {
        left: 404,
        top: 113,
        width: 43,
        height: 30,
        text: "01919446558",
        conf: 88,
        bgColor: "blue",
        id: "3",
      },
    ];

    // draw circles
    boxes.forEach((box) => {
      ctx.fillStyle = box.bgColor;
      ctx.fillRect(box.left, box.top, box.width, box.height);
      ctx.fillText(box.text, box.left, box.top, box.width, box.height);
    });

    canvas.addEventListener("click", (e) => {
      var rect = canvas.getBoundingClientRect();
      const mousePoint = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
      console.log("click on circle: " + mousePoint.x, mousePoint.y);
      boxes.forEach((box) => {

        
        if (isIntersect(mousePoint, box)) {
          if (value) {
            setValue(value + " " + box.text);
          } else {
            setValue(box.text);
          }
          console.log("pre", value, "now", box.text);
        }
      });
    });
    // var img = new Image();
    // img.onload = function () {
    // canvas.width = img.width;
    // canvas.height = img.height;
    //   ctx.drawImage(img, 0, 0);
    // };
    // img.src =
    //   "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMXp7sEViTSmJ29IEas0dGTz3RrBRUD8opCg&usqp=CAU";
  };

  const isIntersect = (point, box) => {
    if (
      point.x < box.left ||
      point.x > box.left + box.width ||
      point.y < box.top ||
      point.y > box.top + box.height
    ) {
      return false;
    } else {
      return true;
    }
  };

  const handleType = (e) => {
    let fieldType = e.target.value;

    if (fieldType === "name") {
      setName(value);
    } else if (fieldType === "dob") {
      setDob(value);
    } else if (fieldType === "id") {
      setId(value);
    }

    setValue("");
  };

  const handleClearValue = () => {
    setValue("");
  };
  const handleClearAll = () => {
    setValue("");
    setName("");
    setDob("");
    setId("");
    var ele = document.getElementsByName("type");
    for (var i = 0; i < ele.length; i++) ele[i].checked = false;
  };

  useEffect(() => {
    initCanvas();
  }, [value]);

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
                <Link to="/verify-kyc" className={classes.link}>
                  Verify KYC
                </Link>
              </Button>
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
            <Typography variant="h4">KYC Varify</Typography>
          </div>

          <div className={classes.wrapper}>
            <div>
              {value ? (
                <div style={{ float: "right", height: 0 }}>
                  <Button
                    onClick={handleClearValue}
                    variant="outlined"
                    color="secondary"
                    startIcon={<RefreshIcon />}
                    style={{ marginTop: 10, marginRight: 10 }}
                  >
                    Clear
                  </Button>
                </div>
              ) : null}
              {(name || dob || id) && !value ? (
                <div style={{ float: "right", height: 0 }}>
                  <Button
                    onClick={handleClearAll}
                    variant="outlined"
                    color="secondary"
                    startIcon={<Delete />}
                    style={{ marginTop: 10, marginRight: 10 }}
                  >
                    Clear All
                  </Button>
                </div>
              ) : null}
              {value ? (
                <Alert severity="success">
                  <AlertTitle>Clicked on </AlertTitle>
                  <strong>{value}</strong>
                </Alert>
              ) : (
                <Alert severity="warning">
                  <AlertTitle>Please </AlertTitle>
                  Click on image where text
                </Alert>
              )}
              <canvas
                id="canvas"
                width="700"
                height="500"
                className={classes.canvas}
              ></canvas>
            </div>
            <div className={classes.fieldWrapper}>
              <input
                type="radio"
                name="type"
                value="name"
                onChange={handleType}
                className={classes.radio}
              />
              <TextField className={classes.input} label="Name" value={name} />
              <br />
              <input
                type="radio"
                name="type"
                value="dob"
                onChange={handleType}
                className={classes.radio}
              />

              <TextField className={classes.input} label="Dob" value={dob} />
              <br />
              <input
                type="radio"
                name="type"
                value="id"
                onChange={handleType}
                className={classes.radio}
              />

              <TextField className={classes.input} label="ID" value={id} />
            </div>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default KycList;
