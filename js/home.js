// Carrega dados ao iniciar a página - DOMContentLoaded com os filtros 
document.addEventListener('DOMContentLoaded', function () {
  carregarFiltros();
  carregarAlunos();

  document.getElementById("filtro-turma").addEventListener("change", carregarAlunos);
  document.getElementById("filtro-curso").addEventListener("change", carregarAlunos);
});

//Função para carregar turmas e cursos cadastrados direto do localStorage
function carregarFiltros() {
  const turmas = JSON.parse(localStorage.getItem("turmas")) || [];
  const cursos = JSON.parse(localStorage.getItem("cursos")) || [];

  //variaveis para manipular o elementos do HTML
  const filtroTurma = document.getElementById("filtro-turma");
  const filtroCurso = document.getElementById("filtro-curso");

  // Limpa selects (mantém a opção "Todas")
  filtroTurma.innerHTML = '<option value="">Todas</option>';
  filtroCurso.innerHTML = '<option value="">Todos</option>';

  turmas.forEach(turma => {
    //tem que criar a opção de cada turma cadastrada no select para ser filtrado
    const option = document.createElement("option");
    option.value = turma.nomeTurma; 
    option.textContent = turma.nomeTurma;
    filtroTurma.appendChild(option);
  });
  
  cursos.forEach(curso => {
    //semelhante para os cursos cadastrados
    const option = document.createElement("option");
    option.value = curso.nomeCurso; 
    option.textContent = curso.nomeCurso;
    filtroCurso.appendChild(option);
  });
}


// Carrega os alunos com os filtros aplicados
function carregarAlunos() {

  //variavel para puxar os dados armazenados para ser usado no JavaScript
  const alunos = JSON.parse(localStorage.getItem("alunos")) || [];
  const tabela = document.getElementById("tabela-alunos");
  tabela.innerHTML = "";
  //manipular os elementos do HTML
  const filtroTurma = document.getElementById("filtro-turma").value;
  const filtroCurso = document.getElementById("filtro-curso").value;

  const alunosFiltrados = alunos.filter(aluno => {
    //se filtro for vazio(todas), é True , e se o filtro for uma turma especifica so mostra o aluno se for a mesma turma cadastarda pra ele; mesma logica para o curso
    return (!filtroTurma || aluno.turma === filtroTurma) &&
           (!filtroCurso || aluno.curso === filtroCurso);
  });

  //com função , criar a tabela com os dados dos alunos filtrados; tb criar os botões para editar e excluir
  alunosFiltrados.forEach((aluno, index) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${aluno.nome}</td>
      <td>${aluno.idade}</td>
      <td>${aluno.matricula}</td>
      <td>${aluno.turma}</td>
      <td>${aluno.curso}</td>
      <td>
        <button class="editar" data-index="${index}">Editar</button>
        <button class="excluir" data-index="${index}">Excluir</button>
      </td>
    `;

    tabela.appendChild(tr);
  });

  adicionarEventos();
}

// Adiciona eventos aos botões ao clicar
function adicionarEventos() {
  document.querySelectorAll(".excluir").forEach(btn => {
    btn.addEventListener("click", excluirAluno);
  });

  document.querySelectorAll(".editar").forEach(btn => {
    btn.addEventListener("click", editarAluno);
  });
}


let indexParaExcluir = null; // Armazena temporariamente o índice do aluno a ser excluído

function excluirAluno(event) {
  //Variavel que vai pegar a posição de uma aluno na lista de aluno armazenado no localStorage. Está pegando o valor do atributo data-index do botão que foi clicado(event.target)
  indexParaExcluir = event.target.dataset.index;
  //manipular o elemento do HTML inserindo estilização (CSS)
  document.getElementById("modal-confirmacao").style.display = "flex";
}

// Confirmar exclusão
//manipular o elemento do HTML e cria o evento ao clicar
document.getElementById("btn-confirmar-exclusao").addEventListener("click", function () {
  const alunos = JSON.parse(localStorage.getItem("alunos")) || [];
  alunos.splice(indexParaExcluir, 1); // Remove o aluno da lista
  localStorage.setItem("alunos", JSON.stringify(alunos));
  carregarAlunos();
  document.getElementById("modal-confirmacao").style.display = "none";
  exibirMensagemSucesso("Aluno excluído com sucesso!");
});

// Cancelar exclusão
document.getElementById("btn-cancelar-exclusao").addEventListener("click", function () {
  document.getElementById("modal-confirmacao").style.display = "none";
  indexParaExcluir = null;
});

// Mostrar mensagem de sucesso
function exibirMensagemSucesso(mensagem) {
  const divMensagem = document.getElementById("mensagem-sucesso");
  divMensagem.textContent = mensagem;
  divMensagem.style.display = "block";
  //faz a mensagem sumir da tela após 5 segundos - por isso usar "none"
  setTimeout(() => {
    divMensagem.style.display = "none";
  }, 5000);
}



//Editar aluno
function editarAluno(event) {
  const index = event.target.dataset.index;
  const alunos = JSON.parse(localStorage.getItem("alunos")) || [];
  const aluno = alunos[index];

  const novoNome = prompt("Editar nome do aluno:", aluno.nome);
  const novaIdade = prompt("Editar idade do aluno:", aluno.idade);
  const novaMatricula = prompt("Editar matrícula do aluno:", aluno.matricula);
  const novaTurma = prompt("Editar turma do aluno:", aluno.turma);
  const novoCurso = prompt("Editar curso do aluno:", aluno.curso);

  // Verifica se nenhum campo foi cancelado (se algum for null, cancela a edição)
  if (
    novoNome !== null && novaIdade !== null &&
    novaMatricula !== null && novaTurma !== null && novoCurso !== null
  ) {
    aluno.nome = novoNome.trim();
    aluno.idade = parseInt(novaIdade);
    aluno.matricula = novaMatricula.trim();
    aluno.turma = novaTurma.trim();
    aluno.curso = novoCurso.trim();

    alunos[index] = aluno;
    localStorage.setItem("alunos", JSON.stringify(alunos));
    carregarAlunos();
  }
}


// Botão de voltar para o dashboard
document.getElementById("btn-voltar").addEventListener("click", function () {
  window.location.href = "dashboard.html";
});

