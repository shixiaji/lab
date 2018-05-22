var select1 = document.getElementById("select1");
var select2 = document.getElementById("select2");
var display1 = document.getElementById("display1");
var display2 = document.getElementById("display2");
var commit = document.getElementById("commit");
var tables = [];

function change1() {
    display1.innerHTML=""
    if(select1.options[0].selected===true){
        commit.style.display="none";}
    else if(select1.options[1].selected===true){
        commit.style.display="none";
        createTable();}
    else if(select1.options[2].selected===true){
        commit.style.display="none";
        addRow();}
    else if(select1.options[3].selected===true){
        commit.style.display="block";
        deleteRow();}
    else if(select1.options[4].selected===true){
        commit.style.display="block";
        deleteTable();}
}

function change2() {
    changeTable();change1();
}

function changeTable() {

    var index=select2.selectedIndex;
    display2.innerHTML="";
    if(index==0){return;}

    var table=document.createElement("table");
    var tr=document.createElement("tr");
    for(var i=0;i<tables[index].attr.length;i++){
        var th = document.createElement("th");
        th.innerHTML=tables[index].attr[i];
        tr.appendChild(th);
    }
    table.appendChild(tr);

    for(var i=0;i<tables[index].innerTable.length;i++){
        var tr =document.createElement("tr");
        if(i%2 !=0){tr.className="odd_tr";}
        for (var j=0;j<tables[index].attr.length;j++ ){
            var td=document.createElement("td");
            td.innerHTML=tables[index].innerTable[i][j];
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }

    display2.appendChild(table);

}

class Table{
    constructor(name,attr){
        this.name=name;
        this.attr=attr;
        this.innerTable =[];
    }
}

function createTable() {

    var tableName = document.createElement("input");
    tableName.type="text";tableName.placeholder="Table Name";
    display1.appendChild(tableName);
    var columns = document.createElement("input");
    columns.type="number";columns.placeholder="Columns Numbers";
    display1.appendChild(columns);

    var input = document.createElement("div");
    display1.appendChild(input);

    columns.onchange=function () {
        input.innerHTML="";
        if(columns.value > 0){
            for(var i=0;i<columns.value;i++){
                var attr=document.createElement("input");
                attr.type="text";attr.placeholder="Attribute";attr.className="notEmpty";

                attr.onchange=function (){
                    var checkIfEmpty = document.getElementsByClassName("notEmpty");
                    for (var i=0;i<checkIfEmpty.length;i++){
                        if(checkIfEmpty[i].value==""){commit.style.display="none";return;}
                    }
                    commit.style.display="block"
                }

                input.appendChild(attr);

            }

        }

    }

    commit.onclick=function () {

        var newTable=document.createElement("option");
        select2.appendChild(newTable);

        var attr=[];
        var attrItem=document.getElementsByClassName("notEmpty");
        for(var i=0;i<attrItem.length;i++){attr[i]=attrItem[i].value;}
        tables[newTable.index]=new Table(tableName.value,attr);

        newTable.innerHTML=tables[newTable.index].name;
        newTable.selected=true;

        changeTable();

    }

}

function addRow(){

    var index=select2.selectedIndex;
    if(index==0){commit.style.display="none";return;}

    for(var i=0;i<tables[index].attr.length;i++){
        var attr=document.createElement("input");
        attr.type="text";attr.placeholder=tables[index].attr[i];attr.className="getInput"
        display1.appendChild(attr);
        attr.onchange=function () {
            commit.style.display="block";
        }
    }

    commit.onclick=function () {
        var attr=[];
        var attrItem=document.getElementsByClassName("getInput");
        for(var i=0;i<attrItem.length;i++){
            attr[i]=attrItem[i].value;
            attrItem[i].value="";
        }
        attrItem[0].focus();
        tables[index].innerTable.push(attr);
        commit.style.display="none";
        changeTable();
    }

}

function deleteRow() {

    var index=select2.selectedIndex;
    if(index==0){commit.style.display="none";return;}

    for(var i=0;i<tables[index].attr.length;i++){
        var attr=document.createElement("input");
        attr.type="text";attr.placeholder=tables[index].attr[i];attr.className="delete";
        display1.appendChild(attr);
    }

    commit.onclick=function () {

        var attrInput = document.getElementsByClassName("delete");

        for(var i=tables[index].innerTable.length-1;i>=0;i--){
            var same = true;
            for (var j=0;j<tables[index].attr.length;j++ ){
                if(attrInput[j].value !==""&&attrInput[j].value !== tables[index].innerTable[i][j]){same = false;}
            }
            if(same){tables[index].innerTable.splice(i,1);}
        }

        changeTable();

    }

}

function deleteTable() {

    var index=select2.selectedIndex;
    if(index==0) {commit.style.display = "none";}
    display1.innerHTML="<p>WARNING: You cannot undo this action!</p>";

    commit.onclick=function(){

            tables.splice(index,1);
            select2.removeChild(select2.options[index]);
            if(index-1==0){
                select2.options[0].selected=true;
                display1.innerHTML="";
                commit.style.display = "none";
            }else {
                select2.options[1].selected=true;
            }
            changeTable();
    }

}