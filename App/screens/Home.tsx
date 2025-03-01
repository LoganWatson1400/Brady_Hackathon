//import { useState } from "react";
import React from 'react'
import Camera from "@/components/Camera";
//import Form from "@/components/Form";
//import { createTable, getRows } from "@/components/database";

const Home = () => {
    const [open, setOpen] = React.useState(false);


    //<Image
    //       style={{width: 35, height: 35, tintColor: "rgba(28,70,144,1)"}}
    //       source={require('../assets/images/Camera-icon.png')}
    //       placeholder="hey"/>
    
    
    //<Form open={open} onChange={()=> {setOpen(true)}}/>

    //createTable("Profiles");
    //getRows("Profiles");
    return (
        <>
            <Camera open={open} onChange={()=> {setOpen(false)}}/>

        
        </>
    );
}

export default Home;
