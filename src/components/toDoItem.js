import { h, Component } from 'preact';

import style from '../routes/todo/style.css';

export default class TodoItem extends Component {
    render(props){
        return(
             <>
                <div class={props.completed ? `${style.completed} completed ${style.todoItem}` : `${style.todoItem} todoItem`} idx={props.id}>
                    <div class={style.name}>{props.name}</div>
                    <div class={style.checkboxWrapper}>
                        <span>complete -</span>
                        <input type="checkbox" onClick={() => props.complete(props.id)} checked={props.completed}/>
                    </div>

                    <div class={`${style.removeButton} remove`} onClick={() => props.remove(props.id)}>X</div>
                </div>
            </>
        )
    }
}

