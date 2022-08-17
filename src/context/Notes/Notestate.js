import {useState} from "react";
import Notecontext from "./Notecontext";

const NoteState=(props)=>{
    const host="http://localhost:5000";
    const initialNotes=[];
        const [notes, setNotes] = useState(initialNotes);
        //get all notes
        const getnotes=async()=>{
          //API call
          const response = await fetch(`${host}/api/notes/fetchalluser`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              "auth-token": localStorage.getItem("token"),
            },
          });
          const json= await response.json();
          setNotes(json);
        }
        //Adding a note
        const addnote= async(title,description,tag)=>{
          //API call
          const response = await fetch(`${host}/api/notes/addnotes`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              "auth-token": localStorage.getItem("token"),
            },
            body: JSON.stringify(title,description,tag)
          });
          const note= await response.json();
          setNotes(notes.concat(note));
        }
        //Deleting a notes
        const deletenote=async(id)=>{
          //Deleting a note
          const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              "auth-token": localStorage.getItem("token")
            },
            body: JSON.stringify()
          });
          const json=response.json();
          console.log("deleting the note with id"+ id);
          const newNote=notes.filter((note)=>{return note._id!==id});
          setNotes(newNote);
        }
        //editing a note
        const editnote=async (id,title,description,tag)=>{
          // Api call
          const response = await fetch(`${host}/api/notes//updatenote/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              "auth-token": localStorage.getItem("token"),
            },
            body: JSON.stringify(title,description,tag)
          });
          const json=response.json(); 
          //logic to Editing a note
          const newnotes=JSON.parse(JSON.stringify(notes))
          for (let index = 0; index < newnotes.length; index++) {
            const element = newnotes[index];
            if(element._id===id){
              newnotes[index].title=title;
              newnotes[index].description=description;
              newnotes[index].tag=tag;
              break;
            }
          }
          setNotes(newnotes);
        }
    return(
        <Notecontext.Provider value={{notes,addnote,deletenote,editnote,getnotes}}>
            {props.children}
        </Notecontext.Provider>
    )
}
export default NoteState;