let lastSortedBy = "broj"
let orderBy = 1

function createTable(jsonData, sortBy) {
    if (lastSortedBy === sortBy) {
        orderBy = -orderBy
    } else {
        orderBy = -1
    }
    lastSortedBy = sortBy

    jsonData.sort(function (a, b) {
        if (!isNaN(Number(a[sortBy]))) {
            console.log("int...")
            return orderBy > 0 ? parseInt(a[sortBy]) - parseInt(b[sortBy]) : parseInt(b[sortBy]) - parseInt(a[sortBy])
        } else {
            console.log("string...")
            return orderBy > 0 ? ('' + a[sortBy]).localeCompare(b[sortBy]) : ('' + b[sortBy]).localeCompare(a[sortBy]);
        }
    });

    let container = document.getElementById("container");
    container.innerHTML = ''
    let table = document.createElement("table");
    table.style.marginLeft="auto"
    table.style.marginRight="auto"
    let cols = Object.keys(jsonData[0]);

    let tr = document.createElement("tr");
    cols.forEach((item) => {
        let th = document.createElement("th");
        th.innerText = item;
        th.onclick = function () {
            createTable(jsonData, item)
        }
        tr.appendChild(th);
    });
    table.append(tr);

    jsonData.forEach((item) => {
        let tr = document.createElement("tr");
        let vals = Object.values(item);
        vals.forEach((elem) => {
            let td = document.createElement("td");
            td.innerText = elem;
            tr.appendChild(td);
        });
        table.appendChild(tr);
    });

    container.appendChild(table);
}
