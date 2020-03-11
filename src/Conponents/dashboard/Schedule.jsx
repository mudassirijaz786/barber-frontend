import React, { Component } from "react";
import { FullCalendar } from "primereact/fullcalendar";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

export default class Schedule extends Component {
  constructor() {
    super();
    this.state = {
      events: [],
      options: {
        plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
        defaultView: "timeGridDay",
        defaultDate: "2020-03-09",
        header: {
          left: "prev,next",
          center: "title",
          right: "timeGridDay"
        },
        editable: false
      },

      data: [
        {
          id: 1,
          title: "Hair cut",
          start: "2020-03-09T16:15:00",
          end: "2020-03-09T17:15:00"
        },
        {
          id: 2,
          title: "H cut",
          start: "2020-02-10T16:15:00",
          end: "2020-02-10T17:15:00"
        }
      ]
    };
  }

  render() {
    return (
      <div>
        <div className="content-section introduction">
          <div className="feature-intro">
            <h1>Schedule</h1>
          </div>
        </div>

        <div className="content-section implementation">
          <FullCalendar events={this.state.data} options={this.state.options} />
        </div>
      </div>
    );
  }
}
