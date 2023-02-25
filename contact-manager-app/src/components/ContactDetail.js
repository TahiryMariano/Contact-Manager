import React from "react";
import user from "../images/user.png"
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

const ContactDetail = () => {
    const location = useLocation()
    const { contact } = location.state
    console.log("ato anaty contactDetail");
    console.log(contact);
    // const { name, email } = props.location.state.contact;
    return (
        <div className="main" >
            <div className="ui card  aligned centered">
                <div className="image">
                    <img src={user} alt="user" />
                </div>
                <div className="content">
                    <div className="header">{contact.name}</div>
                    <div className="description">{contact.email}</div>
                </div>
            </div>
            <div className="center-div">
                <Link to="/">
                    <button className="ui icon left labeled green button"><i aria-hidden="true" className="left arrow icon"></i>Back to Contact List</button>
                </Link>
            </div>
        </div>
    )
}

export default ContactDetail