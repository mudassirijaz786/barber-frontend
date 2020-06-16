import React from "react";
import { css } from "@emotion/core";

import RingLoader from "react-spinners/RingLoader";
// import HashLoader from "react-spinners/HashLoader";

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

export class Spinner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: this.props.loading,
      color: "black",
    };
  }

  componentDidMount() {
    // setTimeout(() => {
    //   setInterval(() => {
    //     const col = "#" + Math.floor(Math.random() * 16777215).toString(16);
    //     this.setState({ color: col });
    //   }, 100);
    //   if (!this.state.loading) {
    //     return;
    //   }
    // }, 10000);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ loading: nextProps.loading });
  }
  render() {
    return (
      <div className="sweet-loading">
        {this.state.loading && (
          <div style={{ textAlign: "center", margin: "20px" }}>
            <h1>Loading...</h1>
          </div>
        )}
        <div style={{ margin: "10px", padding: "10px" }}>
          {/* <HashLoader
            css={override}
            size={80}
            color={"#1E0D94"}
            loading={this.state.loading}
          /> */}

          <RingLoader
            css={override}
            size={100}
            // color={"#1E0D94"}
            color={this.props.color}
            loading={this.state.loading}
          />
        </div>
      </div>
    );
  }
}
