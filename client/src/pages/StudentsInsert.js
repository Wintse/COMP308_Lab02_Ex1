import React, { useState } from 'react'
import api from '../api'

import styled from 'styled-components'

const Title = styled.h1.attrs({
    className: 'h1',
})``

const Wrapper = styled.div.attrs({
    className: 'form-group',
})`
    margin: 0 30px;
`

const Label = styled.label`
    margin: 5px;
`

const InputText = styled.input.attrs({
    className: 'form-control',
})`
    margin: 5px;
`

const Button = styled.button.attrs({
    className: `btn btn-primary`,
})`
    margin: 15px 15px 15px 5px;
`

const CancelButton = styled.a.attrs({
    className: `btn btn-danger`,
})`
    margin: 15px 15px 15px 5px;





    `


    function StudentsInsert(props) {
        const [firstName, setFirstName] = useState('');
        const [lastName, setLastName] = useState('');
        const [password, setPassword] = useState('');
        const [address, setAddress] = useState('');
        const [city, setCity] = useState('');
        const [studentNumber, setStudentNumber] = useState('');
        const [phoneNumber, setPhoneNumber] = useState(''); 
        const [email, setEmail] = useState(''); 
        const [program, setProgram] = useState(''); 
        const [time, setTime] = useState('');
        const handleChangeInputStudentNumber = (event )=> {
            const value = event.target.validity.valid
                ? event.target.value
                : studentNumber
    
            setStudentNumber(value);
        }
        const handleAddStudent = async (event) =>{
            const arrayTime = time.split('/')
            const payload = { firstName, lastName, password, address, city, phoneNumber, email, program, studentNumber, time: arrayTime }
            await api.insertStudent(payload).then(res => {
                window.alert(`Student inserted successfully`)
                setFirstName('');
                setLastName('');
                setPassword('');
                setAddress('');
                setCity('');
                setStudentNumber('');
                setPhoneNumber('');
                setEmail('');
                setProgram('');
                setTime('');
                window.location.href = `/students/list`;
                
            })


        };

            
        return (
            <Wrapper>
                <Title>Create Student</Title>
                
                <Label>Student Number: </Label>
                <InputText
                    type="number"
                    step="0.1"
                    lang="en-US"
                    min="0"
                    max="10"
                    pattern="[0-9]+([,\.][0-9]+)?"
                    value={studentNumber}
                    onChange={handleChangeInputStudentNumber}
                />

                <Label>First Name: </Label>
                <InputText
                    type="text"
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                />

                <Label>Last Name: </Label>
                <InputText
                    type="text"
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                />

                <Label>Password: </Label>
                <InputText
                    type="text"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <Label>Address: </Label>
                <InputText
                    type="text"
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                />
                <Label>City: </Label>
                <InputText
                    type="text"
                    value={city}
                    onChange={e => setCity(e.target.value)}
                />
                <Label>Phone Number: </Label>
                <InputText
                    type="text"
                    value={phoneNumber}
                    onChange={e => setPhoneNumber(e.target.value)}
                />

                <Label>Email: </Label>
                <InputText
                    type="text"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />

                <Label>Program: </Label>
                <InputText
                    type="text"
                    value={program}
                    onChange={e => setProgram(e.target.value)}
                />

                <Label>Time: </Label>
                <InputText
                    type="text"
                    value={time}
                    onChange={e => setTime(e.target.value)}
                />

                <Button onClick={handleAddStudent}>Add Student</Button>
                <CancelButton href={'/students/list'}>Cancel</CancelButton>
            </Wrapper>
        );
        }

export default StudentsInsert
