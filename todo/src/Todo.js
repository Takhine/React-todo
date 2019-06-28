import React, {Component} from 'react';

class Todo extends Component {
	constructor(props){
    super(props);

  this.state = {
    edit:false,
		id:null,
		mockData: [{
			id: '1',
			name: 'Smoke Machine',
			price: 'Rs. 2000',
			isAvailable: true,
			quantity: 200
		}, {
			id: '2',
			name: 'PS4',
			price: 'Rs. 650',
			isAvailable: true,
			quantity: 5
		}, {
			id: '3',
			name: 'Stage',
			price: 'Rs. 2000',
			isAvailable: false,
			quantity: 100
		}]
  };
  }
  // Create from CRUD
  onSubmitHandle(event){
  	event.preventDefault();
  	// setState schedules an update to a component's state object. When state changes, the component responds by rerendering
  	this.setState({
  		mockData: [...this.state.mockData, {
  			id: Date.now(),
  			name: event.target.item.value,
  			price: null,
  			isAvailable: null,
  			quantity: null
  		}]
  	});
  	// Initially setting to blank
  	event.target.item.value = '';
  }

  // Delete from CRUD
  onDeleteHandle(){
  	// the first parameter being passed here is 'id' which is why the index within arguments is 0
  	let id=arguments[0];

  	this.setState({
  		mockData: this.state.mockData.filter(item =>{
  			if(item.id !==id){
  				return item;
  			}
  		})
   	});
  }

  // Update from CRUD has two parts: 1) Show the edit form 2)Perform Update operation
  // Render Edit form onClick
  renderEditForm(){
  	if(this.state.edit){
  		return (
  			<form onSubmit={this.onUpdateHandle.bind(this)}>
  			<input type="text" name="updatedItem" className="item" defaultValue={this.state.name}/>
  			<button className="update-add-item">Update</button>
  			</form>
  			)
  	}
  }

  //Edit Component
  onEditHandle(event){
  	this.setState({
  		edit: true,
  		id: arguments[0],
  		name: arguments[1]
  	});
  }

  //Update Component
  onUpdateHandle(event){
  	event.preventDefault();
  this.setState({
  	mockData: this.state.mockData.map(item =>{
  		if(item.id===this.state.id){
  			item['name'] = event.target.updatedItem.value;;
  			return item;
  		}
  		return item;
  	})
  });
  this.setState({
  	edit: false
  });
  }

  //Extra Component to mark an item as complete
  onCompleteHandle(){
  	let id=arguments[0];

  	this.setState({
  		mockData: this.state.mockData.map(item => {
  			if(item.id === id){
  				item['done'] = true;
  				return item;
  			}
  			return item;
  		})
  	});
  }
	render(){
		return(
			<div>
			{this.renderEditForm()}	
		      <form onSubmit={this.onSubmitHandle.bind(this)}>
		        <input type="text" name="item" className="item" />
		        <button className="btn-add-item">Add</button>
		      </form>
		      <ul>
		        {this.state.mockData.map(item => (
		          <li className={ item.done ? 'done' : 'not-done' }
 key={item.id}>
		            {item.name}
		            <button onClick={this.onDeleteHandle.bind(this,item.id)}>Delete</button>
		            <button onClick={this.onEditHandle.bind(this, item.id, item.name)}>Edit</button>
		            <button onClick={this.onCompleteHandle.bind(this, item.id)}>Complete</button>
		          </li>
		        ))}
		      </ul>
    </div>
			);
	}
}
export default Todo;