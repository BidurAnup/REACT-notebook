const React = require('react');
const moment = require('moment');
//const NoteList = require('./NoteList');
const NoteNew = require('./NoteNew');

class NotebookView extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
      const onClickNotebook = (event) => {
    	event.preventDefault();
      console.log(this.props.notebook.id);
    	this.props.loadData(this.props.notebook.id);
      this.props.setActive(this.props.notebook.id);// added to test active notebook

  };

  const DeleteNotebook = (event) => {
    event.preventDefault();
    this.props.onDelete(this.props.notebook.id);
  }

  return (
    <div className="blog-notebook">
      <h3 className="blog-notebook-title">
       <a onClick={onClickNotebook}>
        <li>{this.props.notebook.title}</li>
       </a>
       <button onClick={DeleteNotebook} className='btn btn-danger'><i className="fa fa-trash"> Delete</i></button>
      </h3>
    </div>
  );
};
}

module.exports = NotebookView;