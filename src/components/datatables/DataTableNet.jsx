import './Table.css'
import './datatable'

import api from '../../main/api'
import consts from '../../consts'

import React, {Component} from 'react'
import $ from 'jquery'
import DataTable from 'datatables.net'

class DataTableNet extends Component {

    componentWillMount(){
        this.getTableConfig()
    }

    getTableConfig = async () => {
        const response = await api.get(`${consts.BASE_URL}/${consts.API_URL}${this.props.location.pathname}getTableConfig`)
        this.renderTable(this.renderColumns(response.data.colunaBean))
    }

    renderTable = (columns) => {
        $.DataTable = DataTable

        $('.datatable').DataTable({
            dom: '<"data-table-wrapper"t>',
            fixedHeader: true,
            processing: true,
            serverSide: true,
            ajax: {
                'url': `${consts.BASE_URL}/${consts.API_URL}${this.props.location.pathname}listar`,
                'type': 'GET',
                'beforeSend': function (request, settings) {
                    settings.url = encodeURI(settings.url)
                    request.setRequestHeader('Authorization', 'Bearer 69073d04-ae3c-4deb-9b11-38458482bdb8');
                }
            },
            columns,
            stateSave: true,
            searching: true,
            paging: true,
            info: false,
            columnDefs: [{
                targets: '_all',
                className: 'mdl-data-table__cell--non-numeric'
            }]
        })

        const dataTableElement = document.querySelector('.dataTable')
        const wrapper = document.createElement('div')
        wrapper.setAttribute('class', 'dataTables_scroll')
        dataTableElement.parentNode.insertBefore(wrapper, dataTableElement)
        wrapper.appendChild(dataTableElement)
        const header = document.querySelector('.table thead')
        header.setAttribute('class', 'blue-grey lighten-2')
    }

    renderColumns = (colunaBean) => {
        return colunaBean.map((coluna, index) => {
            return {data: coluna.nome, title: coluna.header}
        })
    }

    render(){
        return(
            <React.Fragment>
                <div className='row justify-content-center align-items-center mt-5 h-100'>
                    <div className='col-11'>
                        <table className='table centered datatable col-12 shadow p-3 mb-5 bg-white mdl-data-table mdl-js-data-table mdl-shadow--4dp'
                               id='tableId' />
                    </div>
                </div>
                <div className="row fb-container mt-auto">
                    <div className="col-12">
                        <a href="/usuario/cadastrar" className="float-bottom-add btn-floating btn-large waves-effect waves-light grey darken-2 right">
                            <i className="material-icons">add</i>
                        </a>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default DataTableNet

/*
const mapStateToProps = state => ({dataTable: state.dataTableNet})
const mapDispatchToProps = dispatch => bindActionCreators({ getTableConfig, getDataTable }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(DataTableNet)*/
