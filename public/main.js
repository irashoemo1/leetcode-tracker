const deleteText = document.querySelectorAll('.del')
const editText = document.querySelectorAll('.edit')
const stopEditText = document.querySelectorAll('.stopEdit')
const select = document.querySelector('.patternSelect')
const patterns = document.querySelectorAll('option')


Array.from(deleteText).forEach((element) => {
    element.addEventListener('click', deleteProblem)
})

Array.from(editText).forEach((element) => {
    element.addEventListener('click', editProblem)
})

Array.from(stopEditText).forEach((element) => {
    element.addEventListener('click', stopEditProblem)
})


async function deleteProblem(){
    const problemId = this.parentNode.dataset.id;

    try{
        const response = await fetch('problems/deleteProblem',
        {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'problemIdS': problemId
            })
        })

        const data = await response.json();
        console.log(data)
        location.reload();
    }catch(error){
        console.log(error);
    }
}

async function editProblem(){
    this.parentNode.contentEditable = true
    this.classList.add('hidden');
    this.classList.remove('hidden');
    console.log("Edit")
}

async function stopEditProblem(){
    this.parentNode.contentEditable = false
    this.classList.add('hidden');
    this.classList.remove('hidden');
    console.log("Stop editting")
    
}


// select.addEventListener('change', event => {
//     const selectUrl = `problems/${event.target.value}`;

//     try{
//         const response = await fetch(selectUrl, 
//         {
//             method: 'get',
//             headers: {'Accept': 'application/json'}
//         })
//         const data = response.json()
//         console.log(data)
//     }catch(error){
//         console.log(error);
//     }
// })