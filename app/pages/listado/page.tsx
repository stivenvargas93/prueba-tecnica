'use client';

import { PostApi } from '@/interfaces/postApi';
import { useEffect, useState, useCallback } from 'react';
import PostItem from '@/components/PostItem';
import PostForm from '@/components/PostForm';
import { fetchServicePost } from '@/services/api';

export default function ListadoPage() {
  const [posts, setPosts] = useState<PostApi[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<PostApi[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingPostId, setEditingPostId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editBody, setEditBody] = useState('');
  const [editImageUrl, setEditImageUrl] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newBody, setNewBody] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false); // Nuevo estado para controlar la carga de datos
  const [page, setPage] = useState(1); // Estado para manejar la paginación

  const loadPosts = useCallback(async () => {
    setLoading(true);
    try {
      const sessionPosts = sessionStorage.getItem('posts');
      if (sessionPosts) {
        const parsedPosts = JSON.parse(sessionPosts);
        setPosts(parsedPosts);
        // Cargar los primeros 10 elementos
        setFilteredPosts(parsedPosts.slice(0, 10));
        // Marcar los datos como cargados
        setDataLoaded(true); 
      } else {
        const data = await fetchServicePost();
        setPosts(data);
        setFilteredPosts(data.slice(0, 10));
        sessionStorage.setItem('posts', JSON.stringify(data));
        setDataLoaded(true);
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Error al consumir el recurso de listado');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  // controlamos que se ejecuta una vez al montar el componente
  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 1 && !loading && dataLoaded) {
        const sessionPosts = sessionStorage.getItem('posts');
        if (sessionPosts) {
          const parsedPosts = JSON.parse(sessionPosts);
          const nextPage = page + 1;
          const newPosts = parsedPosts.slice(0, nextPage * 10);
          setFilteredPosts(newPosts);
          setPage(nextPage);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [page, loading, dataLoaded]);

  // Aplicar el filtro y la paginación
  useEffect(() => {
    const results = posts.filter(post =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPosts(results.slice(0, page * 10));
  }, [searchTerm, posts, page]);

  const handleDelete = (id: number) => {
    const updatedPosts = posts.filter(post => post.id !== id);
    setPosts(updatedPosts);
    setFilteredPosts(updatedPosts.slice(0, page * 10));
    sessionStorage.setItem('posts', JSON.stringify(updatedPosts));
  };

  const handleEdit = (id: number | null) => {
    if (id === null) {
      setEditingPostId(null);
      return;
    }
    const post = posts.find(post => post.id === id);
    if (post) {
      setEditingPostId(id);
      setEditTitle(post.title);
      setEditBody(post.body);
      setEditImageUrl(post.imageUrl || '');
    }
  };

  const handleSave = (id: number) => {
    const updatedPosts = posts.map(post => 
      post.id === id ? { ...post, title: editTitle, body: editBody, imageUrl: editImageUrl } : post
    );
    setPosts(updatedPosts);
    setFilteredPosts(updatedPosts.slice(0, page * 10));
    sessionStorage.setItem('posts', JSON.stringify(updatedPosts));
    setEditingPostId(null);
  };

  const handleAddPost = () => {
    const newPost: PostApi = {
      userId: 1,
      id: posts.length > 0 ? Math.max(...posts.map(post => post.id)) + 1 : 1,
      title: newTitle,
      body: newBody,
      imageUrl: newImageUrl,
    };
    const updatedPosts = [newPost, ...posts];
    setPosts(updatedPosts);
    setFilteredPosts(updatedPosts.slice(0, page * 10));
    sessionStorage.setItem('posts', JSON.stringify(updatedPosts));
    setNewTitle('');
    setNewBody('');
    setNewImageUrl('');
    setShowAddForm(false);
  };

  const handleShowAddForm = () => {
    setShowAddForm(true);
  };

  const handleCancelAddPost = () => {
    setShowAddForm(false);
    setNewTitle('');
    setNewBody('');
    setNewImageUrl('');
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, setImageUrl: (url: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold">Lista de Publicaciones</h1>
      <input
        type="text"
        placeholder="Buscar publicaciones."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mt-4 p-2 border rounded"
      />
      <div className="mt-4 w-full max-w-2xl">
        <button onClick={handleShowAddForm} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
          Crear Nueva Publicación
        </button>
        {showAddForm && (
          <PostForm
            newTitle={newTitle}
            newBody={newBody}
            newImageUrl={newImageUrl}
            setNewTitle={setNewTitle}
            setNewBody={setNewBody}
            setNewImageUrl={setNewImageUrl}
            handleAddPost={handleAddPost}
            handleCancelAddPost={handleCancelAddPost}
            handleImageUpload={handleImageUpload}
          />
        )}
      </div>
      <ul className="mt-4 w-full max-w-2xl">
        {filteredPosts.map((post) => (
          <PostItem
            key={post.id}
            post={post}
            editingPostId={editingPostId}
            editTitle={editTitle}
            editBody={editBody}
            editImageUrl={editImageUrl}
            setEditTitle={setEditTitle}
            setEditBody={setEditBody}
            setEditImageUrl={setEditImageUrl}
            handleSave={handleSave}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            handleImageUpload={handleImageUpload}
          />
        ))}
      </ul>
      {loading && <p>Un momento por favor cargando más publicaciones...</p>}
    </div>
  );
}