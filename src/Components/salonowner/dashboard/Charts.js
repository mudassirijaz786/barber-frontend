//importing
import React from "react";
import { Line, Pie } from "react-chartjs-2";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import PropTypes from "prop-types";
import { withStyles, Typography, LinearProgress } from "@material-ui/core";
import Select from "@material-ui/core/Select";
import axios from "axios";

//styling
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

//Loading Indicator
const ColorLinearProgress = withStyles({
  colorPrimary: {
    backgroundColor: "#b2dfdb",
  },
  barColorPrimary: {
    backgroundColor: "#00695c",
  },
})(LinearProgress);

//class Chart
class Charts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      days: 7,
      isLoading: false,
    };
  }

  //showing default chart of 7 days
  componentDidMount() {
    this.loadData();
  }

  //handling days
  handleChange = async (event) => {
    await this.setState({ days: event.target.value });
    this.loadData();
  };

  //loading data from backend
  loadData = async () => {
    this.setState({ isLoading: true });
    const url =
      "https://digital-salons-app.herokuapp.com/Digital_Saloon.com/api/reports";

    await axios({
      url: url,
      method: "GET",
      headers: { "x-auth-token": localStorage.getItem("x-auth-token") },
    })
      .then((response) => {
        this.setState({ isLoading: false, data: "" });
        this.getData(response, "Appiontments", this.state.days);
      })
      .catch((error) => {
        this.setState({ isLoading: false });
        alert(error);
      });
  };

  //getting chart data and display it
  getData = (result, graphLabel, days) => {
    const d = Object.entries(result.data).reverse().slice(0, days).reverse();
    let labels = [];
    let data = [];
    d.forEach((o) => {
      labels.push(o[1]._id.split("T")[0]);
      data.push(o[1].count);
    });
    const stats = {
      labels,
      datasets: [
        {
          fill: false,
          backgroundColor: "#d9e0ab",
          borderColor: "indigo",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "indigo",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 3,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "green",
          pointHoverBorderColor: "orange",
          pointHoverBorderWidth: 40,
          pointRadius: 5,
          pointHitRadius: 20,
          label: graphLabel,
          data: data,
        },
      ],
    };

    //setting data to state
    this.setState({ data: stats });
  };

  //rendering
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.formControl}>
        <div> {this.state.isLoading && <ColorLinearProgress size={30} />}</div>
        <InputLabel id="demo-simple-select-label">
          {this.state.days === 7 ||
          this.state.days === 30 ||
          this.state.days === 3 ? (
            <Typography> Showing {this.state.days} days report</Typography>
          ) : (
            <Typography> Select to see reports</Typography>
          )}
        </InputLabel>
        <Select
          style={{ width: 300 }}
          variant="outlined"
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={this.state.days}
          onChange={this.handleChange}
        >
          <MenuItem value={3}>3 days</MenuItem>
          <MenuItem value={7}>Weekly</MenuItem>
          <MenuItem value={30}>Monthly</MenuItem>
        </Select>
        {this.state.data && (
          <React.Fragment>
            <Line data={this.state.data} height={90} />
            <Pie data={this.state.data} height={100} />
          </React.Fragment>
        )}
      </div>
    );
  }
}

Charts.propTypes = {
  classes: PropTypes.object.isRequired,
};

//exporting Charts
export default withStyles(useStyles)(Charts);
