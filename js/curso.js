//semelhante ao de aluno e turma

// Seleciona elementos do DOM
const formCurso = document.getElementById("form-curso");
const listaCursos = document.getElementById("lista-cursos");

let editando = false;
let cursoEditandoId = null;

// Evento para envio do formulário
formCurso.addEventListener("submit", function (event) {
  event.preventDefault();
  limparErros();

  const nomeCurso = document.getElementById("nomeCurso").value.trim();
  const descricaoCurso = document.getElementById("descricaoCurso").value.trim();

  // Validação de nome do curso
  if (nomeCurso.length < 4) {
    exibirErro("erro-nomeCurso", "Nome do curso deve ter pelo menos 4 caracteres.");
    return;
  }

  // Validação de descrição
  if (descricaoCurso.length < 10) {
    exibirErro("erro-descricaoCurso", "Descrição deve ter pelo menos 10 caracteres.");
    return;
  }

  let cursos = JSON.parse(localStorage.getItem("cursos")) || [];

  // Se está editando um curso existente
  if (editando) {
    const index = cursos.findIndex(c => c.id === cursoEditandoId);
    if (index !== -1) {
      cursos[index] = { id: cursoEditandoId, nomeCurso, descricaoCurso };
      localStorage.setItem("cursos", JSON.stringify(cursos));
      resetarFormulario();
      carregarCursos();
    }
  } else {
    // Criar novo curso
    const novoCurso = {
      id: Date.now(),
      nomeCurso,
      descricaoCurso
    };

    cursos.push(novoCurso);
    localStorage.setItem("cursos", JSON.stringify(cursos));
    formCurso.reset();
    carregarCursos();
  }
});

// Exibe mensagens de erro abaixo dos campos
function exibirErro(idCampo, mensagem) {
  document.getElementById(idCampo).textContent = mensagem;
}

// Limpa todos os erros
function limparErros() {
  document.querySelectorAll(".erro").forEach(span => span.textContent = "");
}

// Carrega e exibe os cursos salvos
function carregarCursos() {
  const cursos = JSON.parse(localStorage.getItem("cursos")) || [];
  listaCursos.innerHTML = "";

  cursos.forEach(curso => {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${curso.nomeCurso}</strong><br>${curso.descricaoCurso}`;

    // Botão editar
    const btnEditar = document.createElement("button");
    btnEditar.textContent = "Editar";
    btnEditar.addEventListener("click", () => editarCurso(curso.id));

    // Botão remover
    const btnRemover = document.createElement("button");
    btnRemover.textContent = "Remover";
    btnRemover.addEventListener("click", () => removerCurso(curso.id));

    li.appendChild(btnEditar);
    li.appendChild(btnRemover);

    listaCursos.appendChild(li);
  });
}

// Remove curso do localStorage
function removerCurso(id) {
  let cursos = JSON.parse(localStorage.getItem("cursos")) || [];
  cursos = cursos.filter(curso => curso.id !== id);
  localStorage.setItem("cursos", JSON.stringify(cursos));
  carregarCursos();
}

// Preenche formulário com dados do curso para edição
function editarCurso(id) {
  const cursos = JSON.parse(localStorage.getItem("cursos")) || [];
  const curso = cursos.find(c => c.id === id);
  if (curso) {
    document.getElementById("nomeCurso").value = curso.nomeCurso;
    document.getElementById("descricaoCurso").value = curso.descricaoCurso;
    editando = true;
    cursoEditandoId = id;
    formCurso.querySelector("button").textContent = "Atualizar Curso";
  }
}

// Reseta o formulário após edição
function resetarFormulario() {
  formCurso.reset();
  editando = false;
  cursoEditandoId = null;
  formCurso.querySelector("button").textContent = "Adicionar Curso";
}

// Ao carregar a página, mostra os cursos existentes
document.addEventListener("DOMContentLoaded", carregarCursos);

// Botão de voltar para o dashboard
document.getElementById("btn-voltar").addEventListener("click", function () {
  window.location.href = "dashboard.html";
});

