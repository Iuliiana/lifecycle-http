import React from 'react';
import Note from "../components/crud/tools/Note"
import Form from "../components/crud/tools/Form";
import '../components/crud/Crud.css';
import initFetch from '../helpers/initFetch';

//fixme url обычно в .env. Здесь для наглядности
const {getFetch, postFetch, deleteFetch} = initFetch('http://localhost:7777/');

export class Crudpage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: [],
            form: {text: 'Дефолтная надпись'},
        }
        this.handleFormChange = this.handleFormChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleUpdateButtonClick = this.handleUpdateButtonClick.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
    }

    getLoadData() {
        getFetch('notes/')
            .then((data) => {
                this.setState({notes: data});
            })
            .catch((error) => console.log("не удалось загрузить заметки. ", error));
    }

    componentDidMount() {
        this.getLoadData();
    }

    componentDidUpdate(_, prevState) {
        if (this.state.notes.length > prevState.notes.length) {
            window.scrollTo(0, window.outerHeight);
        }
    }

    handleUpdateButtonClick() {
        this.getLoadData();
    }

    handleFormChange({target}) {
        const {name, value} = target;
        this.setState({form: {...this.state.form, [name]: value}});
    }

    handleFormSubmit(form) {
        postFetch('notes/', {text: form.text})
            .then((data) => {
                 if (data.success === true) {
                    this.getLoadData();
                }
            })
            .catch((error) => console.log("Не удалось загрузить заметку", error));
        this.setState({form: {text: ''}});
    }

    handleDeleteClick(id) {
        deleteFetch(`notes/${id}`, {text: this.state.form.text})
            .then((data) => {
                if (data.success === true) {
                    this.getLoadData();
                }
            })
            .catch((error) => console.log("Не удалось удалить заметку", error));
    }

    render() {
        return (
            <div>
                <h1>Notes</h1>
                <button
                    onClick={this.handleUpdateButtonClick}
                >
                    update
                </button>
                <ul>
                    {this.state.notes.map((note) => {
                        return (
                            <Note
                                key={note.id}
                                id={note.id}
                                text={note.text}
                                onDeleteClick={() => this.handleDeleteClick(note.id)}
                            />
                        );
                    })}
                </ul>
                <Form
                    onSubmit={this.handleFormSubmit}
                    onChange={this.handleFormChange}
                    form={this.state.form}
                />
            </div>
        );
    }
}
