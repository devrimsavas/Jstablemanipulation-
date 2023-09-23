
let lastClicked=null;

//add new value to table 
function addPerson() {
    //get table

    
    let customerTable=document.getElementById('showinfo').insertRow();

    let sName=document.getElementById('namefield').value;
    let sEmail=document.getElementById('emailfield').value;
    let sAddress=document.getElementById('addressfield').value;
    let sGender=document.getElementById('genderfield').value;


    if (!sName || sName.length < 5 || !sEmail || sAddress.length < 2 || !sGender) {
        alert("Invalid Input provide correct data");
        return;
    } else {


        //get cells 
        let name=customerTable.insertCell(0);
        let email=customerTable.insertCell(1);
        let gender=customerTable.insertCell(2);
        let address=customerTable.insertCell(3);
        name.innerHTML=sName;
        email.innerHTML=sEmail;
        gender.innerHTML=sGender;
        address.innerHTML=sAddress;
 
    console.log(sName,sEmail,sAddress,sGender);
    
    }

}


function editPerson() {

    let table=document.getElementById('showinfo'); //check if table is empty
    if(table) {
        //test line 
        let rawValues=prompt("enter row and colums and new value with comma");
        let rawArray=rawValues.split(',');
        let row=rawArray[0];
        let col=rawArray[1];
        let newValue=rawArray[2];
        let editRow=table.rows[parseInt(row)].cells;
        editRow[parseInt(col)].innerHTML=newValue;
}


    


}

async function createPerson() {
    try {
        let response=await fetch('https://randomuser.me/api/');
        if (!response) {
            throw new Error('Network response was nok ok'+response.statusText);

        }
        const data=await response.json();
        const user=data.results[0];
        const name=user.name.first+" "+user.name.last;
        const email=user.email;
        const address=user.location.city;
        console.log(user.name.title);
        let gender;
        if (user.name.title==="Ms" || user.name.title==="Mrs" || user.name.title==="Madam") {
             gender="female";
        } 
        
        else if(user.name.title==="Mr") {
            gender="male";
        }
        
        else {
             gender="undefined";
        }
        let customerTable=document.getElementById('showinfo').insertRow();
        let rName=customerTable.insertCell(0);
        let rEmail=customerTable.insertCell(1);
        let rGender=customerTable.insertCell(2);
        let rAddress=customerTable.insertCell(3);

        rName.innerHTML=name;
        rEmail.innerHTML=email;
        rGender.innerHTML=gender;
        rAddress.innerHTML=address;


    } catch(error) {
        alert(error);
    }

}

//function get all values from table 

let editActivity=0; //toggle edit box 

//disable submit button and input area 
document.getElementById('submitEditedButton').disabled=true;
document.getElementById('editEntry').disabled=true;

function onCellDoubleClick(event) {
    lastClicked=this;
    document.getElementById('editEntry').value=lastClicked.innerHTML;
}

function editInBox() {
    editActivity=1-editActivity;

    let getTable=document.getElementById('showinfo');
    let rows=getTable.querySelectorAll('tr');

    if (editActivity) {
        //let background also change another color 
        document.getElementById('tableContainer').style.backgroundColor="powderblue";
        document.getElementById('editEntryButton').innerHTML="EDIT MODE ON";
        document.getElementById('editEntryButton').style.backgroundColor='blue';
        //enable also submit new entry button
        document.getElementById('submitEditedButton').disabled=false;

        //enable input field
        document.getElementById('editEntry').disabled=false;
        //also add an event Listener to edit button
        document.getElementById('submitEditedButton').addEventListener('click', updateCell);


        //check and get all cells
        for (let i=0;i<rows.length;i++) {
            let cells=rows[i].querySelectorAll('td');
            for (let j=0;j<cells.length; j++) {
                cells[j].addEventListener('dblclick',onCellDoubleClick);
            }
        }
    }else { //here is inactive elements when i do not use Edit mode 

        //disable input 
        document.getElementById('editEntry').disabled=true;

        //reset background color 
        document.getElementById('tableContainer').style.backgroundColor="";
        //submit edited button should be inactive too 
        document.getElementById('submitEditedButton').disabled=true;
        //remove edit button event listener 
        document.getElementById('submitEditedButton').removeEventListener('click', updateCell);
        document.getElementById('editEntryButton').innerHTML="EDIT MODE OFF";
        document.getElementById('editEntryButton').style.backgroundColor="";
        
        for (let i=0; i<rows.length;i++) {
            let cells=rows[i].querySelectorAll('td');
            for (let j=0; j<cells.length;j++) {
                //remove eventListener
                cells[j].removeEventListener('dblclick',onCellDoubleClick);
            }
        }

    }
}


function updateCell() {
    //in case clicked cell 
    if(lastClicked) {
        lastClicked.innerHTML=document.getElementById('editEntry').value;
        //clear entry input 
        document.getElementById('editEntry').value='';

    }
}











    
    


    
    

