//semelhante ao cadastro do usuario ao sistema de gerenciamento


// Seleciona o formulário
const form = document.getElementById("form-cadastro-aluno");

// Submete o formulário
form.addEventListener("submit", function (e) {
  e.preventDefault(); // Evita recarregamento da página
  limparErros();
  limparMensagem(); // Limpa mensagens anteriores

  // Coleta os dados dos campos
  const nome = document.getElementById("nome").value.trim();
  const cpf = document.getElementById("cpf").value.trim();
  const matricula = document.getElementById("matricula").value.trim();

  // Validações
  if (nome.length < 3) {
    exibirErro("erro-nome", "Nome deve ter ao menos 3 caracteres.");
    return;
  }
  //Regex
  if (!/^\d{11}$/.test(cpf)) {
    exibirErro("erro-cpf", "CPF deve conter 11 dígitos numéricos.");
    return;
  }
  //Regex
  if (!/^\d{6,}$/.test(matricula)) {
    exibirErro("erro-matricula", "Matrícula deve conter ao menos 6 dígitos numéricos.");
    return;
  }

  // Verifica se já existe esse aluno com nome e matrícula cadastrados
  const alunos = JSON.parse(localStorage.getItem("alunos")) || [];

  const alunoIndex = alunos.findIndex(a =>
    a.nome.toLowerCase().trim() === nome.toLowerCase().trim() &&
    a.matricula === matricula
  );

  if (alunoIndex === -1) {
    exibirMensagem("Nome ou matrícula não encontrados. Verifique se os dados estão corretos.", "erro");
    return;
  }

  // Verifica se o CPF já foi cadastrado
  if (alunos[alunoIndex].cpf) {
    exibirMensagem("Este aluno já possui um CPF cadastrado.", "erro");
    return;
  }

  // Atualiza o CPF no aluno existente
  alunos[alunoIndex].cpf = cpf;
  localStorage.setItem("alunos", JSON.stringify(alunos));

  exibirMensagem("Cadastro realizado com sucesso!", "sucesso");

  // Redireciona após 3 segundos
  setTimeout(() => {
    window.location.href = "login_aluno.html";
  }, 3000);
});

// Funções auxiliares
function exibirErro(idCampo, mensagem) {
  document.getElementById(idCampo).textContent = mensagem;
}

function limparErros() {
  document.querySelectorAll(".erro").forEach(el => el.textContent = "");
}

function exibirMensagem(mensagem, tipo) {
  const div = document.getElementById("mensagem");
  
  div.textContent = mensagem;
  div.className = `mensagem ${tipo}`; // Aplica as classes corretas
  div.style.display = "block";

  // Oculta após 5 segundos se for erro
  if (tipo === "erro") {
    setTimeout(() => {
      div.style.display = "none";
      div.className = "mensagem"; // Remove tipo ao ocultar
    }, 5000);
  }
}


function limparMensagem() {
  const div = document.getElementById("mensagem");
  div.textContent = "";
  div.className = "mensagem";
  div.style.display = "none";
}




