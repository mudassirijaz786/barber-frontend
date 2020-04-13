import React, { Component } from "react";
import GoogleMapReact from "google-map-react";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class SimpleMap extends Component {
	static defaultProps = {
		center: {
			lat: 59.95,
			lng: 30.33
		},
		zoom: 11
	};
	state = {
		lat: 30.375,
		lng: 69.345
	};
	handleChange = e => {
		this.setState({});
	};
	render() {
		return (
			// Important! Always set the container height explicitly
			<div style={{ height: "100vh", width: "100%" }}>
				<GoogleMapReact
					bootstrapURLKeys={{ key: "AIzaSyARjyRyPhNoOKCNv4bS1W7zP-1reTQElFs" }}
					defaultCenter={this.state}
					defaultZoom={this.props.zoom}
					text="My Marker"
					onChange={this.handleChange}
				></GoogleMapReact>
			</div>
		);
	}
}
export default SimpleMap;
