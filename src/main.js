import '../node_modules/normalize.css/normalize.css';
import './style.css';

import { ApiService } from './js/ApiService.js'
import { TodoService } from './js/TodoService.js'
import { MainService } from './js/MainService.js'
import { ModalServiceCreate } from './js/ModalServiceCreate.js'

/*
 * Задание:
 * Реализовать ToDoList приложение которое будет отображать список всех дел
 * Можно: просмотреть список всех дел, добавить todo и удалить, а так же изменить
 */

const api = new ApiService();
const todoService = new TodoService(api);
const modalService = new ModalServiceCreate(todoService, api);
const service = new MainService(todoService, modalService, api);
service.fetchAllTodo();
