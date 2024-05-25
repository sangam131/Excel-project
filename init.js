let cellsContentDiv=document.querySelector(".cells-content");

function initCells(){
    let cellContent="<div class='top-left-cell'></div>";
    //top-row
    cellContent+="<div class='top-row'>";
    for(let i=0;i<26;i++){
        cellContent+=`<div class='top-row-cell' trid='${i}'>${String.fromCharCode(65+i)}</div>`;
    }
    cellContent+="</div>";
    //left-col
    cellContent+="<div class=left-col>";
    for(let i=0;i<100;i++)
    {
        cellContent+=`<div class="left-col-cell" lcid='${i}'>${i+1}</div>`;
    }
    cellContent+="</div>";
   cellContent+="<div class='cells'>";
    for(let i=0;i<100;i++)
    {
        cellContent+="<div class='row'>";
        //col
        for(let j=0;j<26;j++)
        {
            cellContent+=`<div class='cell' rowid="${i}" colid="${j}" contentEditable></div>`;
        }
        cellContent+="</div>";
    }
    cellContent+="</div>";
  cellsContentDiv.innerHTML= cellContent;
}

initCells();

let db;
let sheetsDb=[];
let visitedCells;

function initDb(){
     let newSheetsDb=[];
     for(let i=0;i<100;i++)
     {
        let row=[];
        for(let j=0;j<26;j++)
        {
            let name= String.fromCharCode(65+j)+(i+1)+"";
            let cellObj={
                name:name,
                value:"",
                formula:"",
                children:[],
                parent:[],
                visited:false,
                fontStyle:{bold:false,italic:false,underline:false}
            }
            row.push(cellObj);
        }
        newSheetsDb.push(row);
     }
     visitedCells=[];
     db=newSheetsDb;
     sheetsDb.push({db:newSheetsDb,visitedCells:visitedCells});
    //  console.log(sheetsDb);
}

initDb();
console.log(db);