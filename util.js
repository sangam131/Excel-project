function solveFormula(formula,selfObject)
{
  //formula- A1 - B2 * C3 + D4
   let formulaComps=formula.split(" ");
   //formulaComps-['A1','-','B1','*','C3','+','D4']
   for(let i=0;i<formulaComps.length;i++)
   {
     let formulaComp=formulaComps[i];
     if(formulaComp[0]>="A" && formulaComp[0]<="Z"){
        let {rowId,colId}=getRowIdColIdFromAddress(formulaComp);
        let cellObj=db[rowId][colId];
        let value=cellObj.value;
        if(selfObject){
          cellObj.children.push(selfObject.name);
          selfObject.parent.push(cellObj.name);
        }
          console.log(cellObj);
        formula=formula.replace(formulaComp,value);
     }
   }
   //formula - 2 - 3 * 8 +3
   let computedValue = eval(formula);
   return computedValue;
}

function removeFormula(cellObj){
 for(let i=0;i<cellObj.parent.length;i++){
   let parentName=cellObj.parent[i];
   let {rowId,colId}=getRowIdColIdFromAddress(parentName);
   let parentCellObj= db[rowId][colId];
   let updateChildren= parentCellObj.children.filter(function(child){
      return child!=cellObj.name;
   })
   parentCellObj.children=updateChildren;
 }
 cellObj.parent=[];
}

function updateChildren(cellObj){
  for(let i=0;i<cellObj.children.length;i++){
      let childName = cellObj.children[i];
      let {rowId,colId} = getRowIdColIdFromAddress(childName);
      let childCellObject = db[rowId][colId];
      let newValue = solveFormula(childCellObject.formula);
      //update UI
      let cellUI = document.querySelector(`div[rowid='${rowId}'][colid='${colId}']`);
      cellUI.textContent = newValue;
      //update db
      childCellObject.value = newValue;
      updateChildren(childCellObject);
  }
}

function getRowIdColIdFromElement(element)
{
     let rowId=element.getAttribute("rowid");
      let colId=element.getAttribute("colid");
      return{
         rowId,
         colId
      }
}

function getRowIdColIdFromAddress(address){
    let colId = address.charCodeAt(0)-65;
    let rowId = Number(address.substring(1))-1;
  return{
    rowId,
    colId
  }
}