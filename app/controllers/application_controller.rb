class ApplicationController < ActionController::Base
  layout 'sidenav'
  before_action :authenticate_user!
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  skip_before_filter :verify_authenticity_token
  before_filter :set_current_user, :reset_events, :clear_temporary_session_expiry_time
  before_filter :configure_permitted_parameters, if: :devise_controller?

  protected
  def clear_temporary_session_expiry_time
    if session[:reset_session_time_expiry_on_next_request]
      session[:auto_session_expires_at] = nil
      session.delete(:reset_session_time_expiry_on_next_request)
    end
  end

  private

  def set_current_user
    User.current = current_user
  end

  def reset_events
    Thread.current[:events] = {}
  end

  def reset_current_user
    # Org.current = nil
    Thread.current[:user] = nil
  end

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.for(:sign_up) do |u|
      u.permit(:name, :first_name, :last_name, :phone_number, :address, :city, :email, :password, :password_confirmation, :user_type)
    end
    devise_parameter_sanitizer.for(:account_update) do |u|
      u.permit(:name, :first_name, :last_name, :phone_number, :address, :city, :email, :password, :password_confirmation, :current_password)
    end
  end
end
