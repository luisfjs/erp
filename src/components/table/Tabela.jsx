import './Tabela.css'

import React, {Component} from 'react'
import Typography from "@material-ui/core/Typography/Typography";
import {Link} from "react-router-dom";
import M from "materialize-css";

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePagination from "@material-ui/core/TablePagination/TablePagination";
import Toolbar from "@material-ui/core/Toolbar/Toolbar";
import TextField from "@material-ui/core/TextField/TextField";
import InputAdornment from '@material-ui/core/InputAdornment';
import Search from '@material-ui/icons/Search';


import {connect} from 'react-redux'
import {bindActionCreators} from "redux";

import {fetchData, getTableConfig, changePage, changeRowsPerPage, requestSort, search, setLoading} from './tableActions'

import EnhancedTableHead from './EnhancedTableHead';
import TablePaginationActions from "./TablePaginationActions";

class Tabela extends Component {

    componentWillMount() {
        window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true
        const url = this.props.location.pathname
        this.props.getTableConfig(url)
    }

    componentDidUpdate(){
        const elems = document.querySelectorAll('.tooltipped');
        const wrapperTooltip = document.createElement('div')

        M.Tooltip.init(elems, {});

        const tooltips = document.querySelectorAll('.material-tooltip');
        const cadastroWrapper = document.querySelector('.cadastro-wrapper');
        wrapperTooltip.setAttribute('class','materializecss')
        tooltips.forEach(el =>{
            wrapperTooltip.appendChild(el)
        })
        cadastroWrapper.appendChild(wrapperTooltip)
    }

    renderHead = () => {
        const {order} = this.props.table.dataTable
        const colunaBean = this.props.table.tableConfig.colunaBean || []
        return <EnhancedTableHead order={order} colunas={colunaBean} onRequestSort={this.handleRequestSort} />
    }

    renderRows = () => {
        const linhas = this.props.table.list.data || []
        return linhas.map((linha, index) => <TableRow key={linha.id}>{this.renderCols(linha)}</TableRow>)
    }

    renderCols = (linha) => {
        const colunaBean = this.props.table.tableConfig.colunaBean || []
        const cols =  colunaBean.map((coluna, index) => {
            if(typeof linha[coluna.nome] === 'object'){
                const itemLine = linha[coluna.nome] || []
                if(itemLine.length){
                    const line = itemLine.map(item => item[coluna.textoLink]).join(', ')
                    return(<TableCell className='materializecss mdl-data-table__cell--non-numeric' key={index}>{line}</TableCell>)
                }else{
                    return(<TableCell className='materializecss mdl-data-table__cell--non-numeric' key={index}>{itemLine[coluna.textoLink]}</TableCell>)
                }
            }else{
                const text = (typeof linha[coluna.nome] === 'boolean') ? (linha[coluna.nome] ? 'Sim': 'Não') : linha[coluna.nome]
                return(<TableCell className='materializecss mdl-data-table__cell--non-numeric' key={index}>{text}</TableCell>)
            }

        })
        cols.push([
            <TableCell key={cols.length + 1} className='materializecss mdl-data-table__cell--non-numeric'>
                <Link to={`${linha.id}`} className='btn-small bg-warning white-text tooltipped' data-position="bottom" data-tooltip="Editar"><i className='material-icons'>edit</i></Link>
            </TableCell>,
            <TableCell key={cols.length + 2} className='materializecss mdl-data-table__cell--non-numeric'>
                <Link to={`${linha.id}`} className='btn-small bg-danger white-text tooltipped' data-position="bottom" data-tooltip="Desativar" ><i className='material-icons'>do_not_disturb</i></Link>
            </TableCell>
        ])
        return cols
    }

    handleChangePage = (event, page) => {
        this.props.changePage(page)
        this.props.fetchData(this.props.location.pathname)
    }

    handleChangeRowsPerPage = event => {
        this.props.changeRowsPerPage(event.target.value)
        this.props.fetchData(this.props.location.pathname)
    }

    handleRequestSort = (event, property) => {
        const {order} = this.props.table.dataTable
        let newOrder = {dir: 'desc', column: property}
        if (order.column === property && order.dir === 'desc') {
            newOrder = {...newOrder, dir: 'asc'}
        }
        this.props.requestSort(newOrder, this.props.location.pathname)
        this.props.fetchData(this.props.location.pathname)
    }

    handleSearch = event => {
        this.props.search(event.target.value)
        this.props.fetchData(this.props.location.pathname)
    }

    render(){
        const {title, dataTable:{page, length, recordsTotal, recordsFiltered, search}} = this.props.table
        return(
            <React.Fragment>
                <div className='row justify-content-center align-items-center mt-5 h-100 cadastro-wrapper'>
                    <Paper className='col-11 shadow p-0' >
                        <Toolbar>
                            <Typography variant="h6" id="tableTitle">
                                {title}
                            </Typography>
                            <TextField
                                className='ml-auto react-input-ui' id="table-search" value={search} onChange={this.handleSearch}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Search />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Toolbar>
                    <div className='tableWrapper w-100'>
                        <Table className='table centered mdl-data-table mdl-js-data-table'>
                            {this.renderHead()}
                            <TableBody>{this.renderRows()}</TableBody>
                        </Table>
                    </div>
                    <TablePagination
                        component="div"
                        count={recordsTotal || recordsFiltered}
                        rowsPerPage={length}
                        page={page}
                        backIconButtonProps={{'aria-label': 'Previous Page'}}
                        nextIconButtonProps={{'aria-label': 'Next Page'}}
                        onChangePage={this.handleChangePage}
                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                        ActionsComponent={TablePaginationActions}/>
                    </Paper>
                </div>
                <div className="row fb-container materializecss m-4">
                    <div className="col-12">
                        <Link to={`${this.props.location.pathname}cadastrar`} className="float-bottom-add btn-floating btn-large waves-effect waves-light grey darken-2 right">
                            <i className="material-icons">add</i>
                        </Link>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({table: state.table})
const mapDispatchToProps = dispatch => bindActionCreators({ getTableConfig, fetchData, changePage, changeRowsPerPage, requestSort, search, setLoading }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Tabela)