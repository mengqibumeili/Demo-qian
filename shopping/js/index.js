window.addEventListener('load', function () {
    var arrow_l = document.querySelector('.arrow-l');
    var arrow_r = document.querySelector('.arrow-r');
    var focus = document.querySelector('.focus');
    var focusWidth = focus.offsetWidth;

    focus.addEventListener('mouseenter', function () {
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
        clearInterval(timer);
        timer = null;
    })
   
    focus.addEventListener('mouseleave', function () {
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
        timer = setInterval(function () {
            arrow_r.click();
        }, 2000);
    })
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('.circle');
    for (var i = 0; i < ul.children.length; i++) {
        var li = document.createElement('li');
        ol.appendChild(li);
        li.setAttribute('index', i);
        li.addEventListener('click', function () {
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            this.className = 'current';
            var index = this.getAttribute('index');
            num = index;
            circle = index;
            animate(ul, -index * focusWidth);
        })
    }
    var num = 0;
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    var circle = 0;
    var flag = true;
    arrow_r.addEventListener('click', function () {
       if(flag){
           flag=false;
        if (num == ul.children.length - 1) {
            ul.offsetLeft = 0;
            num = 0;
        }
        num++;
        animate(ul, -num * focusWidth,function(){
            flag=true;
        });
        circle++;
        if (circle == ol.children.length) {
            circle = 0;
        }
        circleChange();
       }
    })
    arrow_l.addEventListener('click', function () {
       if (flag){
           flag=false;
        if (num == 0) {
            num = ul.children.length - 1;
            ul.offsetLeft = -num * focusWidth + 'px';
        }
        num--;
        animate(ul, -num * focusWidth,function(){
            flag=true;
        });
        circle--;
        if (circle < 0) {
            circle = ol.children.length - 1;
        }
        circleChange();
       }
    })
    function circleChange() {
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        ol.children[circle].className = 'current';
    }
    var timer = setInterval(function () {
        arrow_r.click();
    }, 2000);
})
