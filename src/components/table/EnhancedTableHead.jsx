import React from "react";
import TableHead from "@material-ui/core/TableHead/TableHead";
import TableRow from "@material-ui/core/TableRow/TableRow";
import TableCell from "@material-ui/core/TableCell/TableCell";
import TableSortLabel from "@material-ui/core/TableSortLabel/TableSortLabel";

export default class EnhancedTableHead extends React.Component {
    createSortHandler = property => event => {
        this.props.onRequestSort(event, property);
    }

    render() {
        const { order, colunas } = this.props;
        return (
            <TableHead className='bg-secondary'>
                <TableRow>
                    {colunas.map((coluna, index) => {
                        return (
                            <TableCell
                                className='text-center text-light font-weight-bold'
                                key={index}
                                padding='default'
                                sortDirection={order.column === index ? order.dir : false}>
                                <TableSortLabel
                                    active={order.column === index}
                                    direction={order.dir}
                                    onClick={this.createSortHandler(index)}>
                                    {coluna.header}
                                </TableSortLabel>
                            </TableCell>
                        );
                    }, this)}
                    <TableCell className='text-center text-light font-weight-bold' colSpan={2}>Ações</TableCell>
                </TableRow>
            </TableHead>
        );
    }
}