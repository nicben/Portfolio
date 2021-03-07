import React, { useState, useEffect} from 'react';
import './App.css';
import Axios from 'axios';

function App() {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [list, setList] = useState([]);
    const [newDes, setNewDec] = useState('');

    useEffect(() => {
        Axios.get('http://localhost:3001/api/get').then((response)=> {
            console.log(response.data)
            setList(response.data)

        })
    }, [])

    const submitProject = () => {
        Axios.post("http://localhost:3001/api/insert", {
            name:name,
            description: description,
        });

        setList([...list,
            {name: name, description: description},
        ]);
    };

    const updateProject = (id) => {
        Axios.put("http://localhost:3001/api/update", {
            description: newDes,
            id: id,
        });

        setNewDec("");
        setList([...list,
            {name: name, description: description},
        ]);
    };

   const deleteProject = (id) => {
       Axios.delete('http://localhost:3001/api/delete/'+id);

       setList([...list,
           {name: name, description: description},
       ]);
    }

    return (
    <div className="App">
        <h1>Nytt prosject</h1>
        <div className="form">
            <label>Navn:</label>
            <input className="name" type="text" name="name" onChange={(e) => { setName(e.target.value)}}/>
            <label>Beskrivelse:</label>
            <input className="description" type="text" name="description" onChange={(e) => { setDescription(e.target.value)}} />

            <button onClick={submitProject}>Lagre</button>

            {list.map((val)=> {
                return(
                    <div className="card">
                        <h3>{val.name} </h3>
                        <p>{val.description}</p>

                        <button onClick={() => {updateProject(val.id)}}>Oppdater</button>
                        <input type="text" id="updateInput" onChange={(e)=> {
                            setNewDec(e.target.value)
                        }}/>
                        <button onClick={() => {deleteProject(val.id)}}>Slett</button>
                    </div>
                );
            })}
        </div>
    </div>
  );
}

export default App;
