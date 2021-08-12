<script type="text/javascript">
 //scrolling navbar

var didScroll, lastScrollTop = 0;

var navbar = {
    duration: 300, 
    delta: 50, 
    transitioning: false, 
    minimize: function(){
        //debugger
        if ( this.el.hasClass('is-maximized') ) {
            this.transition();   
        } 
        this.el.removeClass('is-maximized').addClass('is-minimized');
    },
    maximize: function() {
        if ( this.el.hasClass('is-minimized') ) {
            this.transition();
        }
        this.el.removeClass('is-minimized').addClass('is-maximized');
    },
    transition: function() {
        var _this = this;

        _this.el.find('.top-section').css('visibility','visible');

        _this.transitioning = true;
        _this.el.css({
            '-webkit-transform' : 'transform ' + _this.duration +'ms',
            '-moz-transform'    : 'transform ' + _this.duration +'ms',
            '-ms-transform'     : 'transform ' + _this.duration +'ms',
            '-o-transform'      : 'transform ' + _this.duration +'ms',
            'transition'        : 'transform ' + _this.duration +'ms'
        });


        setTimeout(function(){
            _this.el.css('transition','none');
            _this.transitioning = false;

            if ( _this.el.hasClass('is-minimized') ) { 
                _this.el.find('.top-section').css('visibility','hidden'); 

                _this.el.find('.bottom-section').css("-webkit-transform","translate(0px, -50px)");

            }
        }, _this.duration)

    },
    handleScroll: function() {
        //debugger
        var st = $(window).scrollTop();
        var navbar_height = this.el.outerHeight();

        if(Math.abs(lastScrollTop - st) <= this.delta || this.transitioning )
            return;

        if (st > lastScrollTop && st > navbar_height){
            this.minimize();
        } 

        else if (st + $(window).height() < $(document).height()) {
            this.maximize();
        }
        
        lastScrollTop = st;
    },
    handleLogoClick: function(e) {
        e.preventDefault();
        this.maximize();
    },
    init: function(id) {

        var _this = this;
        _this.el = $(id);


        $(window).scroll(function(event){
            didScroll = true;
        });

        setInterval(function() {
            if (didScroll) {
                _this.handleScroll();
                didScroll = false;
            }
        }, 50);


        var logo = _this.el.find('.bottom-section .navbar-logo');
        logo.on('click', function(e) {
            _this.handleLogoClick(e);
        } );
    }
};

navbar.init('#navbar');
//scrolling navbar
</script>