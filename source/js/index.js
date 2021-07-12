(function(){

    // VARIABLE
    // comme scrollY mais permet une compatibilité navigateur plus global 
    let scrollY = function() {

        let supportPageOffset = window.pageXOffset !== undefined;
        let isCSS1Compat = ((document.compatMode || "") === "CSS1Compat");

        return supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop;

    };

    // recupere mon menu
    let menu = document.querySelector('.menu');
    // fonction qui permet de recuperer le scroll de lelement et le scroolY deja effectuer
    let top = menu.getBoundingClientRect().top + scrollY();
    // dans lexemple du cours, sont element perd ca largeur, j'ai pas ce probleme avec le flex, mais je vais utilisé ca methode au cas ou si je venais a en avoir besoin 
    let witdh = menu.getBoundingClientRect().witdh;
    // je cree une variable qui serra mon menu
    let rectangle = menu.getBoundingClientRect();
    // je cree un faux menu, pour remplacer celui qui serra fixé, ainsi evité le decallage 
    let fake = document.createElement('div');
    // je lui donne la largeur et la hauteur de mon menu
    fake.style.width = rectangle.width + "px";
    fake.style.height = rectangle.height + "px";


    // FONCTION

    // ma condition si le nombre de scroll depasse selui de lelement alors, la position ce fixe, sinon elle s'enleve
    let onScroll = () => {

        // permet de voir si  j'ai deja cette classe
        let aTilScroller = menu.classList.contains('fixed');

        if (scrollY() > top && !aTilScroller) {

            menu.classList.add('fixed')
            menu.style.witdh = witdh + "px";
            // j'ajoute mon faux menu 
            menu.parentNode.insertBefore(fake, menu);

        } else if(scrollY() < top && aTilScroller) {

            menu.classList.remove('fixed');
            menu.parentNode.removeChild(fake);
        }
    };

    // si la page est redimensionner lelement fake a besoin detre adapter en largeur hauteur . cette fonction va permettre de le faire
    let onResize = function() {

        menu.style.width = "auto"
        menu.classList.remove('fixed');
        fake.style.display = "none"
        rectangle = menu.getBoundingClientRect()
        top = rectangle.top + scrollY()
        fake.style.width = rectangle.width + "px"
        fake.style.height = rectangle.height + "px"
        fake.style.display = "block"
        onScroll()

    }

    // LISTENER
    window.addEventListener('scroll', onScroll);
    window.addEventListener('resize', onResize);

})();