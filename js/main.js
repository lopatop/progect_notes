const MOCK_NOTES = [
    {
        id: 1,
        title: 'Работа с формами',
        content: 'К определённым полям формы можно обратиться через form.elements по значению, указанному в атрибуте name',
        color: 'F3DB7D',
        isFavorite: true,

    },
    {
        id: 2,
        title: 'Работа с формами',
        content: 'К делённым полям формы можно обратиться через form.elements по значению, указанному в атрибуте nameобратиться через form.elements по значению, указанному в атрибуте name',
        color: 'F3DB7D',
        isFavorite: false,

    },
    {
        id: 2,
        title: 'Работа с формами',
        content: 'К делённым полям формы можно обратиться через form.elements по значению, указанному в атрибуте nameобратиться через form.elements по значению, указанному в атрибуте name',
        color: 'F3DB7D',
        isFavorite: false,

    },
    {
        id: 2,
        title: 'Работа с формами',
        content: 'К делённым полям формы можно обратиться через form.elements по значению, указанному в атрибуте nameобратиться через form.elements по значению, указанному в атрибуте name',
        color: 'F3DB7D',
        isFavorite: false,

    },
]

const model = {
    notes: MOCK_NOTES,
    addNode(id, title, content, color, isFavorite = true) {
        const note = null;
    },
    renderNotesCount(){
        const countNotes = document.querySelector('.count_notes');
        countNotes.textContent = this.notes.length;
    }

}


const viev = {
    init() {
        this.renderNotes(model.notes)
        model.renderNotesCount()

        
        
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
        <div class = del-vav-btn>
        <button class="favorite-btn">
            <img src="${note.isFavorite ? './images/icons/active.svg' : './images/icons/inactive.svg'}" alt="Изображение сердечка">
        </button>
        <button class ="delite-btn"><img src="./images/icons/trash.svg" alt="Изображение сердечка"></button>
        </div>
    </div>
    <p>${note.content}</p>
</li>
            `;
            list.innerHTML = notesHTML;
        }
        
    },
}

function init() {
    viev.init()
}

init()

const controller = {
    renderNotesCount(){
        model.renderNotesCount()
    },


}



const colors = {
    YELLOW: 'F3DB7D',
    GREEN: 'C2F37D',
    BLUE: '7DE1F3',
    RED: 'F37D7D',
    PURPLE: 'E77DF3',
}

