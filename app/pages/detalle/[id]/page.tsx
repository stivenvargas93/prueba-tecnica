'use client';

import { PostApi } from "@/interfaces/postApi";
import { useEffect, useState } from "react";
import { use } from "react";

interface Props {
  params: Promise<{ id: string }>;
}

export default function DetallePage({ params }: Props) {
  //esperamos a que se resuelva la promesa para obtener los props
  const resolvedParams = use(params);

  const [post, setPost] = useState<PostApi | null>(null);
  const [error, setError] = useState<string | null>(null);

  //se obtiene el id de los parametros
  const id = resolvedParams.id;

  useEffect(() => {
    if (id) {
      const sessionPosts = sessionStorage.getItem('posts');
      if (sessionPosts) {
        const listPost: PostApi[] = JSON.parse(sessionPosts);
        const foundPost = listPost.find(post => post.id === Number(id));
        if (foundPost) {
          setPost(foundPost);
        } else {
          setError('Publicación no encontrada en la sesión');
        }
      } else {
        setError('No hay publicaciones guardadas en la sesión');
      }
    }
  }, [id]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!post) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold">{post.title}</h1>
      <p className="mt-4">{post.body}</p>
      {post.imageUrl && <img src={post.imageUrl} alt={post.title} className="mt-4 w-32 h-32 object-cover rounded" />}
      <button
        onClick={() => window.history.back()}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
      >
        Volver
      </button>
    </div>
  );
}