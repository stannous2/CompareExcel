function readCsvFile(workbook, worksheet) {
    //Read a file
    var workbook = new Excel.Workbook();
    workbook.xlsx.readFile("data/Sample.xlsx").then(function () {

        //Get sheet by Name
        var worksheet = workbook.getWorksheet('Sheet1');

        //Get Lastrow
        var row = worksheet.lastRow

        //Update a cell
        row.getCell(1).value = 5;

        row.commit();

        //Save the workbook
        return workbook.xlsx.writeFile("data/Sample.xlsx");

    });
}

$('#input-excel').change(function(e){
  var reader = new FileReader();
  reader.readAsArrayBuffer(e.target.files[0]);
  reader.onload = function(e) {
          var data = new Uint8Array(reader.result);
          var wb = XLSX.read(data,{type:'array'});
          var htmlstr = XLSX.write(wb,{sheet:"Sheet1", type:'binary', bookType:'html'});
          $('#wrapper')[0].innerHTML += htmlstr;
  }
});

function handleFileSelect(evt) {
    var files = evt.target.files; // FileList object

    // files is a FileList of File objects. List some properties.
    var output = [];
    for (var i = 0, f; f = files[i]; i++) {
      output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
        f.size, ' bytes, last modified: ',
        f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a',
        '</li>');
    }
    // document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';
    $('#list').val(output.join(''));
  }

  function selectFile(id) {
    console.log('label id: ', id);

    // document.getElementById('custom-file-input').click();
    $('#' + id).click()
  }

  function fileSelected(input, id) {
    console.log('id: ', id)
    console.log("input: ", input.value);

    document.getElementById(id).value = input.value.split('\\').pop().split('/').pop();
  }
