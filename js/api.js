import axios from "https://cdn.jsdelivr.net/npm/axios@1.6.7/dist/esm/axios.min.js";

const url = 'http://localhost:3000';
const API_KEY = '66feb25be14ca3f07d2aa37cb039187d';
const TMDB_POPULARES = 
  `https://api.themoviedb.org/3/movie/popular`
  + `?api_key=${API_KEY}&language=pt-BR&page=1`;

const api = {
  async buscarFilmes() {
    try {
      const response = await axios.get(TMDB_POPULARES);
      return response.data.results.map(f => ({
        id:    f.id,
        title: f.title,
        year:  Number(f.release_date.slice(0, 4))
      }));
    } catch (error) {
      alert('Erro ao buscar filmes');
      throw error;
    }
  },

  async salvarFilme(filme) {
    try {
      const response = await axios.post(`${url}/filmes`, filme);
      return response.data;
    } catch (error) {
      alert('Erro ao salvar filme');
      throw error;
    }
  },

  async buscarFilmePorId(id) {
    try {
      const response = await axios.get(`${url}/filmes/${id}`);
      return response.data;
    } catch (error) {
      alert('Erro ao buscar filme');
      throw error;
    }
  },

  async editarFilme(filme) {
    try {
      const response = await axios.put(
        `${url}/filmes/${filme.id}`, filme
      );
      return response.data;
    } catch (error) {
      alert('Erro ao editar filme');
      throw error;
    }
  },

  async excluirFilme(id) {
    try {
      await axios.delete(`${url}/filmes/${id}`);
    } catch (error) {
      alert('Erro ao excluir filme');
      throw error;
    }
  },

  async buscarFilmesPorTermo(termo) {
    try {
      const filmes = await this.buscarFilmes();
      const busca = termo.toLowerCase();
      return filmes.filter(f =>
        f.title.toLowerCase().includes(busca)
      );
    } catch (error) {
      alert('Erro ao filtrar filmes');
      throw error;
    }
  }
};

export default api