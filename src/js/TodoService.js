import '../../node_modules/normalize.css/normalize.css';
import '../style.css';

import { ModalServiceUpdate } from './ModalServiceUpdate.js'

export class TodoService {
    toToList;

    constructor(api) {
        this.api = api;
        this.toToList = window.document.querySelector('.todo-list');
        this._handleUpdate = this._handleUpdate.bind(this);
        this._handleRemove = this._handleRemove.bind(this);
        
        this.modalServiceUpdate = new ModalServiceUpdate(this, api);
    }

    addTodo(number, title, body, userId) {
        this.toToList.append(this._createTodo(number, title, body, userId));
    }

    _createTodo(number, title, body, userId) {
        const container = document.createElement('div');
        container.classList.add('todo-list__item');
        container.cardId = number;
        container.cardUserId = userId;
        container.classList.add('card');
        const header = document.createElement('div');
        header.classList.add('card__header');
        const content = document.createElement('div');
        content.classList.add('card__content');

        const numberEl = document.createElement('h3');
        numberEl.append(document.createTextNode('№'+number));
        numberEl.classList.add('card__number');

        const userIdEl = document.createElement('h3');
        this.api.fetchNamesById(userId).then((result) => userIdEl.append(document.createTextNode('Пользователь: '+ result.username)));

        userIdEl.classList.add('card__userId');

        const titleEl = document.createElement('h3');
        titleEl.append(document.createTextNode(title));
        titleEl.classList.add('card__title');

        content.append(document.createTextNode(body));
        content.classList.add('card__body');

        const btnEdit = document.createElement('button');
        btnEdit.append(document.createTextNode('Ред.'));
        btnEdit.classList.add('card__remove');

        const btnDelete = document.createElement('button');
        btnDelete.append(document.createTextNode('Удал.'));
        btnDelete.classList.add('card__remove');

        const btnsContainer = document.createElement('div');
        btnsContainer.classList.add('card__boxButton');
        btnsContainer.append(btnEdit);
        btnsContainer.append(btnDelete);
        
        header.append(numberEl);
        header.append(userIdEl);
        header.append(titleEl);
        header.append(btnsContainer);

        container.append(header);
        container.append(content);
        btnEdit.addEventListener('click', this._handleUpdate);
        btnDelete.addEventListener('click', this._handleRemove);
        
        return container;
    }

    updateTodo(card, title, body, userId) {
        card.cardUserId = userId;
        card.childNodes[0].childNodes[2].innerText = title;
        card.childNodes[1].innerText = body;
        
        this.api.fetchNamesById(userId).then((result) => card.childNodes[0].childNodes[1].innerText = 'Пользователь: '+ result.username);
    }

    _handleUpdate(event) {
        const card = event.target.parentElement.parentElement.parentElement;
        this.modalServiceUpdate.open(card);
    }

    _handleRemove(event) {
        const card = event.target.parentElement.parentElement.parentElement;
        this.api.remove(card.cardId).then((res) => {
            if (res.status >= 200 && res.status <= 300) {
                event.target.removeEventListener('click', this._handleRemove);
                card.remove();
            }
        });
    }
}