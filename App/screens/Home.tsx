import { useState } from "react";
import Camera from "@/Components/Camera";
import Form from "@/Components/Form";

import { createProfileTable } from "@/Components/profiles";

const Home = () => {
    const [open, setOpen] = useState(false);

    const toggle = () => {
        setOpen(open ? false : true);
    }
    
    // Creates profile table if does not exist.
    createProfileTable();
    // <Form open={open} onChange={toggle}/>
    // <Camera open={open}/>



    return (
        <>
            <Form open={open} onChange={toggle}/>
            <Camera open={open}/>
        </>
    );
}

export default Home;
