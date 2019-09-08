const React = require('react');
const MarkdownEditor =require('./MarkdownEditor');
class AddNote extends React.Component {

  render(){
    const handleChange= (e)=>{
      this.props.onReceiveContent(e);
    }
     return (
       <div>
         <input type='text' placeholder='Note title...' onChange={this.props.onReceiveTitle} />
         <MarkdownEditor value={this.props.value} onChange={handleChange}/>
         <button onClick={this.props.onAdd} className='btn btn-success'><i className="fa fa-check"></i></button>
         <button onClick={this.props.onCancel} className='btn btn-warning'>Cancel</button>
       </div>
     );
  }
}
module.exports=AddNote;