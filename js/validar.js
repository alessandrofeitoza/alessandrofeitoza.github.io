function validarNome(nome, msg_erro)
{
    if (nome == '') {
        gerarErro(msg_erro, 'Nome');
        return 1;
    }

    return 0;
}

function validarEmail(email, msg_erro)
{
    if (email == '') {
        gerarErro(msg_erro, 'Email')
        return 1;
    }

    return 0;
}

function validarTelefone(telefone, msg_erro)
{
    if (telefone == '') {
        gerarErro(msg_erro, 'Telefone')
        return 1;
    }

    return 0;
}

function gerarErro(elemento, nome_campo)
{
      $('#' + elemento + ' > p').remove();
      $('#' + elemento)
        .addClass('has-error')
        .append('<p class="help-block">' + nome_campo + ' Obrigatório!</p>');
}
