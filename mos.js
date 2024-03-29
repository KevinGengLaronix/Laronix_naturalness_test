Array.prototype.shuffle = function () {
    var i = this.length;
    while (i) {
        var j = Math.floor(Math.random() * i);
        var t = this[--i];
        this[i] = this[j];
        this[j] = t;
    }
    return this;
}

// invalid enter key
function invalid_enter() {
    if (window.event.keyCode == 13) {
        return false;
    }
}

const pickN = (min, max, n) => {
    const list = new Array(max - min + 1).fill().map((_, i) => i + min);
    const ret = [];
    while (n--) {
        const rand = Math.floor(Math.random() * (list.length + 1)) - 1;
        ret.push(...list.splice(rand, 1))
    }
    return ret;
}

// start experiment
function start_experiment(patient_id) {
    // get user name
    var name = document.getElementById("name").value.replace(" ", "_");
    if (name == "") {
        alert("Please enter your name.");
        return false;
    }
    var set_num = "0"
    var number = document.getElementsByName("set");
    for (var i = 0; i < number.length; i++) {
        if (number[i].checked) {
            set_num = number[i].value;
        }
    }
    if (set_num == "0") {
        alert("Please press the set list number button.");
        return false;
    }

    // convert display
    Display();

    // directories for methods
    var methods = [];
    methods.push(wav_dir + "EL-Arthur_the_Rat_normed_5_snr_100/");
    methods.push(wav_dir + "TEP-Arthur_the_Rat_normed_5_snr_100/");
    methods.push(wav_dir + "HEALTHY-Arthur_the_Rat_normed_5_snr_100/");

    if (patient_id == "Patient_A"){
        methods.push(wav_dir + "PAL-Arthur_the_Rat_normed_5_snr_100/");
        file_list = makeFileList(methods, set_num);
    }
    else if (patient_id == "Patient_B"){
        methods.push(wav_dir + "PAL_B/");
        file_list = makeFileList_B(methods, set_num);
    }
    else if (patient_id == "Patient_C"){
        methods.push(wav_dir + "PAL_C/");
        file_list = makeFileList_C(methods, set_num);
    }

    // methods.push(wav_dir + "method2/");
    // methods.push(wav_dir + "method3/");
    // methods.push(wav_dir + "method4/");
    // methods.push(wav_dir + "method5/");
    // methods.push(wav_dir + "method6/");
    // methods.push(wav_dir + "method7/");

    // number of samples displayed per page
    n_per_page = 6;

    // pick up samples randomly
    var rands = pickN(0, n_utt - 1, n_per_page * 2);
    // var number = document.getElementById("number").value
    file_list = makeFileList(methods, set_num);
    outfile = name + "_" + String(patient_id) + "_" + "set" + set_num + "_nat.csv";
    nat_scores = (new Array(file_list.length)).fill(0);
    init();
}

// convert display
function Display() {
    document.getElementById("Display1").style.display = "none";
    document.getElementById("Display2").style.display = "block";
    // document.getElementById("Display3").style.display = "none";
}

// load text file
function loadText(filename) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", filename, false);
    xhr.send(null);
    var list = xhr.responseText.split(/\r\n|\r|\n/);
    list.pop();

    return list;
}

// make file list
// function makeFileList(methods, rands) {
//     var files = new Array();
//     var names = loadText(wavnames);
//     for (var i = 0; i < methods.length; i++) {
//         for (var j = 0; j < rands.length; j++) {
//             files.push(methods[i] + names[rands[j]] + ".wav");
//         }
//     }
//     files.shuffle();
//     return files;
// }

function makeFileList(methods, which_set) {
    var files = new Array();
    if (which_set == "1"){
        var names = loadText(wavnames_a);
    }
    if (which_set == "2"){
        var names = loadText(wavnames_b);
    } 
    if (which_set == "3"){
        var names = loadText(wavnames_c);
    } 
    if (which_set == "4"){
        var names = loadText(wavnames_d);
    } 
    if (which_set == "5"){
        var names = loadText(wavnames_e);
    } 
    for (var i = 0; i < methods.length; i++) {
        for (var j = 0; j < names.length; j++) {
            files.push(methods[i] + names[j] + ".wav");
        }
    }
    files.shuffle();
    return files;
}

function makeFileList_B(methods, which_set) {
    var files = new Array();
    if (which_set == "1"){
        var names = loadText(wavnames_e);
    }
    if (which_set == "2"){
        var names = loadText(wavnames_d);
    } 
    if (which_set == "3"){
        var names = loadText(wavnames_c);
    } 
    if (which_set == "4"){
        var names = loadText(wavnames_b);
    } 
    if (which_set == "5"){
        var names = loadText(wavnames_a);
    } 
    for (var i = 0; i < methods.length; i++) {
        for (var j = 0; j < names.length; j++) {
            files.push(methods[i] + names[j] + ".wav");
        }
    }
    files.shuffle();
    return files;
}

function makeFileList_C(methods, which_set) {
    var files = new Array();
    if (which_set == "1"){
        var names = loadText(wavnames_e);
    }
    if (which_set == "2"){
        var names = loadText(wavnames_d);
    } 
    if (which_set == "3"){
        var names = loadText(wavnames_c);
    } 
    if (which_set == "4"){
        var names = loadText(wavnames_b);
    } 
    if (which_set == "5"){
        var names = loadText(wavnames_a);
    } 
    for (var i = 0; i < methods.length; i++) {
        for (var j = 0; j < names.length; j++) {
            files.push(methods[i] + names[j] + ".wav");
        }
    }
    files.shuffle();
    return files;
}

function setAudio() {
    document.getElementById("page").textContent = `Page ${page + 1} / ${Math.ceil(nat_scores.length / n_per_page)}`;
    for (var i = 0; i < n_per_page; i++) {
        // set audio
        document.getElementById("audio" + String(i)).innerHTML = `${i + 1}.<br>`
            + `<audio src="${file_list[page * n_per_page + i]}" style="width: 100%"`
            + ' controls controlsList="noplaybackrate nodownload noremoteplayback" preload="auto">'
            + '</audio>';

        // initialize selected option using scores
        var natselected = (new Array(6)).fill('');
        for (var j = 0; j < 6; j++) {
            if (nat_scores[page * n_per_page + i] == String(j)) {
                natselected[j] = " natselected";
                break;
            }
        }
        // var natred = (new Array(6)).fill('');
        // for (var j = 0; j < 6; j++) {
        //     if (flu_scores[page * n_per_page + i] == String(j)) {
        //         fluselected[j] = " fluselected";
        //         break;
        //     }
        // }
        
        // document.getElementById("fluselect" + String(i)).innerHTML = `<h4>Fluency(流暢性) </h4>`
        //     + `<select id="flu${i}`
        //     + `" onchange="evaluation(${i})">`
        //     + `<option value="0"${fluselected[0]}>Please Select</option>`
        //     + `<option value="5"${fluselected[5]}>Excellent</option>`
        //     + `<option value="4"${fluselected[4]}>Good</option>`
        //     + `<option value="3"${fluselected[3]}>Fair</option>`
        //     + `<option value="2"${fluselected[2]}>Poor</option>`
        //     + `<option value="1"${fluselected[1]}>Bad</option>`
        //     + '</select>';
        document.getElementById("natselect" + String(i)).innerHTML = ``
            +`<select id="nat${i}`
            + `" onchange="evaluation(${i})">`
            + `<option value="0"${natselected[0]}>Please Select</option>`
            + `<option value="5"${natselected[5]}>Excellent</option>`
            + `<option value="4"${natselected[4]}>Good</option>`
            + `<option value="3"${natselected[3]}>Fair</option>`
            + `<option value="2"${natselected[2]}>Poor</option>`
            + `<option value="1"${natselected[1]}>Bad</option>`
            + '</select>';  
    }

}

function init() {
    page = 0;
    setAudio();
    setButton();
}

function setButton() {
    // prev button
    if (page == 0) {
        document.getElementById("prev").disabled = true;
    }
    else {
        document.getElementById("prev").disabled = false;
    }
    // next button
    if (page == Math.ceil(nat_scores.length / n_per_page - 1)) {
        document.getElementById("next").disabled = true;
    } else {
        document.getElementById("next").disabled = false;
        for (var i = 0; i < n_per_page; i++) {
            if (document.getElementById(`nat${i}`).value == "0" ) {
                document.getElementById("next").disabled = true;
                break;
            }
        }
    }
    // finish button
    for (var i = 0; i < file_list.length; i++) {
        document.getElementById("finish").disabled = false;
        if (nat_scores[i] == "0") {
            document.getElementById("finish").disabled = true;
            break;
        }
    }
}

function evaluation(i) {
    if (nat_scores[n_per_page * page + i] == "0") {
        nat_scores[page * n_per_page + i] = document.getElementById(`nat${i}`).value;
    }
    setButton();
}

function exportCSV() {
    var csvData = "";
    csvData+="Utt,Method,Nat\r\n"
    for (var i = 0; i < file_list.length; i++) {
        
        csvData += file_list[i] + "," + file_list[i].split('/')[1] + ","
            + nat_scores[i] + "\r\n";
    }

    const link = document.createElement("a");
    document.body.appendChild(link);
    link.style = "display:none";
    const blob = new Blob([csvData], { type: "octet/stream" });
    const url = window.URL.createObjectURL(blob);
    link.href = url;
    link.download = outfile;
    link.click();
    window.URL.revokeObjectURL(url);
    link.parentNode.removeChild(link);
}

// TODO: Add a alert (and saving function after finishing each pages)

function next() {
    if (confirm("Good Job! Keep going on! Page: " + String(page + 1) + " / " + String(Math.ceil(nat_scores.length / n_per_page)))){
        page++;
        setAudio();
        setButton();
    }
    else{
        if (confirm("Are you sure you want to quit this test? \nOnce you left, you need to restart from the beginning.")){
            exportCSV();            
        }
        else{
            alert("Keep going on! Page: " + String(page + 1) + " / " + String(Math.ceil(nat_scores.length / n_per_page)));
            page++;
            setAudio();
            setButton();
        }
    }
}

function prev() {
    page--;
    setAudio();
    setButton();
}

function finish() {
    exportCSV();
}


// directory name
const wav_dir = "wav/";
const wavnames_a = "wav/wavnames1.txt"
const wavnames_b = "wav/wavnames2.txt"
const wavnames_c = "wav/wavnames3.txt"
const wavnames_d = "wav/wavnames4.txt"
const wavnames_e = "wav/wavnames5.txt"
const n_utt = 1;

// invalid enter key
document.onkeypress = invalid_enter();

// global variables
var outfile;
var file_list;
var nat_scores;
var page;
var n_per_page;
