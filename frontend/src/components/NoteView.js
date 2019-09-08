const React = require('react');
const moment = require('moment');

class NoteView extends React.Component{
  constructor(props){
    super(props);
    this.state={dispContent:false};
  }
  render(){
    const onEdit = (event) => {
      event.preventDefault();
      this.props.onEdit(this.props.note.id);
    }
    const DisplayContent=(event)=>{
      event.preventDefault();
      const toggle = this.state.dispContent? false:true;
    	this.setState({dispContent:toggle});
  };

  const deleteNote=(event)=>{
    event.preventDefault();
    this.props.onDeleteNote(this.props.note.id);
  }
  return (
    <li className="blog-post" key={this.props.note.id}>
      <button onClick={deleteNote} className="btn btn-danger"><i className="fa fa-trash">Delete</i></button>
      <a role = 'button' className='Note-Title' onClick={DisplayContent}>
        {this.props.note.title}
      </a>
      <a role="button" title="Edit post"
        style={{ paddingRight: '8px' }}
        onClick={onEdit}>
        {/* Edit button to edit Note title and content */}
        <span className="fa fa-edit" />
      </a>
      {/*logical operator to display content depending on click of Note Title*/}
      {this.state.dispContent && <p>{this.props.note.content}</p>}
    </li>
  );
 }
}

module.exports = NoteView;
