import { h, Component } from 'preact';
import { useState } from 'preact/hooks';
import style from '../routes/todo/style.css';

export default class AddToDoForm extends Component {
    constructor(props){
		super(props)
	} 

    render(props){
        const [ToDoValue, setToDoValue] = useState('');

        return(
            <div class={style.formWrapper} id="formWrapper">
                <span>Add a new todo - </span>
                <form onSubmit={(e) => {props.onSubmit(ToDoValue,e); setToDoValue('')}}>
                    <input class="text-input" type="text" placeholder="I need to do X,Y and Z" value={ToDoValue} onChange={e => setToDoValue(e.target.value)}  />
                    <button type="submit">Add</button>
                </form>
            </div>
        )
    }
}

