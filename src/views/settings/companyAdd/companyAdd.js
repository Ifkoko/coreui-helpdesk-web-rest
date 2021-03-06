import React, { Component } from "react";
import { connect } from 'react-redux';
import {addCompany } from '../../../redux/actions';
import MultiSelect from "../../../components/multiSelect";

class CompanyAdd extends Component {
  constructor(props){
    super(props);
    //creates company_data state for each field
    console.log(this.props.companyAttributes);
    let company_data={};
    this.props.companyAttributes.map((attribute)=>
    {
      let value='';
      switch (attribute.type) {
        case 'input':
          value='';
        break;
        case 'text_area':
          value='';
        break;
        case 'simple_select':
        if(attribute.required){
          if(Array.isArray(attribute.options)){
            value=attribute.options[0];            
          }
          else{
            value=Object.keys(attribute.options)[0];
          }
        }
        else{
          value='null';
        }
        break;
        case 'multi_select':
          value=[];
        break;
        case 'date':
          value=''
        break;
        case 'decimal_number':
          value=''
        break;
        case 'integer_number':
          value=''
        break;
        case 'checkbox':
          value=false;
        break;
        default:
          value='null'

      }
      company_data[attribute.id]=value;
    }
    )
    this.state={
      title:'',
      city:'',
      country:'',
      dic:'',
      ic_dph:'',
      ico:'',
      street:'',
      zip:'',
      company_data,//adds it to the others here
    }
  }

  submit(e){
    e.preventDefault(); //prevent default form behaviour
    let company_data={};  //create empty company data
    for (let key in this.state.company_data){ //add them if they have value
      let companyAttribute=this.props.companyAttributes[this.props.companyAttributes.findIndex((item)=>item.id==key)]; //from ID find out everything about the field
      switch (companyAttribute.type) {
        case 'input':{
          if(this.state.company_data[key]!==''){
              company_data[key]=this.state.company_data[key];
            }
            break;
          }
          case 'text_area':{
            if(this.state.company_data[key]!==''){
                company_data[key]=this.state.company_data[key];
              }
              break;
            }
        case 'simple_select':{
          if(this.state.company_data[key]!=='null'){
              company_data[key]=this.state.company_data[key];
            }
            break;
        }
        case 'multi_select':{ //its array of IDs, we need array if values
          if(this.state.company_data[key].length!=0){
            let newMulti=[];
            this.state.company_data[key].map((item)=>newMulti.push(companyAttribute.options[parseInt(item)]));
            company_data[key]=newMulti;
          }
          break;
          }
        case 'date':{        //date should be formatted into miliseconds since 1970, divided by 1000 because of PHP/Javascript difference
          let date=(new Date(this.state.company_data[key])).getTime()/1000
          if(!isNaN(date)){  //if there is date
            company_data[key]=date;
          }
          break;
          }
          case 'decimal_number':{
            if(!isNaN(parseFloat(this.state.company_data[key]))){
                company_data[key]=parseFloat(this.state.company_data[key]).toString();
              }
            break;
          }
          case 'integer_number':{
            if(!isNaN(parseFloat(this.state.company_data[key]))){
                company_data[key]=parseFloat(this.state.company_data[key]).toString();
              }
            break;
        }
        case 'checkbox':
          company_data[key]=this.state.company_data[key].toString();
          break;
        default:
          break;
          }
        }

    this.props.addCompany(
      {
        title:this.state.title,
        city:this.state.city===''?'null':this.state.city,
        country:this.state.country===''?'null':this.state.country,
        dic:this.state.dic===''?'null':this.state.dic,
        ic_dph:this.state.ic_dph===''?'null':this.state.ic_dph,
        ico:this.state.ico===''?'null':this.state.ico,
        street:this.state.street===''?'null':this.state.street,
        zip:this.state.zip===''?'null':this.state.zip,
        company_data:JSON.stringify(company_data),
      }, this.props.token);
    this.props.history.goBack();
  }

  render() {
    return (
      <div
        class="card"
        style={{ maxWidth: 1380, margin: "auto", borderTop: "0" }}
      >
        <h4 class="card-header">Add company</h4>
        <div class="card-body">
          <form
            onSubmit={(event, value) => {
              event.preventDefault();
              this.props.history.goBack();
            }}
          >
            <div class="form-group">
              <label for="title">Company name</label>
              <input
                class="form-control"
                id="title"
                value={this.state.title}
                onChange={(e)=>this.setState({title:e.target.value})}
              placeholder="Enter company name"
              />
            </div>

            <div class="form-group">
              <label for="ICO">ICO</label>
              <input
                class="form-control"
                id="title"
                value={this.state.ico}
                onChange={(e)=>this.setState({ico:e.target.value})}
              placeholder="Enter ICO number"
              />
            </div>

            <div class="form-group">
              <label for="DIC">DIC</label>
              <input
                class="form-control"
                id="DIC"
                value={this.state.dic}
                onChange={(e)=>this.setState({dic:e.target.value})}
              placeholder="Enter DIC"
              />
            </div>

            <div class="form-group">
              <label for="ic_dph">IČ DPH</label>
              <input
                class="form-control"
                id="ic_dph"
                value={this.state.ic_dph}
                onChange={(e)=>this.setState({ic_dph:e.target.value})}
              placeholder="Enter IČ DPH"
              />
            </div>

            <div class="form-group">
              <label for="street">Street</label>
              <input
                class="form-control"
                id="street"
                value={this.state.street}
                onChange={(e)=>this.setState({street:e.target.value})}
              placeholder="Enter street"
              />
            </div>

            <div class="form-group">
              <label for="city">City</label>
              <input
                class="form-control"
                id="city"
                value={this.state.city}
                onChange={(e)=>this.setState({city:e.target.value})}
              placeholder="Enter city"
              />
            </div>

            <div class="form-group">
              <label for="PSC">PSC</label>
              <input
                class="form-control"
                id="PSC"
              placeholder="Enter PSC"
              value={this.state.zip}
              onChange={(e)=>this.setState({zip:e.target.value})}
              />
            </div>

            <div class="form-group">
              <label for="country">Country</label>
              <input
                class="form-control"
                id="country"
              placeholder="Enter country"
              value={this.state.country}
              onChange={(e)=>this.setState({country:e.target.value})}
              />
            </div>

            {
              this.props.companyAttributes.map((attribute)=>{
                switch (attribute.type) {
                  case 'input':
                    return  <div class="form-group">
                              <label for={attribute.id}>{attribute.title}</label>
                              <input
                                class="form-control"
                                id={attribute.id}
                                value={this.state.company_data[attribute.id]}
                                onChange={(e)=>{
                                  let newData={...this.state.company_data};
                                  newData[attribute.id]=e.target.value;
                                  this.setState({company_data:newData});
                                }
                              }
                              placeholder={"Enter "+attribute.title}
                              />
                            </div>
                  case 'text_area':
                    return <div class="form-group">
                              <label for={attribute.id}>{attribute.title}</label>
                              <textarea
                                class="form-control"
                                id={attribute.id}
                                value={this.state.company_data[attribute.id]}
                                onChange={(e)=>{
                                  let newData={...this.state.company_data};
                                  newData[attribute.id]=e.target.value;
                                  this.setState({company_data:newData});
                                }
                              }
                              placeholder={"Enter "+attribute.title}
                              />
                            </div>
                  case 'simple_select':
                    return <div class="form-group">
                            <label for={attribute.id}>{attribute.title}</label>
                            <select
                              class="form-control"
                              id={attribute.id}
                              value={this.state.company_data[attribute.id]}
                              onChange={(e) => {
                                let newData={...this.state.company_data};
                                newData[attribute.id]=e.target.value;
                                this.setState({company_data:newData});
                              }}
                            >
                            {!attribute.required && <option
                              key='null'
                              value='null'
                            >
                            </option>
                            }
                            {Array.isArray(attribute.options) && attribute.options.map(opt => (
                              <option
                                key={opt}
                                value={opt}
                              >
                                {opt}
                              </option>
                            ))}
                            {!Array.isArray(attribute.options) && Object.keys(attribute.options).map(key =>
                              <option
                              key={key}
                              value={key}
                              >
                              {key}
                              </option>
                            )}

                            </select>
                            </div>
                  case 'multi_select':
                    {
                      let opt=[];
                      attribute.options.map((att)=>opt.push({id:attribute.options.indexOf(att),title:att}));
                    return <div class="form-group">
                      <MultiSelect
                        id={attribute.id}
                        data={opt}
                        displayValue="title"
                        selectedIds={this.state.company_data[attribute.id]}
                        idValue="id"
                        filterBy="title"
                        title= {attribute.title}
                        display="row"
                        displayBoxStyle={{width:100}}
                        menuItemStyle={{marginLeft:7,marginRight:7,marginTop:2,marginBottom:2,paddingTop:2,paddingBottom:2}}
                        renderItem={(item)=><span class="badge" style={{margin:'auto',border: '1px solid black',borderRadius:'3px',paddingLeft:10,paddingRight:10,paddingTop:5,paddingBottom:5, marginLeft:5}}>{item.title}</span>}
                        titleStyle={{backgroundColor:'white',color:'black',size:15}}
                        toggleStyle={{backgroundColor:'white',border:'none',padding:0}}
                        label={attribute.title}
                        labelStyle={{marginLeft:10}}
                        searchStyle={{margin:5}}
                        onChange={(ids,items)=>{
                          let newData={...this.state.company_data};
                          newData[attribute.id]=ids;
                          this.setState({company_data:newData});
                        }}
                        />
                  </div>
                }
                  case 'date':
                    return <div class="form-group">
                              <label for={attribute.id}>{attribute.title}</label>
                              <input
                                class="form-control"
                                type="datetime-local"
                                id={attribute.id}
                                value={this.state.company_data[attribute.id]}
                                onChange={(e)=>{
                                  let newData={...this.state.company_data};
                                  newData[attribute.id]=e.target.value;
                                  this.setState({company_data:newData});
                                }
                              }
                              placeholder={"Select "+attribute.title}
                              />
                            </div>
                  case 'decimal_number':
                  return <div class="form-group">
                    <label for={attribute.id}>{attribute.title}</label>
                    <input
                      class="form-control"
                      type="number"
                      id={attribute.id}
                      value={this.state.company_data[attribute.id]}
                      onChange={(e)=>{
                        let newData={...this.state.company_data};
                        newData[attribute.id]=e.target.value;
                        this.setState({company_data:newData});
                      }
                    }
                    placeholder={"Select "+attribute.title}
                    />
                  </div>
                case 'integer_number':
                  return <div class="form-group">
                    <label for={attribute.id}>{attribute.title}</label>
                    <input
                      class="form-control"
                      type="number"
                      id={attribute.id}
                      value={this.state.company_data[attribute.id]}
                      onChange={(e)=>{
                        let newData={...this.state.company_data};
                        newData[attribute.id]=e.target.value;
                        this.setState({company_data:newData});
                      }
                    }
                    placeholder={"Select "+attribute.title}
                    />
                  </div>
                case 'checkbox':
                  return <div class="form-check">
                      <label class="form-check-label">
                        <input type="checkbox" class="form-check-input" checked={this.state.company_data[attribute.id]}
                          onChange={()=>{
                            let newData={...this.state.company_data};
                            newData[attribute.id]=!newData[attribute.id];
                            this.setState({company_data:newData});
                          }
                        }
                      />
                      {attribute.title}
                      </label>
                    </div>

                default:
                  return <div>{attribute.title}</div>
                }
              })
            }

            <button type="submit" class="btn btn-primary" onClick={this.submit.bind(this)}>
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

// All below is just redux storage
const mapStateToProps = ({ login,companyAttributesReducer }) => {
  const {token} = login;
  const {companyAttributes} = companyAttributesReducer;
  return {token, companyAttributes};
};

export default connect(mapStateToProps, {addCompany})(CompanyAdd);
