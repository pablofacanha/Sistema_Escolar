// Seleciona o formulário de login
const formLogin = document.getElementById("form-login-aluno");

// Adiciona listener ao evento submit do formulário
formLogin.addEventListener("submit", function (e) {
  e.preventDefault(); // Evita o reload da página

  // Limpa mensagens de erro anteriores
  limparErros();
  limparMensagem();

  // Coleta os valores dos inputs
  const cpf = document.getElementById("cpf").value.trim();
  const matricula = document.getElementById("matricula").value.trim();

  // Validações básicas
  if (!/^\d{11}$/.test(cpf)) {
    exibirErro("erro-cpf", "CPF deve conter 11 dígitos numéricos.");
    return;
  }

  if (!/^\d{6,}$/.test(matricula)) {
    exibirErro("erro-matricula", "Matrícula inválida.");
    return;
  }

  // Recupera os alunos cadastrados no localStorage
  const alunos = JSON.parse(localStorage.getItem("alunos")) || [];

  if (alunos.length === 0) {
    exibirMensagem("Nenhum aluno cadastrado no sistema.", "erro");
    return;
  }

  // Busca aluno correspondente ao CPF e matrícula
  const alunoEncontrado = alunos.find(aluno =>
    aluno.cpf === cpf && aluno.matricula === matricula
  );

  if (!alunoEncontrado) {
    // Aluno não encontrado
    exibirErro("erro-cpf", "CPF ou matrícula inválida. Tente novamente.");
    exibirErro("erro-matricula", "CPF ou matrícula inválida. Tente novamente.");
    return;
  }

  // Login bem-sucedido
  exibirMensagem("Login realizado com sucesso!", "sucesso");

  // Armazena o aluno logado no localStorage
  localStorage.setItem("alunoLogado", JSON.stringify(alunoEncontrado));

  // Redireciona para o portal do aluno após 2 segundos
  setTimeout(() => {
    window.location.href = "portal_aluno.html";
  }, 2000);
});

// Exibe erro abaixo de um campo específico
function exibirErro(idCampo, mensagem) {
  document.getElementById(idCampo).textContent = mensagem;
}

// Limpa todas as mensagens de erro
function limparErros() {
  document.querySelectorAll(".erro").forEach(el => el.textContent = "");
}

// Exibe uma mensagem no topo
function exibirMensagem(mensagem, tipo) {
  const div = document.getElementById("mensagem");
  div.textContent = mensagem;
  div.className = `mensagem ${tipo}`; // Aplica classe CSS correspondente
  div.style.display = "block";

  // Oculta automaticamente após 5 segundos se for erro
  if (tipo === "erro") {
    setTimeout(() => {
      div.style.display = "none";
    }, 5000);
  }
}

// Limpa a mensagem atual
function limparMensagem() {
  const div = document.getElementById("mensagem");
  div.textContent = "";
  div.className = "mensagem";
  div.style.display = "none";
}

