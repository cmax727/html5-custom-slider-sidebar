
$(window).load(function(){
	// TODO: This is a complete mess. This thing was originally built to only be able to handle one slideshow a page
	// Since thi si s no longer the intent, it needs to be completely restructured.
	$('#project_slides, .project_slides').each(function(){
		var nos = new odoslide();
		nos.init($(this));
	});
});
//this becomes a global variable - nice!
var odoslide = function()
{ 
  var stage, on_deck, active, chapters, slides, current, chapter_titles, slideshow_container,
  current = 0,
  speed = 300,
  user_has_advanced = false;



  var __isTransitioning = false;
      
  var init = function(container)
  {
    slideshow_container = container
    
    //hide default slide view
    hide_slides(container)
    
    //create containers for active/on deck
    container.append('<div id="odoslide_stage"><div id="odoslide_on_deck"></div><div id="odoslide_active"></div><div id="odoslide_controls"><div id="odoslide_take_a_look"></div><div class="odoslide_previous"><img src="assets/gfx/left.png" /></div><div class="odoslide_next"><img src="assets/gfx/right.png" /></div></div>')
    
    // pngFix the controls
    controls = $('#odoslide_controls .odoslide_previous, #odoslide_controls .odoslide_next', slideshow_container)
    controls.pngFix()
    controls.hide()
    
    // set variables for containers
    stage = $('#odoslide_stage', slideshow_container)
    on_deck = $('#odoslide_on_deck', slideshow_container)
    active = $('#odoslide_active', slideshow_container)
    
    // set css for containers
    stage.css({position:'relative', overflow:'hidden'})
    on_deck.css({position:'absolute', top:0, left:0, overflow:'hidden'})
    active.css({position:'absolute', top:0, left:0, overflow:'hidden'})
    
    // set other slide relateved variables
    chapters = $('ul:not(.establishing)',container)
    slides = $('li',container)

    chapter_titles = $('#project_chapters')
              
    //load 'establishing' image
    load_slide(active,0)
    $('img',get_slide(0)).load(function(){
      stage.css({height:slide_height(0)})
    })
    
    // this gives space until the javascript does its magic
    $('.space_holder', container).remove();
    $('#space_holder', container).remove();

    //bind events to control slideshow
    bind_forward_next()
    bind_chapters()
    bind_take_a_look()
    
  }
  
  var bind_chapters = function()
  {
    $('li',chapter_titles).click(function(){
      pos = $(this).prevAll().size() + 1
      go_to_chapter(pos)
      return falsebind
    })
    
    $('li .inner',chapter_titles).hover(function(){
      $(this).animate({paddingLeft:10, backgroundColor:'#b53269'}, 'fast')
      $(this).parent().animate({marginLeft:-10}, 'fast')
    },function(){
      
      if($(this).parent().hasClass('active'))
      {
        
      }
      else
      {
        $(this).animate({paddingLeft:0, backgroundColor:'#de3d81'}, 'fast')
        $(this).parent().animate({marginLeft:0}, 'fast')
      }
      
    })
  }
  
  var bind_take_a_look = function()
  {
    take_a_look = $('#odoslide_take_a_look', slideshow_container)
    
    // handle hover for ie6
    take_a_look.hover(function(){
      $(this).addClass('hover')
    },function(){
      $(this).removeClass('hover')
    })
    
  }
  
  var go_to_chapter = function(chapter_number)
  {
    go_to_slide(get_slide_number_for_slide(get_first_slide_of_chapter(chapter_number)))
  }
  
  var get_slide_number_for_slide = function(slide)
  {
    total = position_in_chapter = slide.prevAll().size()
    //add this to total of previous chapters

    slide.parent().prevAll().each(function(){
      total += $('li', this).size()
    })

    return total
  }
  
  
  var get_first_slide_of_chapter = function(chapter_number)
  {
    if(chapter_number > num_chapters())
    {
      return false
    }
    else
    {
      return $('ul:eq('+( chapter_number )+') li:first', slideshow_container)
    }
  }
  
  var is_slide_a_video = function(slide_number)
  {
    return $('.video_slide',$(get_slide_html(slide_number)).parent()).size() == true
  }
  
  
  var num_chapters = function()
  {
    return chapters.size()
  }

  var chapter_size = function(chapter_number)
  {
    //could use bound checking
    return $('li',chapters[chapter_number]).size()
  }
  
  var bind_mousemove = function()
  {
  
    stage.mousemove(function(e){

      width = $(this).width();

      offsetleft = e.pageX - this.offsetLeft;
      offsettop = e.pageY - this.offsetTop;

      slideheight = slide_height(current)
  
      pos = offsettop-20
    

      // limit how close arrow gets to top
      if(pos < 20)
      {
        pos = 20
      }

      // limit how close arrow gets to bottom
      if(slideheight < pos+70)
      {
        pos = slideheight-70
      }
    
      // limit how close arrow gets to bottom on a video slide
      if(is_slide_a_video(current) && slideheight < pos+120)
      {
        pos = slideheight-120
      }
    
      // make arrows follow mouse
      $('#odoslide_controls .odoslide_previous, #odoslide_controls .odoslide_next', slideshow_container).css('top', pos)
    
          
      if(offsetleft>(width/2))
      {
        $(this).css('cursor','pointer')
      }
      else
      {
        if(can_go_back() == false)
        {
          $(this).css('cursor','default')
        }
      }
  
      if(offsetleft < width/2)
      {
        $('#odoslide_controls .odoslide_next', slideshow_container).fadeOut(speed)

        if(can_go_back())
        {
          $('#odoslide_controls .odoslide_previous', slideshow_container).fadeIn(speed)
        }
      }
      else
      {
        $('#odoslide_controls .odoslide_previous', slideshow_container).fadeOut(speed)

        $('#odoslide_controls .odoslide_next', slideshow_container).fadeIn(speed)
      }
    })
  
    //handle moving mouse out of the slide container area (fade indicators)
    stage.hover(function(e){
    
    },function(e){
      $('#odoslide_controls .odoslide_previous, #odoslide_controls .odoslide_next', slideshow_container).fadeOut(speed)
    })
  
  }
  
  var bind_forward_next = function()
  {
    stage.click(function(e)
    {
      width = $(this).width()
      offsetleft = e.pageX-this.offsetLeft
      offsettop = e.pageY-this.offsetTop

      slideheight = slide_height(current)

      if(is_slide_a_video(current) && (offsettop > slideheight-100))
      {
        //no click
      }
      else
      {
        
        if(__isTransitioning === true) return;


        if(offsetleft>(width/2))
        {
          __isTransitioning = true;
          //clicked right side
          go_to_next_slide()

         // console.log('next slide __isTransitioning set to TRUE ');
        }
        else
        {
          __isTransitioning = true;
          //clicked left side
          go_to_previous_slide()

          //console.log('previous slide __isTransitioning set to TRUE ');
        }
      }
    })
  }
  
  //init helpers
  var hide_slides = function(container)
  {
    $('ul',container).css({height:0,width:0,overflow:'hidden'})
  }

	var go_to_next_slide = function()
	{
		if(current+1 >= num_slides())
		{
			go_to_slide(0)
		}
		else
		{
			go_to_slide(current+1)
		}
	}
	
	var go_to_previous_slide = function()
	{
	  if(can_go_back())
	  {
	    go_to_slide(current-1)
	  }
	}
	
	var can_go_back = function()
	{
    return (current > 0)
	}
	
	var chapter_progress = function(slide_number)
	{
	  //returns many slides into its chapter +slide_number+ is
	  
    return (current+1) - get_slide_number_for_slide(get_first_slide_of_chapter(get_chapter_for_slide(slide_number)))
	}
	
	var num_slides = function()
	{
		return slides.size()
	}
	
	var current_chapter = function()
  {
    return get_chapter_for_slide(current)
  }
    
  var get_chapter_for_slide = function(slide_number)
  {
    next_amount = get_slide(slide_number).parent().nextAll().size()
    return ((num_chapters() - next_amount) )
  }
	
  var set_chapter_for_slide = function(slide_number)
  {
    //get current chapter
    chapter_number = get_chapter_for_slide(slide_number)
    
    //is slide_number in current chapter?
    if(chapter_number == get_chapter_for_slide(current))
    {
      // yes? do nothing
      return;
    }
    else
    {
      //no?

      //clear active chapter
      current_chapter = $('#project_chapters li.active')
      current_chapter.removeClass('active')
      $('.chapter_disclose',current_chapter).slideUp('fast')
      current_chapter.animate({marginLeft:0},'fast')
      $('.inner', current_chapter).animate({paddingLeft:0,backgroundColor:'#de3d81',height:20},'fast')
      
      //set new chapter
      new_chapter = $('#project_chapters li:nth-child('+chapter_number+')')
      new_chapter.addClass('active')
      $('.chapter_disclose',new_chapter).slideDown('fast')
      new_chapter.animate({marginLeft:-10},'fast')
      $('.inner',new_chapter).animate({paddingLeft:10,backgroundColor:'#b53269',height:100},'fast')
      
      // set chapter size indicator
      $('.chapter_progress .total', new_chapter).html(chapter_size(get_chapter_for_slide(slide_number)))
    }
  }
  
  var go_to_slide = function(slide_number)
  {    

    current_height = slide_height(current)
    next_height = slide_height(slide_number)
    
    // load slide to deck
    load_slide(on_deck,slide_number)
    
    
    // update chapters
    set_chapter_for_slide(slide_number)
    
    
    if(current_height > next_height)
    {
      //shrink then fade
      
      stage.animate({height:next_height}, speed, function(){
        
        active.css({height:next_height})
        
        active.fadeOut(speed,function(){
          
          batter_up(slide_number)
          
          load_video_if_necessary(slide_number)

          __isTransitioning = false;

          //console.log('__isTransitioning set to FALSE?' , __isTransitioning);
          
        })
      })
      
    }
    else
    {
      //fade then grow
      
      on_deck.css({height:current_height})
      
      active.fadeOut(speed, function(){



        on_deck.css({height:next_height})
        stage.animate({height:next_height},speed,function(){
          __isTransitioning = false;
          //console.log('__isTransitioning set to FALSE?' , __isTransitioning);
          batter_up(slide_number)
          
          load_video_if_necessary(slide_number)

        })
      })
    }
    
    //update current_slide value
    current = slide_number
    
    // update chapter's slide number indicator    
    $('.chapter_progress .current', $('#project_chapters li:nth-child('+chapter_number+')')).html(chapter_progress(current))
    
    // fade previous arrow if we just arrived at a slide you cant go back from (first slide)
    if(!can_go_back())
    {
      $('#odoslide_controls .odoslide_previous', slideshow_container).fadeOut('fast')
    }
    
    
    $('#odoslide_take_a_look:visible', slideshow_container).fadeOut()
    bind_mousemove()
    
  }
  
  var load_video_if_necessary = function(slide_number)
  {
    if(is_slide_a_video(slide_number))
    {

      video_path = $('#odoslide_active .vid_url', slideshow_container).html()
      
      id = $('#odoslide_active .video_slide .flashcontent', slideshow_container).attr('id')
      // swfobject.embedSWF("/assets/swf/detail_player.swf", id, "705", "396", "6", null, {flvPath:video_path, imgPath:$('#odoslide_active img').attr('src')}, {wmode:"transparent"}, null);

      // flvPath:video_path, imgPath:$('#odoslide_active img').attr('src')
      
      $('#odoslide_active .video_slide .flashcontent', slideshow_container).flash(
      {
        swf:'/assets/swf/detail_player.swf',
        width:'705',
        height:'396',
        params:{wmode:'transparent'},
        data:'/assets/swf/detail_player.swf',
        flashvars:
        {
          flvPath:video_path,
          imgPath: $('#odoslide_active img', slideshow_container).attr('src')
        }
      })
    }
    else
    {
      return 0;
    }
  }

  var batter_up = function(slide_number)
  {
    hite = slide_height(slide_number)
    
    load_slide(active,slide_number)
    active.show()
    active.css({height:hite})
    on_deck.css({height:hite})


  }

  var slide_height = function(slide_number)
  {
		
		if(is_slide_a_video(slide_number))
		{
		  height = 395
		}
		else
		{
		  height = get_slide(slide_number).height()
		}
		
		return height
  }

  var load_slide = function(cont, slide_number)
  {
    cont.html(get_slide_html(slide_number))
  }
  
  var get_slide_html = function(slide_number)
  {
    return $(slides[slide_number]).html();
  }

	var get_slide = function(slide_number)
	{
		return $(slides[slide_number])
	}
	
	var foo = function()
	{
	  return chapters
	}
  
  
  return {
    init:init,
    chapter_size:chapter_size,
    get_first_slide_of_chapter:get_first_slide_of_chapter,
    get_slide_number_for_slide:get_slide_number_for_slide
  }
};