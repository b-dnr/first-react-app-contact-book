import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addNewContact } from '../redux/actions'
import { url } from '../helpers/url';
import Axios from 'axios';



function Form(props) {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");

    function addContact(e) {
        e.preventDefault()
        const data = {
            id: Date.now(),
            name,
            surname,
            phone,
            email
        }
            if(name !== '' && phone !== ''){
                (async function (){
                    const response = await Axios.post(url + "/posts", data)
                    props.addNewContact(data)
                    setName('')
                    setSurname('')
                    setPhone('')
                    setEmail('')
                }());
                    
            }
    }
    return (
        <div>
            <form onSubmit={(event) => addContact(event)}>
                <div className="form-group">
                    <input
                        className="form-control mb-4"
                        type="text"
                        placeholder="Имя"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        className="form-control mb-4"
                        type="text"
                        placeholder="Фамилия"
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}
                    />
                    <input
                        className="form-control mb-4"
                        type="number"
                        placeholder="Номер телефона"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                    <input
                        className="form-control mb-4"
                        type="text"
                        placeholder="Адрес электронной почты"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button className="btn btn-primary w-100" type="submit">
                        Добавить контакт
                    </button>
                </div>
            </form>
        </div>
    )
}


export default connect(null, { addNewContact })(Form);