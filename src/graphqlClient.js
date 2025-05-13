import axios from 'axios';


const graphQLClient = axios.create({
    baseURL: 'http://localhost:8000/graphql/',
    headers:{
        'Content-Type': 'application/json'
    }
});

export const Client = async(queryClient,variables = {}) => {
    const token = localStorage.getItem('token');
    if (token){
        graphQLClient.defaults.headers.common['Authorization'] = `JWT ${token}`;
    }
    else{
        delete graphQLClient.defaults.headers.common['Authorization'];
    }

    const response = await graphQLClient.post('', {
        query: queryClient,
        variables: variables
    });
    // console.log("GraphQL response:", response);
    if(response.data.errors==null){
        return response.data;
    }else{
        response.status = 400;
        
    }

    
};

export const EmailValidationClient = async(api_key,email) => {
    const response = await axios.get(`https://emailreputation.abstractapi.com/v1/?api_key=${api_key}&email=${email}`)
    return response;
}



