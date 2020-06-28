import React, { Component } from "react";
import { Button } from "primereact/button";
// import { ProgressSpiner } from "./progressSpinner";
import * as ipService from "./services";
import { Growl } from "primereact/growl";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import { Spinner } from "./spinner";

export default class IPInfo extends Component {
  constructor() {
    super();
    this.state = {
      ips: null,
      showErrorMsg: false,
    };
    TimeAgo.addLocale(en);
    this.timeAgo = new TimeAgo("en-US");
  }

  componentDidMount() {
    this.loadData();
    console.log("hello from ip");
  }
  loadData = () => {
    console.log("hello from within ip");
    this.setState({ ips: null });
    ipService
      .getAllIpsInfo()
      .then((result) => {
        try {
          let ip = [];
          let obj = {};
          result.data.forEach((i) => {
            obj["_id"] = i._id;
            obj["updated_at"] = i.updated_at;
            obj["city"] = i.data.city;
            obj["country"] = i.data.country;
            obj["region"] = i.data.region;
            obj["ip"] = i.data.ip;
            obj["timezone"] = i.data.timezone;
            ip.push(obj);
            obj = {};
          });
          ip = ip.reverse();
          this.setState({ ips: ip });
        } catch (eer) {
          this.setState({ showErrorMsg: true });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  timeTemplate = (rowData, column) => {
    const time = new Date(rowData.updated_at);
    // console.log(time);
    // console.log(this.timeAgo.format(time));
    return <div>{this.timeAgo.format(time)}</div>;
    //updated_atex
  };
  handleDelete = (data) => {
    let { ips } = this.state;
    const originMessages = this.state.ips;
    ips = ips.filter((m) => m._id !== data._id);
    this.setState({ ips });
    ipService
      .deleteAnIp(data._id)
      .then((result) => {
        this.growl.show({
          life: "5000",
          severity: "success",
          summary: "The entry has been deleted",
          detail: "Deleted Successfully.",
        });
      })
      .catch((err) => {
        console.log(err);
        this.growl.show({
          life: "5000",
          severity: "error",
          summary: "Error",
          detail: "Could not delete the item due to network error",
        });
        this.setState({ ips: originMessages });
      });
  };

  actionTemplate = (rowData, column) => {
    return (
      <Button
        label="Delete"
        type="button"
        icon="pi pi-ban"
        className="p-button-danger"
        style={{ marginRight: ".5em" }}
        onClick={() => this.handleDelete(rowData)}
      ></Button>
    );
  };

  render() {
    let paginatorLeft = <Button icon="pi pi-refresh" onClick={this.loadData} />;
    const { ips } = this.state;
    var header = (
      <div className="p-clearfix" style={{ lineHeight: "1.87em" }}>
        Current Requests
        <div style={{ float: "right" }}>
          Total Requests : {ips ? ips.length : "Loading..."}
        </div>
      </div>
    );

    return (
      <div>
        <Growl ref={(el) => (this.growl = el)} />
        <React.Fragment>
          <div
            style={{
              border: "1px solid #c3c3c3",
              textAlign: "center",
              alignContent: "center",
            }}
          >
            {this.state.showErrorMsg && (
              <h1>Error in reading from the database . . . . . .</h1>
            )}
            {!this.state.showErrorMsg && (
              <React.Fragment>
                <div className="content-section implementation">
                  <Spinner loading={ips ? false : true} color={"#1E0D94"} />
                  {/* <ProgressSpiner data={ips}></ProgressSpiner> */}
                  {ips && (
                    <React.Fragment>
                      <DataTable
                        ref={(el) => (this.dt = el)}
                        value={ips}
                        paginator={true}
                        header={header}
                        paginatorLeft={paginatorLeft}
                        responsive={true}
                        rows={5}
                        rowsPerPageOptions={[5, 10, 20]}
                      >
                        <Column
                          style={{
                            overflowWrap: "break-word",
                            marginTop: "20px",
                          }}
                          field="ip"
                          header="IP"
                          sortable={true}
                        />

                        <Column
                          style={{ overflowWrap: "break-word" }}
                          field="country"
                          header="Country"
                          sortable={true}
                          filter={true}
                        />
                        <Column
                          style={{ overflowWrap: "break-word" }}
                          field="region"
                          header="Region"
                          sortable={true}
                          filter={true}
                        />

                        <Column
                          style={{ overflowWrap: "break-word" }}
                          field="city"
                          header="City"
                          filter={true}
                          sortable={true}
                        />

                        <Column
                          style={{ overflowWrap: "break-word" }}
                          body={this.timeTemplate}
                          header="Time"
                          sortable={true}
                          filter={true}
                        />

                        <Column
                          style={{ overflowWrap: "break-word" }}
                          field="timezone"
                          header="Time Zone"
                          filter={true}
                          sortable={true}
                        />
                        <Column
                          style={{
                            overflowWrap: "break-word",
                            marginBottom: "20px",
                          }}
                          body={this.actionTemplate}
                          header="Action"
                          sortable={true}

                          // style={{ textAlign: "center", width: "8em" }}
                        />
                      </DataTable>
                    </React.Fragment>
                  )}
                </div>
              </React.Fragment>
            )}
          </div>
        </React.Fragment>
      </div>
    );
  }
}
