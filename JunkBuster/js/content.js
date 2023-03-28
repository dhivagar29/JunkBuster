function highlightJunkChars(info, tab) {
    const selectedText = window.getSelection().toString();
    const junkCharsPattern = /[\W_]+/g; // Matches any non-alphanumeric character, excluding spaces
    const replacementHTML = selectedText.replace(junkCharsPattern, "<span class='highlight'>$&</span>");
  
    document.execCommand("insertHTML", false, replacementHTML);
  }
  