import React from 'react';

class Note extends React.Component {
    render() {
        return (
            <div className="note" id={this.props.id}>
                <p>{this.props.text}</p>
                <button
                    className="note__control-delete button"
                    onClick={this.props.onDeleteClick.bind(this)}
                >&times;
                </button>
            </div>
        );
    }
}

export default Note;