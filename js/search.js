// Warn if overriding existing method
if(Array.prototype.equals)
    console.warn("Overriding existing Array.prototype.equals. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code.");
// attach the .equals method to Array's prototype to call it on any array
Array.prototype.equals = function (array) {
    // if the other array is a falsy value, return
    if (!array) return false;

    // compare lengths - can save a lot of time
    if (this.length != array.length) return false;

    for (var i = 0, l=this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].equals(array[i])) return false;
        }
        // Warning - two different object instances will never be equal: {x:20} != {x:20}
        else if (this[i] != array[i]) { return false; }
    }
    return true;
}

Object.defineProperty(Array.prototype, "equals", {enumerable: false});

function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function chunk(array, size) {
  const chunked_arr = [];
  let index = 0;
  while (index < array.length) {
    chunked_arr.push(array.slice(index, size + index));
    index += size;
  }
  return chunked_arr;
}

function findEmptyCellIndex(arr) {
    for(i = 0; i < arr.length; i++) if(arr[i] === " ") return i;
}

function swapArrayElements(arr, indexA, indexB) {
    let temp = arr[indexA];
    arr[indexA] = arr[indexB];
    arr[indexB] = temp;
};

Array.prototype.swap = function(indexA, indexB) {
   swapArrayElements(this, indexA, indexB);
};

function findChildren(node) {
    let index = findEmptyCellIndex(node.valores);
    let children = [];

    switch(index) {
      case 0:
          aux = node.valores.slice(0);
          aux.swap(0, 1); children.push(new Estado(node, [], 0, aux, node.nivel+1));

          aux = node.valores.slice(0);
          aux.swap(0, 3); children.push(new Estado(node, [], 0, aux, node.nivel+1));
      break;
      case 1:
          aux = node.valores.slice(0);
          aux.swap(1, 0); children.push(new Estado(node, [], 0, aux, node.nivel+1));

          aux = node.valores.slice(0);
          aux.swap(1, 2); children.push(new Estado(node, [], 0, aux, node.nivel+1));

          aux = node.valores.slice(0);
          aux.swap(1, 4); children.push(new Estado(node, [], 0, aux, node.nivel+1));

      break;
      case 2:
          aux = node.valores.slice(0);
          aux.swap(2, 1); children.push(new Estado(node, [], 0, aux, node.nivel+1));

          aux = node.valores.slice(0);
          aux.swap(2, 5); children.push(new Estado(node, [], 0, aux, node.nivel+1));
      break;
      case 3:
          aux = node.valores.slice(0);
          aux.swap(3, 4); children.push(new Estado(node, [], 0, aux, node.nivel+1));

          aux = node.valores.slice(0);
          aux.swap(3, 6); children.push(new Estado(node, [], 0, aux, node.nivel+1));

          aux = node.valores.slice(0);
          aux.swap(3, 0);
          children.push(new Estado(node, [], 0, aux, node.nivel+1));
      break;
      case 4:
          aux = node.valores.slice(0);
          aux.swap(4, 5); children.push(new Estado(node, [], 0, aux, node.nivel+1));

          aux = node.valores.slice(0);
          aux.swap(4, 3); children.push(new Estado(node, [], 0, aux, node.nivel+1));

          aux = node.valores.slice(0);
          aux.swap(4, 1); children.push(new Estado(node, [], 0, aux, node.nivel+1));

          aux = node.valores.slice(0);
          aux.swap(4, 7); children.push(new Estado(node, [], 0, aux, node.nivel+1));
      break;
      case 5:
          aux = node.valores.slice(0);
          aux.swap(5, 4); children.push(new Estado(node, [], 0, aux, node.nivel+1));

          aux = node.valores.slice(0);
          aux.swap(5, 2); children.push(new Estado(node, [], 0, aux, node.nivel+1));

          aux = node.valores.slice(0);
          aux.swap(5, 8); children.push(new Estado(node, [], 0, aux, node.nivel+1));
      break;
      case 6:
          aux = node.valores.slice(0);
          aux.swap(6, 7); children.push(new Estado(node, [], 0, aux, node.nivel+1));

          aux = node.valores.slice(0);
          aux.swap(6, 3); children.push(new Estado(node, [], 0, aux, node.nivel+1));
      break;
      case 7:
          aux = node.valores.slice(0);
          aux.swap(7, 6); children.push(new Estado(node, [], 0, aux, node.nivel+1));

          aux = node.valores.slice(0);
          aux.swap(7, 8); children.push(new Estado(node, [], 0, aux, node.nivel+1));

          aux = node.valores.slice(0);
          aux.swap(7, 4); children.push(new Estado(node, [], 0, aux, node.nivel+1))
      break;
      case 8:
          aux = node.valores.slice(0);
          aux.swap(8 ,7); children.push(new Estado(node, [], 0, aux, node.nivel+1));

          aux = node.valores.slice(0);
          aux.swap(8, 5); children.push(new Estado(node, [], 0, aux, node.nivel+1));
      break;
    }
    return children;
}

function hasSubArray(master, sub) {
    return sub.every((i => v => i = master.indexOf(v, i) + 1)(0));
}

function depthSearch(values, startTime) {
    current = new Estado(null, [], 0, values, 0);
    solved = new Estado(null, [], 0, ["1", "2", "3", "4", "5", "6", "7", "8", " "]);

    let totalNodesCount = 1, front = [current], seen = []

    while(front.length > 0) {
        let node = front.pop()
        seen.push(node);

        if(solved.valores.equals(node.valores)) {
            inspectResult(node, seen, startTime);
            return true;
        }
        if(checkDepth(node) < 15) {
            node.filhos = findChildren(node);
            totalNodesCount += node.filhos.length;
            shuffle(node.filhos)

            for(i = 0; i < node.filhos.length; i++) {
                if(!hasSubArray(seen, node.filhos[i].valores) && !hasSubArray(front, node.filhos[i].valores)) {
                    if(solved.valores.equals(node.filhos[i].valores)) {
                        inspectResult(node.filhos[i], seen, startTime, totalNodesCount);
                        tree(drawTree(current));
                        return true;
                    } else { front.push(node.filhos[i]); }
                }
            }
        }
    }
}

function breadthSearch(values, startTime) {
    current = new Estado(null, [], 0, values);
    solved = new Estado(null, [], 0, ["1", "2", "3", "4", "5", "6", "7", "8", " "]);

    let totalNodesCount = 1, front = [current], seen = []

    while((front.length > 0)) {
        let node = front.shift();
        seen.push(node);

        if(solved.valores.equals(node.valores)) {
            inspectResult(node, seen, startTime, totalNodesCount);
            tree(drawTree(current));
            return true;
        }
        node.filhos = findChildren(node);
        totalNodesCount += node.filhos.length;

        for(i = 0; i < node.filhos.length; i++) {
            if(!hasSubArray(seen, node.filhos[i].valores) && !hasSubArray(front, node.filhos[i].valores)) {
                if(solved.valores.equals(node.filhos[i].valores)) {
                  inspectResult(node.filhos[i], seen, startTime, totalNodesCount);
                  tree(drawTree(current));
                  return true;
            } else { front.push(node.filhos[i]); }
            }
        }
    }
}

function inspectResult(node, seen, startTime, totalNodesCount) {
    drawResult(node, startTime, totalNodesCount);
    reDrawBoard(node.valores);

    while(true) {
        if(node.pai == null) break;
        else node = findFather(node, seen);
    }
}

function drawResult(node, startTime, totalNodesCount) {
    document.getElementById("resultPrice").innerHTML = `Custo(Nivel): ${checkDepth(node)}`;
    document.getElementById("resultNode").innerHTML = `Nós: ${totalNodesCount == undefined ? 0 : totalNodesCount}`;
    document.getElementById("resultTime").innerHTML = `Tempo:  ${((performance.now()-startTime)/1000).toFixed(4)} s`;
}

function drawTree(first) {
    let list = [first];
    let data = [{"child": `${first.valores}`, "parent": ""}];

    while(list.length > 0) {
        node = list.shift();

        if (node.filhos != null) {
          for(i = 0; i < node.filhos.length; i++) {
              list.push(node.filhos[i]);
              data.push({"child": `${node.filhos[i].valores}`, "parent": `${node.filhos[i].pai.valores}`})
          }
        }
    }
    console.log(data)
    return data;
}

function tree(data) {
    let svg = d3.select(".treeDrawer").append("svg")
      .attr("width", 130 * data.length).attr("height", 80 * data.length)
      .append("g").attr("transform", "translate(100,100)");

    let counts = {};
    let dataStructure = d3.stratify()
    .id(function(d) {
        if (!counts[d.child]) { counts[d.child] = 1; return d.child; }
        else { return d.child + " " + ++counts[d.child]; }})
    .parentId(function(d) { return d.parent; })

    (data);
    let treeStructure = d3.tree().size([100 * data.length, 25 * data.length]);
    let information = treeStructure(dataStructure);

    console.log(information.descendants);
    let connections = svg.append("g").selectAll("path").data(information.links());

    connections.enter().append("path")
    .attr("d", function (d) {
       return "M" + d.source.x + ", " + d.source.y + "v 40 H"
       + d.target.x + " V" + d.target.y; });

    let rectangle = svg.append("g").selectAll("rect")
       .data(information.descendants());

    rectangle.enter().append("rect")
       .attr("x", function (d) { return d.x-50; })
       .attr("y", function (d) { return d.y-20; })

    let names = svg.append("g").selectAll("text")
       .data(information.descendants());

    names.enter().append("text")
       .text(function (d) { return d.data.child; })
       .attr("x", function (d) { return d.x; })
       .attr("y", function (d) { return d.y; })
}

function checkDepth(node) {
    if (node.pai != null) { return 1 + checkDepth(node.pai); }
    else { return 0; }
}

function findFather(node, seen) {
  for(i = 0; i < seen.length; i++) {
    if(node.pai.valores.equals(seen[i].valores)) return seen[i];
  }
}
