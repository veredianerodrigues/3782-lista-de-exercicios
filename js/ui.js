import api from "./api.js";

const ui = {

  async preencherFormulario(filmeId) {
    const filme = await api.buscarFilmePorId(filmeId);
    document.getElementById("filme-id").value = filme.id;
    document.getElementById("filme-title").value = filme.title;
    document.getElementById("filme-year").value = filme.year;
  },

  limparFormulario() {
    const form = document.getElementById("filme-form");
    form.reset();
    // limpar campo oculto também
    document.getElementById("filme-id").value = "";
  },

  async renderizarFilmes(filmesFiltrados) {
    const listaFilmes = document.getElementById("lista-filmes");
    listaFilmes.innerHTML = "";
  
    try {
      const filmesParaRenderizar = filmesFiltrados || await api.buscarFilmes();
      filmesParaRenderizar.forEach(ui.adicionarFilmeNaLista);
    } catch (error) {
      alert('Erro ao renderizar filmes');
      console.error(error);
    }
  },

  adicionarFilmeNaLista(filme) {
    const listaFilmes = document.getElementById("lista-filmes");
    const li = document.createElement("li");
    li.setAttribute("data-id", filme.id);
    li.classList.add("li-filme");

    const filmeTitle = document.createElement("div");
    filmeTitle.textContent = filme.title;
    filmeTitle.classList.add("filme-title");

    const filmeYear = document.createElement("div");
    filmeYear.textContent = filme.year;
    filmeYear.classList.add("filme-year");

    const botaoEditar = document.createElement("button");
    botaoEditar.classList.add("botao-editar");
    botaoEditar.onclick = () => ui.preencherFormulario(filme.id);

    const iconeEditar = document.createElement("img");
    iconeEditar.src = "assets/imagens/icone-editar.png";
    iconeEditar.alt = "Editar";
    botaoEditar.appendChild(iconeEditar);

    const botaoExcluir = document.createElement("button");
    botaoExcluir.classList.add("botao-excluir");
    botaoExcluir.onclick = async () => {
      try {
        await api.excluirFilme(filme.id);
        ui.renderizarFilmes();
      } catch (error) {
        alert("Erro ao excluir filme");
        console.error(error);
      }
    };

    const iconeExcluir = document.createElement("img");
    iconeExcluir.src = "assets/imagens/icone-excluir.png";
    iconeExcluir.alt = "Excluir";
    botaoExcluir.appendChild(iconeExcluir);

    const icones = document.createElement("div");
    icones.classList.add("icones");
    icones.appendChild(botaoEditar);
    icones.appendChild(botaoExcluir);

    li.appendChild(filmeTitle);
    li.appendChild(filmeYear);
    li.appendChild(icones);
    listaFilmes.appendChild(li);
  }
};

export default ui;
