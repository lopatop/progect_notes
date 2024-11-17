const MOCK_NOTES = [
    {
        id: 1,
        title: 'Работа с формами',
        content: 'К определённым полям формы можно обратиться через form.elements по значению, указанному в атрибуте name',
        color: 'F3DB7D',
        isFavorite: false,

    },
]



const model = {
    notes: MOCK_NOTES,
    addNode(id, title, content, color, isFavorite = false) {
        const note = null;
    }

}





const viev = {
    init() {
        this.renderNotes(model.notes)

        
        
    },

    



    renderNotes(notes) {
        const list = document.querySelector('.notes-list');
        let notesHTML = '';
        for (let i = 0; i < notes.length; i++) {
        const note = notes[i]
            notesHTML += ` 
            <li id="${note.id}">
    <div class="notes-title" style="background-color: #${note.color}">
        <h3>${note.title}</h3>
        <button></button>
        <button class="favorite-btn">
            <img src="${note.isFavorite ? './images/icons/active.png' : './images/icons/nactive.png'}" alt="favorite">
        </button>
    </div>
    <p>${note.content}</p>
</li>
            `;
            list.innerHTML = notesHTML;
        }
        let countNotes = document.querySelector('.count_notes');
        countNotes.textContent = model.notes.length;
    },
}

function init() {
    viev.init()
}

init()

const controller = {


}



const colors = {
    YELLOW: 'F3DB7D',
    GREEN: 'C2F37D',
    BLUE: '7DE1F3',
    RED: 'F37D7D',
    PURPLE: 'E77DF3',
}