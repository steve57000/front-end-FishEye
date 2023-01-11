function addMultipleAttributes(el, attrs) {
    for(let key in attrs) {
        el.setAttribute(key, attrs[key]);
    }
}

function addTotalLikes(e) {
    const spanTotalLikes = document.querySelector('#totalLikes')
    const spanColorLikes = e.childNodes[0]
    const spanLikes = e.previousElementSibling
    console.log(e)
    console.log(spanColorLikes)
    spanLikes.textContent = Number(spanLikes.textContent) + 1
    spanColorLikes.style.color = 'red'
    e.setAttribute('onclick', 'removeTotalLikes(this)')

    let totalLikes = 1
    totalLikes += Number(spanTotalLikes.textContent)

    return spanTotalLikes.textContent = new Intl.NumberFormat().format(totalLikes)
}

function removeTotalLikes(e) {
    const spanTotalLikes = document.querySelector('#totalLikes')
    const spanColorLikes = e.childNodes[0]
    const spanLikes = e.previousElementSibling
    spanLikes.textContent = Number(spanLikes.textContent) - 1

    spanColorLikes.style.color = '#6e6e6e'
    e.setAttribute('onclick', 'addTotalLikes(this)')

    let totalLikes = -1
    totalLikes += Number(spanTotalLikes.textContent)

    return spanTotalLikes.textContent = new Intl.NumberFormat().format(totalLikes)
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






