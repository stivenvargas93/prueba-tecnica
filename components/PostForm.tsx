'use client';

interface PostFormProps {
  newTitle: string;
  newBody: string;
  newImageUrl: string;
  setNewTitle: (title: string) => void;
  setNewBody: (body: string) => void;
  setNewImageUrl: (url: string) => void;
  handleAddPost: () => void;
  handleCancelAddPost: () => void;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>, setImageUrl: (url: string) => void) => void;
}

export default function PostForm({
  newTitle,
  newBody,
  newImageUrl,
  setNewTitle,
  setNewBody,
  setNewImageUrl,
  handleAddPost,
  handleCancelAddPost,
  handleImageUpload,
}: PostFormProps) {
  return (
    <div className="mt-4 p-4 border rounded shadow">
      <h2 className="text-2xl font-semibold">Agregar Nueva Publicación</h2>
      <input
        type="text"
        placeholder="Título"
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
        className="mt-2 p-2 border rounded w-full"
      />
      <textarea
        placeholder="Cuerpo"
        value={newBody}
        onChange={(e) => setNewBody(e.target.value)}
        className="mt-2 p-2 border rounded w-full"
      />
      <input
        type="file"
        onChange={(e) => handleImageUpload(e, setNewImageUrl)}
        className="mt-2 p-2 border rounded w-full"
      />
      {newImageUrl && <img src={newImageUrl} alt="Previsualizar" className="mt-2 w-32 h-32 object-cover rounded" />}
      <button onClick={handleAddPost} className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700">
        Guardar
      </button>
      <button onClick={handleCancelAddPost} className="mt-2 ml-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700">
        Cancelar
      </button>
    </div>
  );
}