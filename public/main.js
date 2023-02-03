const deleteText = document.querySelectorAll('.del')
const editText = document.querySelectorAll('.edit')
const stopEditText = document.querySelectorAll('.stopEdit')
const select = document.querySelector('.patternSelect')
const patterns = document.querySelectorAll('option')


Array.from(deleteText).forEach((element) => {
    element.addEventListener('click', deleteProblem)
})

// Array.from(editText).forEach((element) => {
//     // element.addEventListener('click', editProblemText)
//     element.addEventListener('click', getEditProblem)    
    
// })

Array.from(stopEditText).forEach((element) => {
    // element.addEventListener('click', stopEditProblem)
    // element.addEventListener('click', editProblem)    
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


// async function editProblem(){
//     const problemId = this.parentNode.dataset.id;
//     console.log(problemId)
//     try{
//         const response = await fetch('problems/editProblem',
//         {
//             method: 'put',
//             headers: {'Content-Type': 'application/json'},
//             body: JSON.stringify({
//                 'problemIdS': problemId,
//                 'problemItem': request.body.problemItem,
//                 'patternType': request.body.patternType,
//                 'description': request.body.description,
//                 'date': request.body.date,
//                 'link': request.body.link
//             })
//         })

//         const data = await response.json();
//         console.log(data)
//         location.reload();
//     }catch(error){
//         console.log(error);
//     }
// }


// async function getEditProblem(){
//     const problemId = this.parentNode.dataset.id;
//     console.log(problemId)
//     try{
//         const response = await fetch('problems/editProblem',
//         {
//             method: 'put',
//             body: JSON.stringify({
//                 'problemIdS': problemId,
//             })
//         })

//         const data = await response.json();
//         console.log(data)
//         location.reload();
//     }catch(error){
//         console.log(error);
//     }
// }



// async function editProblemText(){
//     this.parentNode.contentEditable = true
//     this.classList.add('hidden');
//     this.classList.remove('hidden');
//     console.log("Edit")
// }

// async function stopEditProblem(){
//     this.parentNode.contentEditable = false
//     this.classList.add('hidden');
//     this.classList.remove('hidden');
//     console.log("Stop editting")
    
// }