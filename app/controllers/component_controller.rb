class ComponentController < ApplicationController

  def save_component    
    if User.current.user_type == "Campaign"
      File.open("layout_with_buttons.html", 'w'){|f| f.puts(params[:layout_with_buttons])}
      File.open("layout_without_buttons.html", 'w'){|f| f.puts(params[:layout_without_edit_button])}
      not_editable = CustomComponent.create_component("layout_without_buttons.html", params[:name], "NotEditable")
      editable = CustomComponent.create_component("layout_with_buttons.html", params[:name], "Editable")
      @res =  editable
    else
      File.open("sample.html", 'w'){|f| f.puts(params[:html])}
      @res = CustomComponent.where(user_id: User.current.id, component_type: ['Editable', 'NotEditable']).first
      unless @res.present?        
        @res =  CustomComponent.create_component('sample.html', '', "NotEditable")
        @res = CustomComponent.create_component('sample.html', '', "Editable")
      else        
        res = CustomComponent.update_component('sample.html', '', "NotEditable")
        res = CustomComponent.update_component('sample.html', '', "Editable")
      end
    end
    render(:partial => "save_component")
  end

  def update_component
    if session[:comp_id].present? and User.current.user_type == "Campaign"
      comp_with_buttons = CustomComponent.find(session[:comp_id].to_i)
      comp_without_buttons = CustomComponent.find(session[:comp_id].to_i-1)
      File.open("layout_with_buttons.html", 'w'){|f| f.puts(params[:layout_with_buttons])}
      File.open("layout_without_buttons.html", 'w'){|f| f.puts(params[:layout_without_edit_button])}
      not_editable = comp_without_buttons.update_attributes(user: User.current, component: File.open("layout_without_buttons.html"), component_type: "NotEditable")
      puts "not_editablenot_editable #{not_editable}"
      editable = comp_with_buttons.update_attributes!(user: User.current, component: File.open("layout_with_buttons.html"), component_type: "Editable")
      puts "editableeditableeditable #{editable}"
      @res =  comp_with_buttons
    end
    render text: 'ok', layout: false
  end
end