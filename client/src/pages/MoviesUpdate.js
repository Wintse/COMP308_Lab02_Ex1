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
function MoviesUpdate(props) {
    const [id, setId] = useState(props.match.params.id);
    const [name, setName] = useState('');
    const [rating, setRating] = useState('');
    const [time, setTime] = useState('');
    useEffect(()=>{
        const fetchData = async () => {
        const movie = await api.getMovieById(id)
        setName(movie.data.data.name);
        setRating(movie.data.data.rating);
        setTime(movie.data.data.time.join('/'));
        };
       fetchData(); 
    },[id]);
    const handleChangeInputRating = (event )=> {
        const value = event.target.validity.valid
            ? event.target.value
            : rating

        setRating(value);
    }
    const handleUpdateMovie = async (event) =>{
        const arrayTime = time.split('/')
        const payload = { name, rating, time: arrayTime }
        await api.updateMovieById(id, payload).then(res => {
            window.alert(`Movie updated successfully`)
            setName('');
            setRating('');
            setTime('');
            window.location.href = `/movies/list`;
            
        })


    };

    return (
        <Wrapper>
            <Title>Create Movie</Title>

            <Label>Name: </Label>
            <InputText
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
            />

            <Label>Rating: </Label>
            <InputText
                type="number"
                step="0.1"
                lang="en-US"
                min="0"
                max="10"
                pattern="[0-9]+([,\.][0-9]+)?"
                value={rating}
                onChange={handleChangeInputRating}
            />

            <Label>Time: </Label>
            <InputText
                type="text"
                value={time}
                onChange={e => setTime(e.target.value)}
            />

            <Button onClick={handleUpdateMovie}>Update Movie</Button>
            <CancelButton href={'/movies/list'}>Cancel</CancelButton>
        </Wrapper>
    );  
}


export default MoviesUpdate
