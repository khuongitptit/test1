import React, { Component } from 'react';
import { Modal, Select } from 'antd';
import {searchLocation as searchLocationMethod, searchWard as searchWardMethod} from '../utils/methods'
import './index.scss'
const { Option } = Select;
let timeout;
let currentValue;
function searchLocation(value, callback) {
  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }
  currentValue = value;

  function fake() {
    let searchRes = searchLocationMethod(value)
    console.log(123,searchRes)
    callback(searchRes)
  }

  timeout = setTimeout(fake, 500);
}
function searchWard({cityName,districtName},value, callback) {
  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }
  currentValue = value;

  function fake() {
    let searchRes = searchWardMethod({cityName,districtName},value)
    callback(searchRes)
  }

  timeout = setTimeout(fake, 500);
}
class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataLocation:[],
      dataWard:[],
      valueLocation:undefined,
      valueWard:undefined,
      cityName:null,
      districtName:null
    };
  }
  handleSearchLocation = value => {
    if (value) {
      searchLocation(value, dataLocation => {
        this.setState({ dataLocation })
      });
    } else {
      this.setState({ dataLocation: [] });
    }
  };

  handleChangeLocation = value => {
    let test = value.replace(/^'|'$/g, "").split(/\s*\-\s*/g)
    this.setState({ valueLocation:value });
    this.setState({cityName:test[0]})
    this.setState({districtName:test[1]})
  };

  handleSearchWard = value => {
    const {cityName,districtName} = this.state
    if (value) {
      searchWard({cityName,districtName},value, dataWard => {
        this.setState({ dataWard })
      });
    } else {
      this.setState({ dataWard: [] });
    }
  };

  handleChangeWard = value => {
    this.setState({ valueWard:value });
  };
  render() {
  const optionsLocation = this.state.dataLocation.map(d => <Option key={`${d.city} - ${d.district}`}>{`${d.city} - ${d.district}`}</Option>);
  const optionsWard = this.state.dataWard.map(w => <Option key={w}>{w}</Option>);
    return (
      <div style={{marginLeft:"100px"}} >
        <Select
        className="location-select"
        showSearch
        value={this.state.valueLocation}
        placeholder={this.props.placeholder}
        style={this.props.style}
        defaultActiveFirstOption={false}
        showArrow={false}
        filterOption={false}
        onSearch={this.handleSearchLocation}
        onChange={this.handleChangeLocation}
        notFoundContent={null}
      >
        {optionsLocation}
      </Select>
      <Select
        className="location-select"
        showSearch
        value={this.state.valueWard}
        placeholder={this.props.placeholder}
        style={this.props.style}
        defaultActiveFirstOption={false}
        showArrow={false}
        filterOption={false}
        onSearch={this.handleSearchWard}
        onChange={this.handleChangeWard}
        notFoundContent={null}
      >
        {optionsWard}
      </Select>
      </div>
    );
  }
}

export default index;
