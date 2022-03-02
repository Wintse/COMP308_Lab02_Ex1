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
function UpdateStudent(props) {
   const updateUser = (event) => {
        event.preventDefault()
      
        window.location.href = `/students/update/${props.id}`
    }
    return (<Update onClick={updateUser}>Update</Update>);


}

function DeleteStudent(props) {
const    deleteUser = (event) => {
        event.preventDefault()

        if (
            window.confirm(
                `Do tou want to delete the student ${props.id} permanently?`,
            )
        ) {
            api.deleteStudentById(props.id)
            window.location.reload()
        }
    }
    return (<Delete onClick={deleteUser}>Delete</Delete>);
}

function StudentsList(props){
    const [students, setStudents] = useState([]);
  
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {

        const fetchData = async () => {
        

        setLoading(true);

        await api.getAllStudents().then(result => {
            setStudents(result.data.data);
            setLoading(false);

        }).catch((error) => {
            console.log('error in fetchData:', error)
          });
        };  
        fetchData();

    },[]);

    const columns = [
        {
            Header: 'Student Number',
            accessor: 'studentNumber',
            filterable: true,
        },
        {
            Header: 'First Name',
            accessor: 'firstName',
            filterable: true,
        },
        {
            Header: 'Last Name',
            accessor: 'lastName',
            filterable: true,
        },

        {
            Header: 'Address',
            accessor: 'address',
            filterable: true,
        },
        {
            Header: 'City',
            accessor: 'city',
            filterable: true,
        },
        {
            Header: 'Phone Number',
            accessor: 'phoneNumber',
            filterable: true,
        },
        {
            Header: 'Email',
            accessor: 'email',
            filterable: true,
        },
        {
            Header: 'Program',
            accessor: 'program',
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
                        <DeleteStudent id={props.original._id} />
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
                        <UpdateStudent id={props.original._id} />
                    </span>
                )
            },
        },
    ]


    let showTable = true
    if (!students.length) {
        showTable = false
    }

    return (
        <Wrapper>
        {showTable && (
            <ReactTable
                data={students}
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


export default StudentsList
