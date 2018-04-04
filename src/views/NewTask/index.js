import React, { Component } from "react";
import { connect } from 'react-redux';

import {startTagsLoading, startStatusesLoading, startTaskProjectsLoading, startCompaniesLoading,
   getTags, getStatuses, getTaskProjects, getCompanies} from '../../redux/actions';

import NewTask from './NewTask';


class NewTaskLoader extends Component {
  //before loader page is loaded, we send requests to get all available units
  componentWillMount(){
    this.props.startTagsLoading();
    this.props.startStatusesLoading();
    this.props.startTaskProjectsLoading();
    this.props.startCompaniesLoading();
    
    this.props.getTags(this.props.token);
    this.props.getStatuses(this.props.statusesUpdateDate,this.props.token);
    this.props.getTaskProjects(this.props.token);
    this.props.getCompanies(this.props.companiesUpdateDate,this.props.token);
  }

  render(){
    if(!this.props.tagsLoaded || !this.props.taskProjectsLoaded || !this.props.statusesLoaded || !this.props.companiesLoaded){
      return(<div>Loading...</div>)
    }
    return <NewTask history={this.props.history} match={this.props.match}/>
  }
}

//all below is just redux storage

const mapStateToProps = ({tagsReducer, statusesReducer, tasksReducer, companiesReducer, login }) => {
  const {tagsLoaded} = tagsReducer;
  const {statusesLoaded} = statusesReducer;
  const {taskProjectsLoaded} = tasksReducer;
  const {companiesLoaded} = companiesReducer;
  const {token} = login;
  return {tagsLoaded, statusesLoaded, taskProjectsLoaded, companiesLoaded, token};
};

export default connect(mapStateToProps, {
  startTagsLoading, getTags,
  startStatusesLoading, getStatuses,
  startTaskProjectsLoading, getTaskProjects,
  startCompaniesLoading, getCompanies,
})(NewTaskLoader);
