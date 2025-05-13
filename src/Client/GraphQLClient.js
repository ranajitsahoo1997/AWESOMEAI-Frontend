// Client.js
import axios from 'axios';

const graphQLClient = axios.create({
  baseURL: 'http://localhost:8000/graphql/',
});

export const Client = async (queryClient, variables = {}) => {
  const token = localStorage.getItem('token');

  if (token) {
    graphQLClient.defaults.headers.common['Authorization'] = `JWT ${token}`;
  } else {
    delete graphQLClient.defaults.headers.common['Authorization'];
  }

  const hasFile = Object.values(variables).some((value) => value instanceof File);

  if (hasFile) {
    const formData = new FormData();

    const fileMap = {};
    const fileIndexMap = {};
    let fileIdx = 0;

    const processedVariables = {};
    for (const key in variables) {
      const value = variables[key];
      if (value instanceof File) {
        fileMap[fileIdx] = [`variables.${key}`];
        fileIndexMap[fileIdx] = value;
        processedVariables[key] = null;
        fileIdx++;
      } else {
        processedVariables[key] = value;
      }
    }

    formData.append(
      'operations',
      JSON.stringify({
        query: queryClient,
        variables: processedVariables,
      })
    );
    formData.append('map', JSON.stringify(fileMap));

    Object.entries(fileIndexMap).forEach(([i, file]) => {
      formData.append(i, file);
    });

    const response = await graphQLClient.post('', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (!response.data.errors) {
      return response.data;
    } else {
      throw new Error(JSON.stringify(response.data.errors));
    }
  } else {
    const response = await graphQLClient.post('', {
      query: queryClient,
      variables: variables,
    });

    if (!response.data.errors) {
      return response.data;
    } else {
      throw new Error(JSON.stringify(response.data.errors));
    }
  }
};
