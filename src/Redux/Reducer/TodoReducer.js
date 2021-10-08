import { toast } from 'react-toastify';

let data = []
if (localStorage.getItem('TaskList')) {
    data = JSON.parse(localStorage.getItem('TaskList'));
}
const stateDefault = {
    taskList: data,
    editTask: null,
    keyWord: '',
    Sort: null,
    productList: [],
}
let randomID = () => {
    return Math.floor(Math.random() * 100000) + Math.floor(Math.random() * 100000) + Math.floor(Math.random() * 100000)
}
const TodoReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case 'ADD_TASK': {
            let newTaskList = [...state.taskList]
            if (action.task.id !== '') {
                toast.success("Cập nhật thành công")
                let index = newTaskList.findIndex((task) => {
                    return task.id === action.task.id
                })
                newTaskList[index] = action.task
            } else {
                let check = newTaskList.some((task) => {
                    return task.name.toLowerCase() === action.task.name.toLowerCase()
                })
                if (!check) {
                    toast.success("Thêm thành công")
                    let newTask = {
                        id: randomID(),
                        name: action.task.name,
                        status: action.task.status,
                        dateCreated: action.task.dateCreated,
                        deadLine: action.task.deadLine
                    }
                    newTaskList.push(newTask)
                } else {
                    toast.error("Công việc đã tồn tại")
                }
            }
            state.taskList = newTaskList
            localStorage.setItem('TaskList', JSON.stringify(state.taskList))
            return { ...state }
        }
        case 'DELETE_TASK': {
            let newTaskList = [...state.taskList]
            let taskDel = newTaskList.find((task) => {
                return task.id === action.id
            })
            console.log(taskDel);
            let index = newTaskList.findIndex((task) => {
                return task.id === taskDel.id
            })
            newTaskList.splice(index, 1)
            state.taskList = newTaskList
            localStorage.setItem('TaskList', JSON.stringify(state.taskList))
            return { ...state }
        }
        case 'EDIT_TASK': {
            let newTaskList = [...state.taskList]
            let taskEdit = newTaskList.find((task) => {
                return task.id === action.id
            })
            let index = newTaskList.findIndex((task) => {
                return task.id === taskEdit.id
            })
            state.editTask = newTaskList[index]
            return { ...state }
        }
        case 'CHANGE_STATUS': {
            let newTaskList = [...state.taskList]
            let taskEdit = newTaskList.find((task) => {
                return task.id === action.id
            })
            let index = newTaskList.findIndex((task) => {
                return task.id === taskEdit.id
            })
            newTaskList[index].status = !newTaskList[index].status
            localStorage.setItem('TaskList', JSON.stringify(state.taskList))
            state.taskList = newTaskList
            return { ...state }
        }
        case 'CANCEL_EDIT': {
            state.editTask = null
            return { ...state }
        }
        case 'SEARCH_TASK': {
            state.keyWord = action.keyWord
            return { ...state }
        }
        case 'SORT_TASK': {
            state.Sort = action.value
            switch (action.value) {
                case 1: {
                    let newTaskList = state.taskList.sort((a, b) => {
                        let nameA = a.name.toLowerCase();
                        let nameB = b.name.toLowerCase();
                        if (nameA < nameB) {
                            return -1;
                        }
                        if (nameA > nameB) {
                            return 1;
                        }
                        return 0;
                    });
                    state.taskList = newTaskList
                    localStorage.setItem('TaskList', JSON.stringify(state.taskList))
                    return { ...state }
                }
                case 2: {
                    let newTaskList = state.taskList.sort((a, b) => {
                        let nameA = a.name.toLowerCase();
                        let nameB = b.name.toLowerCase();
                        if (nameA > nameB) {
                            return -1;
                        }
                        if (nameA < nameB) {
                            return 1;
                        }
                        return 0;
                    });
                    state.taskList = newTaskList
                    localStorage.setItem('TaskList', JSON.stringify(state.taskList))
                    return { ...state }
                }
                case 3: {
                    let newTaskList = state.taskList.sort((a, b) => {
                        let nameA = a.status
                        let nameB = b.status
                        if (nameA > nameB) {
                            return -1;
                        }
                        if (nameA < nameB) {
                            return 1;
                        }
                        return 0;
                    });
                    state.taskList = newTaskList
                    localStorage.setItem('TaskList', JSON.stringify(state.taskList))
                    return { ...state }
                }
                case 4: {
                    let newTaskList = state.taskList.sort((a, b) => {
                        let nameA = a.status
                        let nameB = b.status
                        if (nameA < nameB) {
                            return -1;
                        }
                        if (nameA > nameB) {
                            return 1;
                        }
                        return 0;
                    });
                    state.taskList = newTaskList
                    localStorage.setItem('TaskList', JSON.stringify(state.taskList))
                    return { ...state }
                }
                case 5: {
                    let newTaskList = state.taskList.sort((a, b) => new Date(...a.deadLine.split('/').reverse()) - new Date(...b.deadLine.split('/').reverse()));
                    state.taskList = newTaskList
                    localStorage.setItem('TaskList', JSON.stringify(state.taskList))
                    return { ...state }
                }
                case 6: {
                    let newTaskList = state.taskList.sort((a, b) => new Date(...b.deadLine.split('/').reverse()) - new Date(...a.deadLine.split('/').reverse()));
                    state.taskList = newTaskList
                    localStorage.setItem('TaskList', JSON.stringify(state.taskList))
                    return { ...state }
                } default:
                    break;
            }
            return { ...state }
        }
        case 'GET_API': {
            state.productList = action.products
            return { ...state }
        }
        default: return { ...state }
    }
}
export default TodoReducer