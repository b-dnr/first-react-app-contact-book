import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { getContacts, deleteContact, saveContact } from '../redux/actions';
import { url } from '../helpers/url'
import { useCustomFetch } from '../helpers/customFetch';
import Axios from 'axios';

function Notes(props) {
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')

    const [isEdit, setIsEdit] = useState(null)
    
    const { data } = useCustomFetch({ 
        url: url + "/posts"
    })
    
    useEffect(() => {
        if (data)props.getContacts(data)
    }, [data])

   
    function delData(id){
        async function delContact(id){
            const res = await Axios.delete(`${url}/posts/${id}`)
            props.deleteContact(id)
            //  console.log(res)
            Axios.get(url+"/posts")
            .then(({data})=>{
                props.getContacts(data)
            })
        }
        delContact(id)
    }


    function editData({name, surname, phone, email, id}){
        console.log("Edit:", id)
        setName(name)
        setSurname(surname)
        setPhone(phone)
        setEmail(email)
        if(isEdit !== id){
            setIsEdit(id)
        }else{
            setIsEdit(  '')
        }
   }
    function saveData(id){
        const data = {
            id,
            name,
            surname,
            phone,
            email
        }
        setIsEdit("")
        async function saveContact(id){
            const res = await Axios.patch(`${url}/posts/${id}`, data)
            props.saveContact(data)          
        }
        saveContact(id)
    }


    return (
        <div className="list-group">
            {props.contacts ? props.contacts.map(item => (
                <li key={item.id} className="list-group-item d-flex justify-content-between">
                    {isEdit === item.id ?

                    <div>
                        <input className="w-50 mb-1 mr-1 " value={name} 
                        onChange={(e)=> setName(e.target.value)}/>
                        <input className="w-50 mb-1 mr-1" value={surname} 
                        onChange={(e)=>setSurname(e.target.value)}/>
                        <input className="w-50 mb-1 mr-1" value={phone} 
                        onChange={(e)=>setPhone(e.target.value)}/>
                        <input className="w-50 mb-1 mr-1" value={email} 
                        onChange={(e)=>setEmail(e.target.value)}/>
                        <button className="btn btn-success btn-sm mr-3 w-50"
                        onClick={()=>saveData(item.id)}>save</button>
                    </div> : 
                        <p>
                            Имя:  {item.name} <br/>
                            Фамилия:  {item.surname} <br/>
                            Номер телефона: {item.phone} <br/>
                            Адрес эл. почты: {item.email}
                        </p>}
                        
                    <div>
                       
                    <button className="btn btn-warning btn-sm mr-3 w-100" 
                    onClick={()=>editData(item)}>edit</button>
                    <button className="btn btn-danger btn-sm w-100 mt-2"
                    onClick={()=>delData(item.id)}>delete</button>
                    </div>
                </li>
            )) : <p>Список контактов пуст</p>}
        </div>
    )
}

const mapStateToProps = (state) => {
    let { contacts } = state.ContactReducer
    return { contacts }
}

export default connect(mapStateToProps, { getContacts, deleteContact, saveContact })(Notes);
