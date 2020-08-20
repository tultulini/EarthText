import styled, { css } from 'styled-components';
export const FormContainer = styled.div`
    margin: 100px;
`

export const FormTitle = styled.div`
    font-family:'Arial';
    font-size:45pt;
    margin-bottom:25pt
`
export const ColorBox = styled.div`
width:16px;
height:16px;
border:dashed gray 1px; 
display:inline-block;
margin-right: 5px;
background:${props => props.background}
`