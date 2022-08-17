import React from "react";
import { useContext, useEffect, useRef,useState } from "react";
import Notecontext from "../context/Notes/Notecontext";
import Notesitem from "./Notesitem";
import Addnotes from "./Addnotes";
import { useNavigate } from 'react-router-dom';

function Notes(props) {
  const navigate = useNavigate();
  const {showAlert}=props;
  const context = useContext(Notecontext);
  const { notes, getnotes ,editnote } = context;
  useEffect(() => {
      if(localStorage.getItem("token")){
        getnotes();
      }
      else{
        navigate("/login")
      }
  }, []);
  const ref=useRef(null);
  const refclose=useRef(null);
  const [note, setNote] = useState({id:"",etitle:"",edescription:"",etag:""});
  const updatenote = (currentnote) => {
    ref.current.click();
    setNote({id:currentnote._id,etitle:currentnote.title,edescription:currentnote.description,etag:currentnote.tag});
  };
  const handleonchange=(e)=>{ 
    setNote({...note,[e.target.name]:e.target.value})
}
const handleonclick=(e)=>{
    e.preventDefault();
    editnote(note.id,note.etitle,note.edescription,note.etag);
    props.showAlert("Notes has been updated","success");
    console.log("Updating a note...",note);
    refclose.current.click();
}
  return (
    <>
      <div className="container">
        <Addnotes showAlert={showAlert}/>
        <button
          ref={ref}
          type="button"
          className="btn btn-primary d-none"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Launch demo modal
        </button>

        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Modal title
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
              <form>
                  <div className="mb-3">
                      <label htmlFor="etitle" className="form-label">Title</label>
                      <input type="text" className="form-control" onChange={handleonchange} id="etitle" name="etitle" aria-describedby="emailHelp" value={note.etitle}/>
                  </div>
                  <div className="mb-3">
                      <label htmlFor="edescription" className="form-label">description</label>
                      <input type="etext" className="form-control" id="edescription" onChange={handleonchange} name="edescription" value={note.edescription}/>
                  </div>
                  <div className="mb-3">
                      <label htmlFor="etag" className="form-label">tag</label>
                      <input type="text" className="form-control" onChange={handleonchange} id="etag" name="etag" value={note.etag}/>
                  </div>
              </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  ref={refclose}
                >
                  Close
                </button>
                <button type="button" className="btn btn-primary" onClick={handleonclick}>
                  Update Note
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-2">
        <h1>Your Notes</h1>
        <div className="container mx-2">
          {notes.lenght===0 && "No Notes to display"}
        </div>
        {notes.map((note) => {
          return (
            <Notesitem note={note} key={note._id} updatenote={updatenote} showAlert={showAlert}/>
          );
        })}
      </div>
    </>
  );
}

export default Notes;
