import React from 'react';
import './HomePage.css';
import 'antd/dist/antd.css';
import AddTask from "./AddTask";
import ListTask from "./ListTask";
import SearchSort from "./SearchSort";
import { Grid } from "@material-ui/core";
import { ToastContainer } from 'react-toastify';


export default function HomePage() {
    return (
        <div className='homePage'>
            <h1 style={{ textAlign: 'center' }} className='mb-5'>TODO-LIST</h1>
            <ToastContainer />
            <Grid container spacing={2}>
                <Grid item xs={4} style={{ margin: 0 }}>
                    <AddTask />
                </Grid>
                <Grid item xs={8} style={{ margin: 0 }}>
                    <SearchSort />
                    <ListTask />
                </Grid>
            </Grid>
        </div>
    )
}
