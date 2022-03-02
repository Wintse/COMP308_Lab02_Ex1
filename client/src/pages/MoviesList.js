import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table'
import api from '../api'

import styled from 'styled-components'

import 'react-table/react-table.css'

const Wrapper = styled.div`
    padding: 0 40px 40px 40px;
`

const Update = styled.div`
    color: #ef9b0f;
    cursor: pointer;
`

const Delete = styled.div`
    color: #ff0000;
    cursor: pointer;
`
function UpdateMovie(props) {
   const updateUser = (event) => {
        event.preventDefault()
      
        window.location.href = `/movies/update/${props.id}`
    }
    return (<Update onClick={updateUser}>Update</Update>);


}

function DeleteMovie(props) {
const    deleteUser = (event) => {
        event.preventDefault()

        if (
            window.confirm(
                `Do tou want to delete the movie ${props.id} permanently?`,
            )
        ) {
            api.deleteMovieById(props.id)
            window.location.reload()
        }
    }
    return (<Delete onClick={deleteUser}>Delete</Delete>);
}

function MoviesList(props){
    const [movies, setMovies] = useState([]);
  
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {

        const fetchData = async () => {
        

        setLoading(true);

        await api.getAllMovies().then(result => {
            setMovies(result.data.data);
            setLoading(false);

        }).catch((error) => {
            console.log('error in fetchData:', error)
          });
        };  
        fetchData();

    },[]);

    const columns = [
        {
            Header: 'ID',
            accessor: '_id',
            filterable: true,
        },
        {
            Header: 'Name',
            accessor: 'name',
            filterable: true,
        },
        {
            Header: 'Rating',
            accessor: 'rating',
            filterable: true,
        },
        {
            Header: 'Time',
            accessor: 'time',
            Cell: props => <span>{props.value.join(' / ')}</span>,
        },
        {
            Header: '',
            accessor: '',
            Cell: function(props) {
                return (
                    <span>
                        <DeleteMovie id={props.original._id} />
                    </span>
                )
            },
        },
        {
            Header: '',
            accessor: '',
            Cell: function(props) {
                return (
                    <span>
                        <UpdateMovie id={props.original._id} />
                    </span>
                )
            },
        },
    ]


    let showTable = true
    if (!movies.length) {
        showTable = false
    }

    return (
        <Wrapper>
        {showTable && (
            <ReactTable
                data={movies}
                columns={columns}
                loading={isLoading}
                defaultPageSize={10}
                showPageSizeOptions={true}
                minRows={0}
            />
        )}
    </Wrapper>
    )
}


export default MoviesList
