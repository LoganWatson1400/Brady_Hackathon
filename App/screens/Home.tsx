import { useState } from "react";

import Camera from "@/Components/Camera";
import Form from "@/Components/Form";
import { createTable, getRows } from "@/Components/database";

const Home = () => {
    const [open, setOpen] = useState(false);


    //<Image
    //       style={{width: 35, height: 35, tintColor: "rgba(28,70,144,1)"}}
    //       source={require('../assets/images/Camera-icon.png')}
    //       placeholder="hey"/>


    // <Form open={open} onChange={()=> {setOpen(true)}}/>
    // <Camera open={open} onChange={()=> {setOpen(false)}}/>

    createTable("Profiles");
    getRows("Profiles");
    return (
        <>
            
        </>
    );
}

export default Home;
