window.addEventListener('DOMContentLoaded', () => {
    const inputAvatar = document.querySelector('#input-avatar')
    const formImgProfile = document.querySelector('#form-img-profile')

    // it is possible that you write parameter here like that
    // formImgProfile.action = '/users/update/image'
    // formImgProfile.method = 'POST'

    formImgProfile.addEventListener('click', () => {
        inputAvatar.click() // open input windows for select img
    })

    inputAvatar.addEventListener('change', () => {
        formImgProfile.submit()
        console.log('123')
    })
})
