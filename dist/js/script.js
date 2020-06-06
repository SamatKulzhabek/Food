window.addEventListener('DOMContentLoaded', () => {
    'use strict';

    //tabs
    const tabs = document.querySelectorAll('.tabheader__item'),
          tabContent = document.querySelectorAll('.tabcontent'),
          tabParent = document.querySelector('.tabheader__items');
        
    function hideTabContent(){
        tabContent.forEach((item) => {
            item.style.display = 'none';
        });
        tabs.forEach((item) => {
            item.classList.remove('tabheader__item_active');
        })
    }

    function showContent(i = 0){
        tabContent[i].style.display = 'block';
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showContent(0);

    tabParent.addEventListener('click', (event) => {
        const target = event.target;
        if(target && target.classList.contains('tabheader__item')){
            tabs.forEach((item, i) => {
                if(target == item){
                    hideTabContent();
                    showContent(i);
                }
            });
        }
    });


    //timer

    const deadline = '2020-06-15';

    function getTimeRemaining(endtime){
        const t = Date.parse(endtime) - Date.parse(new Date()),
              days = Math.floor(t / (1000 * 60 * 60 * 24)),
              hours = Math.floor(t / (1000 * 60 * 60) % 24),
              minutes = Math.floor(t / (1000 * 60) % 60),
              seconds = Math.floor((t / 1000) % 60);

              return {
                  'total': t,
                  'days': days,
                  'hours': hours,
                  'minutes': minutes,
                  'seconds': seconds
              }
    }
    function setZero(num){
        if (num >= 0 && num < 10){
            return `0${num}`;
        }else{
            return num;
        }
    }

    function setClock(selector, endtime){
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              start = setInterval(updateClock, 1000);

              updateClock();

              function updateClock(){
                  const t = getTimeRemaining(endtime);
                    days.innerHTML = setZero(t.days);  
                    hours.innerHTML = setZero(t.hours);  
                    minutes.innerHTML = setZero(t.minutes);  
                    seconds.innerHTML = setZero(t.seconds);  
                    if(t.total <= 0){
                        clearInterval(start);
                    }
              }
    }

    setClock('.timer', deadline);

    //modal

    const modalTrigger = document.querySelectorAll('[data-modal]'),
          modal = document.querySelector('.modal'),
          modalCloseBtn = document.querySelector('[data-close]');
    modalTrigger.forEach((btn) => {
        btn.addEventListener('click', () => {
            modal.classList.add('show');
            modal.classList.remove('hide');
            document.body.style.overflow = 'hidden';
        });
    })
   function close(){
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
   }

    modalCloseBtn.addEventListener('click', () => {
       close();
    });

   modal.addEventListener('click', (e) => {
            if (e.target === modal){
                modal.classList.add('hide');
                modal.classList.remove('show');
                document.body.style.overflow = '';
            }
   });

   document.addEventListener('keydown', (e) => {
       if(e.code === 'Escape' && modal.classList.contains('show')){
        close();
       }
   })

});