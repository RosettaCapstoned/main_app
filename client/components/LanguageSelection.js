import React, { Component } from 'react';
import { connect } from 'react-redux';
import { lngSelect } from '../store/gtranslate';
import { List, ListItem, ListItemText, Icon } from '@material-ui/core';

class LanguageSelection extends Component {

  handleClick = (value, key) => {
  	// const { key, value } = evt.target;
  	console.log(value, key)
  	this.props.lngSelect(value, key);
  }

  render(){
  	const { handleClick } = this;
  	const { selectedIdx } = this.props;
  	return (
  	  <List className='menuList'>
        {[{lngItem:'English', lng:'en'}, 
          {lngItem:'Spanish', lng: 'es'}, 
          {lngItem:'Chinese', lng: 'zh'}, 
          {lngItem:'French', lng: 'fr'}, 
          {lngItem:'Russian', lng: 'ru'}, 
          {lngItem:'Hindi', lng: 'hi'}, 
          {lngItem:'Arabic', lng: 'ar'}, 
          {lngItem:'Portuguese', lng: 'pt'}, 
          {lngItem:'Bengali', lng: 'bn'}, 
          {lngItem:'Japanese', lng: 'ja'}, 
          {lngItem:'Punjabi', lng: 'pa'}].map((each, idx) => {
          	return (
          	  <ListItem button 
          	  			key={idx} 
          	  			onClick={()=>handleClick(each.lng, idx)}
          	  			className='lngItem'>
          		<ListItemText className ={ selectedIdx === idx ? 'selected' : null } 
          					  primary={each.lngItem} />
          		{selectedIdx === idx && (<Icon>check</Icon>)}
        	  </ListItem>
          	)
          })
      }
      </List>
  	)
  }
}

const mapStateToProps = ({ translation }) => {
  const { selectedIdx, speakingLng } = translation;
  return {
  	selectedIdx,
  	speakingLng
  }
}

const mapDispatchToProps = dispatch => ({
  lngSelect: (lng, idx) => dispatch(lngSelect(lng, idx))
})

export default connect(mapStateToProps, mapDispatchToProps)(LanguageSelection);