import React, { Component } from 'react';
import { Dropdown, Menu, Input, Icon } from 'antd';
import _ from 'lodash';
import { searchWard } from '../../utils/methods';
import './WardSelect.scss';
const { Item } = Menu;
class WardSelect extends Component {
	constructor(props) {
		super(props);
		this.state = {
			filter: '',
		};
	}
	handleSearchWardChangeDebounced = _.debounce(value => this.handleSearchWardChange(value), 500);
	handleSearchWardChange(value) {
		this.setState({ filter: value });
	}
	handleSelectWard = ({ wardName }) => {
		this.setState({ filter: wardName });
		this.props.handleSelectWard({ wardName });
	};
	displayWards = () => {
		const { filter } = this.state;
		const { cityName, districtName } = this.props;
		let filtedWards = searchWard({ cityName, districtName }, filter);
		if (_.isEmpty(filtedWards)) {
			return <Item>loading..</Item>;
		} else {
			return filtedWards.map((ward, index) => {
				return (
					<Item
						key={index}
						onClick={() =>
							this.handleSelectWard({
								wardName: ward,
							})
						}
					>
						{ward}
					</Item>
				);
			});
		}
	};
	ward = () => <Menu className="ward-dropdown">{this.displayWards()}</Menu>;
	render() {
		return (
			<div className="ward">
				<Dropdown overlay={this.ward} trigger={['click']}>
					<Input onChange={e => this.handleSearchWardChangeDebounced(e.target.value)} />
				</Dropdown>
			</div>
		);
	}
}
export default WardSelect;
