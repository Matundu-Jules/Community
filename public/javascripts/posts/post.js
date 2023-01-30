window.addEventListener('DOMContentLoaded', ($event) => {
    bindPost()
})

function bindPost() {
    const arrayDeletePostBtn = document.querySelectorAll('.btn-delete-post')
    const postContainer = document.querySelector('#post-list-container')

    arrayDeletePostBtn.forEach((btn) => {
        btn.addEventListener('click', ($event) => {
            const postId = $event.target.getAttribute('post_id')

            axios
                .delete(`/posts/${postId}`)
                .then((res) => {
                    postContainer.innerHTML = res.data
                    bindPost()
                })
                .catch((err) => console.error(err))
        })
    })
}
