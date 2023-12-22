let siteNameInput, siteUrlInput, tableBody, bookmarks = []
siteNameInput = document.getElementById('siteName')
siteUrlInput = document.getElementById('siteUrl')
tableBody = document.getElementById('tableBody')
if (localStorage.getItem('bookmarks')) {
    bookmarks = JSON.parse(localStorage.getItem('bookmarks'))
}

displayTable()

function displayTable() {
    tableBody.innerHTML=''
    for (let i =0 ; i < bookmarks.length; i++) {
        const { siteName, siteUrl } = bookmarks[i];
        tableBody.innerHTML += `
        <tr>
                <td class="py-2">${i}</td>
                <td>${siteName}</td>
                <td>
                    <button class="btn btn-success " onclick="window.open('${validateUrl(siteUrl)}')">
                        <i class="fa-solid fa-eye"></i>
                        Visit
                    </button>
                </td>
                <td>
                    <button class="btn btn-danger " onclick="deleteBookmark(${i})">
                        <i class="fa-solid fa-trash"></i>
                        Delete
                    </button>
                </td>
            </tr>
        `
    }
}

function appendBookmark() {
    bookmarks.push({
        siteName: siteNameInput.value,
        siteUrl: siteUrlInput.value
    })
    siteNameInput.value=''
    siteUrlInput.value=''
    displayTable()
    saveLocalStorage();
}

function validateUrl(url){
    let regex = /^(https:\/\/)/
    if(regex.test(url)){
        return url
    }else{
        return `https://${url}`
    }
}

function deleteBookmark(index){
    bookmarks.splice(index,1)
    displayTable()
    saveLocalStorage();
}

function saveLocalStorage(){
    localStorage.setItem('bookmarks',JSON.stringify(bookmarks))
}