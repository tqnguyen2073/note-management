export const searchNotes = (notes, query) => {
    if (!query) return notes;
    return notes.filter(note => note.content.toLowerCase().includes(query.toLowerCase()));
  };
  
  export const searchLabels = (labels, query) => {
    if (!query) return labels;
    return labels.filter(label => label.label.toLowerCase().includes(query.toLowerCase()));
  };
  
  export const searchTrash = (trash, query) => {
    if (!query) return trash;
    return trash.filter(note => note.content.toLowerCase().includes(query.toLowerCase()));
  };
  
  export const searchFolders = (folders, query) => {
    if (!query) return folders;
    return folders.filter(folder => folder.name.toLowerCase().includes(query.toLowerCase()));
  };
  