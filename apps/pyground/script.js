let editor = ace.edit("editor");
editor.setTheme('ace/theme/tomorrow_night');
editor.session.setMode("ace/mode/python");
editor.setOptions({ fontFamily: "Consolas, Monaco, 'Lucida Console', 'Courier New', monospace", fontSize: "12pt" });
editor.setAutoScrollEditorIntoView(false);
editor.setValue(`print("Hello, world!")`);

let execute = document.getElementById("execute");
let clearLog = document.getElementById("clear-log");
let consoleArea = document.getElementById("console");
let pyodideS = null;
let isReady = false;
execute.addEventListener('click', event => executePython());
clearLog.addEventListener('click', event => logClear());
function inputFixed(message) {
    if (message != undefined) {
        let result = prompt(message);
        writeConsoleRaw("<p><span class=\"prompt-message\">" + message + "</span> " + result + "</p>");
        return result;
    } else {
        let result = prompt();
        return result;
    }
}
window.addEventListener('DOMContentLoaded', async () => {
    writeConsole("Pythonの実行環境をロードしています");
    const PYODIDE_BASE_URL = "https://cdn.jsdelivr.net/pyodide/v0.18.0/full";
    pyodideS = await loadPyodide({ indexURL: PYODIDE_BASE_URL })
    globalThis.pyodide = pyodideS;
    let packages = ["numpy"];
    for (let index = 0; index < packages.length; index++) {
        const element = packages[index];
        writeConsole(element + "をロードしています");
        await loadPackage(element);
    }
    isReady = true;

    writeConsole("準備完了");
    execute.disabled = false;
});
let executePython = () => {
    if (isReady) {
        let result = "";
        try {
            result = pyodideS.runPython(`from js import inputFixed
input = inputFixed
__builtins__.input = inputFixed
`+ editor.getValue());
            //writeConsole(result);
        } catch (error) {
            result = error;
            writeConsole(result, "error");
        }
    }
};
let writeConsole = (message, type) => {
    consoleArea.insertAdjacentHTML("beforeend", "<p" + (type == "error" ? " class=\"error-message\"" : "") + ">" + message + "</p>");
    consoleArea.scrollTop = consoleArea.scrollHeight;
};
let writeConsoleRaw = (message, type) => {
    consoleArea.insertAdjacentHTML("beforeend", message);
    consoleArea.scrollTop = consoleArea.scrollHeight;
};
let loadPackage = async (name) => {
    await pyodideS.loadPackage(name);
};
let logClear = () => {
    consoleArea.innerHTML = "";
}
var originallog = console.log;

console.log = function (txt) {
    if (isReady) {
        writeConsole(txt);
    }
    originallog.apply(console, arguments);
}