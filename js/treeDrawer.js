let svg = d3.select("body").append("svg")
.attr("width", 10000).attr("height", 10000)
.append("g").attr("transform", "translate(100,100)");
let data =
   [{
      "child": "1 2 3 4 5 6 7 8 9",
      "parent": ""
   },
   {
      "child": "1 2  3 4 5 7 8 9 0",
      "parent": "1 2 3 4 5 6 7 8 9"
   }];

let dataStructure = d3.stratify()
   .id(function (d) { return d.child; })
   .parentId(function (d) { return d.parent; })
(data);
let treeStructure = d3.tree().size([500, 200]);
let information = treeStructure(dataStructure);

console.log(information.descendants);
let connections = svg.append("g").selectAll("path").data(information.links());

connections.enter().append("path")
.attr("d", function (d) {
   return "M" + d.source.x + ", " + d.source.y + "v 50 H"
   + d.target.x + " V" + d.target.y; });

let rectangle = svg.append("g").selectAll("rect")
   .data(information.descendants());

rectangle.enter().append("rect")
   .attr("x", function (d) { return d.x-60; })
   .attr("y", function (d) { return d.y-20; })

let names = svg.append("g").selectAll("text")
   .data(information.descendants());

names.enter().append("text")
   .text(function (d) { return d.data.child; })
   .attr("x", function (d) { return d.x; })
   .attr("y", function (d) { return d.y; })
