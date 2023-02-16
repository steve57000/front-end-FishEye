function addMultipleAttributes(el, attrs) {
    for(let key in attrs) {
        el.setAttribute(key, attrs[key]);
    }
}

function addTotalLikes(e) {
    let likeSingleCardtotal
    let totalLikes

    const spanTotalLikes = document.querySelector('#totalLikes')
    const spanColorLikes = e.childNodes[0]

    const colorTxtTitle = e.parentNode.childNodes[0]
    const colorNumber = e.parentNode.childNodes[1]

    const buttonLikes = e
    e.addEventListener('mouseleave', (e) => {
        e.target.blur()
    })
    let spanLikes = e.previousElementSibling

    if(buttonLikes.hasAttribute('data-likes')) {
        colorTxtTitle.classList.remove('color-red')
        colorNumber.classList.remove('color-red')
        buttonLikes.removeAttribute('data-likes')
        buttonLikes.removeAttribute('aria-label')
        buttonLikes.setAttribute('aria-label', "Je n'aime pas")
        likeSingleCardtotal = -1
        totalLikes = -1
        spanColorLikes.style.color = '#6e6e6e'

    }
    else{
        colorTxtTitle.classList.add('color-red')
        colorNumber.classList.add('color-red')

        buttonLikes.removeAttribute('aria-label')
        buttonLikes.setAttribute('data-likes', 'Likes')
        buttonLikes.setAttribute('aria-label', "J'aime")
        likeSingleCardtotal = 1
        totalLikes = 1
        spanColorLikes.style.color = 'red'
    }

    likeSingleCardtotal += Number(spanLikes.textContent)
    totalLikes += Number(spanTotalLikes.textContent)

    return [
        spanTotalLikes.textContent = new Intl.NumberFormat().format(totalLikes),
        spanLikes.textContent = new Intl.NumberFormat().format(likeSingleCardtotal)
    ]
}

function animateNumbersLikes() {
    const getNumber = (counter) => {
        return parseFloat(counter.dataset.countTo);
    };
    const getSpeed = (counter) => {
        return parseFloat(counter.dataset.duration);
    };

    const updateTex = (counter, text) => {
        counter.textContent = text;
    };

    const animate = (counter, countTo, duration) => {
        let startTime = null;

        let currentTime = Date.now();

        const step = (currentTime) => {
            if (!startTime) {
                startTime = currentTime;
            }

            const progress = Math.min((currentTime - startTime) / duration, 1);

            const currentNum = Math.floor(progress * countTo);

            updateTex(counter, currentNum);

            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                window.cancelAnimationFrame(window.requestAnimationFrame(step));
            }
        };
        window.requestAnimationFrame(step);
    };

    const counters = document.querySelector('#totalLikes');
    const countTo = getNumber(counters);
    const animationDuration = getSpeed(counters);
    animate(counters, countTo, animationDuration);
}
