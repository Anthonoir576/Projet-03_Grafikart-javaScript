(function(){

    // variable

    // recupere mon menu
    let menu = document.querySelector('.menu');
    // comme scrollY mais permet une compatibilité navigateur plus global 
    let scrollY = function() {

        let supportPageOffset = window.pageXOffset !== undefined;
        let isCSS1Compat = ((document.compatMode || "") === "CSS1Compat");

        return supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop;

    };
    // fonction qui permet de recuperer le scroll de lelement et le scroolY deja effectuer
    let top = menu.getBoundingClientRect().top + scrollY();
    // dans lexemple du cours, sont element perd ca largeur, j'ai pas ce probleme avec le flex, mais je vais utilisé ca methode au cas ou si je venais a en avoir besoin 
    let witdh = menu.getBoundingClientRect().witdh;



    // ma condition si le nombre de scroll depasse selui de lelement alors, la position ce fixe, sinon elle s'enleve
    let onScroll = () => {

        // permet de voir si  j'ai deja cette classe
        let aTilScroller = menu.classList.contains('fixed');

        if (scrollY() > top && !aTilScroller) {

            menu.classList.add('fixed')
            menu.style.witdh = witdh + "px";

        } else if(scrollY() < top && aTilScroller) {

            menu.classList.remove('fixed')

        }
    };

    window.addEventListener('scroll', onScroll);


})();