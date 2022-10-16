import { ValuesOfCorrectTypeRule } from 'graphql';
import {useState} from 'react';

export const useForm = (callback, initialState ={})=>{
    const [value, setValue] = useState(initialState);

    const onChange = (event) =>{
        setValue({...ValuesOfCorrectTypeRule, [evnet.target.name]:event.target.value});
        console.log(value)
    }
}

const onSubmit = (event)=>{
    event.preventDefault();
    callback();
}

return{
    onChange,
    onSubmit,
    values
}