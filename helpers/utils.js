exports.FormatDate = (dateStr) => {    

    if (!dateStr instanceof Date) return ""
    
    let y = dateStr.getFullYear();
    let m = (dateStr.getMonth() + 1).toString().padStart(2, "0");
    let d = (dateStr.getDay()).toString().padStart(2, "0");

    let dateFormatted = `${y}-${m}-${d}`;

    return dateFormatted;
}