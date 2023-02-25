import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddContact = (props) => {
    const navigate = useNavigate()
    const [User, setUser] = useState({ name: "", email: "" })

    const add = (e) => {
        e.preventDefault();
        if (User.name === "" || User.email === "") {
            alert("All fields are required")
            return;
        }
        props.addContactHandler(User);
        setUser({ name: "", email: "" });
        navigate('/');
        // console.log(this.props);
    }
    return (
        <div className="ui main container" style={{ marginTop: "4em" }} >
            <h2>Add contact</h2>
            <form className="ui form" onSubmit={add}>
                <div className="field">
                    <label htmlFor="Name">Name</label>
                    <input
                        type="text"
                        id="Name"
                        placeholder="enter your name"
                        value={User.name}
                        onChange={(e) => { setUser({ ...User, name: e.target.value }) }}
                    />
                </div>
                <div className="field">
                    <label htmlFor="Email">Email</label>
                    <input
                        type="email"
                        id="Email"
                        placeholder="enter your email"
                        value={User.email}
                        onChange={(e) => { setUser({ ...User, email: e.target.value }) }}
                    />
                </div>
                <button className="ui button blue">Add</button>
            </form>
        </div>
    )
}

export default AddContact