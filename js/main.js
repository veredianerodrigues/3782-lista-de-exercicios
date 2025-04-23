// main.js
import ui from './ui.js';
import api from './api.js';

document.addEventListener('DOMContentLoaded', init);

async function init() {
  document.getElementById('filme-form')
    .addEventListener('submit', manipularSubmissaoFormulario);
  document.getElementById('botao-cancelar')
    .addEventListener('click', manipularCancelamento);
  document.getElementById('campo-busca')
    .addEventListener('input', manipularBusca);

  await carregarEExibirFilmes();
}

async function carregarEExibirFilmes() {
  try {
    const filmes = await api.buscarFilmes();
    ui.renderizarFilmes(filmes);
  } catch (error) {
    alert('Erro ao carregar filmes');
    console.error(error);
  }
}

async function manipularSubmissaoFormulario(event) {
  event.preventDefault();
  const id    = document.getElementById('filme-id').value;
  const title = document.getElementById('filme-title').value;
  const year  = Number(document.getElementById('filme-year').value);

  try {
    if (id) {
      await api.editarFilme({ id: Number(id), title, year });
    } else {
      await api.salvarFilme({ title, year });
    }
    ui.limparFormulario();
    await carregarEExibirFilmes();
  } catch (error) {
    alert('Erro ao salvar filme');
    console.error(error);
  }
}

function manipularCancelamento() {
  ui.limparFormulario();
}

async function manipularBusca() {
  const termo = document.getElementById('campo-busca').value;
  try {
    const filtrados = await api.buscarFilmesPorTermo(termo);
    ui.renderizarFilmes(filtrados);
  } catch (error) {
    alert('Erro ao realizar busca');
    console.error(error);
  }
}
