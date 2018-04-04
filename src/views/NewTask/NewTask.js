import React, { Component } from "react";
import { connect } from 'react-redux';
import { Card, CardHeader, CardBody } from "reactstrap";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  ButtonGroup
} from "reactstrap";
import {getTags, addTask} from '../../redux/actions';
import MultiSelect from '../../components/multiSelect';

class NewTask extends Component {
  constructor(props) {
    super(props);
    this.findById = this.findById.bind(this);
    this.saveTask = this.saveTask.bind(this);
    this.state = {
      statusLocalId: 0,
      projectLocalId: 0,
      colorFormatedTags: [],
      body: {
        taskData:{
          1:'select1',
          2:'select2',
          3:['select1','select3'],
          4:false,
          5: Date.now()
        }
      }
    };
  }

  componentWillMount(){
    this.formatTagColors()
  }

  // prejde pole tagov a kazdemu upravi atribut 'color' (prida na zaciatok '#') koli pouzitiu v multiSelect-e
  formatTagColors(){
    let newTags = []
    this.props.tags.map((tag)=>{
      let newTag = {...tag, color: '#'+tag.color}
      newTags.push(newTag)
    })
    this.setState({
      colorFormatedTags: newTags
    })
  }

  // vyhladanie lokalneho id (v this.props) zadanej vlastnosti podla jej id
  findById(propName,id){
    let propId = this.props[propName].findIndex((propData)=>{
      return propData.id ==  id
    })
    return propId
  }

  // ulozenie novovytvoreneho tasku
  saveTask(){
    // docasne riesenie 'validacie' vstupu
    if(typeof(this.state.body.title) === 'undefined' || this.state.body.title === ''){
      alert ('Názov tasku je povinný')
    }else{
      this.props.addTask(
        this.props.taskProjects[this.state.projectLocalId].id,
        this.props.statuses[this.state.statusLocalId].id,
        this.state.companyLocalId ? this.props.companies[this.state.companyLocalId].id : '',
        this.state.body,
        this.props.token
      )
    }
  }

  render() {
    return (
      <div>
        <Card style={{ minWidth: 800, margin: "auto", borderTop: "0",border:'none'}}>
          <CardHeader>
            <h2>Nový task</h2>
            <button onClick={this.saveTask}>Uložiť</button>
          </CardHeader>
          <CardBody>
            <div className="row">
              <div className="col-8" style={{ borderRight: "1px solid #eee" }}>
                <form>
                  <div className="form-group">
                    <label htmlFor="title">Task Name</label>
                    <input
                      className="form-control"
                      id="title"
                      placeholder="Zadajte názov úlohy"
                      onInput = {(event, value)=>{
                        // priprava state.body pre potreby API
                        this.setState({
                          body: {...this.state.body,title: event.target.value}
                        });
                      }}
                    />
                  </div>
                  <MultiSelect
                    data={this.state.colorFormatedTags}
                    displayValue="title"
                    idValue="id"
                    filterBy="title"
                    title= "Zvoľte tagy"
                    display="row"
                    displayItemStyle={{border:"1px solid grey", marginLeft:10}}
                    menuItemStyle={{padding:3}}
                    colored={true}
                    label={"Výber tagov"}
                    onChange={(ids,items)=>{
                      // priprava state.body pre potreby API
                      let newTags = []
                      items.map((item)=>{
                        newTags.push(item.title)
                      })
                      this.setState({
                        body: {...this.state.body, tags:newTags}
                      })
                    }}
                  />
                  <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                      className="form-control"
                      id="description"
                      placeholder="Enter description"
                      onInput = {(event, value)=>{
                        // priprava state.body pre potreby API
                        this.setState({
                          body: {...this.state.body,description: event.target.value}
                        });
                      }}
                    />
                  </div>
                </form>
              </div>

              <div className="col-4">
                <form>
                  <div className="form-group">
                    <label htmlFor="status">Status</label>
                    <select
                      className="form-control"
                      style={{
                        color: "white",
                        backgroundColor: this.props.statuses[this.state.statusLocalId].color
                      }}
                      selected={this.state.statusLocalId}
                      id="status"
                      onChange={(event, value) => {
                        this.setState({
                          statusLocalId: this.findById('statuses',event.target.value)
                        })
                      }}
                    >
                    {this.props.statuses.map(status => (
                        <option
                          key={status.id}
                          style={{ color: "white", backgroundColor: status.color }}
                          value={status.id}
                        >
                          {status.title}
                        </option>
                    ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="project">Project</label>
                    <select
                      className="form-control"
                      id="project"
                      selected = {this.state.projectLocalId}
                      onChange={(event, value) => {
                        let taskProject = this.props.taskProjects.findIndex((project)=>{
                          return project.id ==  event.target.value
                        })
                        this.setState({
                          projectLocalId: this.findById('taskProjects',event.target.value)
                        });
                      }}
                    >
                      {this.props.taskProjects.map(project => (
                        <option key={project.id} value={project.id}>
                          {project.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="company">Company</label>
                    <select
                      className="form-control"
                      id="company"
                      // TODO - doriesit pri prijatom info. o priradenej spolocnosti
                      // selected = {this.state.companyLocalId}
                      onChange={(event, value) => {
                        let taskCompany = this.props.companies.findIndex((company)=>{
                          return company.id ==  event.target.value
                        })
                        this.setState({
                          companyLocalId: this.findById('companies',event.target.value)
                        });
                      }}
                    >
                    <option value=''>
                    --
                    </option>
                      {this.props.companies.map(company => (
                        <option key={company.id} value={company.id}>
                          {company.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </form>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }
}



const mapStateToProps = ({tagsReducer, statusesReducer, tasksReducer, companiesReducer, login}) => {
  const {tags} = tagsReducer;
  const {statuses} = statusesReducer;
  const {taskProjects} = tasksReducer;
  const {companies} = companiesReducer;
  const {token} = login;
  return {tags, statuses, taskProjects, companies, token};
};


export default connect(mapStateToProps, {getTags, addTask})(NewTask);
