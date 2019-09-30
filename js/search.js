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
          aux.swap(0, 1); children.push(new Estado(node, [], 0, aux));

          aux = node.valores.slice(0);
          aux.swap(0, 3); children.push(new Estado(node, [], 0, aux));
      break;
      case 1:
          aux = node.valores.slice(0);
          aux.swap(1, 0); children.push(new Estado(node, [], 0, aux));

          aux = node.valores.slice(0);
          aux.swap(1, 2); children.push(new Estado(node, [], 0, aux));

          aux = node.valores.slice(0);
          aux.swap(1, 4); children.push(new Estado(node, [], 0, aux));

      break;
      case 2:
          aux = node.valores.slice(0);
          aux.swap(2, 1); children.push(new Estado(node, [], 0, aux));

          aux = node.valores.slice(0);
          aux.swap(2, 5); children.push(new Estado(node, [], 0, aux));
      break;
      case 3:
          aux = node.valores.slice(0);
          aux.swap(3, 4); children.push(new Estado(node, [], 0, aux));

          aux = node.valores.slice(0);
          aux.swap(3, 6); children.push(new Estado(node, [], 0, aux));

          aux = node.valores.slice(0);
          aux.swap(3, 0);
          children.push(new Estado(node, [], 0, aux));
      break;
      case 4:
          aux = node.valores.slice(0);
          aux.swap(4, 5); children.push(new Estado(node, [], 0, aux));

          aux = node.valores.slice(0);
          aux.swap(4, 3); children.push(new Estado(node, [], 0, aux));

          aux = node.valores.slice(0);
          aux.swap(4, 1); children.push(new Estado(node, [], 0, aux));

          aux = node.valores.slice(0);
          aux.swap(4, 7); children.push(new Estado(node, [], 0, aux));
      break;
      case 5:
          aux = node.valores.slice(0);
          aux.swap(5, 4); children.push(new Estado(node, [], 0, aux));

          aux = node.valores.slice(0);
          aux.swap(5, 2); children.push(new Estado(node, [], 0, aux));

          aux = node.valores.slice(0);
          aux.swap(5, 8); children.push(new Estado(node, [], 0, aux));
      break;
      case 6:
          aux = node.valores.slice(0);
          aux.swap(6, 7); children.push(new Estado(node, [], 0, aux));

          aux = node.valores.slice(0);
          aux.swap(6, 3); children.push(new Estado(node, [], 0, aux));
      break;
      case 7:
          aux = node.valores.slice(0);
          aux.swap(7, 6); children.push(new Estado(node, [], 0, aux));

          aux = node.valores.slice(0);
          aux.swap(7, 8); children.push(new Estado(node, [], 0, aux));

          aux = node.valores.slice(0);
          aux.swap(7, 4); children.push(new Estado(node, [], 0, aux))
      break;
      case 8:
          aux = node.valores.slice(0);
          aux.swap(8 ,7); children.push(new Estado(node, [], 0, aux));

          aux = node.valores.slice(0);
          aux.swap(8, 5); children.push(new Estado(node, [], 0, aux));
      break;
    }
    return children;
}

function hasSubArray(master, sub) {
    return sub.every((i => v => i = master.indexOf(v, i) + 1)(0));
}

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

// Hide method from for-in loops
Object.defineProperty(Array.prototype, "equals", {enumerable: false});

function depthSearch(values) {
    current = new Estado(null, [], 0, values);
    solved = new Estado(null, [], 0, ["1", "2", "3", "4", "5", "6", "7", "8", " "]);

    front = [current]
    seen = []

    while(front.length > 0) {
        let node = front.pop()
        seen.push(node);

        if(solved.valores.equals(node.valores)) { inspectResult(node, seen); return true; }
        if(checkPrice(node) < 13) {
            node.filhos = findChildren(node);

            for(i = 0; i < node.filhos.length; i++) {
                if(!hasSubArray(seen, node.filhos[i].valores) && !hasSubArray(front, node.filhos[i].valores)) {
                    if(solved.valores.equals(node.filhos[i].valores)) { inspectResult(node.filhos[i], seen); return true; }
                    else front.push(node.filhos[i]);
                }
            }
        }
    }
}

function breadthSearch(values) {
    current = new Estado(null, [], 0, values);
    solved = new Estado(null, [], 0, ["1", "2", "3", "4", "5", "6", "7", "8", " "]);

    front = [current]
    seen = []

    while((front.length > 0)) {
        let node = front.shift();
        seen.push(node);

        if(solved.valores.equals(node.valores)) { inspectResult(node, seen); return true; }
        node.filhos = findChildren(node);

        for(i = 0; i < node.filhos.length; i++) {
            if(!hasSubArray(seen, node.filhos[i].valores) && !hasSubArray(front, node.filhos[i].valores)) {
                if(solved.valores.equals(node.filhos[i].valores)) { inspectResult(node.filhos[i], seen); return true; }
                else front.push(node.filhos[i]);
            }
        }
    }
}

function inspectResult(node, seen) {
  console.log("Price: ", checkPrice(node));
  reDrawBoard(node.valores);

  while(true) {
    console.log(node.valores);
    if(node.pai == null) break;
    else node = findFather(node, seen);
  }
}

function checkPrice(node) {
    if (node.pai != null) {
        return 1 + checkPrice(node.pai)
    } else {
        return 0
    }
}

function findFather(node, seen) {
  for(i = 0; i < seen.length; i++) {
    if(node.pai.valores.equals(seen[i].valores)) return seen[i];
  }
}
