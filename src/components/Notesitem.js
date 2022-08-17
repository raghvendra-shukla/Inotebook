import React,{useContext} from 'react';
import Notecontext from '../context/Notes/Notecontext';

function Notesitem(props) {
    const {note,updatenote}=props;
    const context=useContext(Notecontext);
    const {deletenote}=context;
  return (
    <>
        <div className="col-md-3 my-2">
            <div className="card">
                <div className="card-body">
                    <div className='d-flex '>
                        <h5 className="card-title">{note.title}</h5>
                        <i className="fa-solid fa-trash mx-2 mt-1" onClick={()=>{deletenote(note._id);props.showAlert("Deleted successfully","success")}}></i>
                        <i className="fa-solid fa-pen mx-2 mt-1" onClick={()=>{updatenote(note);props.showAlert("Updated successfully","success")}}></i>
                    </div>
                    <p className="card-text">{note.description}</p>
                </div>
            </div>
        </div>
    </>
  )
}

export default Notesitem