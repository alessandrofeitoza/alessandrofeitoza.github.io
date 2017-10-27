$(document).ready( function () {
    buscar();

    $('#usuario').load('usuario.txt');

    $('#titulo').animate({
        width: '300px'
    }, "slow");

    $('#a-novo-contato').click( function () {
        var elemento = $('#form-novo-contato');
        if(elemento.hasClass('hidden') || elemento.css('display') == 'none') {
            elemento
                .css('display', 'none')
                .removeClass('hidden')
                .slideDown();
        } else {
            elemento.slideUp();
        }
    });

    $('#form-novo-contato > form').submit( function (event) {
        var erros = 0;

        erros += validarNome( $('#nome').val() , 'form-nome');
        erros += validarEmail( $('#email').val() , 'form-email');
        erros += validarTelefone( $('#telefone').val() , 'form-telefone');

        if( erros > 0) {
            return false;
        }

        var dados = {
            nome: $('#nome').val(),
            email: $('#email').val(),
            telefone: $('#telefone').val()
        };

        inserir(dados);
        buscar();

        $('#form-novo-contato').slideUp();
        $('#form-novo-contato > form').trigger('reset');

        event.preventDefault();
    });

    $('#form-editar-contato').on('submit', function (event) {
        var erros = 0;

        erros += validarNome($('#editar-nome').val(), 'form-editar-nome');
        erros += validarEmail($('#editar-email').val(), 'form-editar-email');
        erros += validarTelefone ($('#editar-telefone').val(), 'form-editar-telefone');

        if (erros > 0) {
            return false;
        }

        var dados = {
            nome: $('#editar-nome').val(),
            email: $('#editar-email').val(),
            telefone: $('#editar-telefone').val()
        };

        atualizar(dados, $('#editar-id').val());
        buscar();

        $('#form-editar-contato').slideUp();

        event.preventDefault();
    });


    $('#nome').keyup( function () {
        if ($(this).val() != '') {
            $('#form-nome').removeClass('has-error');
            $('#form-nome > .help-block').remove();
        }
    });

    $('#email').keyup( function () {
        if ($(this).val() != '') {
            $('#form-email').removeClass('has-error');
            $('#form-email > .help-block').remove();
        }
    });

    $('#telefone').keyup( function () {
        if ($(this).val() != '') {
            $('#form-telefone').removeClass('has-error');
            $('#form-telefone > .help-block').remove();
        }
    });

    $(document).on('click', '[id="editar"]', function () {
        var id = $(this).attr('value');

        var contato = buscarPorId(id);

        $('#editar-id').val(id);
        $('#editar-nome').val(contato.nome);
        $('#editar-email').val(contato.email);
        $('#editar-telefone').val(contato.telefone);

        $('#form-editar-contato')
        .css('display', 'none')
        .removeClass('hidden')
        .slideDown();
    });

    $('#cancelar-editar').click( function () {
        $('#form-editar-contato').slideUp();
    });

    $('#limpar-tudo').click( function () {
        $( "#dialog-confirm" ).dialog({
            resizable: false,
            height: "auto",
            width: 400,
            modal: true,
            buttons: {
              "Excluir todos os itens?": function() {
                  limparTudo();
                  buscar();
                  $(this).dialog('close');
              },
              "Não, Cancelar": function() {
                $( this ).dialog( "close" );
              }
            }
        });
    });






    $('#filtro').keyup( function () {
        var letras = $(this).val();

        $('#lista tr').filter ( function () {
            $(this).toggle($(this).text().indexOf(letras) > -1);
        });
    });

    $('#check-todos').click( function () {
        if ($(this).is(':checked')) {
            $('[id="check-contatos"]').attr('checked', true);
        } else {
            $('[id="check-contatos"]').removeAttr('checked');
        }
    });
});
