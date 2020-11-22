import React from 'react'
export default function BackBar(props){
    return (
        <button onClick={()=>props.history.goBack()}>Back</button>
    )
}