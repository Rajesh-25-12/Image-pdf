
import React, { useEffect, useState } from 'react'

import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
//alert message
import Snackbar from "@mui/material/Snackbar";
import Alert from "@material-ui/lab/Alert";

import { Grid, Box,FormHelperText} from '@mui/material';
import "./ag.css";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import GetAppIcon from '@mui/icons-material/GetApp';
import jsPDF from 'jspdf';
import "jspdf-autotable";
import Button from '@mui/material/Button';
//appbar icons
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
import Avatar from "@mui/material/Avatar";
import Inter from "../components/Internet err.gif"

//for drodown
import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
//import Select from '@mui/material/Select';

import {  login, getAllEmpimgrept, getAllImgRept, getAllComp, getAllGenerate } from '../service/ImgReport.service';
import Select from '@mui/material/Select';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

let gridApi;
let gridColumnApi;
/*
const ROWS_PER_PAGE = 10;
const TOTAL_ROWS = 100;

const delay = (callback, delay = 1000) =>
  new Promise((resolve) =>
    setTimeout(() => {
      resolve(callback());
    }, delay)
  );
*/

const loginUser = () => {

  // Make a req to login
  login("ithod@pgc.com", "edp123").then(res => { // handle success
    console.log(res.data.access_token);
    localStorage.setItem("ipss_access_token", res.data.access_token);
       //Empolyee Image Report
       localStorage.setItem("Empimgrt",res.data.user_roles.user_permissions.Empimgrt)
    invalidateComp();
    
   
  })
    .catch(error => {// handle error
      console.log(error);
    })
    .then(() => {// always executed
      console.log('always');
    });
  }
  


const EmpImRpt = () => {
  const classes = useStyles();

  
  //columnhover
  // turns OFF row hover, it's on by default
  const suppressRowHoverHighlight = true;
  // turns ON column hover, it's off by default
  const columnHoverHighlight = true;
  const [rowData, setRowData] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalRows, setTotalRows] = useState();
  const [rowsPerPage, setRowsPerPage] = useState();
  const [masterid, setMasterid] = useState();
  const [bandid, setbandid] = useState([]);
  //---------------------------------------
  const [idcard, setidcard] = useState([]);
  
  const [name, setname] = useState([]);

   const [oidno, setoidno] = useState([]);
  
  const [gender, setgender] = useState([]);

  const [doj, setdoj] = useState([]);
  
  const [contactno, setcontactno] = useState([]);
 
  const [ band, setband] = useState([]);
 
  const [selectedDeptID, setSelectedDeptID] = useState("");
//alert message
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
 
 const [compcode, setCompcode] = useState([]);
  const [compcodee, setCompcodee] = useState([]);
  const [idactivee, setIdactivee] = useState([]);
  const[submitting,setSubmitting]=useState(false);
  const[compdodeerror,setCompcodeError]=useState(false)
  const[ideerror,setIderror]=useState(false)
  //------------------------------------------
  
  const handleDeptChange = (event) => {
    setSelectedDeptID(event.target.value);
  setCompcodeError(false);
    setCompcodee(event.target.value)
  }

  //const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setIdact(event.target.value);
  };

  const[image1,setImage1]=useState();
  
  //add and update  
  const invalidateEmpImRpt = () => {
    const imgRept_access_token = localStorage.getItem("ipss_access_token");


     
// Make a req to get all users with current page number
getAllEmpimgrept(imgRept_access_token).then(res => { // handle success
  console.log(res,"this file"); 

  let dataset=res.data.data;
  let imge1=[];
  for(let i=0;i<dataset.length;i++){
    if(dataset[i].img_upload==="null"||dataset[i].img_upload===null||dataset[i].img_upload===''||dataset[i].img_upload===""){
     
      imge1.push(fr+"docs/2022/12/1719")
    }else{
    imge1.push(fr+dataset[i].img_upload)}
  }
  let txt=[];
  for(let i=0;i<imge1.length;i++){
    txt.push(imge1[i].trim())
  }

  let datae=[]
  for(let i=0;i<30;i++){
    datae.push(dataset[i])
  }
  
  setImage1(txt);
  console.log(imge1,"imge file");
  console.log(txt,"imge file");
  // setRowData(res.data.data);
  setRowData(datae);
  setEditData(res.data.data);
  setTotalRows(res.data.total_data);
  setRowsPerPage(res.data.data_per_page);
  setCurrentPage(currentPage);
})
  .catch(error => {// handle error
    console.log(error);
  })
  .then(() => {// always executed
    console.log('always');
  });


}
//--------------------------------------
const handleGenerate=()=>{
    
  const img_access_token = localStorage.getItem("ipss_access_token");
  setSubmitting(true);
    if ( selectedDeptID===null||selectedDeptID==="undefined"||selectedDeptID===undefined||selectedDeptID==="") {
      setCompcodeError("Required Input Field")
    }
    if ( idactivee===null||idactivee==="undefined"||idactivee===undefined||idactivee===""||idactivee.length===0) {
      setIderror("Required Input Field")
    }
    if (
      selectedDeptID===null||selectedDeptID==="undefined"||selectedDeptID===undefined||selectedDeptID===""||
      idactivee===null||idactivee==="undefined"||idactivee===undefined||idactivee===""||idactivee.length===0
    ) {
      return
    } else {
      setSubmitting(true)
    }
  getAllGenerate(img_access_token,compcodee, idactivee)
  .then(res => { // handle success
    // if(idactivee.length !==0 || compcodee.length !==0  ){
    //   setOpen1(true);

    //   setTimeout(() => {
    //     setOpen1(false);

    //   }, 1000);
    // }
    // else{
  
      setOpen1(true);
   setTimeout(() => {
    setOpen1(false);

  }, 1000);
    // }


    console.log(idactivee);
  
   console.log(compcodee);
    console.log(res);
    setRowData(res.data.data);


  })
  .catch(error => {// handle error
    setOpen2(true);
      setTimeout(() => {
       setOpen2(false);
 
     }, 1000);


    console.log(error);
  })
  .then(() => {// always executed
    console.log('always');
  });


  

}
  //Api integeration

  //to avoid overlap in sidebar

  useEffect(() => {

  
    invalidateEmpImRpt ();
    invalidateComp();

  //  const isDevEnv = window.location.href.includes('10098') ? true : false;
  //    if (isDevEnv) {
    // loginUser();
       
  //  }
  //    else {
      invalidateEmpImRpt();
      
    //  }

    //MuiAppBar

    var element = document.querySelectorAll('style[data-meta="MuiAppBar"]');

    console.log(element.length);

    if(element) {

      if(element.length > 1)

      {

        element[0].parentNode.removeChild(element[1]);

      }

    }

 

  }, []

  );

  //csv export
  const onGridReady = (params) => {
    gridApi = params.api;
    gridColumnApi=params.columnApi;
  };
 
  const onExportClick = () => {
    var params = {
      skipHeader: false,
      skipFooters: true,
      skipGroups: false,
      fileName: "Employee Image Report.csv"
  };
  gridApi.exportDataAsCsv(params);

  }
 
//Print Function
function printPage() {
window.print();
}

// //for company code dropdown value
// const [age, setAge] = React.useState('');



  //for ID active dropdown value
//const [idactivee, setidactivee] = React.useState('');

const handleChangeidactivee = (event) => {
  setIdactivee(event.target.value);
  setIderror(false);
};



///..................................
const invalidateComp = () => {
  const comp_access_token = localStorage.getItem("ipss_access_token");
  getAllComp(comp_access_token)
    .then((res) => {
      // handle success
      console.log(res);
      setCompcode(res.data.company_codes);
    
    })
    .catch((error) => {
      // handle error
      console.log(error);
    })
    .then(() => {
      // always executed
      console.log("always");
    });
};
//----------------------------------------------
const invalidateimgRept= () => {
  const imgRept_access_token = localStorage.getItem("ipss_access_token");
  getAllImgRept(imgRept_access_token)
    .then((res) => {
      // handle success
      console.log(res);
      setidcard(res.data.idcard);
      setname(res.data.name); 
      setoidno(res.data.oidno); 
      setgender(res.data.gender); 
      setdoj(res.data.doj); 
      setband(res.data.band); 
      setcontactno(res.data.contactno); 
    })
    .catch((error) => {
      // handle error
      console.log(error);
    })
    .then(() => {
      // always executed
      console.log("always");
    });
};

const handleCl = ()=>{
  setSelectedDeptID('');
  setCompcodee('');
  setIdactivee('');
  setRowData([]);
};
const fr="https://freshvoice.sgp1.digitaloceanspaces.com/"
const v="docs/2022/12/1691"
const img=fr+v
const ava=({value})=>{
  return (
    <>
      <Avatar id="img"  sx={{ width: 100, height: 100 }} src={fr+value} />
    </>
  );
}
const rows=[
  {
    
  }
]
var Permission = ["export"]
console.log(localStorage.getItem("Empimgrt"))
// if(Permission===null||Permission===""){
//    Permission= localStorage.getItem("Empimgrt")
// }
// const PAII = rowData.map(raj => (fr+raj.img_upload));
const imge=fr+"docs/2022/12/1716"
console.log("imge",imge);
var va=[]



const column=[
  {header:"Empolyee Name",dataKey:"name"},
  {header:"ID Card No",dataKey:"idcard"},
  {header:"Old ID Card No",dataKey:"oidno"},
  {header:"Gender",dataKey:"gender"},
  {header:"Image",dataKey:""},
  {header:"Band",dataKey:"band"},
  {header:"Contact No",dataKey:"contactno"},
  {header:"Address",dataKey:"cadd"},
  {header:"Date of Joining",dataKey:"doj"},
]

let imgs=0;
const Pdf =()=>{
  const doc=new jsPDF('p', 'mm', [300, 298])
  doc.autoTable(column, rowData, {startY: 35,theme: 'grid',columnStyles: {
    0: {
        columnWidth: 35
    },
    1: {
        columnWidth: 25
    },
    2: {
      columnWidth: 25
  },
  3: {
    columnWidth: 25
},4: {
  columnWidth: 25
},5: {
  columnWidth: 35
},6: {
  columnWidth: 25
},
7: {
  columnWidth: 25
},8: {
  columnWidth: 25
},
   },
   bodyStyles: {minCellHeight: 15},
   didDrawCell: function(data) {
    console.log(data)
          if (data.column.index === 5 && data.cell.section === 'body') {
       var td = data.cell.raw;
       var dim = data.cell.contentHeight - data.cell.padding('vertical');
      //  var textPos = data.cell.textPos;
         var div = data.cell.raw;
console.log(div)
      //  doc.addImage(img,105,  data.cell.y, dim, dim);
      // var img = img.get('img')[0];

       doc.addImage(image1[imgs ], 130,  data.cell.y, dim, dim);
       imgs++;
    }
  
  
  
  
  }
});
    doc.save("image.pdf")
  
}
localStorage.setItem("Internet err",Inter)

  return (
    <div className="ag-theme-alpine" style={{ height: "100vh", margin: "5vh" }}>
    <br/> <br/> <br/>
      <div className={classes.root}>
 
 <AppBar position="static"  class="appbar29">
   <Toolbar>


     {/*for appbar*/}
     <Box  display='flex' flexGrow={1}>
     <h1 align='left'  className='txt'>Employee Image Report</h1>

</Box>     


    <div >
      <Grid align="right">
       
     
     <div className='tooltip'>
     <Button variant="text"id="refreshgen" onClick={handleCl} style={{color: 'black'}}><RefreshRoundedIcon/></Button>
     <span className='tooltiptext'>Reset</span></div>
     {/* {Permission.includes('export') &&

     <div className='tooltip'>   
     <Button variant="text"id="downloadgen" onClick={Pdf} style={{color: 'black'}}><GetAppIcon/></Button>
     <span className='tooltiptext'>Download</span></div>} */}
      {Permission.includes('export') &&
            <div className='tooltip'>
            <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <React.Fragment>
          <Button  variant="text" id='downloadgen'  style={{ color: 'black' }} {...bindTrigger(popupState)}> <GetAppIcon /> </Button>
         
        
         
          <Menu {...bindMenu(popupState)}>
            <MenuItem onClick={Pdf}> PDF</MenuItem>
            <MenuItem onClick={onExportClick}>CSV</MenuItem>
       
          </Menu>
        </React.Fragment>
      )}
    </PopupState>
    <span className='tooltiptext'>Download</span>
</div>}


     </Grid>
     </div>

</Toolbar>
   </AppBar>
   </div>
   <br></br>


{/*for filter*/}
<div>
  <Toolbar>
    <Box  display='flex' flexGrow={1}>
      <div className="dte1">
     <FormControl error={compdodeerror}  sx={{ m: 1, minWidth: 160 }}  size="small"  style={{paddingRight:"10px"}} >
      <InputLabel id="demo-select-small">Company Code</InputLabel>
      <Select
        labelId="demo-select-small"
        id="companycode"
        value={selectedDeptID}
        label="compcode"
        onChange={handleDeptChange} 
      
        >
        {compcode.map(obj => {
                  return (
                    <MenuItem
                      value={obj.gtcompmastid}
                      onChange={handleDeptChange}
                    >
                      {obj.compcode}
                    </MenuItem>
                  );
                })}
     
       </Select>
       {compdodeerror &&
              <FormHelperText>Field is Required</FormHelperText>}
</FormControl> 
</div>

    {/*for ID Active dropdown*/}
    <div className='slt2'>
     <FormControl error={ideerror} sx={{ m: 1, minWidth: 175 }}  size="small"  >
      <InputLabel  >ID Active</InputLabel>
      <Select
        labelId="demo-select-small"
        value={idactivee}
        label="ID Active"
        onChange={handleChangeidactivee}
          id="idactive"
      >
     
        
        
    <MenuItem value={"YES"}>YES</MenuItem>  
    <MenuItem value={"NO"}>NO</MenuItem>
      </Select>
      {ideerror &&
              <FormHelperText>Field is Required</FormHelperText>}
    </FormControl> 
           &nbsp;
          <br></br> 

     </div>

    </Box> 
    <Grid align="right">
      <div className='gen'>
      <Button  variant="contained" id="genratebtn" onClick={handleGenerate} style={{backgroundColor:"#31466B", color:"white"}}>{submitting}Generate</Button></div>
    </Grid>
    {/* alert message */}
    <Snackbar open={open1} autoHideDuration={1000} >
              <Alert severity="success">
                <strong> Generated Successfully!</strong>
              </Alert>

            </Snackbar>
            <Snackbar open={open2} autoHideDuration={1000} >
          <Alert  severity="error">
          <strong>Generate Unsuccessful!</strong> 
          </Alert>
            </Snackbar>
    </Toolbar>
</div>
    
      <br></br>

      <div style={{ width: "100%", height: "100%" }} >

        < AgGridReact style={{
          boxSizing: "border-box",
          height: "100%",
          width: "100%",
          textAlign: 'center'
        }}
          pagination={true}
          // columnDefs={columnDefs}
          paginationPageSize={20}
          rowHeight={100}
          maxColWidth={159}
          suppressRowHoverHighlight={ true}
          // rowData={rowData}
          rowData={rowData.map((item) => ({
            // ...item,
            idcard: [item.idcard],
            name: [item.name],
            oidno: [item.oidno],
            gender: [item.gender],
            band: [item.band],
            cadd: [item.cadd],
            doj: [item.doj],
            img_upload: [item.img_upload],

            // img_upload: <Avatar   sx={{ width: 100, height: 100 }} src={fr+[item.img_upload]} />,
            
            contactno: [item.contactno],
          }))}
          rowMultiSelectWithClick={false}
          defaultColDef={{  resizabl: true,lockVisible:true, resizable: true, sortable: true, editable: false, filter: true, floatingFilter: true, enableBrowserTooltips: true }}
          onGridReady={onGridReady}
        >
          <AgGridColumn field="name" headerName="Employee Name" ></AgGridColumn>
          <AgGridColumn field="idcard" headerName="ID Card No"   ></AgGridColumn>
          <AgGridColumn field="oidno" headerName="Old ID Card No"></AgGridColumn>
          <AgGridColumn field="gender" headerName="Gender"></AgGridColumn>
          <AgGridColumn field="band" headerName="Band" ></AgGridColumn>
          <AgGridColumn field="contactno" headerName="Contact No" ></AgGridColumn>
          <AgGridColumn field="cadd" headerName="Address"></AgGridColumn>
          <AgGridColumn field="doj" headerName="Date of Joining"></AgGridColumn>
          <AgGridColumn field="img_upload" headerName="Image" tooltipfield="empname" cellRendererFramework={ava}   editable="false" sortable="false" filter="false" floatingFilter= "False"></AgGridColumn>
        </AgGridReact>
        

      </div>
    </div>
  )
}
export default EmpImRpt;
