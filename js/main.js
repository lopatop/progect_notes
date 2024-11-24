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

    addNote(title, content) {
        const note = {
            id: new Date().getTime(),
            title,
            content,
            color: this.noteColor,
            isFavorite: false
        }
        this.notes.unshift(note)
        this.updateView()
    },

    addColor(color) {
        this.noteColor = colors[color.toUpperCase()]
    },

    addFavorite(noteId) {
        this.notes.forEach((note) => {
            if (note.id === noteId) {
                note.isFavorite = !note.isFavorite
            }
        })
        this.updateView()
    },
    toggleFavoritesFilter() {
        this.updateView();
    },

    deliteNote(noteId) {
        this.notes = this.notes.filter((note) => note.id !== noteId)
        this.updateView()
    },

    updateView() {
        let notesToShow;


        if (this.showFavorites) {
            notesToShow = this.notes.filter((note) => note.isFavorite);
        } else {
            notesToShow = this.notes;
        }


        viev.renderNotes(notesToShow);
        viev.renderNotesCount(notesToShow.length)
    },
}


const viev = {
    init() {
        this.renderNotes(model.notes)
        this.renderNotesCount()

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
            if (event.target.classList.contains('delite-note-img')) {
                const noteId = +event.target.closest('li').id
                controller.deliteNote(noteId)
            }
        })

        const favoritesCheckbox = document.querySelector('.favorites-checkbox');
        favoritesCheckbox.addEventListener('change', () => {
            controller.toggleFavoritesFilter();
        });

    },


    renderNotes(notes) {
        const list = document.querySelector('.notes-list')
        const filterBox = document.querySelector('.filter-box')

        if (notes.length === 0) {
            filterBox.classList.add('hidden')
            return list.innerHTML = `
            <p class="no-notes-message">
                У вас нет еще ни одной заметки.<br>
                Заполните поля выше и создайте свою первую заметку!
            </p>
        `
        } else {
            filterBox.classList.remove('hidden');
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
        <button class ="delite-btn">
        <img class = "delite-note-img" src="./images/icons/trash.svg" alt="Изображение корзины">
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
        if (!message) return;
        message.classList.remove('hidden')
        setTimeout(() => {
            message.classList.add('hidden')
        }, 3000)
    }

}



const controller = {
    renderNotesCount() {
        viev.renderNotesCount()
    },
    addNote(title, content) {
        if (title.trim() === '') return alert('Введите текст названия')
        if (title.trim().length > 50) {
            viev.showMessage('.message-max-length')
            return;
        }
        if (content.trim() === '') return alert('Введите текст новой заметки')
        model.addNote(title, content);
        viev.showMessage('.message-add-note')
    },
    addColor(color) {
        model.addColor(color)
    },
    addFavorite(noteId) {
        model.addFavorite(noteId)
    },
    toggleFavoritesFilter() {
        model.showFavorites = !model.showFavorites;
        model.updateView();
    },
    deliteNote(noteId) {
        model.deliteNote(noteId)
        viev.showMessage('.message-removed-note')
    }

}

function init() {
    viev.init()
}

init()


