let menuContainer

// Don't display search menu when you click anywhere in the window
window.addEventListener('click', () => {
    searchBarMenuContainer.innerHTML = ''
})

window.addEventListener('DOMContentLoaded', () => {
    searchBarMenuContainer = document.querySelector('#search-bar-menu-container')

    // When you click in the menu, it doesn't disappear
    searchBarMenuContainer.addEventListener('click', (e) => {
        e.stopPropagation()
    })

    // Get values enter in input
    let searchUserInput = document.querySelector('#search-user')
    let ref

    searchUserInput.addEventListener('input', (e) => {
        const value = e.target.value

        // If have a timeout in process
        if (ref) {
            clearTimeout(ref) // clear timeout
        }

        // Relaunch timeout and Wait a moment (2s) for send the request
        ref = setTimeout(() => {
            axios
                .get('/users?search=' + value)
                .then((response) => console.log(response))
                .catch((err) => console.log(err))
        }, 2000)
    })
})
