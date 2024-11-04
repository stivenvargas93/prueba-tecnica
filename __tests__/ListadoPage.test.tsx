import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { fetchServicePost } from '@/services/api';
import { PostApi } from '@/interfaces/postApi';
import ListadoPage from '@/app/pages/listado/page';

jest.mock('@/services/api');

const mockPosts: PostApi[] = [
  { userId: 1, id: 1, title: 'titulo 1', body: 'cuerpo test 1', imageUrl: '' },
  { userId: 1, id: 2, title: 'titulo 2', body: 'cuerpo test 2', imageUrl: '' },
];

describe('ListadoPage', () => {
  beforeEach(() => {
    (fetchServicePost as jest.Mock).mockResolvedValue(mockPosts);
    sessionStorage.clear();
  });

  it('navegar a la lista de publicaciones', async () => {
    render(<ListadoPage />);

    await waitFor(() => {
      expect(screen.getByText('Lista de Publicaciones')).toBeInTheDocument();
    });

    mockPosts.forEach((post) => {
      expect(screen.getByText(post.title)).toBeInTheDocument();
    });
  });

  it('filtrar las publicaciones por título', async () => {
    render(<ListadoPage />);

    await waitFor(() => {
      expect(screen.getByText('Lista de Publicaciones')).toBeInTheDocument();
    });

    fireEvent.change(screen.getByPlaceholderText('Buscar publicaciones.'), {
      target: { value: 'Post 1' },
    });

    expect(screen.getByText('Post 1')).toBeInTheDocument();
    expect(screen.queryByText('Post 2')).not.toBeInTheDocument();
  });

  it('agregar una nueva publicación', async () => {
    render(<ListadoPage />);

    await waitFor(() => {
      expect(screen.getByText('Lista de Publicaciones')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Crear Nueva Publicación'));

    fireEvent.change(screen.getByPlaceholderText('Título'), {
      target: { value: 'Nuevo Post' },
    });
    fireEvent.change(screen.getByPlaceholderText('Cuerpo'), {
      target: { value: 'Nuevo Cuerpo' },
    });

    fireEvent.click(screen.getByText('Guardar'));

    await waitFor(() => {
      expect(screen.getByText('Nuevo Post')).toBeInTheDocument();
    });
  });
});