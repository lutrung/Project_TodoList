import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';
import { Button, Grid, Paper, TextField, Typography } from "@material-ui/core";
import { DatePicker } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { addTaskAction, cancelEditAction } from "../../Redux/Actions/TodoActions";

export default function AddTask() {
    const dispatch = useDispatch()
    const editTask = useSelector(state => state.TodoReducer.editTask)
    const [addTask, setAddTask] = useState({
        id: '',
        name: '',
        status: false,
        dateCreated: moment(new Date()).format('DD/MM/YYYY'),
        deadLine: moment(new Date()).format('DD/MM/YYYY')
    })

    let handleChange = (event) => {
        let { name, value } = event.target
        if (name === 'name') {
            let newTask = { ...addTask, [name]: value }
            setAddTask(newTask)
        } else {
            let newTask = { ...addTask, [name]: value === 'true' ? true : false }
            setAddTask(newTask)
        }
    }

    const handleChangeDatePicker = (value) => {
        let deadline = moment(value).format('DD/MM/YYYY')
        let newTask = { ...addTask, deadLine: deadline }
        setAddTask(newTask)
    }
    let disabledDate = (current) => {
        return current && current < moment().endOf('day');
    }

    let handleSubmit = (e) => {
        e.preventDefault()
        dispatch(addTaskAction(addTask))
        clearForm()
    }

    let clearForm = () => {
        setAddTask({
            id: '',
            name: '',
            status: false,
            dateCreated: moment(new Date()).format('DD/MM/YYYY'),
            deadLine: moment(new Date()).format('DD/MM/YYYY')
        })
    }
    let onCancel = () => {
        dispatch(cancelEditAction())
    }

    useEffect(() => {
        if (editTask) {
            setAddTask({
                id: editTask.id,
                name: editTask.name,
                status: editTask.status,
                dateCreated: editTask.dateCreated,
                deadLine: editTask.deadLine
            })
        } else {
            setAddTask({
                id: '',
                name: '',
                status: false,
                dateCreated: moment(new Date()).format('DD/MM/YYYY'),
                deadLine: moment(new Date()).format('DD/MM/YYYY')
            })
        }
    }, [editTask])

    return (

        <Paper
            variant="elevation"
            elevation={2}
            className="login-background"
        >
            <Grid item>
                <Typography component="h1" variant="h5">
                    {editTask ? 'Cập nhật công việc' : 'Thêm Công Việc'}
                </Typography>
            </Grid>
            <Grid item>
                <form onSubmit={handleSubmit}>
                    <Grid container direction="column" spacing={2}>
                        <Grid item>
                            <TextField
                                id="standard-basic"
                                label="Tên"
                                variant="standard"
                                name='name'
                                onChange={handleChange}
                                value={addTask.name}
                                required
                                autoComplete='off'
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                id="standard-select-currency-native"
                                select
                                label="Trạng thái"
                                value={addTask.status}
                                onChange={handleChange}
                                name='status'
                                SelectProps={{
                                    native: true,
                                }}
                                variant="standard"
                            >
                                <option value={true}>
                                    Hoàn thành
                                </option>
                                <option value={false}>
                                    Chưa hoàn thành
                                </option>
                            </TextField>
                        </Grid>
                        <Grid item>
                            <label className='mb-2' >Ngày hoàn thành:</label>
                            <DatePicker
                                style={{ width: '100%' }}
                                value={moment(addTask.deadLine, 'DD/MM/YYYY')}
                                name='date'
                                format={"DD/MM/YYYY"}
                                disabledDate={disabledDate}
                                onChange={handleChangeDatePicker} />
                        </Grid>
                        <Grid item>
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                className="button-block"
                            >
                                {editTask ? 'Cập nhật' : 'Thêm'}
                            </Button>
                            {editTask ? <Button
                                variant="contained"
                                color="error"
                                type="button"
                                className="button-block mt-3 btnCancel"
                                onClick={() => onCancel()}
                            >
                                Hủy
                            </Button> : ''}
                        </Grid>
                    </Grid>
                </form>
            </Grid>
        </Paper>
    )
}
