import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import { TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { searchAction, sortAction } from '../../Redux/Actions/TodoActions';

export default function SearchSort() {
    const dispatch = useDispatch()
    let onChange = (e) => {
        let keyWord = e.target.value.toLowerCase()
        dispatch(searchAction(keyWord))
    }
    const currencies = [
        {
            value: 1,
            label: 'Tên A-Z',
        },
        {
            value: 2,
            label: 'Tên Z-A',
        },
        {
            value: 3,
            label: 'Hoàn thành',
        },
        {
            value: 4,
            label: 'Chưa hoàn thành',
        },
        {
            value: 5,
            label: 'Ngày hoàn thành gần nhất',
        },
        {
            value: 6,
            label: 'Ngày hoàn thành xa nhất',
        },
    ];

    const onSortBy = (event) => {
        dispatch(sortAction(event.target.value))
    };
    return (
        <div className='mb-2' style={{ display: 'flex', justifyContent: 'space-between' }}>
            <TextField
                style={{ width: '72%' }}
                id="filled-basic"
                label="Tìm kiếm"
                variant="filled"
                onChange={onChange}
            />
            <TextField
                style={{ width: '25%' }}
                id="filled-select-currency"
                select
                label="Sắp xếp"
                onChange={onSortBy}
                variant="filled"
            >
                {currencies.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>
        </div>
    )
}