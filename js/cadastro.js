// Seleciona o formulário de cadastro para manipular (DOM)
const formCadastro = document.getElementById('form-cadastro');

// Criar o evento para o botão (trigger) do formulário
formCadastro.addEventListener('submit', function (event) {
  event.preventDefault(); // Impede recarregamento da página (o padrão da funcionalidade do botão)

  // Limpa mensagens de erro anteriores
  limparErros();

  // Captura os valores dos campos - Manipular os dados do HTML 
  const nome = document.getElementById('nome').value.trim();
  const cpf = document.getElementById('cpf').value.trim();
  const email = document.getElementById('email').value.trim();
  const senha = document.getElementById('senha').value.trim();
  const confirmarSenha = document.getElementById('confirmarSenha').value.trim();

  //Tratamento dos erros
  try {
    // Validações
    if (nome.length < 3) {
      throw new Error("Nome deve ter pelo menos 3 caracteres.");
    }

    //foi adotado uma expressao regular, conhecida como regex, para validação de formato
    if (!/^\d{11}$/.test(cpf)) {
      throw new Error("CPF deve conter exatamente 11 números.");
    }

    if (!email.includes("@")) {
      throw new Error("Email inválido.");
    }

    if (senha.length < 6) {
      throw new Error("Senha deve ter pelo menos 6 caracteres.");
    }

    if (senha !== confirmarSenha) {
      throw new Error("As senhas não coincidem.");
    }

    // Criar objeto usuário
    const usuario = {
      nome,
      cpf,
      email,
      senha
    };

    // Obtém os usuários do localStorage (se houver), para não travar o sistema usa o colchetes vazio, no caso qua ainda não haja cadastro
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Verifica se já existe um usuário com o mesmo email ou CPF
    const jaExiste = usuarios.some(user => user.email === email || user.cpf === cpf);
    if (jaExiste) {
      throw new Error("Já existe um usuário com esse CPF ou Email.");
    }

    // Adiciona o novo usuário
    usuarios.push(usuario);

    // Salva o array atualizado de usuários
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    exibirMensagemSucesso("Cadastro realizado com sucesso!");

    //Redirecionar para a página Login após 5 segundos
    setTimeout(() => {
    window.location.href = "login.html";
    }, 5000); 


  } catch (erro) {
    // Exibir a mensagem no campo correspondente
    exibirErro(erro.message);
  }
});

// Função para mostrar a mensagem abaixo do campo correto, utiliza o includes, para quando ele identificar aquele texto na mensagem ele retorne aquele erro especifico.
function exibirErro(mensagem) {
  if (mensagem.includes("Nome")) {
    document.getElementById("erro-nome").textContent = mensagem;
  } else if (mensagem.includes("CPF")) {
    document.getElementById("erro-cpf").textContent = mensagem;
  } else if (mensagem.includes("Email")) {
    document.getElementById("erro-email").textContent = mensagem;
  } else if (mensagem.includes("Senha") && !mensagem.includes("coincidem")) {
    document.getElementById("erro-senha").textContent = mensagem;
  } else if (mensagem.includes("coincidem")) {
    document.getElementById("erro-confirmar").textContent = mensagem;
  } else {
    // Mensagens genéricas ou duplicadas, foi usado o querySelector para egar todas as classes chamadas de "erro"
    document.querySelectorAll(".erro").forEach(span => span.textContent = mensagem);
  }
}

// Limpa todas as mensagens de erro
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

