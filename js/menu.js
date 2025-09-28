// Seleciona os botões - manipular o html (DOM)
const btnHome = document.getElementById('btn-home');
const btnAlunos = document.getElementById('btn-alunos');
const btnTurmas = document.getElementById('btn-turmas');
const btnCursos = document.getElementById('btn-cursos');
const btnSair = document.getElementById('btn-sair');

// Redireciona para a "Home" - cria o evento no botão ao clicar
btnHome.addEventListener('click', () => {
  window.location.href = "home.html"; // crie uma se desejar
});

// Redireciona para o módulo de alunos - cria o evento no botão ao clicar
btnAlunos.addEventListener('click', () => {
  window.location.href = "aluno.html";
});

// Redireciona para o módulo de turmas - cria o evento no botão ao clicar
btnTurmas.addEventListener('click', () => {
  window.location.href = "turma.html";
});

// Redireciona para o módulo de cursos - cria o evento no botão ao clicar
btnCursos.addEventListener('click', () => {
  window.location.href = "curso.html";
});

// Redireciona para a tela de login - cria o evento no botão ao clicar
btnSair.addEventListener('click', () => {
  window.location.href = "login.html";
});
