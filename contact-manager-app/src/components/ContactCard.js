import React from "react"
import user from '../images/user.png'
import { Link } from 'react-router-dom'

const ContactCard = (props) => {
    const { id, name, email } = props.contact
    return (
        <div className="item " >
            <img
                className="ui avatar image"
                src={user}
                alt="user"
            />
            <div className="content">
                <Link to={`/contact/${id}`} state={{ contact: props.contact }}>
                    <div className="content" >
                        <div className="header">{name}</div>
                        <div>{email}</div>
                    </div>
                </Link>
            </div>
            <i
                className="trash alternate outline icon right floated"
                style={{ color: "red", marginLeft: "10px", fontSize: "20px", marginTop: "4px" }}
                onClick={() => props.clickHandler(id)}
            >
            </i>
            <Link to={`/edit`} state={{ contact: props.contact }}>
                <i
                    className="edit alternate outline icon right floated"
                    style={{ color: "blue", fontSize: "20px", marginTop: "4px" }}

                >
                </i>
            </Link>
        </div >
    )
}

export default ContactCard