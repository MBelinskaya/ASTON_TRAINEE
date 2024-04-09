const wrapperEl = document.querySelector('#wrapper');

const formEl = document.querySelector('#form');
const divEl = document.querySelector('#div');
const pEl = document.getElementById('p');


formEl.addEventListener('click', (event) => {
    console.log('form')
}, {
    capture: true
})
divEl.addEventListener('click', (event) => {
    console.log('div')
})

pEl.addEventListener('click', (event) => {
    console.log('p')
})


//////

wrapperEl.addEventListener('click',   function (event){
    const actionDataEl = event.target.dataset.action;


    console.log('this', this)
    console.log('target', event.target)
    console.log('currentTarget', event.currentTarget)

    if (actionDataEl === 'delete') {
        console.log('какая-то логика с удалением')
    }
})




