// const MOCK_NOTES = [
//     {
//         id: 1,
//         title: 'Работа с формами',
//         content: 'К определённым полям формы можно обратиться через form.elements по значению, указанному в атрибуте name',
//         color: 'F3DB7D',
//         isFavorite: true,

//     },
//     {
//         id: 2,
//         title: 'Работа с формами',
//         content: 'К делённым полям формы можно обрат',
//         color: 'F3DB7D',
//         isFavorite: false,

//     },
//     {
//         id: 2,
//         title: 'Работа с формами',
//         content: 'К делённым полям формы можно обратиться через form.elements по значению, указанному в атрибуте nameобратиться через form.elements по значению, указанному в атрибуте name',
//         color: 'F3DB7D',
//         isFavorite: false,

//     },
//     {
//         id: 2,
//         title: 'Работа с формами',
//         content: 'К делённым полям формы можно обратиться через form.elements по значению, указанному в атрибуте nameобратиться через form.elements по значению, указанному в атрибуте name',
//         color: 'F3DB7D',
//         isFavorite: false,

//     },
// ]


const colors = {
    YELLOW: 'F3DB7D',
    GREEN: 'C2F37D',
    BLUE: '7DE1F3',
    RED: 'F37D7D',
    PURPLE: 'E77DF3',
}

const model = {
    notes: [],
    noteColor: 'F3DB7D',
    showFavorites: false,

    saveLocalStorage() {
        localStorage.setItem('notesData', JSON.stringify(this));
    },
    
    loadLocalStorage() {
        const dataNotes = localStorage.getItem('notesData');
        if (dataNotes) {
            Object.assign(this, JSON.parse(dataNotes));
        }
    },

    addNote(title, content) {
        const note = {
            id: new Date().getTime(),
            title,
            content,
            color: this.noteColor,
            isFavorite: false
        }
        this.notes.unshift(note)
        this.saveLocalStorage()
        this.updateView()
    },

    addColor(color) {
        this.noteColor = colors[color.toUpperCase()]
        this.saveLocalStorage()
    },

    addFavorite(noteId) {
        this.notes.forEach((note) => {
            if (note.id === noteId) {
                note.isFavorite = !note.isFavorite
            }
        })
        this.saveLocalStorage()
        this.updateView()
        
    },
    toggleFavoritesFilter() {
        this.showFavorites = !this.showFavorites;
        this.saveLocalStorage()
        this.updateView();
        

    },

    deleteNote(noteId) {
        this.notes = this.notes.filter((note) => note.id !== noteId)
        this.saveLocalStorage()
        this.updateView()
        
    },

    updateView() {
        const notesToShow = this.showFavorites ? this.notes.filter(note => note.isFavorite) : this.notes;
        viev.renderNotes(notesToShow);
        viev.renderNotesCount(notesToShow.length)
    },
}


const viev = {
    init() {
        this.renderNotes(model.notes)
        this.renderNotesCount(model.notes.length)

        const form = document.querySelector('.form')
        const textTitle = document.querySelector('.text-title')
        const textContent = document.querySelector('.text-content')
        form.addEventListener('submit', (event) => {
            event.preventDefault()
            const title = textTitle.value
            const content = textContent.value
            controller.addNote(title, content)
            textTitle.value = ''
            textContent.value = ''
        })

        const radioColors = document.querySelectorAll('.radio');
        radioColors.forEach((radio) => {
            radio.addEventListener('click', (event) => {
                const color = event.target.value;
                controller.addColor(color);

            })
        })

        const list = document.querySelector('.notes-list')
        list.addEventListener('click', (event) => {
            if (event.target.classList.contains('favorite-note-img')) {
                const noteId = +event.target.closest('li').id
                controller.addFavorite(noteId);
            }
            if (event.target.classList.contains('delete-note-img')) {
                const noteId = +event.target.closest('li').id
                controller.deleteNote(noteId)
            }
        })
        const checkboxFavorite = document.querySelector('.favorites-checkbox')
        checkboxFavorite.addEventListener('change', (event)=> {
            controller.toggleFavoritesFilter()
        })




    },


    renderNotes(notes) {
        const list = document.querySelector('.notes-list')
        const filterBox = document.querySelector('.filter-box')

        if (notes.length === 0) {
            return list.innerHTML = `
            <p class="no-notes-message">
                У вас нет еще ни одной заметки.<br>
                Заполните поля выше и создайте свою первую заметку!
            </p>
        `
        }

        let notesHTML = '';
        notes.forEach((note) => {
            notesHTML += ` 
            <li id="${note.id}">
    <div class="notes-title" style="background-color: #${note.color}">
        <h3 class ="note-title">${note.title}</h3>
        <div class = del-vav-btn>
        <button class="favorite-btn">
            <img class="favorite-note-img" src="${note.isFavorite ? './images/icons/active.svg' : './images/icons/inactive.svg'}" alt="Изображение сердечка">
        </button>
        <button class ="delete-btn">
        <img class = "delete-note-img" src="./images/icons/trash.svg" alt="Изображение корзины">
        </button>
        </div>
    </div>
    <p class="note-content">${note.content}</p>
</li>
            `
            list.innerHTML = notesHTML;
        })

    },



    renderNotesCount(count) {
        const countNotes = document.querySelector('.count_notes')
        countNotes.textContent = count
    },
    showMessage(type) {
        const message = document.querySelector(type)
        message.classList.remove('hidden')

        setTimeout(() => {
            message.classList.add('hidden')
        }, 1500)
    }

}



const controller = {
    renderNotesCount() {
        viev.renderNotesCount(model.notes.length)
    },
    addNote(title, content) {
        if (title.trim() === '') {
            return viev.showMessage('.message-content-title')
        } else if
            (title.trim().length > 50) {
            return viev.showMessage('.message-max-length')
        } else if
            (content.trim() === '') {
            return viev.showMessage('.message-content-title')
        } else if
            (content.trim().length > 300) {
            return viev.showMessage('.message-max-length-content')

        } else {
            model.addNote(title, content);
            viev.showMessage('.message-add-note')
        }
    },
    addColor(color) {
        model.addColor(color)
    },
    addFavorite(noteId) {
        model.addFavorite(noteId)
    },
    toggleFavoritesFilter() {
        model.toggleFavoritesFilter()
    },
    deleteNote(noteId) {
        model.deleteNote(noteId)
        viev.showMessage('.message-removed-note')
    }

}

function init() {
    viev.init()
    model.loadLocalStorage()
    model.updateView()
}

init()


