//SWITCHES DISPLAY TO POLICY, VEHICLE, AND OPERATOR ON CLICK//
function show(nr) {
  document.getElementById("show1").style.display = "none";
  document.getElementById("show2").style.display = "none";
  document.getElementById("show3").style.display = "none";
  document.getElementById("show" + nr).style.display = "block";
}
//CODE TO TOGGLE GLYPHICONS//?
$(document).ready(function() {
  $('a[data-toggle="collapse"]').click(function() {
    $(this)
      .find("span.toggle-icon")
      .toggleClass(
        "glyphicon glyphicon-chevron-right glyphicon glyphicon-chevron-down"
      );
  });
});
//CODE TO HIGHLIGHT BUTTONS// ? possibly have Policy button highlighted on onload
$("button").on("click", function() {
  $("button").removeClass("selected");
  $(this).addClass("selected");
});
//////////////////////READS DATA FROM XML///////////////////////
//MAPPINGS WERE HERE->external mapping array pen https://codepen.io/SBrehm/pen/ooVwEM?editors=1010 //
/////////POLICY DOCUMENT REQUESTS AND VARIABLES////////////////
var x = new XMLHttpRequest();
var y = new XMLHttpRequest();
//number of vehicles and operators on policy
var _vehicles = 5; //TESTING
var _operators = 4;//TESTING
/////////////POPULATING PANELS AND TABS//////////////////////////
DropDownPanels(polPath, polCollapse[0],  polContainer[0], polHeader[0], polPanelName); 
DropDownPanels(vehOnePath, vehCollapse[0], vehContainer[0], vehHeader[0], vehPanelName);
DropDownPanels(operOnePath, operCollapse[0], operContainer[0], operHeader[0], operPanelName);
//populates vehicles while more than one
for(var i = 2; i <= _vehicles; i ++) {
  VehNavTabs(i);  //creates navtabs
  NavPanes(vehTabID[(i-2)]);  //creates navpanes
  vehTabID.push("veh"+(i+1)); //creates navtab ID per vehicle number   
  vehCollapse.push("veh"+i+"Collapse"); //creates collapse link per dropdown
  vehContainer.push("veh"+i+"Container"); //creates container id per vehicle
  itemRefIDPath.push("((//p:ItemCovRefID)["+i+"]/p:string[text()])"); //fills itemRefID array
  //coverageIDPath.push("(//p:CoverageID[text()])["+i+"]"); //fills coverageID array dont think i need this
  DropDownPanels(vehOnePath, vehCollapse[(i-1)], vehContainer[(i-1)], vehHeader[(i-1)], vehPanelName);  
};
//populates operators while more than one
for(var i = 2; i <= _operators; i ++) {
  OperNavTabs(i); //creates navtabs
  NavPanes(operTabID[(i-2)]); //creates navpanes
  operTabID.push("oper"+(i+1)); //create navtab id per opernumber
  operCollapse.push("oper"+i+"Collapse"); //creates collapse link per drop down
  operContainer.push("oper"+i+"Container"); //creates container id per operator
  DropDownPanels(operOnePath, operCollapse[(i-1)], operContainer[(i-1)], operHeader[(i-1)], operPanelName); 
};
///////////////////////////LOADS DOC//////////////////////////////////////////////
function onPolicyXMLLoad() {  
  TableFill(polPath, polLabel, x, y, polContainer[0]);
  //testing coverage array population
  CoverageFill(itemRefIDPath, x, y, requestItemRefID, responseItemRefID);
  VehOperCount(x,y);
  x.removeEventListener("load", onPolicyXMLLoad);
}
function onFirstVehicleXMLLoad(event) {  
  TableFill(vehOnePath, vehLabel, x, y, vehContainer[0]);
  TableFill(vehTwoPath, vehLabel, x, y, vehContainer[1]);
  TableFill(vehThreePath, vehLabel, x, y, vehContainer[2]);
  TableFill(vehFourPath, vehLabel, x, y, vehContainer[3]);
  TableFill(vehFivePath, vehLabel, x, y, vehContainer[4]);
  TableFill(vehSixPath, vehLabel, x, y, vehContainer[5]);
}
function onOperatorXMLLoad(event) {
  TableFill(operOnePath, operLabel, x, y, operContainer[0]);
  TableFill(operTwoPath, operLabel, x, y, operContainer[1]);
  TableFill(operThreePath, operLabel, x, y, operContainer[2]);
  TableFill(operFourPath, operLabel, x, y, operContainer[3]);
  TableFill(operFivePath, operLabel, x, y, operContainer[4]);
  TableFill(operSixPath, operLabel, x, y, operContainer[5]);
}
///////////////////////////////////////////////////////////////////////////////////////////
x.addEventListener("load", onPolicyXMLLoad);
Once(document.getElementById("vehicleButton"), "click", onFirstVehicleXMLLoad);
Once(document.getElementById("operatorButton"), "click", onOperatorXMLLoad);
x.open("GET", "https://raw.githubusercontent.com/sbrehm2013/myRepository/master/Request_2017-08-21_15-10-28-032_IOWA_795472001_2_1_10-01-2017_afb12372-2d52-4197-8930-7dd9743bd2d7_null.xml");
x.send();
y.open("GET", "https://raw.githubusercontent.com/sbrehm2013/myRepository/master/Response.xml");
y.send();
///////////////////////////////////////////////////////////////////////////////////////////
//FUNCTION TO CREATE DROP DOWN PANELS//
function DropDownPanels(path, collapseNumber, str, headerName, name) {// collapseRefLink,
  for (var i = 0; i < path.length; i++) {
    var div1 = document.createElement("div");
    var div2 = document.createElement("div");
    var div3 = document.createElement("div");
    var h = document.createElement("h4");
    var a = document.createElement("a");
    var span = document.createElement("span");
    var div4 = document.createElement("div");
    var div5 = document.createElement("div");
    var table = document.createElement("table");
    var thead = document.createElement("thead");
    var th1 = document.createElement("th");
    var th2 = document.createElement("th");
    var th3 = document.createElement("th");
    var tbody = document.createElement("tbody");

    div1.className = "panel-group";
    div2.className = "panel panel-default";
    div3.className = "panel-heading";
    h.className = "panel-title";
    a.setAttribute("data-toggle", "collapse");
    a.setAttribute("href", "#"+collapseNumber + i);
    span.className = "toggle-icon glyphicon glyphicon-chevron-right"; //spanning
    a.innerHTML = "<strong>" + name[i] + "</strong>";
    div4.className = "panel-collapse collapse";
    div4.setAttribute("id", collapseNumber + i);
    div5.className = "table-fit";
    table.className = "table table-bordered table-striped table-condensed";
    table.setAttribute("id", "paragraph");
    th1.innerHTML = "Name";
    th2.innerHTML = "Request";
    th3.innerHTML = "Response";
    tbody.setAttribute("id", str + i);
    //header name//
    headerName.appendChild(div1);
    div1.appendChild(div2);
    div2.appendChild(div3);
    div3.appendChild(h);
    h.appendChild(span);
    h.appendChild(a);
    div2.appendChild(div4);
    div4.appendChild(div5);
    div5.appendChild(table);
    table.appendChild(thead);
    thead.appendChild(th1);
    thead.appendChild(th2);
    thead.appendChild(th3);
    table.appendChild(tbody);
  }
  //https://javascript.info/modifying-document
  //http://htmldog.com/guides/javascript/advanced/creatingelements/
  //https://stackoverflow.com/questions/14094697/javascript-how-to-create-new-div-dynamically-change-it-move-it-modify-it-in
};
//FUNCTION TO CREATE VEHICLE NAV TABS//
function VehNavTabs(num) {  
  var li = document.createElement('li');
  var a = document.createElement('a'); 
  a.setAttribute("id", "vehtab"+num);
  a.setAttribute("data-toggle", "tab");
  a.setAttribute("href", "#veh"+num); 
  a.innerHTML = "<strong>"+"Vehicle "+num+"</strong>";  
  vehList.appendChild(li); 
  li.appendChild(a);  
};
//FUNCTION TO CREATE OPERATOR NAVTABS//
function OperNavTabs(num) {  
  var li = document.createElement('li');
  var a = document.createElement('a');
  a.setAttribute("id", "opertab"+num); 
  a.setAttribute("data-toggle", "tab");
  a.setAttribute("href", "#oper"+num); 
  a.innerHTML = "<strong>"+"Operator "+num+"</strong>";  
  operList.appendChild(li); 
  li.appendChild(a);  
};
//FUNCTION TO CREATE NAV PANES//
function NavPanes(tabID) {
  // var div = document.createElement('div');
  // div.setAttribute("id", tabID);
  // div.className("tab-pane fade");
  // veh1.appendChild(div);  
  var div = document.getElementById(tabID); 
  div.className = "tab-pane fade"; 
};
//FUNCTION TO EXECUTE CLICK EVENTS ONCE//
function Once(target, type, listener) {
  target.addEventListener(type, function fn(event) {
    target.removeEventListener(type, fn); //argument callee
    return listener(event);
  });
};
//FUNCTION TO ACCESS XML AND POPULATE TABLES+PRINTS SERVICE ID//
function TableFill(path, label, _x, _y, str) {
  var doc = new DOMParser().parseFromString(_x.response, "text/xml");
  var doc2 = new DOMParser().parseFromString(_y.response, "text/xml");
  var txt1 = "";
  var txt2 = "";

  function nsResolver(prefix) {
    var ns = { p: "http://ratabase.cgi.com/" };
    return ns[prefix] || null;
  }
  function nsResolver2() {
    return "http://ratabase.cgi.com/";
  }
  
  var rata = doc.getElementsByTagName("p:RatabaseField");

  for (var i = 0; i < path.length; i++) {
    //outer loop for nested array
    var dc = document.getElementById(str + i);

    for (var j = 0; j < path[i].length; j++) {
      //inner loop for nested array
      var row = document.createElement("tr");
      var name = document.createElement("td");
      var requestValue = document.createElement("td");
      var responseValue = document.createElement("td");      

      if (doc.evaluate) {
        var nodes = doc.evaluate(
          path[i][j],
          doc,
          nsResolver,
          XPathResult.ANY_TYPE,
          null
        );
        var result = nodes.iterateNext();
        while (result) {
          txt1 += result.childNodes[0].nodeValue + "<br/>";
          result = nodes.iterateNext();
        }
      }
      if (doc2.evaluate) {
        var nodes2 = doc2.evaluate(
          path[i][j],
          doc2,
          nsResolver2,
          XPathResult.ANY_TYPE,
          null
        );
        var result2 = nodes2.iterateNext();
        while (result2) {
          txt2 += result2.childNodes[0].nodeValue + "<br/>";
          result2 = nodes2.iterateNext();
        }
      }
      if (
        label[i][j] == "Policy Details" ||
        label[i][j] == "Numbers on Policy" ||
        label[i][j] == "Package" ||
        label[i][j] == "Payment Plan" ||
        label[i][j] == "Policy Premium Details" ||
        label[i][j] == "Advanced Quote Discount" ||
        label[i][j] == "Clean Adult Discount" ||
        label[i][j] == "Multi Car Discount" ||
        label[i][j] == "Policy Factors" ||
        label[i][j] == "Rated Operator" ||
        label[i][j] == "Vehicle Usage and History" ||
        label[i][j] == "Vehicle Specifications" ||
        label[i][j] == "Vehicle Features" ||
        label[i][j] == "Additional Equipment" ||
        label[i][j] == "Discount Detail" ||
        label[i][j] == "Simply Drive Discount" ||
        label[i][j] == "Defensive Driver Discount" ||
        label[i][j] == "Vehicle Premium Details" ||
        label[i][j] == "Vehicle Coverage Details" ||
        label[i][j] == "Vehicle Factors" ||
        label[i][j] == "Simply Drive" ||
        label[i][j] == "Vehicle Farm Use" ||
        label[i][j] == "Vehicle Use" ||
        label[i][j] == "Multi Car" ||
        label[i][j] == "Accident at Fault" ||
        label[i][j] == "Driver Experience" ||
        label[i][j] == "Coverage Factors" ||
        label[i][j] == "Operator Age Factors" ||
        label[i][j] == "Operator Class Factors" ||
        label[i][j] == "Accident at Fault Factors" ||
        label[i][j] == "Operator Experience Factors" ||
        label[i][j] == "Good Student Factors" ||
        label[i][j] == "Simply Drive Factors" ||
        label[i][j] == "Operator Violation Factors" ||
        label[i][j] == "Interim Operator Class Factors" ||
        label[i][j] == "Operator Details" ||
        label[i][j] == "Discount Eligibility" ||
        label[i][j] == "Experience" ||
        label[i][j] == "Accident at Fault" ||
        label[i][j] == "Violation Details" ||
        label[i][j] == "Coverage Details" ||
        label[i][j] == "Operator Coverage" ||
        label[i][j] == "Operator Factors"
      ) {
        label[i][j] = label[i][j]
          .fontsize("5")
          .fontcolor("#004c35")
          .bold();
      }
      var data = {
        name: (rata[j].getElementsByTagName("name").innerHTML = label[i][j]),
        requestValue: (rata[j].getElementsByTagName(
          "requestValue"
        ).innerHTML = txt1),
        responseValue: (rata[j].getElementsByTagName(
          "responseValue"
        ).innerHTML = txt2)
      };
      txt1 = "";
      txt2 = "";

      name.innerHTML = data.name;
      requestValue.innerHTML = data.requestValue;
      responseValue.innerHTML = data.responseValue;

      row.appendChild(name);
      row.appendChild(requestValue);
      row.appendChild(responseValue);
      dc.appendChild(row);
    } //end inner array
  }
  var ID = doc.evaluate("//p:ServiceId[text()]", doc, nsResolver, XPathResult.STRING_TYPE, null);
  document.getElementById("title").innerHTML = "<strong>Auto Policy Details Service ID: </strong>" + ID.stringValue;
};
//FUNCTION TO COLLECT COVERAGE IDS//
function CoverageFill(path, _x, _y, array1, array2) {
  var doc = new DOMParser().parseFromString(_x.response, "text/xml");
  var doc2 = new DOMParser().parseFromString(_y.response, "text/xml");
  var txt1 = "";
  var txt2 = "";

  function nsResolver(prefix) {
    var ns = { p: "http://ratabase.cgi.com/" };
    return ns[prefix] || null;
  }
  function nsResolver2() {
    return "http://ratabase.cgi.com/";
  }  
  var rata = doc.getElementsByTagName("p:RatabaseField");
  for(var i = 0; i < path.length; i++){
    array1.push([]);
    array2.push([]);  
  }
  for (var i = 0; i < path.length; i++) {   
      if (doc.evaluate) {
        var nodes = doc.evaluate(
          path[i],
          doc,
          nsResolver,
          XPathResult.ANY_TYPE,
          null
        );
        var result = nodes.iterateNext();
        while (result) {
          txt1 += result.childNodes[0].nodeValue + "<br/>";
          array1[i].push(txt1);
          txt1 = "";
          result = nodes.iterateNext();
        }
      }
      if (doc2.evaluate) {
        var nodes2 = doc2.evaluate(
          path[i],
          doc2,
          nsResolver2,
          XPathResult.ANY_TYPE,
          null
        );
        var result2 = nodes2.iterateNext();
        while (result2) {
          txt2 += result2.childNodes[0].nodeValue + "<br/>";
          array2[i].push(txt2);
          txt2 = "";
          result2 = nodes2.iterateNext();
        }
      }
  } 
  //test printing
  document.getElementById("TEST").innerHTML = array1[0];
};
//FUNCTION TO MATCH COVERAGEID AND ITEMCOVREFID//
function CoverageIDMatch(){
  
};
//FUNCTION TO COUNT VEHICLES AND OPERATORS//
function VehOperCount(_x,_y) {
  var doc = new DOMParser().parseFromString(_x.response, "text/xml");
  var doc2 = new DOMParser().parseFromString(_y.response, "text/xml");
  function nsResolver(prefix) {
    var ns = { p: "http://ratabase.cgi.com/" };
    return ns[prefix] || null;
  }
  function nsResolver2() {
    return "http://ratabase.cgi.com/";
  }
  _veh = doc.evaluate('count(//p:Item)', doc, nsResolver, XPathResult.ANY_TYPE, null);
  _oper = doc.evaluate('count(//p:Name[text()="COVG_OR_ENDORSE"]/following-sibling::p:Value[text()="OPERATOR"])', doc, nsResolver, XPathResult.ANY_TYPE, null);
  
  _vehicles = _veh.numberValue;
  _operators = _oper.numberValue;
  //test printing  
  document.getElementById("TEST2").innerHTML = "Number of Vehicles: " +_vehicles + " ->4 + permissiveUserID";
  document.getElementById("TEST3").innerHTML = "Number of Operators: "+_operators +" ->3 + permissiveUserID";
};
///////////////////////////////////////////////////////////////////////////////////////////
//END//



// function onSecondVehicleXMLLoad(event) {
//   TableFill(vehTwoPath, vehLabel, x, y, strContainer[2]);
// }
// function onThirdVehicleXMLLoad(event) {
//   TableFill(vehThreePath, vehLabel, x, y, strContainer[3]);
// }
// function onFourthVehicleXMLLoad(event) {
//   TableFill(vehFourPath, vehLabel, x, y, strContainer[4]);
// }
// function onFifthVehicleXMLLoad(event) {
//   TableFill(vehFivePath, vehLabel, x, y, strContainer[5]);
// }
// function onSixthVehicleXMLLoad(event) {
//   TableFill(vehSixPath, vehLabel, x, y, strContainer[6]);
// }

// Once(document.getElementById("vehtab2"), "click", onSecondVehicleXMLLoad);
// Once(document.getElementById("vehtab3"), "click", onThirdVehicleXMLLoad);
// Once(document.getElementById("vehtab4"), "click", onFourthVehicleXMLLoad);
// Once(document.getElementById("vehtab5"), "click", onFifthVehicleXMLLoad);
// Once(document.getElementById("vehtab6"), "click", onSixthVehicleXMLLoad);


// for(i=1; i<vehicles; i++) { //while i is the number of vehicles
 //   vNum = (i+1);
 //  // DropDownPanels(vehOnePath, collapseNum[i], collapseLink[i], strContainer[i], header[i], vehPanelName);   
 //   VehNavTabs(vNum);
 //   NavPanes(vehTabID[(i-1)]);
 // };

//for(i=7; i<9; i++) {
  //var pNum = (i+2);
 // DropDownPanels(operOnePath, collapseNum[7], collapseLink[7], strContainer[7], header[7], operPanelName);
  //OperNavTabs(pNum);
  //NavPanes(operTabID[i])
//};

// DropDownPanels(vehOnePath, vehCollapse[0],  vehContainer[0], header[1], vehPanelName);
// DropDownPanels(vehOnePath, vehCollapse[1],  vehContainer[1], header[2], vehPanelName);
// DropDownPanels(vehOnePath, vehCollapse[2],  vehContainer[2], header[3], vehPanelName); 
// DropDownPanels(vehOnePath, vehCollapse[3],  vehContainer[3], header[4], vehPanelName); 
// DropDownPanels(vehOnePath, vehCollapse[4],  vehContainer[4], header[5], vehPanelName); 
// DropDownPanels(vehOnePath, vehCollapse[5],  vehContainer[5], header[6], vehPanelName); 

// DropDownPanels(operOnePath, operCollapse[0],  operContainer[0], operHeader[0], operPanelName); 
// DropDownPanels(operOnePath, operCollapse[1],  operContainer[1], operHeader[1], operPanelName); 
// DropDownPanels(operOnePath, operCollapse[2],  operContainer[2], operHeader[2], operPanelName); 
//DropDownPanels(operOnePath, operCollapse[3], operContainer[3], operHeader[3], operPanelName);
//DropDownPanels(operOnePath, operCollapse[4], operContainer[4], operHeader[4], operPanelName);
//DropDownPanels(operOnePath, operCollapse[5], operContainer[5], operHeader[5], operPanelName);