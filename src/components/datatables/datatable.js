import $ from 'jquery'
import 'datatables.net'

$.extend(true, $.fn.dataTable.defaults, {

    "pagingType": "numbers",
    "lengthMenu":[ [10, 25, 50, 100, 1], [10, 25, 50, 100, "Todos"] ],
    "language":{
        "sEmptyTable": "Nenhum registro encontrado",
        "sInfo": "Mostrando de _START_ até _END_ de _TOTAL_ registros",
        "sInfoEmpty": "Mostrando 0 até 0 de 0 registros",
        "sInfoFiltered": "(Filtrados de _MAX_ registros)",
        "sInfoPostFix": "",
        "sInfoThousands": ".",
        "sLengthMenu": "Exibindo _MENU_ Resultados",
        "sLoadingRecords": "Carregando...",
        "sProcessing": "Processando...",
        "sZeroRecords": "Nenhum registro encontrado",
        "sSearch": "Pesquisar",
        "oPaginate": {
            "sNext": "Próximo",
            "sPrevious": "Anterior",
            "sFirst": "Primeiro",
            "sLast": "Último"
        }
    }

});

$.fn.dataTableExt.oApi.fnSetFilteringEnterPress = function(oSettings) {
    var _that = this;

    this.each(function(i) {
        $.fn.dataTableExt.iApiIndex = i;
        var anControl = $('input', _that.fnSettings().aanFeatures.f);

        anControl.unbind('keyup search input').bind(
            'keyup search input',
            function(e) {
                if (anControl.val().length === "" || anControl.val().length > 2) {
                    _that.fnFilter(anControl.val());
                }
            });
        return this;
    });
    return this;
};

$(document).ready(function() {
    $("#DataTables_Table_0_filter label").contents().filter(function () {
        return this.nodeType === 3;
    }).remove();

    $("#DataTables_Table_0_filter label input").attr('id', 'search');
    $("#DataTables_Table_0_filter label input").unwrap();
    $("#DataTables_Table_0_filter input").wrap("<div class='input-field col s10'></div>")

    $("#DataTables_Table_0_length label").contents().filter(function () {
        return this.nodeType === 3;
    }).remove();

    $("#DataTables_Table_0_length label select").attr('id', 'filter');
    $("#DataTables_Table_0_length label select").unwrap();
    $("#DataTables_Table_0_length select").wrap("<div class='input-field col s10'></div>")
    //$("#DataTables_Table_0_length .input-field").append("<label for='filter'>"+labelLengh.get(0).data+"</label>");
});