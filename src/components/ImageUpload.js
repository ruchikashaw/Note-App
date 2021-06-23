import React, {useState, useEffect} from "react";
import {storage} from "../firebase";
import {CopyToClipboard} from "react-copy-to-clipboard";
import { MdContentCopy } from "react-icons/md";
import {IconContext} from "react-icons";



const ImageUpload = () => {
    const [image,setImage]= useState(null);
    const [url,setUrl]= useState(""
        // localStorage.url ? JSON.parse(localStorage.url): []
    );
    // useEffect(() => {
    //   localStorage.setItem("url",JSON.stringify(url));
    // },[url]);
    
    // JSON.stringify({url});


    const handleChange = e => {
        if (e.target.files[0]){
            setImage(e.target.files[0]);
        }
    };
    const handleUpload = () =>{
        const uploadTask = storage.ref(`images/${image.name}`).put(image)
        uploadTask.on(
            "state_changed",
            snapshot => {},
            error => {
            console.log(error);
            },
            ()=> {
                storage
                .ref("images")
                .child(image.name)
                .getDownloadURL()
                .then(url => {
                    setUrl(url);
                });
            }

        );
    }
    
    console.log("image:",image);
    const[isCopied,setIsCopied]=useState(false)

    // const codeSnippet =  
    //    ![]({url});
    
    //    JSON.stringify({url});  

    const onCopyText = () =>{
        setIsCopied(true);
        setTimeout(()=>{
            setIsCopied(false);
        },1000);
    }
    console.log('Copied');
    return(
        <div className="filehandle">
            <br/>
            <br/>
             <h3>ADD IMAGE</h3>
             <input type="file" onChange={handleChange} />
             <button onClick={handleUpload}>Upload</button>
             <br/>
             
             {/* ![]({url}) */}
             
                 <CopyToClipboard text={"![](" +url+ ")"} onCopy={onCopyText}>
                 <span>{isCopied ? <h3>"Copied!"</h3> : <IconContext.Provider value={{style:{fontSize:'50px',color: 'Purple'}}}><MdContentCopy/>
                 Copy to clipboard
                 </IconContext.Provider>}</span>
                 </CopyToClipboard>
             
             
            </div>
    );
};

export default ImageUpload;