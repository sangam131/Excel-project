let topRow=document.querySelector(".top-row");
let leftCell=document.querySelector(".left-col");
let topLeftCell=document.querySelector(".top-left-cell");
let allCells=document.querySelectorAll(".cell");
let addressInput=document.querySelector("#address");
let formulaInput=document.querySelector("#formula");

cellsContentDiv.addEventListener("scroll",function(e){
   let scrollFromTop=e.target.scrollTop;
   let scrollFromLeft=e.target.scrollLeft;
   topRow.style.top=scrollFromTop+"px";
   leftCell.style.left=scrollFromLeft+"px";
   topLeftCell.style.left=scrollFromLeft+"px";
   topLeftCell.style.top=scrollFromTop+"px";
})

let lastSelectedCell;
let rowId;
let colId;
for(let i=0;i<allCells.length;i++)
{
   allCells[i].addEventListener("click",function(e){

      if(lastSelectedCell){
        lastSelectedCell.classList.remove("active-cell");
        document.querySelector(`div[trid='${colId}']`).classList.remove("active-row-col");
        document.querySelector(`div[lcid='${rowId}']`).classList.remove("active-row-col");
      }

      rowId=Number(e.target.getAttribute("rowid"));
      colId=Number(e.target.getAttribute("colid"));

        e.target.classList.add("active-cell");
        document.querySelector(`div[trid='${colId}']`).classList.add("active-row-col");
        document.querySelector(`div[lcid='${rowId}']`).classList.add("active-row-col");
       let address=String.fromCharCode(65+colId)+(rowId+1)+"";
       let cellObj=db[rowId][colId];
      //  console.log(address);
       addressInput.value=address;
        //Update UI
      formulaInput.value=cellObj.formula;

      cellObj.fontStyle.bold?document.querySelector(".bold").classList.add("active-font-style"):
      document.querySelector(".bold").classList.remove("active-font-style");

      cellObj.fontStyle.bold?document.querySelector(".italic").classList.add("active-font-style"):
      document.querySelector(".italic").classList.remove("active-font-style");

      cellObj.fontStyle.bold?document.querySelector(".underline").classList.add("active-font-style"):
      document.querySelector(".underline").classList.remove("active-font-style");
   })

   allCells[i].addEventListener("blur",function(e){
      lastSelectedCell=e.target;
      let cellValue=e.target.textContent;
      let{rowId,colId}=getRowIdColIdFromElement(e.target);
      // console.log("rowid",rowId);
      // console.log("colId",colId);
      let cellObj=db[rowId][colId];
      if(cellObj.formula){
         removeFormula(cellObj);
      }

      // console.log("cellObject",cellObj);
      if(cellObj.value==cellValue)
      {
         return;
      }
      cellObj.value=cellValue;
     

      // console.log("After Update",cellObj);
      updateChildren(cellObj);
      if(cellObj.visited){
         return ;
      }
      cellObj.visited=true;
      visitedCells.push({"rowId":rowId,"colId":colId});
   })

   allCells[i].addEventListener("keydown",function(e){
      if(e.key=='Backspace')
      {
         let cell=e.target;
         let {rowId,colId}=getRowIdColIdFromElement(cell);
         let cellObj=db[rowId][colId];
         if(cellObj.formula)
         {  //update db
            cell.formula="";
            //update UI
           formulaInput.value="";
           cell.textContent="";
           removeFormula(cellObj);
         }
      }
   })
}

formulaInput.addEventListener("blur",function(e){
   let formula=e.target.value;
   if(formula){
      let {rowId,colId}=getRowIdColIdFromElement(lastSelectedCell);
      let cellObj=db[rowId][colId];
      let computedValue= solveFormula(formula,cellObj);
      //update db
       cellObj.value= computedValue;
       cellObj.formula=formula;
       //last selected cell
       lastSelectedCell.textContent=computedValue;
       updateChildren(cellObj);
   }
})