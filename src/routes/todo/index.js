import { h, Component } from 'preact';
import style from './style';
// import makeRequest from '../../fetch/fetch';
import TodoItem from '../../components/toDoItem.js';
import AddToDoForm from '../../components/AddTodoForm.js';

export default class TodoList extends Component {

	constructor(props){
		super(props)
		//defaults
		this.state = {
			toDos: [{
				name: "make some more todos",
				completed: false,
				id: 1
			}],
			count: 1
		}
	}

	componentWillMount(){
		//before anything, lets check and see if the user has been here before and left some to-Dos for us
		this.checkForLocalStorageValues()
	}


	checkForLocalStorageValues = async () => {
		const localState = await this.loadFromStorage();
		
		//if there is a localstate saved, but its empty, lets not use it and show to default list instead
		if (localState && localState["toDos"].length){
			if (localState["toDos"] && localState["count"]){
				
				//otherwise overwrite the state so we can resume where we left off
				this.setState({toDos: localState["toDos"], count: localState["count"]})
			}
		}
	}

	componentDidUpdate() {
		//anytime anything new happens, it gets saved to local storage. 
		//TRACK YOUR EVERY MOVE
		const SavedInfo = {
			toDos: this.state.toDos,
			count: this.state.count
		}
		localStorage.setItem("savedInfo",JSON.stringify(SavedInfo));
	}

	loadFromStorage = () => {
		const storedLocalInfo = localStorage.getItem("savedInfo");
		const parsedstoredLocalInfo = storedLocalInfo && JSON.parse(storedLocalInfo);
		if (parsedstoredLocalInfo) {
			return parsedstoredLocalInfo;
		} else {
			return undefined;
		}
    };

	getTodos = async() => {
		//maybe someday we want to get some todos from a data base or something theres a make request and fetch call set up ready for that. 
		// await makeRequest('https://jsonplaceholder.typicode.com/todos')
		// 	.then(response => {
		// 		todos = response;
		// 		this.setState({{toDos: todos}})
		// 	})
		
		//but for now, just return the current toDos
		return this.state.toDos
	}

	addTodo = async (title, e) => {
		if (e){
			e.preventDefault();
		}
		const passedIn = title;
		console.log(passedIn)
		if(title){
			//make a new list,
			const newList = await this.getTodos();
			// each to-do needs a unique id, in order to remove and complete to-dos with matching names 
			const idx = this.state.count + 1;
			this.setState({count: idx});
			//make the new todo
			const newTodo = {
				name: title,
				completed: false,
				id: idx
			}
			newList.push(newTodo);
			// push it to the state
			this.setState({toDos: newList});
			console.log('added' , newTodo)
		}
	}

	removeToDo = (id) => {
		if (id){
			this.state.toDos.map(async(item , i) => {
				if (item.id === id){
					//make a new list, 
					const newList = await this.getTodos();
					//modify the new list
					newList.splice(i, 1);
					//push it to the state
					this.setState({toDos: newList});
					console.log('removed' , item.name)
				}
			})
		}
	}

	completeTodo = (id) => {
		if (id) {
			this.state.toDos.map(async (item , i) =>{
				if (item.id === id){
					//make a new list, 
					const newList = await this.getTodos();
					//modify the new list
					newList[i].completed = true;
					//push it to the state
					this.setState({toDos: newList});
					console.log("completed " , item.name);
				}
			})
		}
	}

	render(props, state) {
		return (
			<div class={style.todo} id="todo">
				<h1>todo List</h1>
				<p>This is the todo component.</p>

				<AddToDoForm onSubmit={this.addTodo}/>
				<div class={style.todoListWrapper} id="todoListWrapper">

					<h2 class={style.listTitle} id="listTitle">My To-Do List</h2>
						{state.toDos.length ? state.toDos.map((todo, idx) => {
							return(
								<div class="todoItem">
									<TodoItem name={todo.name} remove={this.removeToDo} id={todo.id} completed={todo.completed} complete={this.completeTodo}/>
								</div>
							)
						}): null}
				</div>
			</div>
		)
	}
}