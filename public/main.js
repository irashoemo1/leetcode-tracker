const deleteText = document.querySelectorAll('.del')
const editText = document.querySelectorAll('.edit')

// Array.from(deleteText).forEach((element) => {
//     element.addEventListener('click', deleteProblem)
// })

// Array.from(editText).forEach((element) => {
//     element.addEventListener('click', editProblem)
// })

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


