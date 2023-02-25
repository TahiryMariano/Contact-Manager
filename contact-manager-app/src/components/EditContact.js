import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const EditContact = (props) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { contact } = location.state;
    const [User, setUser] = useState(contact);

    const update = (e) => {
        e.preventDefault();
        if (User.name === "" || User.email === "") {
            alert("All fields are required")
            return;
        }
        props.editContactHandler(User);
        setUser({ name: "", email: "" });
        navigate('/');
    }
    return (
        <div className="ui main container" style={{ marginTop: "4em" }} >
            <h2>Edit contact</h2>
            <form className="ui form" onSubmit={update}>
                <div className="field">
                    <label htmlFor="Name">Name</label>
                    <input
                        type="text"
                        id="Name"
                        placeholder="enter your name"
                        value={User.name}
                        onChange={e => setUser({ ...User, name: e.target.value })}
                    />
                </div>
                <div className="field">
                    <label htmlFor="Email">Email</label>
                    <input
                        type="email"
                        id="Email"
                        placeholder="enter your email"
                        value={User.email}
                        onChange={e => setUser({ ...User, email: e.target.value })}
                    />
                </div>
                <button className="ui button blue">Edit</button>
            </form>
        </div>
    )
}

export default EditContact