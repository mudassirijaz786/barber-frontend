import React from "react";
import PlacesAutocomplete, {
	geocodeByAddress,
	getLatLng
} from "react-places-autocomplete";
import { Map, GoogleApiWrapper } from "google-maps-react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

class LocationSearchInput extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			address: "",
			latLng: {
				lat: "",
				lng: ""
			}
		};
	}

	handleChange = address => {
		this.setState({ address });
	};
	handleSubmit = e => {
		console.log("selected addreess is ", this.state.address);
		console.log("selected lan lat is ", this.state.latLng);
	};
	handleSelect = address => {
		this.setState({ address });

		geocodeByAddress(address)
			.then(results => getLatLng(results[0]))
			.then(latLng => {
				console.log("Success", latLng);
				this.setState({
					latLng
				});
			})

			.catch(error => console.error("Error", error));
	};

	render() {
		return (
			<div>
				<PlacesAutocomplete
					value={this.state.address}
					onChange={this.handleChange}
					onSelect={this.handleSelect}
				>
					{({
						getInputProps,
						suggestions,
						getSuggestionItemProps,
						loading
					}) => (
						<div>
							<TextField
								{...getInputProps({
									placeholder: "Search Salon ...",
									className: "location-search-input"
								})}
							/>
							<div className="autocomplete-dropdown-container">
								{loading && <div>Loading...</div>}
								{suggestions.map(suggestion => {
									const className = suggestion.active
										? "suggestion-item--active"
										: "suggestion-item";
									// inline style for demonstration purpose
									const style = suggestion.active
										? { backgroundColor: "#fafafa", cursor: "pointer" }
										: { backgroundColor: "#ffffff", cursor: "pointer" };
									return (
										<div
											{...getSuggestionItemProps(suggestion, {
												className,
												style
											})}
										>
											<span>{suggestion.description}</span>
										</div>
									);
								})}
							</div>
						</div>
					)}
				</PlacesAutocomplete>
				<Button
					fullWidth
					style={{ marginBottom: 6 }}
					variant="contained"
					color="primary"
					onClick={this.handleSubmit}
				>
					Reset it now
				</Button>
			</div>
		);
	}
}
export default GoogleApiWrapper({
	apiKey: "AIzaSyARjyRyPhNoOKCNv4bS1W7zP-1reTQElFs"
})(LocationSearchInput);

// export default scriptLoader([
// 	"https://maps.googleapis.com/maps/api/js?key=AIzaSyARjyRyPhNoOKCNv4bS1W7zP-1reTQElFs&libraries=places"
// ])(LocationSearchInput);
