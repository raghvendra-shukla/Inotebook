import React,{useContext,useState} from 'react';
import Notecontext from '../context/Notes/Notecontext';

function Addnotes(props) {
    const [note, setNote] = useState({title:"",description:"",tag:""});
    const context=useContext(Notecontext);
    const {addnote}=context;
    const handleonchange=(e)=>{ 
        setNote({...note,[e.target.name]:e.target.value})
    }
    const handleonclick=(e)=>{
        e.preventDefault();
        addnote(note.title,note.description,note.tag)
        setNote({title:"",description:"",tag:""})
        props.showAlert("Notes has been added successfully","success");
    }
  return (
    <div>
        <h1>Add a Note</h1>
        <form>
            <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input type="text" className="form-control" onChange={handleonchange} id="title" name="title" aria-describedby="emailHelp" minLength={5} required value={note.title}/>
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">description</label>
                <input type="text" className="form-control" id="description" onChange={handleonchange} name="description" minLength={5} required value={note.description}/>
            </div>
            <div className="mb-3">
                <label htmlFor="tag" className="form-label">tag</label>
                <input type="text" className="form-control" onChange={handleonchange} id="tag" name="tag" minLength={5} required value={note.tag}/>
            </div>
            <button disabled={note.title.length<5|| note.description.length<5}type="submit" className="btn btn-primary" onClick={handleonclick}>Add Note</button>
        </form>
    </div>
  )
}

export default Addnotes