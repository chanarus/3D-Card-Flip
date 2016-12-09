'use strict';

class FlipCard extends HTMLElement {

    static get SIDES () {
        return {
            FRONT: 1,
            BACK: 2
        };
    }

    flip () {
        const scale = (500 + 200)/500;

        const sideOne = [
            {transform: 'translateZ(-200px) rotateY(0deg) scale(${scale})'},
            {transform: 'translateZ(-100px) rotateY(0deg) scale(${scale})'},
            {transform: 'translateZ(-100px) rotateY(180deg) scale(${scale})'},
            {transform: 'translateZ(-200px) rotateY(180deg) scale(${scale})'}
        ];

        const sideTwo = [
            {transform: 'translateZ(-200px) rotateY(180deg) scale(${scale})'},
            {transform: 'translateZ(-100px) rotateY(180deg) scale(${scale})'},
            {transform: 'translateZ(-100px) rotateY(360deg) scale(${scale})'},
            {transform: 'translateZ(-200px) rotateY(360deg) scale(${scale})'}
        ];

        const timing = {
            duration: 3000,
            iteration: 1,
            easing: 'ease-in-out',
            fill: 'forwards'
        };

        switch (this._side) {
            case FlipCard.SIDES.FRONT:
                this._front.animate(sideOne, timing);
                this._back.animate(sideTwo, timing);
                break;

            case FlipCard.SIDES.BACK:
                this._front.animate(sideTwo, timing);
                this._back.animate(sideOne, timing);
                break;

            default:
                throw new Error('Unknown side');
        }
    }

    createdCallback () {
        this._side = FlipCard.SIDES.FRONT;
        this._front = document.querySelector('.front');
        this._back = document.querySelector('.back');
        this._buttons = document.querySelectorAll('button');        
    }

    attachedCallback () {
        Array.from(this._buttons)
            .forEach(b => {
                b.addEventListener('click', _ => this.flip());
            });
    }

    detachedCallback () {

    }
}

document.registerElement('sc-card', FlipCard);