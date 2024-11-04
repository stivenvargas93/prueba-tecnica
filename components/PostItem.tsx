'use client';

import { PostApi } from '@/interfaces/postApi';
import Link from 'next/link';

interface PostItemProps {
  post: PostApi;
  editingPostId: number | null;
  editTitle: string;
  editBody: string;
  editImageUrl: string;
  setEditTitle: (title: string) => void;
  setEditBody: (body: string) => void;
  setEditImageUrl: (url: string) => void;
  handleSave: (id: number) => void;
  handleDelete: (id: number) => void;
  handleEdit: (id: number | null) => void;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>, setImageUrl: (url: string) => void) => void;
}

export default function PostItem({
  post,
  editingPostId,
  editTitle,
  editBody,
  editImageUrl,
  setEditTitle,
  setEditBody,
  setEditImageUrl,
  handleSave,
  handleDelete,
  handleEdit,
  handleImageUpload,
}: PostItemProps) {
  return (
    <li className="mb-4 p-4 border rounded shadow">
      {editingPostId === post.id ? (
        <div>
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="mt-2 p-2 border rounded w-full"
          />
          <textarea
            value={editBody}
            onChange={(e) => setEditBody(e.target.value)}
            className="mt-2 p-2 border rounded w-full"
          />
          <input
            type="file"
            onChange={(e) => handleImageUpload(e, setEditImageUrl)}
            className="mt-2 p-2 border rounded w-full"
          />
          {editImageUrl && <img src={editImageUrl} alt="Previsualizar" className="mt-2 w-32 h-32 object-cover rounded" />}
          <button onClick={() => handleSave(post.id)} className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700">
            Guardar
          </button>
          <button onClick={() => handleEdit(null)} className="mt-2 ml-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700">
            Cancelar
          </button>
        </div>
      ) : (
        <div>
          <Link href={`/pages/detalle/${post.id}`}>
            <div>
              {post.imageUrl && <img src={post.imageUrl} alt={post.title} className="w-32 h-32 object-cover mb-4 rounded" />}
              <h2 className="text-2xl font-semibold">{post.title}</h2>
              <p>{post.body}</p>
            </div>
          </Link>
          <button onClick={() => handleDelete(post.id)} className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700">
            Borrar
          </button>
          <button onClick={() => handleEdit(post.id)} className="mt-2 ml-2 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-700">
            Editar
          </button>
        </div>
      )}
    </li>
  );
}