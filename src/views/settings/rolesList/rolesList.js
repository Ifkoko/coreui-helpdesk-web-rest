import { Link } from "react-router-dom";
import React, { Component } from "react";
import { InputGroup, InputGroupAddon, Input } from "reactstrap";
import { connect } from 'react-redux';

class RolesList extends Component {
  constructor(props){
    super(props);
    this.state={
      active:'',
      name:''
    }
    this.getFilteredData.bind(this);
  }

  getFilteredData(){
    return this.props.userRoles.filter((item)=>item.title.toLowerCase().includes(this.state.name.toLowerCase()))
    .filter((item)=>item.is_active == (this.state.active.toLowerCase().includes('y')||
    this.state.active.toLowerCase().includes('t')||
    this.state.active.toLowerCase().includes('c'))||
    this.state.active=='')
    .sort((item,item2)=>item.name>item2.name);
  }

  render() {
    return (
      <div style={{ paddingLeft: 20, paddingRight: 20 }}>
        <h2 style={{ marginTop: 20 }} className="mb-3">
          Roles list
        </h2>

        <button
          type="button"
          class="btn btn-success"
          onClick={() => this.props.history.push("/role/add")}
          >
          Add new role
        </button>

        <table class="table table-striped table-hover">
          <thead>
            <tr>
              <th style={{ borderTop: "0px" }}>Name</th>
              <th style={{ borderTop: "0px" }}>Active</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>
                <Input type="text" id="input1-group1" value={this.state.name} name="input1-group1" onChange={(e)=>this.setState({name:e.target.value})} />
              </th>
              <th>
                <Input type="text" id="input1-group1" value={this.state.active} name="input1-group1" onChange={(e)=>this.setState({active:e.target.value})} />
              </th>
            </tr>
            {this.getFilteredData().map(role => (
              <tr
                key={role.id}
                onClick={() => this.props.history.push("/role/edit/" + role.id)}
                >
                <td>{role.title}</td>
                <td>
                  {role.is_active ? (
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


const mapStateToProps = ({ userRolesReducer, login }) => {
  const { userRoles } = userRolesReducer;
  const { token } = login;
  return { userRoles, token };
};


export default connect(mapStateToProps, {})(RolesList);
