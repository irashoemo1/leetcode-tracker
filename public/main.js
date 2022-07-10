const deleteText = document.querySelectorAll('.del')
const editText = document.querySelectorAll('.edit')
const stopEditText = document.querySelectorAll('.stopEdit')
const select = document.querySelector('.patternSelect')
const patterns = document.querySelectorAll('option')
// const patternCheck = document.querySelector('.patternCheck').addEventListener('click', pList)
// Array.from(deleteText).forEach((element) => {
//     element.addEventListener('click', deleteProblem)
// })

Array.from(editText).forEach((element) => {
    element.addEventListener('click', editProblem)
})

Array.from(stopEditText).forEach((element) => {
    element.addEventListener('click', stopEditProblem)
})


// Array.from(patterns).forEach((element) => {
//     element.addEventListener('change', getPattern)
// })



// async function pList(){
//     // const patternName = this.parentNode.childNodes[3].innerText;

//     try{
//         const response = await fetch('/', 
//         {
//             method: 'get',
//             headers: {'Accept': 'application/json'},
//         })
//         const data = await response.json();
//         console.log(data)
//         // for(let i = 0; i < data.length; i++)
//         // {
//         //     const option = document.createElement('option');
//         //     option.value = problemItems[i].pattern;
//         //     option.innerText = problemItems[i].pattern;
//         //     select.appendChild(option)
//         // }
//     }catch(error){
//         console.log(error);
//     }
// }

// pList()

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


// async function addLink(){
//     const problemId = this.parentNode.dataset.id;
//     const problemName = this.parentNode.childNodes[1].innerText;

//     try{
//         const response = await fetch('problems/editProblem',
//         {
//             method: 'put',
//             headers: {'Content-Type': 'application/json'},
//             body: JSON.stringify({
//                 'problemIdS': problemId,
//                 'problemNameS': problemName
//             })
//         })

//         const data = await response.json();
//         console.log(data)
//         location.reload();
//     }catch(error){
//         console.log(error);
//     }
// }