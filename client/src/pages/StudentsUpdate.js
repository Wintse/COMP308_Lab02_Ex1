import React, { useState, useEffect } from 'react'
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
function StudentsUpdate(props) {
    const [id, setId] = useState(props.match.params.id);
    const [firstName, setFirstName] = useState('');
    const [studentNumber, setStudentNumber] = useState('');
    const [time, setTime] = useState('');
    useEffect(()=>{
        const fetchData = async () => {
        const student = await api.getStudentById(id)
        setFirstName(student.data.data.firstName);
        setStudentNumber(student.data.data.studentNumber);
        setTime(student.data.data.time.join('/'));
        };
       fetchData(); 
    },[id]);
    const handleChangeInputStudentNumber = (event )=> {
        const value = event.target.validity.valid
            ? event.target.value
            : studentNumber

        setStudentNumber(value);
    }
    const handleUpdateStudent = async (event) =>{
        const arrayTime = time.split('/')
        const payload = { firstName, studentNumber, time: arrayTime }
        await api.updateStudentById(id, payload).then(res => {
            window.alert(`Student updated successfully`)
            setFirstName('');
            setStudentNumber('');
            setTime('');
            window.location.href = `/students/list`;
            
        })


    };

    return (
        <Wrapper>
            <Title>Create Student</Title>

            <Label>First Name: </Label>
            <InputText
                type="text"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
            />

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

            <Label>Time: </Label>
            <InputText
                type="text"
                value={time}
                onChange={e => setTime(e.target.value)}
            />

            <Button onClick={handleUpdateStudent}>Update Student</Button>
            <CancelButton href={'/students/list'}>Cancel</CancelButton>
        </Wrapper>
    );  
}


export default StudentsUpdate
