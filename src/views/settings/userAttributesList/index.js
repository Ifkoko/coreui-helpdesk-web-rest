import { Link } from "react-router-dom";
import React, { Component } from "react";
import { InputGroup, InputGroupAddon, Input } from "reactstrap";
const mockData = [
  { id: 1, active: true, name: "middlename", description: "If person does have a middle name...", type: "input", values: [] },
  { id: 2, active: true, name: "birthDate", description: "When was user born", type: "datetime", values: [] },
  { id: 3, active: false, name: "kids", description: "How many kids does person have", type: "number", values: [] },
  { id: 4, active: false, name: "married", description: "Is this person married", type: "checkbox", values: [] },
  { id: 5, active: true, name: "gender", description: "What's your gender?", type: "select", values: ['male','female','elf','otter','other'] },
];
class UserAttributesList extends Component {
  constructor(props){
    super(props);
    this.state={
      name:'',
      type:'',
      active:'',
    }
    this.getFilteredData.bind(this);
  }

  getFilteredData(){
    return mockData.filter((item)=>item.name.toLowerCase().includes(this.state.name.toLowerCase()))
    .filter((item)=>item.type.toLowerCase().includes(this.state.type.toLowerCase()))
    .filter((item)=>item.active == (this.state.active.toLowerCase().includes('y')||this.state.active.toLowerCase().includes('t')||this.state.active.toLowerCase().includes('c'))||this.state.active=='')
    .sort((item,item2)=>item.title>item2.title);
  }

  render() {
    return (
      <div style={{ paddingLeft: 20, paddingRight: 20 }}>
        <h2 style={{ marginTop: 20 }} className="mb-3">
          User attributes list
        </h2>

        <button
          type="button"
          class="btn btn-success"
          onClick={() => this.props.history.push("/userAttribute/add")}
        >
          Add new user attribute
        </button>

        <table class="table table-striped table-hover">
          <thead>
            <tr>
              <th style={{ borderTop: "0px" }}>Custom field name</th>
              <th style={{ borderTop: "0px" }}>Type</th>
              <th style={{ borderTop: "0px" }}>Active</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>
                <Input type="text" id="input1-group1" value={this.state.name} name="input1-group1" onChange={(e)=>this.setState({name:e.target.value})} />
              </th>
              <th>
                <Input type="text" id="input1-group1" value={this.state.type} name="input1-group1" onChange={(e)=>this.setState({type:e.target.value})} />
              </th>
              <th>
                <Input type="text" id="input1-group1" value={this.state.active} name="input1-group1" onChange={(e)=>this.setState({active:e.target.value})} />
              </th>
            </tr>
            {this.getFilteredData().map(userAttribute => (
              <tr
                key={userAttribute.id}
                onClick={() => this.props.history.push("/userAttribute/edit/" + userAttribute.id)}
              >
                <td>{userAttribute.name}</td>
                <td>{userAttribute.type}</td>
                <td>
                  {userAttribute.active ? (
                    <span class="badge badge-success">Yes</span>
                  ) : (
                    <span class="badge badge-danger">No</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default UserAttributesList;
