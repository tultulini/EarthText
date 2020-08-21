import styled, { css } from 'styled-components';
export const FormContainer = styled.div`
    margin: 100px;
`

export const FormTitle = styled.div`
    font-family:'Arial';
    font-size:45pt;
    margin-bottom:25pt;
`
export const ColorBox = styled.div`
width:16px;
height:16px;
border:dashed gray 1px; 
display:inline-block;
margin-right: 5px;
background:${props => props.background};
`

export const ActionGroupBox = styled.div`
    border: dashed gray 1px;
    border-radius: 5px;
    margin: 10px;
    max-height:500px;
    overflow-y:scroll;
`
export const ActionContainer = styled.div`
    border-bottom: dashed lightblue 1px;
    margin: 10px;
`
