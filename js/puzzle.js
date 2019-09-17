let tableItems = ["r0","r1","r2","r3","r4","r5","r6","r7","r8"];

function getTable(value){
    for (i = 0; i < tableItems.length; i++) {
            if(document.getElementById(tableItems[i]).firstChild.data == value){
                return tableItems[i];
            }
        }
}



function changePlace(id, tablePosID){
    let arr = []

    if ([2, 5, 8].includes(parseInt(tablePosID[tablePosID.length-1]))) { arr = [+3, -3, -1]; }
    else if ([0, 3, 6].includes(parseInt(tablePosID[tablePosID.length-1]))) { arr = [+3, +1, -3]; }
    else { arr = [+3, +1, -3, -1]; }

    for (i = 0; i < tableItems.length; i++){
        console.log(tablePosID[tablePosID.length-1] + " + " + arr[i] + " = " + id[1])
        if (parseInt(tablePosID[tablePosID.length-1]) + parseInt(arr[i]) == parseInt(id[1])) { return true; }
    }
    return false;
}


function pushed(id){
    var button = document.getElementById(id);

    if (button.firstChild.data != " ") {
        tablePosID = getTable(" ");
        if (changePlace(id, tablePosID) == false) return;
        else {
            document.getElementById(tablePosID).firstChild.data = button.firstChild.data;
            button.firstChild.data = " ";
        }
    }
}
