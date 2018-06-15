//SCROLL DOWN FUNKTION
/*
$(window).scroll(function () {
    var scroll = $(window).scrollTop();

    if (scroll >= 30) {
        $("nav").addClass("scrolling"),
            $(".logo").addClass("scrollinglogo");
    } else {
        $("nav").removeClass("scrolling"),
            $(".logo").removeClass("scrollinglogo");
    }
}); */




//SLIDESHOW 1 BILLEDE 
$(document).on('ready', function () {

    $(".lazy").slick({
        lazyLoad: 'ondemand',
        infinite: true,
        dots: true,
    });
});

$(document).on('ready', function () {

    $(".lazy1").slick({
        lazyLoad: 'ondemand',
        infinite: true,
        dots: true,
    });
});

// CAROUSEL SLIDESHOW TIL DESKTOP
$(document).on('ready', function () {

    $(".regular").slick({
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3
    });
});

//CAROUSEL SLIDESHOW TIL MOBIL 

$(document).on('ready', function () {

    $(".regular1").slick({
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1
    });
});



/*$(function () {
    $('.menu-ac').click(function () {
        $(this).next('.ac').slideToggle(500);
    });
    $('.fa-search').click(function () {
        $(".search").animate({
            width: "toggle"
        });
    });
}); */

//SMOOTH SCROLL TIL MENU OG PILEN 

$(document).ready(function () {
    $('a[href^="#"]').on('click', function (e) {
        e.preventDefault();

        var target = this.hash;
        var $target = $(target);

        $('html, body').animate({
            'scrollTop': $target.offset().top
        }, 1000, 'swing');
    });
});

//POP UP EFFEKT TIL "HVERDAG I BØRNEHAVEN" 
$(document).ready(function () {
    $("#hverdag").hide();
    $("#hverdagButton").click(function () {
        $("#hverdag").fadeIn(300);
          $("#kalender").hide();
           $("#mad").hide();
        positionPopup();
    });

    $(".kryds").click(function () {
        $("#hverdag").fadeOut(300);
    });
});

//POP UP EFFEKT TIL "KALENDER" 

$(document).ready(function () {
    $("#kalender").hide();
    $("#kalenderButton").click(function () {
        $("#kalender").fadeIn(300);
          $("#hverdag").hide();
           $("#mad").hide();
        positionPopup();
    });

    $(".kryds").click(function () {
        $("#kalender").fadeOut(300);
        
    });
});

//POP UP EFFEKT TIL "MAD ORDNING"

$(document).ready(function () {
    $("#mad").hide();
    $("#madButton").click(function () {
        $("#mad").fadeIn(300);
          $("#kalender").hide();
           $("#hverdag").hide();
        positionPopup();
    });

    $(".kryds").click(function () {
        $("#mad").fadeOut(300);
    });
});
//SMOOTH SCROLL TIL POP UP
/*
$(document).ready(function () {
    $("#madButton").on('click', function (e) {
        e.preventDefault();

        var target = this.hash;
        var $target = $(target);

        $("#mad").animate({
            'scrollTop': $target.offset().top
        }, 1000, 'swing');
    });
});
*/


//KALENDER PÅ PRAKTISK SIDE
 

!function() {

  // VISER HVILKEN DAG DET ER //
     var today = moment();

  function Calendar(selector, events) {
    this.el = document.querySelector(selector);
    this.events = events;
    this.current = moment().date(1);
    this.draw();
    var current = document.querySelector('.today');
    if(current) {
      var self = this;
      window.setTimeout(function() {
        self.openDay(current);
      }, 500);
    }
  }

  Calendar.prototype.draw = function() {
    //HEADER LAVES //
    this.drawHeader();

    //TEGNET MÅNED //
    this.drawMonth();

    this.drawLegend();
  }

  Calendar.prototype.drawHeader = function() {
    var self = this;
    if(!this.header) {
      //LAVER HEADER ELEMENTERNE
      this.header = createElement('div', 'header');
      this.header.className = 'header';

      this.title = createElement('h1');

      var right = createElement('div', 'right');
      right.addEventListener('click', function() { self.nextMonth(); });

      var left = createElement('div', 'left');
      left.addEventListener('click', function() { self.prevMonth(); });

      //TILFØJER ELEMENTER //
      this.header.appendChild(this.title); 
      this.header.appendChild(right);
      this.header.appendChild(left);
      this.el.appendChild(this.header);
    }

    this.title.innerHTML = this.current.format('MMMM YYYY');
  }

  Calendar.prototype.drawMonth = function() {
    var self = this;
    //PLACERE DAGENE RANDOM 
    this.events.forEach(function(ev) {
     ev.date = self.current.clone().date(Math.random() * (29 - 1) + 1);;
    });
    
    
    if(this.month) {
      this.oldMonth = this.month;
      this.oldMonth.className = 'month out ' + (self.next ? 'next' : 'prev');
      this.oldMonth.addEventListener('webkitAnimationEnd', function() {
        self.oldMonth.parentNode.removeChild(self.oldMonth);
        self.month = createElement('div', 'month');
        self.backFill();
        self.currentMonth();
        self.fowardFill();
        self.el.appendChild(self.month);
        window.setTimeout(function() {
          self.month.className = 'month in ' + (self.next ? 'next' : 'prev');
        }, 16);
      });
    } else {
        this.month = createElement('div', 'month');
        this.el.appendChild(this.month);
        this.backFill();
        this.currentMonth();
        this.fowardFill();
        this.month.className = 'month new';
    }
  }

  Calendar.prototype.backFill = function() {
    var clone = this.current.clone();
    var dayOfWeek = clone.day();

    if(!dayOfWeek) { return; }

    clone.subtract('days', dayOfWeek+1);

    for(var i = dayOfWeek; i > 0 ; i--) {
      this.drawDay(clone.add('days', 1));
    }
  }

  Calendar.prototype.fowardFill = function() {
    var clone = this.current.clone().add('months', 1).subtract('days', 1);
    var dayOfWeek = clone.day();

    if(dayOfWeek === 6) { return; }

    for(var i = dayOfWeek; i < 6 ; i++) {
      this.drawDay(clone.add('days', 1));
    }
  }

  Calendar.prototype.currentMonth = function() {
    var clone = this.current.clone();

    while(clone.month() === this.current.month()) {
      this.drawDay(clone);
      clone.add('days', 1);
    }
  }

  Calendar.prototype.getWeek = function(day) {
    if(!this.week || day.day() === 0) {
      this.week = createElement('div', 'week');
      this.month.appendChild(this.week);
    }
  }

  Calendar.prototype.drawDay = function(day) {
    var self = this;
    this.getWeek(day);

    // ANDRE DAGE
    var outer = createElement('div', this.getDayClass(day));
    outer.addEventListener('click', function() {
      self.openDay(this); 
    });

    // UGE DAGE //
    var name = createElement('div', 'day-name', day.format('ddd'));

    // DATOER //
    var number = createElement('div', 'day-number', day.format('DD'));


    // BEGIVENHEDER //
    var events = createElement('div', 'day-events');
    this.drawEvents(day, events);

    outer.appendChild(name);
    outer.appendChild(number);
    outer.appendChild(events);
    this.week.appendChild(outer);
  }

  Calendar.prototype.drawEvents = function(day, element) {
    if(day.month() === this.current.month()) {
      var todaysEvents = this.events.reduce(function(memo, ev) {
        if(ev.date.isSame(day, 'day')) {
          memo.push(ev);
        }
        return memo;
      }, []);

      todaysEvents.forEach(function(ev) {
        var evSpan = createElement('span', ev.color);
        element.appendChild(evSpan);
      });
    }
  }

  Calendar.prototype.getDayClass = function(day) {
    classes = ['day'];
    if(day.month() !== this.current.month()) {
      classes.push('other');
    } else if (today.isSame(day, 'day')) {
      classes.push('today');
    }
    return classes.join(' ');
  }

  Calendar.prototype.openDay = function(el) {
    var details, arrow;
    var dayNumber = +el.querySelectorAll('.day-number')[0].innerText || +el.querySelectorAll('.day-number')[0].textContent;
    var day = this.current.clone().date(dayNumber);

    var currentOpened = document.querySelector('.details');

    //ÅBEN DETALJERINGSBOKS PÅ DEN AKUTELLE RÆKKE //
    if(currentOpened && currentOpened.parentNode === el.parentNode) {
      details = currentOpened;
      arrow = document.querySelector('.arrow');
    } else {
      //LUK DE ÅBNE BEGIVENHEDER PÅ FORSKELLIGE UGEDAGE
      //currentOpened && currentOpened.parentNode.removeChild(currentOpened);
      if(currentOpened) {
        currentOpened.addEventListener('webkitAnimationEnd', function() {
          currentOpened.parentNode.removeChild(currentOpened);
        });
        currentOpened.addEventListener('oanimationend', function() {
          currentOpened.parentNode.removeChild(currentOpened);
        });
        currentOpened.addEventListener('msAnimationEnd', function() {
          currentOpened.parentNode.removeChild(currentOpened);
        });
        currentOpened.addEventListener('animationend', function() {
          currentOpened.parentNode.removeChild(currentOpened);
        });
        currentOpened.className = 'details out';
      }

      //LAV DETAJLE ELEMENTER
      details = createElement('div', 'details in');

      //LAV PILEN TIL DETALJEBOKSEN
      var arrow = createElement('div', 'arrow');

      //LAVER EVENT WRAPPER 
      details.appendChild(arrow);
      el.parentNode.appendChild(details);
    }

    var todaysEvents = this.events.reduce(function(memo, ev) {
      if(ev.date.isSame(day, 'day')) {
        memo.push(ev);
      }
      return memo;
    }, []);

    this.renderEvents(todaysEvents, details);

    arrow.style.left = el.offsetLeft - el.parentNode.offsetLeft + 27 + 'px';
  }

  Calendar.prototype.renderEvents = function(events, ele) {
    //FJERNER EVENT I DEN NUVÆRENDE DETALJE BOKS
    var currentWrapper = ele.querySelector('.events');
    var wrapper = createElement('div', 'events in' + (currentWrapper ? ' new' : ''));

    events.forEach(function(ev) {
      var div = createElement('div', 'event');
      var square = createElement('div', 'event-category ' + ev.color);
      var span = createElement('span', '', ev.eventName);

      div.appendChild(square);
      div.appendChild(span);
      wrapper.appendChild(div);
    });

    if(!events.length) {
      var div = createElement('div', 'event empty');
      var span = createElement('span', '', 'Ingen begivenheder');

      div.appendChild(span);
      wrapper.appendChild(div);
    }

    if(currentWrapper) {
      currentWrapper.className = 'events out';
      currentWrapper.addEventListener('webkitAnimationEnd', function() {
        currentWrapper.parentNode.removeChild(currentWrapper);
        ele.appendChild(wrapper);
      });
      currentWrapper.addEventListener('oanimationend', function() {
        currentWrapper.parentNode.removeChild(currentWrapper);
        ele.appendChild(wrapper);
      });
      currentWrapper.addEventListener('msAnimationEnd', function() {
        currentWrapper.parentNode.removeChild(currentWrapper);
        ele.appendChild(wrapper);
      });
      currentWrapper.addEventListener('animationend', function() {
        currentWrapper.parentNode.removeChild(currentWrapper);
        ele.appendChild(wrapper);
      });
    } else {
      ele.appendChild(wrapper);
    }
  }

  Calendar.prototype.drawLegend = function() {
    var legend = createElement('div', 'legend');
    var calendars = this.events.map(function(e) {
      return e.calendar + '|' + e.color;
    }).reduce(function(memo, e) {
      if(memo.indexOf(e) === -1) {
        memo.push(e);
      }
      return memo;
    }, []).forEach(function(e) {
      var parts = e.split('|');
      var entry = createElement('span', 'entry ' +  parts[1], parts[0]);
      legend.appendChild(entry);
    });
    this.el.appendChild(legend);
  }

  Calendar.prototype.nextMonth = function() {
    this.current.add('months', 1);
    this.next = true;
    this.draw();
  }

  Calendar.prototype.prevMonth = function() {
    this.current.subtract('months', 1);
    this.next = false;
    this.draw();
  }

  window.Calendar = Calendar;

  function createElement(tagName, className, innerText) {
    var ele = document.createElement(tagName);
    if(className) {
      ele.className = className;
    }
    if(innerText) {
      ele.innderText = ele.textContent = innerText;
    }
    return ele;
  }
}();
/* ARRANGEMENTER */
!function() {
  var data = [
    { calendar: 'Børnehusets ferie', color: 'orange' },
    

    { eventName: 'Forældremøde', calendar: 'Arrangementer', color: 'blue'},
    { eventName: 'Bedsteforældredag', calendar: 'Arrangementer', color: 'blue' },
    

    { eventName: 'Sommerfest', calendar: 'Traditioner', color: 'green' },
    { eventName: 'Morsdag', calendar: 'Traditioner', color: 'green' },
    { eventName: 'Børnehavens 15 års fødselsdag', calendar: 'Traditioner', color: 'green' },
    { eventName: 'Farsdag', calendar: 'Traditioner', color: 'green' },

    { eventName: '2.pinsedag', calendar: 'Lukkedage', color: 'red' },
    { eventName: 'kristi himmelfartsdag', calendar: 'Lukkedage', color: 'red' },
   
  ];

 

  function addDate(ev) {

  }

  var calendar = new Calendar('#calendar', data);

}();

$(function () {
    "use strict";
    
    $(".popup img").click(function () {
        var $src = $(this).attr("src");
        $(".show").fadeIn();
        $(".img-show img").attr("src", $src);
    });
    
    $("span, .overlay").click(function () {
        $(".show").fadeOut();
    });
    
});


