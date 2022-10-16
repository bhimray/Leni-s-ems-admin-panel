import { useState } from "react";
import {useMutation} from 'react-query'
import {request, gql} from 'graphql-request'

const GRAPHQL_ENDPOINT= "https://localhost:8000/graphql/";

const formData = ({FORM_QUERY, queryVariables}) => request(GRAPHQL_ENDPOINT,
    FORM_QUERY,
    queryVariables,
    // headers
  );
console.log(formData)
export const useMutateData=()=>{
    return useMutation(formData)
}