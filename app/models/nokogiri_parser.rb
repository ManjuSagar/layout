require 'rubygems'
require 'nokogiri'
require 'open-uri'
class NokogiriParser
  def initialize(file, type = '')
    @data = Nokogiri::HTML File.read(file)
    @data.css('video.video-flash-player').each do |node|
      node.set_attribute('autoplay', '')
    end
    @data.css('div.column').each do |e|
      e['class'] = e['class'].remove('column ui-sortable').strip
      e['class'] = e['class'].remove('column').strip
    end
    @elements = []
    @data.children.each do |d|
      @elements  << get_boxes(d.children)
    end
    @elements = @elements.flatten

    @type = type
  end


  def parser
    # @elements = remove_css_elements(@elements, ['ui-sortable'])
    @elements.collect! do |e|
      get_data_from(e)
    end

    res = @elements.join('')

    file_name = (@type == 'Editable' ?  "layout_with_buttons.html" : "layout_without_buttons.html" )
    File.open(file_name, 'w'){|f| f.puts(res)}
    file_name
  end

  # Removes tags and return element
  # @input tags array of css tags
  # @return element
  def remove_css_elements(element, tags)
    return if tags.empty?
    tags.each do |tag|
      element.css(tag).each do |c|
        c['class'] = c['class'].remove(tag).strip
      end
    end

    element
  end

  def get_data_from(element)
	get_data_from_multiple_elements_view(element)
  end

  def get_data_from_col(col)
	boxes = get_boxes(col)
    boxes.collect! do |box|
      get_view(box)
    end
    "<div class='#{col['class']}'>#{boxes.join('')}</div>"
  end

  def get_lyrows(element)
  	element.at_css('.view')
  end


    # lyrow
    #box-element
    def get_data_from_multiple_elements_view(element)
      view = element.at_css('.view')
      return unless view.present?

      lyrows = find_lyrows(view)
      if lyrows.empty?
      	cols = view.at_css('.row-fluid').children.select{ |a| a.class == Nokogiri::XML::Element } if element.at_css('.view').present?
	  	cols.collect! do |col|
   		  	get_data_from_col(col)
   		end
   		"<div class = 'row'>#{cols.join('')}</div><hr>"
	  else	 
	    lyrows.collect do |lyrow|
	    	get_view(lyrow)
	    end
      end
    end

    def find_lyrows(view)
    	boxes = get_boxes(view)
    	if !boxes.empty? && boxes[0]['class'].match(/lyrow/)
    		boxes
    	else
    		[]
    	end
    end

    def get_boxes(element)
      element.children.select{|a| a.class == Nokogiri::XML::Element }
    end

    def get_view(box)
      if box.at_css('.view').at_css('.row-fluid').nil?
        return box.at_css('.view').inner_html
      else
        return get_data_from(box)
      end
    end



  end