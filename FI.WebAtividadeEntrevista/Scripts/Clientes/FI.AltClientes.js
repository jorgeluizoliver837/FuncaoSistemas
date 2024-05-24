
$(document).ready(function () {
    if (obj) {
        $('#formCadastro #Nome').val(obj.Nome);
        $('#formCadastro #CPF').val(obj.CPF);
        $('#formCadastro #CEP').val(obj.CEP);
        $('#formCadastro #Email').val(obj.Email);
        $('#formCadastro #Sobrenome').val(obj.Sobrenome);
        $('#formCadastro #Nacionalidade').val(obj.Nacionalidade);
        $('#formCadastro #Estado').val(obj.Estado);
        $('#formCadastro #Cidade').val(obj.Cidade);
        $('#formCadastro #Logradouro').val(obj.Logradouro);
        $('#formCadastro #Telefone').val(obj.Telefone);
    }

    $('#formCadastro').submit(function (e) {

      

        e.preventDefault();

        if (!validarCPF($(this).find("#CPF").val())) {

            ModalDialog("Ocorreu um erro", "CPF Inválido.");

            return
        }
        $.ajax({
            url: urlPost,
            method: "POST",
            data: {
                "NOME": $(this).find("#Nome").val(),
                "CEP": $(this).find("#CEP").val(),
                "CPF": $(this).find("#CPF").val(),
                "Email": $(this).find("#Email").val(),
                "Sobrenome": $(this).find("#Sobrenome").val(),
                "Nacionalidade": $(this).find("#Nacionalidade").val(),
                "Estado": $(this).find("#Estado").val(),
                "Cidade": $(this).find("#Cidade").val(),
                "Logradouro": $(this).find("#Logradouro").val(),
                "Telefone": $(this).find("#Telefone").val()
            },
            error:
            function (r) {
                if (r.status == 400)
                    ModalDialog("Ocorreu um erro", r.responseJSON);
                else if (r.status == 500)
                    ModalDialog("Ocorreu um erro", "Ocorreu um erro interno no servidor.");
            },
            success:
            function (r) {
                ModalDialog("Sucesso!", r)
                $("#formCadastro")[0].reset();                                
                window.location.href = urlRetorno;
            }
        });
    })
    
})

function validarCPF(strCPF) {
    var Soma;
    var Resto;
    Soma = 0;
    strCPF = strCPF.replace(/\D/g, '');
    if (strCPF == "00000000000") return false;

    for (i = 1; i <= 9; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10))) return false;

    Soma = 0;
    for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11))) return false;
    return true;
}

function ModalDialog(titulo, texto) {
    var random = Math.random().toString().replace('.', '');
    var texto = '<div id="' + random + '" class="modal fade">                                                               ' +
        '        <div class="modal-dialog">                                                                                 ' +
        '            <div class="modal-content">                                                                            ' +
        '                <div class="modal-header">                                                                         ' +
        '                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>         ' +
        '                    <h4 class="modal-title">' + titulo + '</h4>                                                    ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-body">                                                                           ' +
        '                    <p>' + texto + '</p>                                                                           ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-footer">                                                                         ' +
        '                    <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>             ' +
        '                                                                                                                   ' +
        '                </div>                                                                                             ' +
        '            </div><!-- /.modal-content -->                                                                         ' +
        '  </div><!-- /.modal-dialog -->                                                                                    ' +
        '</div> <!-- /.modal -->                                                                                        ';

    $('body').append(texto);
    $('#' + random).modal('show');
}

$("#newbenef").click(function () {
    carregartabela();
    $('#modalbenef').modal('show');

    
});

$("#incluirbeneficiariobutton").click(function (e) {

    if (!validarCPF(document.getElementById("cpfmodal").value)) {

        ModalDialog("Ocorreu um erro", "CPF Inválido.");

        return
    }
  
    $.ajax({
        url: urlPostModal,
        method: "POST",
        data: {
            "NOME": document.getElementById("nomemodal").value,
            "CPF": document.getElementById("cpfmodal").value,
            "IDCLIENTE": window.location.pathname.split("/").pop()
        },
        error:
            function (r) {
                if (r.status == 400)
                    ModalDialog("Ocorreu um erro", r.responseJSON);
                else if (r.status == 500)
                    ModalDialog("Ocorreu um erro", "Ocorreu um erro interno no servidor.");
            },
        success:
            function (r) {
                carregartabela();
            }
    });


})


function carregartabela() { 


    $.ajax({
        url: urlBeneficiarioList,
        method: "POST",
        data: {
        
            "ID": window.location.pathname.split("/").pop()
        },
 
        success:
            function (beneficiarios) {
                montartable(beneficiarios)
            }
    });
 

}
$(".modal").on("hidden.bs.modal", function () {

    $(".modal-body input").val("")

});

function montartable(beneficiarios) {

    var indice = 0;
    var divtabela = document.getElementById("divtabela");
    var tabela = '<table class="table">';
    tabela += '<thead>';
    tabela += '<tr>';
    tabela += '<th style="width: 40%;">CPF</th>';
    tabela += '<th style="width: 25%;">Nome</th>';
    tabela += '<th></th>';
    tabela += '</tr>';
    tabela += '</thead>';
    tabela += '</tbody>';

    for (indice = 0; indice < beneficiarios.length; indice++) {
        tabela += `<tr id="${beneficiarios[indice].ID}">`;
        tabela += `<td>${beneficiarios[indice].CPF}</td>`;
        tabela += `<td>${beneficiarios[indice].NOME}</td>`;
        tabela += `<td><button onclick="" class="btn btn-primary btn-sm">Alterar</button>`;
        tabela += ` <button onclick="" class="btn btn-primary btn-sm">Excluir</button></td>`;
        tabela += '</tr>'
    }

    tabela += '</tbody>'
    tabela += '</table>'

    divtabela.innerHTML = tabela;
}



