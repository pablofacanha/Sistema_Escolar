// Seleciona o formulário de login para manipular no HTML
const formLogin = document.getElementById('form-login');

// Evento sendo criado para o formulario após o botão for clicado para logar 
formLogin.addEventListener('submit', function (event) {
  event.preventDefault(); // Evita o reload da página

  // Limpa erros anteriores
  limparErros();

  // Pega os valores dos campos - manipular o HTML
  const usuarioInput = document.getElementById('usuario').value.trim();
  const senhaInput = document.getElementById('senha').value.trim();

  //tratamento dos erros
  try {
    // Validações básicas
    if (usuarioInput === "") {
      throw new Error("Usuário é obrigatório.");
    }

    if (senhaInput === "") {
      throw new Error("Senha é obrigatória.");
    }

    // Busca todos os usuários cadastrados - semelhante ao cadastro.js
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Se não houver nenhum usuário cadastrado
    if (usuarios.length === 0) {
      throw new Error("Nenhum usuário cadastrado no sistema.");
    }

    // Busca um usuário cujo CPF ou Email e senha coincidam
    const usuarioEncontrado = usuarios.find(user =>
      (user.email === usuarioInput || user.cpf === usuarioInput) &&
      user.senha === senhaInput
    );

    // Se não encontrou nenhum correspondente
    if (!usuarioEncontrado) {
      throw new Error("Usuário ou senha inválida. Tente novamente.");
    }

    // Mostra mensagem de login bem-sucedido
    exibirMensagemSucesso("Login realizado com sucesso!");

    // Salva o usuário logado
    localStorage.setItem("usuarioLogado", JSON.stringify(usuarioEncontrado));

    // Redireciona após 5 segundos
    setTimeout(() => {
    window.location.href = "dashboard.html";
    }, 5000);


  } catch (erro) {
    exibirErro(erro.message);
  }
});

// Exibe erro abaixo do campo correspondente
function exibirErro(mensagem) {
  if (mensagem.includes("Usuário") && !mensagem.includes("senha")) {
    document.getElementById("erro-usuario").textContent = mensagem;
  } else if (mensagem.includes("Senha") && !mensagem.includes("usuário")) {
    document.getElementById("erro-senha").textContent = mensagem;
  } else {
    // Erro genérico ou ambos
    document.getElementById("erro-usuario").textContent = mensagem;
    document.getElementById("erro-senha").textContent = mensagem;
  }
}

// Limpa os erros visuais do formulário - usa o querySelectorAll semelhante ao cadastro
function limparErros() {
  document.querySelectorAll(".erro").forEach(span => span.textContent = "");
}


//função para mostrar que foi cadastrado com sucesso
function exibirMensagemSucesso(mensagem) {
  const divMensagem = document.getElementById("mensagem-sucesso");
  divMensagem.textContent = mensagem;
  divMensagem.style.display = "block";

  // Caso a página não fosse redirecionada, poderia fazer com que a mensagem ficasse oculta após 5 segundos com a função abaixo
//   setTimeout(() => {
//     divMensagem.style.display = "none";
//   }, 5000);

}