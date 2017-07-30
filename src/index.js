import React from 'react';
import ReactDOM from 'react-dom';
import SavedLists from "./savedlists";


class App extends React.Component {
  constructor(){
    super();
    this.state ={
      shoppingList: [],
      listField:'',
      user: "Walter",
      savedItems:[]
    };
    this.handelSubmit = this.handelSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCheckbox = this.handleCheckbox.bind(this);
    this.handleSave= this.handleSave.bind(this);
    this.handleGet = this.handleGet.bind(this);
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
        item: item,
        quantity: 1,
        bought:false

      };
      tempData.push(shopObject);
      this.setState({shoppingList:tempData});
    });

  }

  handleSave(event){
    var data = {};
    var date = new Date;
     data.user = this.state.user;
     data.date = date.toDateString();
     data.items =this.state.shoppingList;
     data.items.forEach(item => delete item.id);

    fetch('/lists',{
      method: 'POST',
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      },
      body:JSON.stringify(data),


    });

  }
  handleGet(event){
    fetch(`/lists?${this.state.user}`,{
      method: 'GET',
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      },
    }).then((data)=>{
      return data.json();
      //this.setState({savedItems:data.items})
    }).then((data)=>{
      console.log('data',data);
      this.setState({savedItems:data});
      console.log("yes",this.state.savedItems);
    }).catch((err)=>{
      throw err;
    });
  }

  render(){
    return(
      <center>
        <h1>A.D.D Shopping Lists</h1>
          <h2>{this.state.user} Lists</h2>
          <textarea placeholder="Your list goes here" rows="4" cols="25" value={this.state.listField} onChange={this.handleChange} >
            </textarea>
            <div>
            <button type="button" onClick={this.handelSubmit}>Submit!</button>
            </div>
            <div>
            <List
              list={this.state.shoppingList.filter(item => item.bought === false)}
              handleCheckbox ={this.handleCheckbox}
            />
            </div>
          <div>
            <button type = "button" onClick={this.handleSave}>save list</button>
          </div>
        <div>
          <BoughtList list={this.state.shoppingList.filter(item => item.bought === true)}/>
        </div>
        <div>
          <button type = "button" onClick={this.handleGet}>get saveds lists</button>
        </div>

      <div>
        Savedlists
        <SavedLists lists={this.state.savedItems}/>
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
var BoughtList = (props)=>

{

return(
  <div className = "list">
    Bought list
    {props.list.map(item =>

      <BoughtItem

        key = {item.id}
        item={item.item}
        id = {item.id}/>

    )}
  </div>
);
};

var  BoughtItem = (props)=>{
  return(
    <div>
       <label >{props.item}</label>
    </div>
  );
};
ReactDOM.render(<App />, document.getElementById('root'));
