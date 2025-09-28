//semelhante ao cadastro de alunos

const formTurma = document.getElementById("form-turma");
const listaTurmas = document.getElementById("lista-turmas");

let editando = false;
let turmaEditandoId = null;

formTurma.addEventListener("submit", function (event) {
  event.preventDefault();
  limparErros();

  const nomeTurma = document.getElementById("nomeTurma").value.trim();
  const anoTurma = document.getElementById("anoTurma").value.trim();
  const turnoTurma = document.getElementById("turnoTurma").value.trim();

  // Validações
  if (nomeTurma.length < 2) {
    exibirErro("erro-nomeTurma", "Nome da turma deve ter pelo menos 2 caracteres.");
    return;
  }

  if (!/^\d{4}$/.test(anoTurma)) {
    exibirErro("erro-anoTurma", "Ano deve ter 4 dígitos.");
    return;
  }

  if (turnoTurma.length < 5) {
    exibirErro("erro-turnoTurma", "Turno deve ter pelo menos 5 caracteres.");
    return;
  }

  let turmas = JSON.parse(localStorage.getItem("turmas")) || [];

  if (editando) {
    const index = turmas.findIndex(t => t.id === turmaEditandoId);
    if (index !== -1) {
      turmas[index] = { id: turmaEditandoId, nomeTurma, anoTurma, turnoTurma };
      localStorage.setItem("turmas", JSON.stringify(turmas));
      resetarFormulario();
      carregarTurmas();
    }
  } else {
    const novaTurma = {
      id: Date.now(),
      nomeTurma,
      anoTurma,
      turnoTurma
    };
    turmas.push(novaTurma);
    localStorage.setItem("turmas", JSON.stringify(turmas));
    formTurma.reset();
    carregarTurmas();
  }
});

function exibirErro(idCampo, mensagem) {
  document.getElementById(idCampo).textContent = mensagem;
}

function limparErros() {
  document.querySelectorAll(".erro").forEach(span => span.textContent = "");
}

function carregarTurmas() {
  const turmas = JSON.parse(localStorage.getItem("turmas")) || [];
  listaTurmas.innerHTML = "";

  turmas.forEach(turma => {
    const li = document.createElement("li");
    li.textContent = `${turma.nomeTurma} - Ano: ${turma.anoTurma} - Turno: ${turma.turnoTurma}`;

    const btnEditar = document.createElement("button");
    btnEditar.textContent = "Editar";
    btnEditar.addEventListener("click", () => editarTurma(turma.id));

    const btnRemover = document.createElement("button");
    btnRemover.textContent = "Remover";
    btnRemover.addEventListener("click", () => removerTurma(turma.id));

    li.appendChild(btnEditar);
    li.appendChild(btnRemover);
    listaTurmas.appendChild(li);
  });
}

function removerTurma(id) {
  let turmas = JSON.parse(localStorage.getItem("turmas")) || [];
  turmas = turmas.filter(turma => turma.id !== id);
  localStorage.setItem("turmas", JSON.stringify(turmas));
  carregarTurmas();
}

function editarTurma(id) {
  const turmas = JSON.parse(localStorage.getItem("turmas")) || [];
  const turma = turmas.find(t => t.id === id);
  if (turma) {
    document.getElementById("nomeTurma").value = turma.nomeTurma;
    document.getElementById("anoTurma").value = turma.anoTurma;
    document.getElementById("turnoTurma").value = turma.turnoTurma;
    editando = true;
    turmaEditandoId = id;
    formTurma.querySelector("button").textContent = "Atualizar Turma";
  }
}

function resetarFormulario() {
  formTurma.reset();
  editando = false;
  turmaEditandoId = null;
  formTurma.querySelector("button").textContent = "Adicionar Turma";
}

document.addEventListener("DOMContentLoaded", carregarTurmas);

// Botão de voltar para o dashboard
document.getElementById("btn-voltar").addEventListener("click", function () {
  window.location.href = "dashboard.html";
});
