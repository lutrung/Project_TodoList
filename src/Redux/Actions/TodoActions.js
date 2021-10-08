import Axios from 'axios'
import Swal from 'sweetalert2'

export const addTaskAction = (task) => {
    return {
        type: 'ADD_TASK',
        task
    }
}
export const delTaskAction = (id) => {
    return {
        type: 'DELETE_TASK',
        id
    }
}
export const editTaskAction = (id) => {
    return {
        type: 'EDIT_TASK',
        id
    }
}
export const changeStatusAction = (id) => {
    return {
        type: 'CHANGE_STATUS',
        id
    }
}
export const cancelEditAction = () => {
    return {
        type: 'CANCEL_EDIT',
    }
}
export const searchAction = (keyWord) => {
    return {
        type: 'SEARCH_TASK',
        keyWord
    }
}
export const sortAction = (value) => {
    return {
        type: 'SORT_TASK',
        value
    }
}
export const getApi = async (itemsLenght) => {
    return async (dispatch) => {
        try {
            let result = await Axios({
                url: `https://randomuser.me/api/?results=${itemsLenght}`,
                method: 'GET',
            })
            dispatch({
                type: 'GET_API',
                products: result.data.results
            })
        } catch (err) {
            Swal.fire('Thông báo', err.response, 'error')
        }
    }
}