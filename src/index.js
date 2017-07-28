import React from 'react';
import ReactDOM from 'react-dom';


class App extends React.Component {
  constructor(){
    super();
    this.state ={
      shoppingList: [],
      listField:'',


    };
    this.handelSubmit = this.handelSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCheckbox = this.handleCheckbox.bind(this);
    this.handleSave= this.handleSave.bind(this);
  }

  handleChange(event) {
    var noExtraWhitespace = event.target.value.replace(/\s{2,}/g, ' ');
    this.setState({listField: noExtraWhitespace});
  }
  handleCheckbox(value){

    var TempItems = this.state.shoppingList;

    TempItems[value].bought = !TempItems[value].bought;
    this.setState({shoppingList:TempItems});

  }

  handelSubmit(event){

    var items = this.state.listField.split(" ");
    this.setState({listField: ''});
    items.forEach((item)=>{
    var tempData = this.state.shoppingList;
      var shopObject = {
        id:tempData.length,
        store:'kosher market',
        user:'walter',
        item: item,
        bought:false
      };
      tempData.push(shopObject);
      this.setState({shoppingList:tempData});
    });

  }

  handleSave(event){
    var data = {};
     //data.data = JSON.stringify(this.state.shoppingList);
     data.list =this.state.shoppingList;

    console.log(data);
    fetch('/lists',{
      method: 'POST',
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      },
      body:JSON.stringify(data),


    });

  }

  render(){
    return(
      <center>
        <h1>A.D.D Shopping List</h1>
          <textarea placeholder="Your list goes here" rows="4" cols="25" value={this.state.listField} onChange={this.handleChange} >
            </textarea>
            <div>
            <button type="button" onClick={this.handelSubmit}>Submit!</button>
            </div>
            <div>
            <List
              list={this.state.shoppingList}
              handleCheckbox ={this.handleCheckbox}
            />
            </div>
          <div>
            <button type = "button" onClick={this.handleSave}>save list</button>
          </div>
        </center>
        );
    }
}

var List = (props)=>

{

return(
  <div className = "list">
    List
    {props.list.map(item =>
      <ShopItem
        handleCheckbox ={props.handleCheckbox}
        key = {item.id}
        item={item.item}
        id = {item.id}/>

    )}
  </div>
);
};

var ShopItem = (props) =>
{


return (

  <div>
     <input id={props.id} type="checkbox" id="shopItem" value="item" onChange={()=>{props.handleCheckbox(props.id);}}>
     </input>
     <label >{props.item}</label>
  </div>

);
};

ReactDOM.render(<App />, document.getElementById('root'));
