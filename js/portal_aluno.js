
document.addEventListener("DOMContentLoaded", function () {
  const tabelaBody = document.querySelector("#tabela-aluno tbody");
  const alunoLogado = JSON.parse(localStorage.getItem("alunoLogado"));

  // Se não houver aluno logado, mostra o aviso 
  if (!alunoLogado) {
    const mensagemAviso = document.getElementById("mensagem-aviso");
    mensagemAviso.style.display = "block";

    // Redireciona após 5 segundos
    setTimeout(() => {
      mensagemAviso.style.display = "none";
      window.location.href = "login_aluno.html";
    }, 5000);

    return;
  }
  // Busca curso e turma correspondentes
  const cursos = JSON.parse(localStorage.getItem("cursos")) || [];
  const turmas = JSON.parse(localStorage.getItem("turmas")) || [];

  const cursoAluno = cursos.find(curso => curso.nomeCurso === alunoLogado.curso);
  const turmaAluno = turmas.find(turma => turma.nomeTurma === alunoLogado.turma);
  // Cria nova linha com os dados do aluno
  const linha = document.createElement("tr");
  linha.innerHTML = `
    <td>${alunoLogado.nome}</td>
    <td>${alunoLogado.turma}</td>
    <td>${alunoLogado.curso}</td>
    <td>${cursoAluno ? cursoAluno.descricaoCurso : 'Descrição não encontrada'}</td>
  `;

  tabelaBody.appendChild(linha);
});

// Evento do botão sair
document.getElementById("btn-sair").addEventListener("click", function () {
  localStorage.removeItem("alunoLogado");
  window.location.href = "login_aluno.html";
});



