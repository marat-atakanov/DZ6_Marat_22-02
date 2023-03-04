const container = document.querySelector('.container');
const currency = '$';

fetch('data.json')
    .then(response => response.json())
    .then(json => {
        json.data.forEach((item) => {
            const image = document.createElement('img');
            const price = document.createElement('span');
            const name = document.createElement('span');
            const parent = document.createElement('div');
            image.classList.add('image');
            image.src = `${item.image}`;
            price.classList.add('price');
            price.innerHTML = `${item.price} ${currency}`;
            name.classList.add('name');
            name.innerHTML = `${item.name}`;
            parent.classList.add('parent');
            parent.append(image, price, name);
            container.append(parent);
        })
    })
    .catch(() => console.error("error"))
    .finally(() => {console.warn('finally')});

// const request = new XMLHttpRequest()
// request.open("GET", "data.json")
// request.setRequestHeader("Content-Type", "application/json");
// request.send();
//
// request.addEventListener('load', () => {
//     const data = JSON.parse(request.response);
//     data.data.forEach((item) => {
//         const image = document.createElement('img');
//         const price = document.createElement('span');
//         const name = document.createElement('span');
//         const parent = document.createElement('div');
//         image.classList.add('image');
//         image.src = `${item.image}`;
//         price.classList.add('price');
//         price.innerHTML = `${item.price} ${currency}`;
//         name.classList.add('name');
//         name.innerHTML = `${item.name}`;
//         parent.classList.add('parent');
//         parent.append(image, price, name);
//         container.append(parent);
//     })
// })
