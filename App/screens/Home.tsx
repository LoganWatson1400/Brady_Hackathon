import { useState } from "react";
import Camera from "@/Components/Camera";
import Form from "@/Components/Form";

import Button from "@/Components/Button";
import Analyzer from "@/Components/Analyzer";
import { createProfileTable, deleteProfileTable } from "@/Components/profiles";
import {
    createReportTable,
    deleteReportTable,
    getAllReports,
} from "@/Components/reports";

const Home = () => {
    const [open, setOpen] = useState(false);

    const toggle = () => {
        setOpen(open ? false : true);
    };

    //deleteProfileTable()
    //deleteReportTable()

    // Creates profile table if does not exist.
    createProfileTable();

    // Creates report table if does not exist.
    createReportTable();
    // <Form open={open} onChange={toggle}/>
    // <Camera open={open}/>

    return (
        <>
            <Form open={open} onChange={toggle}/>
            <Camera open={open}/>
        </>
    );
};

export default Home;
