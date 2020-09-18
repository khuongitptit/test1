import React, { Component } from 'react';
import { Dropdown, Menu, Input, Icon } from 'antd';
import _ from 'lodash';
import { searchLocation } from '../../utils/methods';
import './LocationSelect.scss';
const { Item } = Menu;
class LocationSelect extends Component {
	constructor(props) {
		super(props);
		this.state = {
			filter: '',
		};
	}
	handleSearchLocationChangeDebounced = _.debounce(
		value => this.handleSearchLocationChange(value),
		500
	);
	handleSearchLocationChange(value) {
		this.setState({ filter: value });
	}
	handleSelectLocation = ({ cityName, districtName }) => {
		this.setState({ filter: `${cityName} - ${districtName}` });
		this.props.handleSelectLocation({ cityName, districtName });
	};
	displayLocations = () => {
		const { filter } = this.state;

		let filtedLocations = searchLocation(filter);
		if (_.isEmpty(filtedLocations)) {
			return <Item>loading..</Item>;
		} else {
			return filtedLocations.map((location, index) => {
				return (
					<Item
						key={index}
						onClick={() =>
							this.handleSelectLocation({
								cityName: location.city,
								districtName: location.district,
							})
						}
					>
						{`${location.city} - ${location.district}`}
					</Item>
				);
			});
		}
	};
	location = () => <Menu className="location-dropdown">{this.displayLocations()}</Menu>;
	render() {
		return (
			<div className="location">
				<Dropdown overlay={this.location} trigger={['click']}>
					<Input onChange={e => this.handleSearchLocationChangeDebounced(e.target.value)} />
				</Dropdown>
			</div>
		);
	}
}
export default LocationSelect;
