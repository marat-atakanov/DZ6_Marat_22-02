const tabsContent = document.querySelectorAll('.tabcontent')
const tabs = document.querySelectorAll('.tabheader__item')
const tabsParent = document.querySelector('.tabheader__items')
let swapCount = 0;
let swapInterval;
let swapTimeout;

const hideTabContent = () => {
    tabsContent.forEach((item) => {
        item.style.display = 'none';
    })
    tabs.forEach((item) => {
        item.classList.remove('tabheader__item_active');
    })
}

const showTabContent = (i = 0) => {
    tabsContent[i].style.display = 'block';
    tabs[i].classList.add("tabheader__item_active")
}

hideTabContent();
showTabContent();

tabsParent.addEventListener('click', (event) => {
    const target = event.target;
    if (target.classList.contains('tabheader__item')) {
        tabs.forEach((item, index) => {
            if (target === item) {
                hideTabContent();
                showTabContent(index)
                swapCount = index;
                clearInterval(swapInterval);
                clearTimeout(swapTimeout);``
                swapTimeout = setTimeout(startTabSwitch, 1000);
            }
        })
    }
})
const startTabSwitch = () => {
    swapInterval = setInterval(() => {
        switch (swapCount) {
            case 0:
                hideTabContent()
                swapCount++;
                showTabContent(swapCount);
                break;
            case 1:
                hideTabContent()
                swapCount++;
                showTabContent(swapCount);
                break;
            case 2:
                hideTabContent()
                swapCount++;
                showTabContent(swapCount);
                break;
            case 3:
                hideTabContent()
                swapCount = 0;
                showTabContent(swapCount);
                break;
        }
    }, 2000);
}

startTabSwitch()


const modal = document.querySelector('.modal');
const opentModalBtn = document.querySelector('.btn_white');
const closeModalBtn = document.querySelectorAll('.modal__close');

const status_modal_success = document.querySelector('.status_modal_success');
const status_modal_fail = document.querySelector('.status_modal_fail');
const forms = document.querySelectorAll('form');

const showStatusModal = (isTrue) => {
    if (isTrue) {
        status_modal_success.classList.add('show')
        status_modal_success.classList.remove('hide')
    } else {
        status_modal_fail.classList.add('show')
        status_modal_fail.classList.remove('hide')
    }
}

const removeStatusModal = () => {
    status_modal_success.classList.remove('show');
    status_modal_success.classList.add('hide');
    status_modal_fail.classList.remove('show');
    status_modal_fail.classList.add('hide');
}

const openModal = () => {
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';

}

opentModalBtn.addEventListener('click', openModal);

const closeModal = () => {
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
    removeStatusModal();
    forms.forEach((item) => {
        item.classList.add('show');
        item.classList.remove('remove');
    })
}
closeModalBtn.forEach((btn) => {
    btn.addEventListener('click', () => {
        closeModal();
    });
});

const pepper = document.querySelector('.pepper');
const modalObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
        openModal();
    }
})

modalObserver.observe(pepper);

const postData = (url, data) => {
    return fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: data
    })
}

const bindPostData = (form) => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // const request = new XMLHttpRequest();
        // request.open('POST', 'server.php');
        // request.setRequestHeader('Content-Type', 'application/json')

        const formData = new FormData(form);
        const obj = {};

        formData.forEach((item, name) => {
            obj[name] = item;
        })
        console.log(obj);

        const json = JSON.stringify(obj);
        console.log(json);

        postData('server.php', json)
            .then(response => {
                if (response.status > 199 && response.status < 400) {
                            showStatusModal(1)
                        }else if (response.status > 399 && response.status < 600) {
                            showStatusModal(0)
                        }
                        form.classList.add('hide');
                        form.classList.remove('show');
            })
            .catch(() => console.error('error'))
            .finally(() => console.warn("finally"));

        // request.send(json);
        // request.addEventListener('load', ()=> {
        //     console.log(request.status);
        //     if (request.status > 199 && request.status < 400) {
        //         showStatusModal(1)
        //     }else if (request.status > 399 && request.status < 600) {
        //         showStatusModal(0)
        //     }
        //     form.classList.add('hide');
        //     form.classList.remove('show');
        // })
    })
}

forms.forEach((item) => {
    bindPostData(item);
})


