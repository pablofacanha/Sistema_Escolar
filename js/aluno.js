


// Seleção de elementos - manipular o HTML
const formAluno = document.getElementById("form-aluno");
const listaAlunos = document.getElementById("lista-alunos");
const selectTurma = document.getElementById("select-turma");
const selectCurso = document.getElementById("select-curso");

let editando = false; //ver se está no modo de edição de um aluno
let matriculaEditando = null;  //para armazenar a matricula do que está sendo editado para depois atualizar no localStorage corretamente

// Ao carregar a página, carregar turmas e cursos nos selects, e alunos na lista
document.addEventListener("DOMContentLoaded", function() {
  carregarTurmasNoSelect();
  carregarCursosNoSelect();
  carregarAlunos();
});

// Evento de submissão do formulário
formAluno.addEventListener("submit", function(event) {
  event.preventDefault(); 
  limparErros();


  const nome = document.getElementById("nome").value.trim();
  const idade = document.getElementById("idade").value.trim();
  const matricula = document.getElementById("matricula").value.trim();
  const turma = selectTurma.value;
  const curso = selectCurso.value;

  // Validações - tratamento de erros
  if (nome.length < 3) {
    exibirErro("erro-nome", "Nome deve ter pelo menos 3 caracteres.");
    return;
  }
  if (isNaN(idade) || Number(idade) < 0) {
    exibirErro("erro-idade", "Idade deve ser um número positivo.");
    return;
  }
  //Regex semelhante ao do CPF
  if (!/^\d{6,}$/.test(matricula)) {
    exibirErro("erro-matricula", "Matrícula deve ser numérica e conter pelo menos 6 dígitos.");
    return;
  }
  if (!turma) {
    exibirErro("erro-turma", "Você deve selecionar uma turma.");
    return;
  }
  if (!curso) {
    exibirErro("erro-curso", "Você deve selecionar um curso.");
    return;
  }

  let alunos = JSON.parse(localStorage.getItem("alunos")) || [];

  if (editando) {
    // edição - usa o findIndex pra localizar a posição do item no array, se não for encontrado retorna -1
    const index = alunos.findIndex(aluno => aluno.matricula === matriculaEditando);
    if (index !== -1) {
      // Verificar se matrícula mudou e conflita
      if (matricula !== matriculaEditando) {
        const matriculaExiste = alunos.some(aluno => aluno.matricula === matricula);
        if (matriculaExiste) {
          exibirErro("erro-matricula", "Já existe aluno com essa matrícula.");
          return;
        }
      }
      // Atualiza aluno
      alunos[index] = { 
        nome,
        idade: Number(idade),
        matricula,
        turma,
        curso
      };
      localStorage.setItem("alunos", JSON.stringify(alunos));
      resetarFormulario();
      carregarAlunos();
    }
  } else {
    // adição
    const matriculaExiste = alunos.some(aluno => aluno.matricula === matricula);
    if (matriculaExiste) {
      exibirErro("erro-matricula", "Já existe aluno com essa matrícula.");
      return;
    }
    const novoAluno = {
      nome,
      idade: Number(idade),
      matricula,
      turma,
      curso
    };
    alunos.push(novoAluno);
    localStorage.setItem("alunos", JSON.stringify(alunos));
    formAluno.reset();
    carregarAlunos();
  }
});

// Funções auxiliares

function exibirErro(idCampoErro, mensagem) {
  document.getElementById(idCampoErro).textContent = mensagem;
}

function limparErros() {
  document.querySelectorAll(".erro").forEach(span => span.textContent = "");
}

function removerAluno(matricula) {
  let alunos = JSON.parse(localStorage.getItem("alunos")) || [];
  alunos = alunos.filter(aluno => aluno.matricula !== matricula);
  localStorage.setItem("alunos", JSON.stringify(alunos));
  carregarAlunos();
}

function editarAluno(matricula) {
  let alunos = JSON.parse(localStorage.getItem("alunos")) || [];
  const aluno = alunos.find(a => a.matricula === matricula);
  if (aluno) {
    document.getElementById("nome").value = aluno.nome;
    document.getElementById("idade").value = aluno.idade;
    document.getElementById("matricula").value = aluno.matricula;
    selectTurma.value = aluno.turma;
    selectCurso.value = aluno.curso;

    //variaveis ja criadas no começo para permitir a edição
    editando = true;
    matriculaEditando = matricula;
    formAluno.querySelector("button").textContent = "Atualizar Aluno";
  }
}

function resetarFormulario() {
  formAluno.reset();
  editando = false;
  matriculaEditando = null;
  formAluno.querySelector("button").textContent = "Adicionar Aluno";
}

function carregarAlunos() {
  const alunos = JSON.parse(localStorage.getItem("alunos")) || [];
  listaAlunos.innerHTML = "";

  alunos.forEach(aluno => {
    const li = document.createElement("li");
    // mostra todos os campos, incluindo turma e curso
    li.textContent = `${aluno.nome} - Idade: ${aluno.idade} - Matrícula: ${aluno.matricula} - Turma: ${aluno.turma} - Curso: ${aluno.curso}`;

    //criando os botoes para editar ou remover da lista de alunos criada
    const btnEditar = document.createElement("button");
    btnEditar.textContent = "Editar";
    btnEditar.style.marginRight = "7px";
    btnEditar.addEventListener("click", () => editarAluno(aluno.matricula));

    const btnRemover = document.createElement("button");
    btnRemover.textContent = "Remover";
    btnRemover.addEventListener("click", () => removerAluno(aluno.matricula));

    li.appendChild(btnEditar);
    li.appendChild(btnRemover);
    listaAlunos.appendChild(li);
  });
}


//criando o campo de turma e curso para ser cadastrado durante o cadastro do aluno
function carregarTurmasNoSelect() {
  const turmas = JSON.parse(localStorage.getItem("turmas")) || [];
  // Limpa options existentes (exceto placeholder)
  selectTurma.innerHTML = '<option value="">Selecione uma turma</option>';

  turmas.forEach(t => {
    const option = document.createElement("option");
    option.value = t.nomeTurma;
    option.textContent = t.nomeTurma;
    selectTurma.appendChild(option);
  });
}

function carregarCursosNoSelect() {
  const cursos = JSON.parse(localStorage.getItem("cursos")) || [];
  selectCurso.innerHTML = '<option value="">Selecione um curso</option>';

  cursos.forEach(c => {
    const option = document.createElement("option");
    option.value = c.nomeCurso;
    option.textContent = c.nomeCurso;
    selectCurso.appendChild(option);
  });
}

// Botão de voltar para o dashboard
document.getElementById("btn-voltar").addEventListener("click", function () {
  window.location.href = "dashboard.html";
});



