document.addEventListener('DOMContentLoaded', function() {
    const clickableStars = document.querySelectorAll('.star');
    const countStar = document.getElementById('count-stars');
    const premioImages = document.querySelectorAll('.premio');
    const limparImage = document.getElementById('limpar');
    const countPopCorn = document.getElementById('count-popcorn');
    const countJoystick = document.getElementById('count-joystick');
    const countBike = document.getElementById('count-bike');
    const countSoccer = document.getElementById('count-soccer');
    const resgatarPremio = document.querySelectorAll('.resgatar-premio');

    loadSavedData();

    if (limparImage)
        limparImage.addEventListener('click', limparClick);

    resgatarPremio.forEach(item => {
        item.addEventListener('click', resgatarPremios);
    });

    clickableStars.forEach(star => {
        star.addEventListener('click', starClick);
    });

    premioImages.forEach(premio => {
        premio.addEventListener('click', premioClick);
    });

    if(countPopCorn)
        countPopCorn.addEventListener('click', limparClick);

    function starClick(event) {
        const clickedStar = event.target;

        const isFilled = clickedStar.src.includes('starFilled.png');

        if (isFilled) {
            const filled = clickedStar.src.replace('starFilled.png', 'starEmpty.png');   
            updateCountStars(-1);                 
            clickedStar.src = filled;
        } else {
            const empty = clickedStar.src.replace('starEmpty.png', 'starFilled.png');
            updateCountStars(1);
            clickedStar.src = empty;
        }

        saveData();
    }

    function premioClick(event) {
        const clickedPremio = event.target;
        const valorPremio = clickedPremio.parentNode.previousElementSibling.textContent;
        const tipoPremio = clickedPremio.dataset.type;

        const currentCount = parseInt(countStar.textContent, 10);
        if (currentCount >= valorPremio) {
            localStorage.setItem('totalEstrelas', currentCount - valorPremio);
            countStar.textContent = localStorage.getItem('totalEstrelas');   
            
            switch(tipoPremio)
            {
                case 'popcorn':
                    const totalpopcorn = parseInt(localStorage.getItem('popcorn'), 10) || 0;
                    localStorage.setItem('popcorn', totalpopcorn + 1);
                    break;
                case 'joystick':
                    const totalJoystick = parseInt(localStorage.getItem('joystick'), 10) || 0;
                    localStorage.setItem('joystick', totalJoystick + 1);
                    break;  
                case 'bike':
                    const totalBike = parseInt(localStorage.getItem('bike'), 10) || 0;
                    localStorage.setItem('bike', totalBike + 1);
                    break;  
                case 'soccer':
                    const totalSoccer = parseInt(localStorage.getItem('soccer'), 10) || 0;
                    localStorage.setItem('soccer', totalSoccer + 1);
                    break;         
            }
        } else {
            alert("Você não possui pontos suficientes para resgatar este prêmio.");
        }
        loadSavedData();
    }

    function saveData() {
        const savedData = {};

        clickableStars.forEach((star, index) => {
            const isFilled = star.src.includes('starFilled.png');
            savedData[index] = isFilled;
        });

        localStorage.setItem('atividadesData', JSON.stringify(savedData));
    }

    function loadSavedData() {
        const savedData = JSON.parse(localStorage.getItem('atividadesData')) || {};

        countStar.textContent = localStorage.getItem('totalEstrelas');

        if(countPopCorn)
            countPopCorn.textContent = localStorage.getItem('popcorn');
        
        if(countJoystick)
            countJoystick.textContent = localStorage.getItem('joystick');

        if(countBike)
            countBike.textContent = localStorage.getItem('bike');

        if(countSoccer)
            countSoccer.textContent = localStorage.getItem('soccer');

        
        clickableStars.forEach((star, index) => {
            const isFilled = savedData[index];
            const newSrc = isFilled ? './img/starFilled.png' : './img/starEmpty.png';
            star.src = newSrc;
        });
        console.log('teste')
    }

    function updateCountStars(valor) {
        const totalEstrelas = parseInt(localStorage.getItem('totalEstrelas'), 10) || 0;
        localStorage.setItem('totalEstrelas', totalEstrelas + valor);
        countStar.textContent = localStorage.getItem('totalEstrelas');
    }

    function limparClick() {
        localStorage.removeItem('atividadesData');
        loadSavedData();
    }

    function resgatarPremios(event){
        const clickedPremio = event.target;
        const tipoPremio = clickedPremio.dataset.type;             
        switch(tipoPremio)
        {
            case 'popcorn':
                const totalpopcorn = parseInt(localStorage.getItem('popcorn'), 10) || 0;
                if(totalpopcorn > 0)
                    localStorage.setItem('popcorn', totalpopcorn - 1);
                else 
                    alert("Você não possui mais prêmios deste para resgatar.");
                break;
            case 'joystick':
                const totalJoystick = parseInt(localStorage.getItem('joystick'), 10) || 0;
                if(totalJoystick)
                    localStorage.setItem('joystick', totalJoystick - 1);
                else 
                    alert("Você não possui mais prêmios deste para resgatar.");
                break;   
            case 'bike':
                const totalBike = parseInt(localStorage.getItem('bike'), 10) || 0;
                if(totalBike)
                    localStorage.setItem('bike', totalBike - 1);
                else 
                    alert("Você não possui mais prêmios deste para resgatar.");
                break;  
            case 'soccer':
                const totalsoccer = parseInt(localStorage.getItem('soccer'), 10) || 0;
                if(totalsoccer)
                    localStorage.setItem('soccer', totalsoccer - 1);
                else 
                    alert("Você não possui mais prêmios deste para resgatar.");
                break;        
        }
        loadSavedData();
    }
});
