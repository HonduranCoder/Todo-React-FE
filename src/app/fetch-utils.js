import request from 'superagent'; 
const URL = 'https://todo-react-be.herokuapp.com'; 

export async function getTodos(token){
  const response = await request 
    .get(`${URL}/api/todos`)
    .set('Authorization', token);

  return response.body; 
}

export async function updateTodo(id, completed, token){
  const response = await request
    .put(`${URL}/api/todos/${id}`)
    .send({ completed: completed })
    .set('Authorization', token);
    
  return response.body;
}

export async function createTodo(todoTitle, token){
  const response = await request
    .post(`${URL}/api/todos`)
    .send({ todo: todoTitle })
    .set('Authorization', token);

  return response.body;
}

export async function login(email, password){
  const response = await request 
    .post(`${URL}/auth/signin`)
    .send({ email, password });

  return response.body;
}

export async function signUp(email, password){
  const response = await request 
    .post(`${URL}/auth/signup`)
    .send({ email, password });

  return response.body;
}
