const INITIAL_STATE = {list: {}, tableConfig:{}}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'LIST_FETCHED':
            return {...state, list: action.payload}
        case 'CONFIG_FETCHED':
            return {...state, tableConfig: action.payload}
        default:
            return state
    }
}

/*

        "order": 0,
        "tableId": "tabela-contato",
        "urlButton": "/principal/contato/",
        "urlController": "/principal/contato/listar",
        "colunaBean": [
            {
                "nome": "tipoContato",
                "header": "Tipo",
                "radioCheck": false,
                "posicao": 1,
                "href": null,
                "textoLink": null,
                "radioCheckEnum": "java.lang.Class"
            },
            {
                "nome": "ativo",
                "header": "Ativo",
                "radioCheck": false,
                "posicao": 2,
                "href": null,
                "textoLink": null,
                "radioCheckEnum": "java.lang.Class"
            },
            {
                "nome": "contatoe",
                "header": "O Contato é um",
                "radioCheck": true,
                "posicao": 3,
                "href": null,
                "textoLink": null,
                "radioCheckEnum": "br.com.lsena.erp.principal.enums.ContatoEnum$ContatoERadioCheckEnum"
            },
            {
                "nome": "nome",
                "header": "Nome",
                "radioCheck": false,
                "posicao": 5,
                "href": null,
                "textoLink": null,
                "radioCheckEnum": "java.lang.Class"
            },
            {
                "nome": "responsavel",
                "header": "Responsavel",
                "radioCheck": false,
                "posicao": 5,
                "href": null,
                "textoLink": null,
                "radioCheckEnum": "java.lang.Class"
            },
            {
                "nome": "titulo",
                "header": "Titulo",
                "radioCheck": false,
                "posicao": 6,
                "href": null,
                "textoLink": null,
                "radioCheckEnum": "java.lang.Class"
            },
            {
                "nome": "referenciaInterma",
                "header": "Codigo Cliente",
                "radioCheck": false,
                "posicao": 7,
                "href": null,
                "textoLink": null,
                "radioCheckEnum": "java.lang.Class"
            },
            {
                "nome": "tin",
                "header": "TIN",
                "radioCheck": false,
                "posicao": 8,
                "href": null,
                "textoLink": null,
                "radioCheckEnum": "java.lang.Class"
            },
            {
                "nome": "website",
                "header": "Site",
                "radioCheck": false,
                "posicao": 9,
                "href": null,
                "textoLink": null,
                "radioCheckEnum": "java.lang.Class"
            },
            {
                "nome": "anotacoes",
                "header": "Anotações",
                "radioCheck": false,
                "posicao": 10,
                "href": null,
                "textoLink": null,
                "radioCheckEnum": "java.lang.Class"
            },
            {
                "nome": "cargo",
                "header": "Cargo",
                "radioCheck": false,
                "posicao": 11,
                "href": null,
                "textoLink": null,
                "radioCheckEnum": "java.lang.Class"
            },
            {
                "nome": "email",
                "header": "E-mail",
                "radioCheck": false,
                "posicao": 12,
                "href": null,
                "textoLink": null,
                "radioCheckEnum": "java.lang.Class"
            },
            {
                "nome": "telefone",
                "header": "Telefone",
                "radioCheck": false,
                "posicao": 13,
                "href": null,
                "textoLink": null,
                "radioCheckEnum": "java.lang.Class"
            },
            {
                "nome": "celular",
                "header": "Celular",
                "radioCheck": false,
                "posicao": 14,
                "href": null,
                "textoLink": null,
                "radioCheckEnum": "java.lang.Class"
            },
            {
                "nome": "mensagensRejeitadas",
                "header": "Mensagens Rejeitadas",
                "radioCheck": false,
                "posicao": 15,
                "href": null,
                "textoLink": null,
                "radioCheckEnum": "java.lang.Class"
            },
            {
                "nome": "avisoNaFatura",
                "header": "Aviso na fatura",
                "radioCheck": true,
                "posicao": 16,
                "href": null,
                "textoLink": null,
                "radioCheckEnum": "br.com.lsena.erp.principal.enums.ContatoEnum$AvisoNaFaturaSelectEnum"
            },
            {
                "nome": "avisoPedido",
                "header": "Aviso no pedido",
                "radioCheck": true,
                "posicao": 18,
                "href": null,
                "textoLink": null,
                "radioCheckEnum": "br.com.lsena.erp.principal.enums.ContatoEnum$AvisoNaFaturaSelectEnum"
            },
            {
                "nome": "avisoNaSeparacao",
                "header": "Aviso na separacao",
                "radioCheck": true,
                "posicao": 20,
                "href": null,
                "textoLink": null,
                "radioCheckEnum": "br.com.lsena.erp.principal.enums.ContatoEnum$AvisoNaFaturaSelectEnum"
            },
            {
                "nome": "cnpjcpf",
                "header": "CPF/CNPJ",
                "radioCheck": false,
                "posicao": 22,
                "href": null,
                "textoLink": null,
                "radioCheckEnum": "java.lang.Class"
            },
            {
                "nome": "rg",
                "header": "RG",
                "radioCheck": false,
                "posicao": 23,
                "href": null,
                "textoLink": null,
                "radioCheckEnum": "java.lang.Class"
            },
            {
                "nome": "inscrEst",
                "header": "Inscrição Estadual",
                "radioCheck": false,
                "posicao": 24,
                "href": null,
                "textoLink": null,
                "radioCheckEnum": "java.lang.Class"
            },
            {
                "nome": "inscrMun",
                "header": "Inscrição Municipal",
                "radioCheck": false,
                "posicao": 25,
                "href": null,
                "textoLink": null,
                "radioCheckEnum": "java.lang.Class"
            },
            {
                "nome": "suframa",
                "header": "Suframa",
                "radioCheck": false,
                "posicao": 26,
                "href": null,
                "textoLink": null,
                "radioCheckEnum": "java.lang.Class"
            },
            {
                "nome": "razaoSocial",
                "header": "Razão Social",
                "radioCheck": false,
                "posicao": 27,
                "href": null,
                "textoLink": null,
                "radioCheckEnum": "java.lang.Class"
            },
            {
                "nome": "indicadorIeDest",
                "header": "Agrupar Por Pipeline",
                "radioCheck": true,
                "posicao": 28,
                "href": null,
                "textoLink": null,
                "radioCheckEnum": "br.com.lsena.erp.principal.enums.ContatoEnum$InidicadorIeDestSelectEnum"
            },
            {
                "nome": "representante",
                "header": "Representante",
                "radioCheck": false,
                "posicao": 29,
                "href": "/principal/contato",
                "textoLink": "nome",
                "radioCheckEnum": "java.lang.Class"
            },
            {
                "nome": "canalDeVendas",
                "header": "Canal de vendas",
                "radioCheck": false,
                "posicao": 31,
                "href": "/principal/canaldevendas",
                "textoLink": "canalDeVendas.nome",
                "radioCheckEnum": "java.lang.Class"
            },
            {
                "nome": "tituloContato",
                "header": "Titulo contato",
                "radioCheck": false,
                "posicao": 32,
                "href": "/principal/titulocontato",
                "textoLink": "tituloContato.nome",
                "radioCheckEnum": "java.lang.Class"
            },
            {
                "nome": "superiorImediato",
                "header": "Superior Imediato",
                "radioCheck": false,
                "posicao": 44,
                "href": "/principal/contato",
                "textoLink": "contato.nome",
                "radioCheckEnum": "java.lang.Class"
            }
        ],
        "fragment": "fragments/table",
        "domselector": "table",
        "sessionAtribuite": null,
        "searchablePaging": true

 */