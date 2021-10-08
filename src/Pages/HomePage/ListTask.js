import React from "react";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Button from '@mui/material/Button';
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { changeStatusAction, delTaskAction, editTaskAction } from "../../Redux/Actions/TodoActions";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    }
});
export default function ListTask() {
    const dispatch = useDispatch()
    const taskList = useSelector(state => state.TodoReducer.taskList)
    const keyWord = useSelector(state => state.TodoReducer.keyWord)
    const Sort = useSelector(state => state.TodoReducer.Sort)
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, taskList.length - page * rowsPerPage);

    let onEdit = (id) => {
        dispatch(editTaskAction(id))
    }
    let onDelete = (id) => {
        dispatch(delTaskAction(id))
    }
    let onChangeStt = (id) => {
        dispatch(changeStatusAction(id))
    }
    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>STT</TableCell>
                        <TableCell align="left">Tên công việc</TableCell>
                        <TableCell align="center">Trạng thái</TableCell>
                        <TableCell align="center">Ngày tạo</TableCell>

                        <TableCell align="center">Ngày hoàn thành</TableCell>
                        <TableCell align="center">Tác vụ</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {taskList
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).filter((task) => {
                            return task.name.toLowerCase().indexOf(keyWord) !== -1
                        })
                        .map((task, index) => (
                            <TableRow key={task.name}>
                                <TableCell component="th" scope="row">
                                    {index + 1}
                                </TableCell>
                                <TableCell align="left">{task.name}</TableCell>
                                <TableCell align="center" style={{ cursor: 'pointer', color: `${task.status ? 'green' : 'red'}` }} onClick={() => onChangeStt(task.id)}>{task.status ? 'Hoàn thành' : 'Chưa hoàn thành'}</TableCell>
                                <TableCell align="center">{task.dateCreated}</TableCell>
                                <TableCell align="center">{task.deadLine}</TableCell>
                                <TableCell align="center">
                                    <Button variant="contained" color="error" className='btnEdit' onClick={() => onEdit(task.id)}>
                                        Sửa
                                    </Button>
                                    <Button variant="contained" color="error" className='btnDel' onClick={() => onDelete(task.id)}>
                                        Xóa
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                            <TableCell colSpan={6} />
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={taskList.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </TableContainer>
    );
}
