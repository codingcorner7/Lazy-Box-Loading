"use strict";
class App {
    constructor() {
        this.select = e => document.querySelector(e);
        this.selectAll = e => document.querySelectorAll(e);
        this.mainTl = new TimelineMax({ repeat: -1 });
        this.grad = this.select('#grad');
        this.particleArray = Array.from(this.selectAll('#particleContainer circle'));
        this.colorArray = ["#EF476F", "#118AB2", "#FFD166", "#06D6A0", "#073B4C"];
        this.repeatCount = 0;
        this.playParticles = () => {
            let d = this.particleArray, i = d.length;
            for (let p of d) {
                TweenMax.set(p, {
                    x: 0,
                    y: 0,
                    attr: {
                        r: 1,
                        cx: 110,
                        cy: 75
                    },
                    alpha: 1,
                    scale: this.randomBetween(5, 10) / 10,
                    transformOrigin: '50% 50%'
                });
                let tl = new TimelineMax();
                tl.to(p, this.randomBetween(2, 9) / 10, {
                    physics2D: {
                        velocity: this.randomBetween(24, 50),
                        angle: this.randomBetween(-120, -20),
                        gravity: this.randomBetween(55, 70)
                    },
                    scale: 0
                });
            }
            this.repeatCount++;
            this.repeatCount = (this.repeatCount >= this.colorArray.length) ? 0 : this.repeatCount;
            /*    TweenMax.to(['#sqr', '#particleContainer'], 0.3, {
                fill:this.colorArray[this.repeatCount]
               })
               TweenMax.to('.gradColor', 0.3, {
                 stopColor:this.colorArray[this.repeatCount]
               })
               TweenMax.to('.rip', 0.3, {
                 stroke:this.colorArray[this.repeatCount]
               }) */
        };
        const tl = new TimelineMax();
        this.mainTl.add(tl).timeScale(1.2);
        TweenMax.set('#ref', {
            scaleY: -1,
            transformOrigin: 'center bottom'
        });
        tl.to('#sqr', 1, {
            rotation: 90,
            transformOrigin: '100% 100%',
            ease: Expo.easeIn
        })
            .to('#refSqr', 1, {
            rotation: -90,
            transformOrigin: '100% 0%',
            ease: Expo.easeIn
        }, 0)
            .from('#sqr', 1, {
            scaleX: 0.9,
            transformOrigin: '100% 100%',
            immediateRender: false,
            ease: Elastic.easeOut
        }, 0.95)
            .addCallback(this.doRipple, '-=0.95')
            .addCallback(this.playParticles, '-=0.95')
            .to(['#whole', '#refSqr'], 1.95, {
            x: -36,
            ease: Linear.easeNone
        }, 0);
    }
    randomBetween(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    doRipple() {
        var tl = new TimelineMax();
        tl.staggerFromTo('.rip', 2, {
            attr: {
                rx: 0,
                ry: 0
            },
            alpha: 1
        }, {
            cycle: {
                attr: [{ rx: 59, ry: 8 }, { rx: 39, ry: 5 }, { rx: 19, ry: 3 }]
            },
            alpha: 0,
            ease: Circ.easeOut
        }, 0.03);
    }
    get timeline() {
        return this.mainTl;
    }
}
TweenMax.set('svg', {
    visibility: 'visible'
});
var app = new App();
//TweenMax.globalTimeScale(0.5)