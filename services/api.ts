import { PostApi } from '../interfaces/postApi';

export async function fetchServicePost(): Promise<PostApi[]> {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  if (!response.ok) {
    throw new Error('Fallo en servicio get publicaciones');
  }
  const data = await response.json();
  return data;
}