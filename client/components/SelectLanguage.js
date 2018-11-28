import React, { Component } from 'react';
import { connect } from 'react-redux';
import { lngTo } from '../store/gtranslate';
import { FormControl, InputLabel, Select, MenuItem, OutlinedInput } from '@material-ui/core';

class SelectLanguage extends Component {
  state = {
  	lngItem: '',
  	lng: '',
  	idx: 0,
  }
  handleChange = (evt) => {
  	const { value } = evt.target;
  	this.setState({ lngItem: value[0], lng: value[1], idx: value[2]})
  }

  render () {
  	const { handleChange } = this;
  	const { idx } = this.props;
  	const lngMap = [{lngItem:'English', lng:'en'}, 
			      {lngItem:'Spanish', lng: 'es'}, 
			      {lngItem:'Chinese', lng: 'zh'}, 
			      {lngItem:'French', lng: 'fr'}, 
			      {lngItem:'Russian', lng: 'ru'}, 
			      {lngItem:'Hindi', lng: 'hi'}, 
			      {lngItem:'Arabic', lng: 'ar'}, 
			      {lngItem:'Portuguese', lng: 'pt'}, 
			      {lngItem:'Bengali', lng: 'bn'}, 
			      {lngItem:'Japanese', lng: 'ja'}, 
			      {lngItem:'Punjabi', lng: 'pa'}]
  	return (
  	  <FormControl className="selectLng" variant="outlined" >
          <InputLabel>Translate To</InputLabel>
          <Select
            value={this.state.lngItem}
            onChange={handleChange}
            input={
              <OutlinedInput
                name="lngItem"
                value={this.state.lngItem}
                id="outlined-age-simple"
                labelWidth={0}
              />
            }
          >
            <MenuItem value=""><em>None</em></MenuItem>
          {lngMap.map((each, idx) => {
          	return (
          	  <MenuItem key={idx} value={[each.lngItem, each.lng, idx]}>{each.lngItem}</MenuItem>
          	)
          })
      }
          </Select>
        </FormControl>
  	)
  }
}

const mapStateToProps = ({ translation }) => {
  const { translateLng, lngToIdx } = translation;
  return {
  	lng: translateLng,
  	idx: lngToIdx
  }
}

const mapDispatchToProps = dispatch => ({
	lngTo: (lng, idx) => dispatch(lngTo(lng, idx))
})

export default connect(mapStateToProps, mapDispatchToProps)(SelectLanguage);


