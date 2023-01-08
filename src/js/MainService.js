import '../../node_modules/normalize.css/normalize.css';
import '../style.css';

export class MainService {

    constructor(todoService, modalService, api) {
        this.modalService = modalService;
        this.api = api;
        this.todoService = todoService;
        document.getElementsByClassName('app');
        this.btnAdd = document.getElementById('addBtn');
        this.btnAdd.addEventListener('click', (e) => this._onOpenModal(e));

    }

    fetchAllTodo() {
        this.api.fetchAllTodos().then((todos) => {
            todos.forEach((todo) => this.todoService.addTodo(todo.id, todo.title, todo.body, todo.userId)
            );
        });
    }

    _onOpenModal() {
        this.modalService.open();
    }
}