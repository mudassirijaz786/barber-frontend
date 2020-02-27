import React, { Component } from "react";
import { DropzoneDialog } from "material-ui-dropzone";
import Button from "@material-ui/core/Button";

export default class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      files: ""
    };
  }

  handleClose() {
    this.setState({
      open: false
    });
  }

  handleSave(files) {
    //Saving files to state for further use and closing Modal.
    this.setState({
      files: files,
      open: false
    });
    console.log(files[0].name);
  }

  handleOpen() {
    this.setState({
      open: true
    });
  }
  handlefilechange = e => {
    //console.log("h", e.target.files[0].name);s
    //if (e) {
    //	console.log("name", e.target.name);
    //console.log("h", e.target.files[0]);
    //console.log("event", e.target.files[0]);
    if (e.target.files[0]) {
      const size = e.target.files[0].size / 1024;

      if (size < 10240) {
        //console.log("img", e.target.files[0]);
        //	this.state.Service.service_name = "ju";
        //	sconsole.log("sates", this.state.Service);
        //this.setState({ Service });
        const files = { ...this.state.files };
        //	console.log(Service);
        files = e.target.files[0];
        //	console.log();
        //console.log("service is", Service);
        //this.setState({ Service });
        //clone = e.target.files[0];
        //	console.log("clone is ", clone);
        this.setState({ files });
        //console.log("after updating statees", this.state.Service);
      }
    }
  };
  render() {
    return (
      <div>
        <Button onClick={this.handleOpen.bind(this)}>Add Image</Button>
        <DropzoneDialog
          open={this.state.open}
          onChange={this.handleChange}
          onSave={this.handleSave.bind(this)}
          acceptedFiles={["image/jpeg", "image/png", "image/bmp"]}
          showPreviews={true}
          maxFileSize={5000000}
          onClose={this.handleClose.bind(this)}
        />
      </div>
    );
  }
}
