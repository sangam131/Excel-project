let addSheetBtn=document.querySelector(".add-sheet");
let sheetList=document.querySelector(".sheets-list");
let sheetId=0;
let firstSheet=document.querySelector(".sheet");
sheetListner(firstSheet);

addSheetBtn.addEventListener("click",function(){
    sheetId++;
    let activeSheet=document.querySelector(".active-sheet");
    activeSheet.classList.remove("active-sheet");
    let sheetDiv=document.createElement("div");
    sheetDiv.classList.add("sheet");
    sheetDiv.classList.add("active-sheet");
    sheetDiv.setAttribute("sheetId",sheetId);
    sheetDiv.innerText=`Sheet ${sheetId+1}`;

    sheetList.append(sheetDiv);
    // console.log("sheet List ", sheetList);
    sheetListner(sheetDiv);
    initDb();
    initUI();
})

function sheetListner(sheet){
  sheet.addEventListener("click",function(){
    if(sheet.classList.contains("active-sheet")){
        return;
    }
    let activeSheet=document.querySelector(".active-sheet");
    activeSheet.classList.remove("active-sheet");
    // initUI();
    sheet.classList.add("active-sheet");
    let sheetId=sheet.getAttribute("sheetId");
    db=sheetsDb[sheetId].db;
    // console.log("Array ",db)
    visitedCells=sheetsDb[sheetId].visitedCells;
    // console.log("visited cell",visitedCells)
    if(visitedCells.length >0)
       { setUI();}
       else{
        initUI();
       }
    // console.log("Hello");
  })
}

function setUI(){
  for(let i=0;i<visitedCells.length;i++){
    console.log("visited cell",i);
        let {rowId,colId}=visitedCells[i];
        let cellObj=db[rowId][colId];
        let cell=document.querySelector(`div[rowid='${rowId}'][colid='${colId}']`);
        cell.innerHTML=cellObj.value;
  }
}

function initUI(){
    for(let i=0;i<100;i++)
    {
        for(let j=0;j<26;j++)
        {
            let cell=document.querySelector(`div[rowid='${i}'][colid='${j}']`);
            cell.innerHTML="";
        }
    }
}