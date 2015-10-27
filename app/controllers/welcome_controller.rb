class WelcomeController < ApplicationController

  def login
    @components = CustomComponent.all
  end
  
  def preview
    file = CustomComponent.where(:user_id => User.current.id, :component_type => "NotEditable").last.component.path
    @page_content = File.read(file).html_safe
    render :action => :preview, :layout => false
  end

  def get_custom_comp
    @res = CustomComponent.find(params[:id])
    render(:partial => "get_custom_comp")
  end

  def container_comp
    session[:comp_id] = params[:id]
    render :text => params[:id], :layout => false
  end

  def component_display
    comp = CustomComponent.find(session[:comp_id])    
    @data = File.read(comp.component.path).html_safe
  end
end