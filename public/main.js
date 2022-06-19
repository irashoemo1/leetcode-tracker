const deleteText = document.querySelectorAll('.del')

Array.from(deleteText).forEach((element) => {
    element.addEventListener('click', deleteProblem)
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

