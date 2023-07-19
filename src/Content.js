import React from "react"
import { useState } from "react";

const Content= ()=>{
    const[item,setitem]= useState("surya")

   const handleclick=()=>{
    let dish=['list',"sheet","board"];
    let total=Math.floor(Math.random()*3);
     setitem (dish[total])

    }




return(
    <div>
        <h1>
            food order{item}<br/>
            <button onClick={()=>handleclick()}>clickhere</button>

        </h1>
        

        <p>
        <table border="2">
            <tr>
              
                    <th> S.NO</th>
                    <th>items</th>
                    <th>rate</th>
                    <th>quantity</th>
               





            </tr>
            <tr>
               
                    <td>1</td>
                    <td>friedrice</td>
                    <td>90</td>
                    <td>2</td>
               
            </tr>
            <tr>
               
                <td>2</td>
                    <td>noodles</td>
                    <td>100</td>
                    <td>3</td>
                    





                





            </tr>




        </table>
        </p>




    </div>
    
  
   
 );




}


export default Content;