import { h, Component } from 'preact';
import style from './style';
// import makeRequest from '../../fetch/fetch';
import TodoItem from '../../components/toDoItem.js';
import AddToDoForm from '../../components/AddTodoForm.js';

export default class TodoList extends Component {

	constructor(props){
		super(props)
		this.state = {
			toDos: [{
				name: "make some more todos",
				completed: false,
				id: 1
			}],
			count: 1
		}
	}

	getTodos = async() => {
		// await makeRequest('https://jsonplaceholder.typicode.com/todos')
		// 	.then(response => {
		// 		todos = response;
		// 		this.setState({{toDos: todos}})
		// 	})
		

		return this.state.toDos
	}

	addTodo = async (title) => {
		if(title){
			const newList = await this.getTodos();
			const idx = this.state.count + 1;
			this.setState({count: idx});
			const newTodo = {
				name: title,
				completed: false,
				id: idx
			}
			newList.push(newTodo);

			this.setState({toDos: newList});
			console.log('added' , newTodo)
		}
	}

	removeToDo = (id) => {
		if (id){
			console.log('remove me')
			this.state.toDos.map(async(item , i) => {
				if (item.id === id){
					const newList = await this.getTodos();
					newList.splice(i, 1);
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
					const newList = await this.getTodos();
					newList[i].completed = true;
					this.setState({toDos: newList});
					console.log("completed " , item.name);
				}
			})
		}
	}
	
	render(props, state) {
		
		return (
			<div class={style.todo}>
				<h1>todo List</h1>
				<p>This is the todo component.</p>

				<AddToDoForm onSubmit={this.addTodo}/>
				<div class={style.todoListWrapper}>

					<h2 class={style.listTitle}>My To-Do List</h2>
						{state.toDos.length ? state.toDos.map((todo, idx) => {
							return(
								<div>
									<TodoItem name={todo.name} remove={this.removeToDo} id={todo.id} completed={todo.completed} complete={this.completeTodo}/>
								</div>
							)
						}): null}
				</div>
			</div>
		)
	}
}